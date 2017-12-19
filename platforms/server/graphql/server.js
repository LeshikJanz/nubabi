// @flow
import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import admin from 'firebase-admin';
import uuid from 'uuid';
import fs from 'fs';
import cors from 'cors';
import { schema } from './schema';
import firebaseConnector from './connectors/firebaseConnector';
import { genLoaders } from './helpers/loaders';

global.__DEV__ = process.env.NODE_ENV !== 'production';

const debug = require('debug')('graphqlServer:server');
const PORT = 8080;
const serviceAccount = JSON.parse(
  fs.readFileSync(
    './nubabitest1-firebase-adminsdk-r7bmb-2f00516d5e.json',
    'utf-8',
  ),
);

const app = express();

global.firebase =
  global.firebase ||
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NUBABI_FIREBASE_DATABASE_URL,
    databaseAuthVariableOverride: null,
    storageBucket: process.env.NUBABI_FIREBASE_STORAGE_BUCKET,
  });

const firebase = global.firebase;
firebase.database.ServerValue = admin.database.ServerValue;

const firebaseConn = firebaseConnector(firebase);

const requestIdMiddleware = (req, res, next) => {
  req.id = uuid();
  next();
};

app.options('/graphql', cors());
app.use(
  '/graphql',
  requestIdMiddleware,
  bodyParser.json(),
  cors(),
  graphqlExpress(async request => {
    let token;
    let loaders = {};

    if (request.headers.authorization) {
      token = request.headers.authorization.split(' ')[1];
      try {
        const user = await admin.auth().verifyIdToken(token);
        if (user) {
          admin.app().auth().currentUser = await admin.auth().getUser(user.uid);
          admin.app().options_.databaseAuthVariableOverride = {
            uid: user.uid,
            token: token,
            provider: user.firebase.sign_in_provider,
          };
          loaders = genLoaders(token, firebaseConn);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const logFunction = obj => {
      if (obj && obj.key && obj.data) {
        console.log(`[${request.id}]`, obj);
      }
    };

    return {
      schema,
      logFunction,
      context: {
        token,
        loaders,
        connectors: {
          firebase: firebaseConn,
        },
      },
    };
  }),
);

const endpointURL = process.env.GCLOUD_PROJECT
  ? 'https://us-central1-nubabitest1.cloudfunctions.net/handler/graphql'
  : process.env.NUBABI_GRAPHQL_ENDPOINT || '/graphql';

app.use(
  '/graphiql',
  graphiqlExpress(req => ({
    endpointURL,
  })),
);

export default app;
