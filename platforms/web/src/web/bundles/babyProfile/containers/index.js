import BabyProfile from '../components/index';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import { createBaby } from '../grapghQl/mutations/createBaby';
import { withRouter } from 'react-router-dom';
import { selectBaby } from 'web/actions';
import path from 'ramda/src/path';
import { getBabyQuery } from '../grapghQl/queries/getBaby';
import { updateBaby } from '../grapghQl/mutations/updateBaby';
import { filter } from 'graphql-anywhere';
import { babyForm } from '../grapghQl/fragments/babyForm';

const mapStateToProps = state => ({
  babyEditForm: state.form.BabyForm && state.form.BabyForm.values,
});

const mapDispatchToProps = dispatch => ({
  changeBaby: babyId => dispatch(selectBaby(babyId)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  graphql(getBabyQuery, {
    options: ({ match }) => ({
      variables: { id: match.params.id },
      skip: !match.params.id,
    }),
    props: ({ data }) => ({
      editableBaby: path(['viewer', 'baby'], data),
    }),
  }),
  graphql(createBaby, {
    props: ({ mutate, ownProps: { babyEditForm, history, changeBaby } }) => ({
      handleCreateBaby: () =>
        mutate({ variables: { input: filter(babyForm.form, babyEditForm) } })
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
  graphql(updateBaby, {
    props: ({ mutate, ownProps: { babyEditForm, history, changeBaby } }) => ({
      handleEditBaby: () => {
        mutate({ variables: { input: filter(babyForm.form, babyEditForm) } })
          .then(({ data }) => {
            const updatedBaby = path(['updateBaby', 'edge', 'node'], data);
            if (updatedBaby) {
              changeBaby(updatedBaby.id);
              history.push('/profile');
            } else {
              console.error('Baby has not been updated');
              console.error(updatedBaby);
            }
          })
          .catch(error => {
            console.error(error);
          });
      },
    }),
    options: {
      refetchQueries: ['Profile', 'getBabies'],
    },
  }),
  withHandlers({
    handleSubmit: ({ match, handleCreateBaby, handleEditBaby }) => () => {
      if (match.params.id) {
        handleEditBaby();
      } else {
        handleCreateBaby();
      }
    },
  }),
)(BabyProfile);
