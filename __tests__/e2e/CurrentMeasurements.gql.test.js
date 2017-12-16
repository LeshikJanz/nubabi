/* eslint-disable graphql/template-strings */
// This file was autogenerated
import fetch from "isomorphic-fetch";
import fs from "fs";
import path from "path";
import nock from "nock";
import gql from "graphql-tag";
import firebase from "firebase";
import { ApolloClient } from "apollo-client";
import { IntrospectionFragmentMatcher } from "react-apollo";
import config from "core/config";
import { authTokenMiddleware } from "core/configureApollo";
import ServerNetworkInterface from "../../core/helpers/serverNetworkInterface";

const networkInterface = new ServerNetworkInterface(
  process.env.NUBABI_GRAPHQL_ENDPOINT
);
const apollo = new ApolloClient({
  networkInterface,
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData: require("../../platforms/server/graphql/introspection.json")
      .data
  })
});

const start = async () => {
  firebase.initializeApp(config.firebase);
  const user = await firebase
    .auth()
    .signInWithEmailAndPassword(
      process.env.NUBABI_E2E_USER_NAME,
      process.env.NUBABI_E2E_USER_PASSWORD
    );

  const token = await user.getToken();

  networkInterface.use([
    authTokenMiddleware({
      getState: () => ({ auth: { token } })
    })
  ]);

  return true;
};

beforeAll(() => start());

describe("E2E GraphQL", () => {
  test("CurrentMeasurements GQL", done => {
    const queryString = fs.readFileSync(
      path.resolve(
        __dirname,
        "../../__generated__/CurrentMeasurements.graphql"
      ),
      "utf-8"
    );

    const query = gql`${queryString}`;
    const variables = {
      babyId: "QmFieTotS2xOdXRVeUFEbU5QQTlBQkh0Yw=="
    };

    apollo
      .query({ query, variables })
      .then(resp => {
        expect(JSON.parse(JSON.stringify(resp.data))).toMatchSnapshot(
          "CurrentMeasurements"
        );
        done();
      })
      .catch(err => done(err));
  });
});
