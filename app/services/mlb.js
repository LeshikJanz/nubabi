import agent from 'superagent';

const host = 'http://33.33.33.33:3000/';

const api = {
  login(email, password) {
    const request = { user: { email, password } };
    return new Promise((resolve, reject) => {
      agent.post(`${host}auth/signin.json`)
        .set('Content-Type', 'application/json')
        .send(request)
        .end((err, res) => {
          if (err !== null) {
            if (res === undefined) {
              reject({ code: 500, errorMessage: 'The was a problem communicating with the server' });
            } else {
              let { error } = res.body;
              if (res.status === 401) {
                error = 'The email or password you have entered is invalid';
              }
              reject({ code: res.status, errorMessage: error });
            }
          } else {
            const { user } = res.body;
            resolve({ user, token: user.authentication_token });
          }
        });
    });
  },
  logout(token) {
    const request = { authentication_token: token };
    return new Promise((resolve, reject) => {
      agent.delete(`${host}auth/signout.json`)
        .set('Content-Type', 'application/json')
        .send(request)
        .end((err, res) => {
          if (res.error) {
            reject();
          }
          resolve();
        });
    });
  },
  getBabies() {
    return new Promise((resolve, reject) => {
      agent.get(`${host}api/babies`)
        .set('Content-Type', 'application/json')
        .set('X-Auth-Token', 'uu7qWqoxB1ZMbePyhiu5')
        .end((err, res) => {
          if (res.error) {
            reject();
          }
          resolve(res.body.babies);
        });
    });
  },
};

export default api;
