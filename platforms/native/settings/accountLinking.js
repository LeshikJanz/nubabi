// @flow
/* eslint-disable no-shadow */
import { connect } from 'react-redux';
import { linkAccountRequest, unlinkAccountRequest } from 'core/auth/actions';
import { loginWithFacebook } from '../auth/actions';

export const accountLinking = connect(
  state => ({
    isAuthLinkingFetching: state.auth.isFetching,
  }),
  dispatch => ({
    onLinkAccount: () => {
      return loginWithFacebook().then(response => {
        dispatch(
          linkAccountRequest({
            providerId: 'FACEBOOK',
            accessToken: response.accessToken,
          }),
        );
      });
    },
    onUnlinkAccount: () => {
      dispatch(unlinkAccountRequest({ providerId: 'FACEBOOK' }));
    },
  }),
);
