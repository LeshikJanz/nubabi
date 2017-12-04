// @flow
import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const loginWithFacebook = () => {
  return new Promise((resolve, reject) => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      result => {
        if (result.isCancelled) {
          reject(new Error('Facebook login was cancelled'));
        } else {
          AccessToken.getCurrentAccessToken()
            .then(data => {
              resolve(data);
            })
            .catch(error => reject(error));
        }
      },
      error => {
        reject(error);
      },
    );
  });
};
