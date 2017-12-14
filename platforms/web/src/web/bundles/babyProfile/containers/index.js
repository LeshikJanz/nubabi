import BabyProfile from '../components/index';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import { createBaby } from '../grapghQl/createBaby';
import { withRouter } from 'react-router-dom';
import { selectBaby } from 'web/actions';
import path from 'ramda/src/path';
import { editBaby } from '../grapghQl/editBaby';

const mapStateToProps = state => ({
  babyForm: state.form.BabyForm && state.form.BabyForm.values,
});

const mapDispatchToProps = dispatch => ({
  changeBaby: babyId => dispatch(selectBaby(babyId)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  graphql(editBaby, {
    options: ({ match }) => ({
      variables: { id: match.params.id },
      skip: !match.params.id,
    }),
    props: ({ data }) => ({
      editableBaby: path(['viewer', 'baby'], data),
    }),
  }),
  graphql(createBaby, {
    props: ({ mutate, ownProps: { babyForm, history, changeBaby } }) => ({
      handleCreateBaby: () =>
        mutate({ variables: { input: babyForm } })
          .then(({ data }) => {
            const createdBaby = path(['createBaby', 'createdBaby'], data);
            if (createdBaby) {
              changeBaby(createdBaby.id);
              history.push('/profile');
            } else {
              console.error('Baby has not been created');
              console.error(createdBaby);
            }
          })
          .catch(error => {
            console.error(error);
          }),
    }),
    options: {
      refetchQueries: ['Profile', 'getBabies'],
    },
  }),
  graphql(createBaby, {
    props: () => ({
      handleEditBaby: () => {
        console.log('handleEditBaby');
      },
    }),
    options: {
      refetchQueries: ['Profile', 'getBabies'],
    },
  }),
  withHandlers({
    handleSubmit: ({ match, handleCreateBaby, handleEditBaby }) => () => {
      if (match.params.id) {
        handleCreateBaby();
      } else {
        handleEditBaby();
      }
    },
  }),
)(BabyProfile);
