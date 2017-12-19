// @flow
import express from 'express';
import bodyParser from 'body-parser';
import { formatError as originalFormatError } from 'graphql';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import admin from 'firebase-admin';
import uuid from 'uuid';
import fs from 'fs';
import cors from 'cors';
import Raven from 'raven';
import { schema } from './schema';
import firebaseConnector from './connectors/firebaseConnector';
import { genLoaders } from './helpers/loaders';

global.__DEV__ = process.env.NODE_ENV !== 'production';

if (!__DEV__) {
  Raven.config(
    'https://4087facb91084900b3fefef9667a1b1d:f12b8ea53d4343d691101f44dc1777c9@sentry.io/261647',
  ).install();
}

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

const formatError = err => {
  Raven.captureException(err);
  return originalFormatError(err);
};

app.options('/graphql', cors());
app.use(
  '/graphql',
  Raven.requestHandler(),

  requestIdMiddleware,
  bodyParser.json(),
  cors(),
  graphqlExpress(async request => {
    let token;
    let loaders = {};
    let user;

    if (request.headers.authorization) {
      token = request.headers.authorization.split(' ')[1];
      try {
        user = await admin.auth().verifyIdToken(token);
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
        Raven.captureException(e);
      }
    }

    if (user && !__DEV__) {
      Raven.setContext({
        user: {
          id: user.uid,
          email: user.email,
        },
      });
    }

    const logFunction = obj => {
      if (obj && obj.key && obj.data) {
        console.log(`[${request.id}]`, obj);
      }
    };

    return {
      schema,
      logFunction,
      formatError,
      context: {
        token,
        loaders,
        connectors: {
          firebase: firebaseConn,
        },
      },
    };
  }),
  Raven.errorHandler(),
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
