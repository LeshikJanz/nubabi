import agent from 'superagent';
import config from '../../common/config';

const { apiUrl } = config;

const api = {
  login(email, password) {
    const request = { user: { email, password } };
    return new Promise((resolve, reject) => {
      agent
        .post(`${apiUrl}/auth/signin.json`)
        .set('Content-Type', 'application/json')
        .send(request)
        .end((err, res) => {
          if (err !== null) {
            if (res === undefined) {
              reject({
                code: 500,
                errorMessage: 'The was a problem communicating with the server',
              });
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
      agent
        .delete(`${apiUrl}/auth/signout.json`)
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
  getBabies(token) {
    return new Promise((resolve, reject) => {
      agent
        .get(`${apiUrl}/api/babies`)
        .set('Content-Type', 'application/json')
        .set('X-Auth-Token', token)
        .end((err, res) => {
          if (!res) {
            return reject(new Error('No response from API server'));
          }

          if (res.error) {
            return reject(res.error);
          }
          return resolve(res.body.babies);
        });
    });
  },
  getThisWeeksActivities(babyId, token) {
    return new Promise((resolve, reject) => {
      agent
        .get(`${apiUrl}/api/babies/${babyId}/activities`)
        .set('Content-Type', 'application/json')
        .set('X-Auth-Token', token)
        .end((err, res) => {
          if (res.error) {
            reject();
          }
          resolve(res.body.skill_areas);
        });
    });
  },
};

export default api;
