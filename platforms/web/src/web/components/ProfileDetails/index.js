import ProfileDetails from './components';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { path } from 'ramda';
import { updateUserMutation } from './graphql/updateUserMutation';
import { graphql } from 'react-apollo';

const mapDispatchToProps = () => ({});

const mapStateToProps = state => {
  return {
    firstName: path(
      ['form', 'changeCredentials', 'values', 'firstName'],
      state,
    ),
    lastName: path(['form', 'changeCredentials', 'values', 'lastName'], state),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(updateUserMutation, {
    options: {
      refetchQueries: ['user'],
    },
  }),
  withHandlers({
    saveUser: props => () => {
      props.mutate({
        variables: {
          input: {
            firstName: props.firstName,
            lastName: props.lastName,
          },
        },
      });
    },
  }),
)(ProfileDetails);
