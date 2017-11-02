// @flow
import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import { schema } from "./schema";
import admin from "firebase-admin";
import config from "../../common/config";
import firebaseConnector from "./connectors/firebaseConnector";
import fs from "fs";
import cors from "cors";

global.__DEV__ = process.env.NODE_ENV !== "production";
const debug = require("debug")("graphqlServer:server");
const PORT = 8080;
const serviceAccount = require("./nubabitest1-firebase-adminsdk-r7bmb-8f86f51d8b.json");

const app = express();

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebase.databaseURL,
  databaseAuthVariableOverride: null
});

app.options("/graphql", cors());
app.use(
  "/graphql",
  bodyParser.json(),
  cors(),
  graphqlExpress(async request => {
    let token;
    if (request.headers.authorization) {
      token = request.headers.authorization.split(" ")[1];
      try {
        const user = await admin.auth().verifyIdToken(token);
        if (user) {
          admin.app().auth().currentUser = user;
          admin.app().options_.databaseAuthVariableOverride = {
            uid: user.uid,
            token: token,
            provider: user.firebase.sign_in_provider
          };
        }
      } catch (e) {}
    }

    return {
      schema,
      context: {
        token,
        connectors: {
          firebase: firebaseConnector(firebase)
        }
      }
    };
  })
);

const getTokenFromConfig = () => {
  const graphqlConfig = __dirname + "/../../../graphql.config.json";
  // $FlowFixMe$
  const file = require(graphqlConfig, "utf-8");
  return `"Authorization": "${file.endpoints[0].options.headers
    .Authorization}"`;
};

app.use(
  "/graphiql",
  graphiqlExpress(req => ({
    endpointURL: "/graphql",
    passHeader: __DEV__ && getTokenFromConfig(),
    variables: {
      babyId: "QmFieTotS2xOdXRVeUFEbU5QQTlBQkh0Yw=="
    }
  }))
);

if (__DEV__) {
  const graphqlConfig = __dirname + "/../../../graphql.config.json";
  // $FlowFixMe$
  const file = require(graphqlConfig, "utf-8");
  const debug = require("debug")("dev");

  // $FlowFixMe$
  app.use("/graphql-config", bodyParser.json(), (req, res) => {
    file.endpoints[0].options.headers.Authorization = req.body.token;
    fs.writeFileSync(graphqlConfig, JSON.stringify(file, null, 2), "utf-8");
    debug("Written user token to graphql.config.json");
    res.sendStatus(200);
  });
}

app.listen(PORT, () => {
  debug("GraphQL server listening on port", PORT);
});
