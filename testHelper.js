import firebase from 'firebase';
import config from 'core/config';
import { ApolloClient } from 'apollo-client';
import ClientNetworkInterface from './platforms/server/graphql/helpers/clientNetworkInterface';
const start = async () => {
  firebase.initializeApp(config.firebase);
  const user = await firebase.auth().signInWithEmailAndPassword('test@foo.com', 'testfoo');
  const token = await user.getToken();
  console.log(token);
  const apollo = new ApolloClient({
    networkInterface: new ClientNetworkInterface({ firebase }),
  });
};

start();


//
