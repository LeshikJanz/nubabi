// @flow
import express from 'express';
import bodyParser from 'body-parser';
import Multer from 'multer';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { schema } from './schema';
import admin from 'firebase-admin';
import config from '../../../core/config';
import firebaseConnector from './connectors/firebaseConnector';
import fs from 'fs';
import cors from 'cors';
import { genLoaders } from './helpers/loaders';

global.__DEV__ = process.env.NODE_ENV !== 'production';
const debug = require('debug')('graphqlServer:server');
const PORT = 8080;
const serviceAccount = require('./nubabitest1-firebase-adminsdk-r7bmb-4056976942.json');

const app = express();

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebase.databaseURL,
  databaseAuthVariableOverride: null,
  storageBucket: config.firebase.storageBucket,
});

firebase.database.ServerValue = admin.database.ServerValue;

const multer = Multer({
  storage: Multer.memoryStorage(),
});

app.options('/graphql', cors());
app.use(
  '/graphql',
  multer.any(),
  bodyParser.json(),
  cors(),
  graphqlExpress(async request => {
    const firebaseConn = firebaseConnector(firebase);
    let token;
    let loaders = {};

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
          loaders = genLoaders(token, firebaseConn);
        }
      } catch (e) {
        console.error(e);
      }
    }

    return {
      schema,
      context: {
        token,
        loaders,
        uploads: request.files,
        connectors: {
          firebase: firebaseConn,
        },
      },
    };
  }),
);

const getTokenFromConfig = () => {
  const graphqlConfig = __dirname + '/../../../graphql.config.json';
  // $FlowFixMe$
  const file = require(graphqlConfig, 'utf-8');
  return `"Authorization": "${
    file.endpoints[0].options.headers.Authorization
  }"`;
};

app.use(
  '/graphiql',
  graphiqlExpress(req => ({
    endpointURL: '/graphql',
    passHeader: __DEV__ && getTokenFromConfig(),
    variables: {
      babyId: 'QmFieTotS2xOdXRVeUFEbU5QQTlBQkh0Yw==',
    },
  })),
);

if (__DEV__) {
  const graphqlConfig = __dirname + '/../../../graphql.config.json';
  // $FlowFixMe$
  const file = require(graphqlConfig, 'utf-8');
  const debug = require('debug')('dev');

  // $FlowFixMe$
  app.use('/graphql-config', bodyParser.json(), (req, res) => {
    file.endpoints[0].options.headers.Authorization = req.body.token;
    fs.writeFileSync(graphqlConfig, JSON.stringify(file, null, 2), 'utf-8');
    debug('Written user token to graphql.config.json');
    res.sendStatus(200);
  });
}

app.listen(PORT, () => {
  debug('GraphQL server listening on port', PORT);
});
