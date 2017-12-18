// @flow
import type { State, Dispatch } from 'web/types';
import reduxForm from 'redux-form/es/reduxForm';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from './components';
import { loginRequest } from 'core/auth/actions';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (username, password) => {
    dispatch(loginRequest(username, password));
  },
});

const mapStateToProps = ({ auth }: State) => ({
  isAuthenticated: auth.isAuthenticated,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
      form: 'login',
    })(Login),
  ),
);
