import * as firebase from 'firebase';

const api = {
  async login(email, pass) {
    return firebase.auth().signInWithEmailAndPassword(email, pass);
  },
  async logout() {
    return firebase.auth().signOut();
  },
};

export default api;
