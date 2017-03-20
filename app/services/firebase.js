import * as firebase from 'firebase';

const api = {
  async login(email, pass) {
    try {
      const response = await firebase.auth()
        .signInWithEmailAndPassword(email, pass);
      return response;
    } catch (error) {
      console.log(error.toString());
      return error;
    }
  },
  async logout() {
    try {
      return firebase.auth().signOut();
    } catch (error) {
      console.log(error.toString());
      return error;
    }
  },
};

export default api;
