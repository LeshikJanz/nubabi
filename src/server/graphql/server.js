import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { schema } from './schema';
import admin from 'firebase-admin';
import config from '../../common/config';
import firebaseConnector from './connectors/firebaseConnector';
import fs from 'fs';
const PORT = 8080;
const serviceAccount = require('./nubabitest1-firebase-adminsdk-r7bmb-8f86f51d8b.json');

const app = express();

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebase.databaseURL,
  databaseAuthVariableOverride: null,
});

const __DEV__ = process.env.NODE_ENV !== 'production';

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(async request => {
    let token;
    if (request.headers.authorization) {
      token = request.headers.authorization.split(' ')[1];
      try {
        const user = await admin.auth().verifyIdToken(token);
        if (user) {
          admin.app().auth().currentUser = user;
          admin.app().options_.databaseAuthVariableOverride = {
            uid: user.uid,
            token: token,
            provider: user.firebase.sign_in_provider,
          };
        }
      } catch (e) {}
    }

    return {
      schema,
      context: {
        token,
        connectors: {
          firebase: firebaseConnector(firebase),
        },
      },
    };
  }),
);

const getTokenFromConfig = () => {
  const graphqlConfig = __dirname + '/../../../graphql.config.json';
  const file = require(graphqlConfig, 'utf-8');
  return `"Authorization": "${file.endpoints[0].options.headers
    .Authorization}"`;
};

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    passHeader: __DEV__ && getTokenFromConfig(),
  }),
);

if (__DEV__) {
  const graphqlConfig = __dirname + '/../../../graphql.config.json';
  const file = require(graphqlConfig, 'utf-8');

  app.use('/graphql-config', bodyParser.json(), (req, res) => {
    file.endpoints[0].options.headers.Authorization = req.body.token;
    fs.writeFileSync(graphqlConfig, JSON.stringify(file, null, 2), 'utf-8');
    console.log('Written token to graphql.config.json');
    res.sendStatus(200);
  });
}

app.listen(PORT, () => {
  console.log('GraphQL server listening on port', PORT);
});
