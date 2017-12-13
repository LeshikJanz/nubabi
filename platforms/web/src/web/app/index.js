// @flow
import type { State, Dispatch } from 'web/types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import 'sanitize.css/sanitize.css';
import { logout } from 'core/auth/actions';
import { getBabyQuery } from './graphql/getBabyQuery';
import { getCurrentUserQuery } from './graphql/getCurrentUserQuery';
import App from './components';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => {
    dispatch(logout());
  },
});

const mapStateToProps = ({
  globalLoader,
  auth,
  navigation,
  babies,
  settings,
}: State) => ({
  isLoading: globalLoader.isFetching,
  pathname: navigation.location.pathname,
  isAuthenticated: auth.isAuthenticated,
  currentBabyId: babies.currentBabyId,
  unitDisplay: settings.unitDisplay,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(getBabyQuery, {
    name: 'getBabyQuery',
    options: ({ currentBabyId }) => ({
      fetchPolicy: 'cache-and-network',
      variables: { id: currentBabyId },
      skip: !currentBabyId,
    }),
    props: props => {
      return {
        data: props.getBabyQuery,
        baby: path(['getBabyQuery', 'viewer', 'baby'], props),
      };
    },
  }),
  graphql(getCurrentUserQuery, {
    name: 'getCurrentUserQuery',
    options: ({ isAuthenticated }) => ({
      fetchPolicy: 'cache-and-network',
      skip: !isAuthenticated,
    }),
    props: props => ({
      user: path(['getCurrentUserQuery', 'viewer', 'user'], props),
    }),
  }),
)(App);
