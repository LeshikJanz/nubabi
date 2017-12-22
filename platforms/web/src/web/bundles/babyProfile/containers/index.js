import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import path from 'ramda/src/path';
import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import { selectBaby } from 'core/babies/actions';
import { handleError } from 'web/common/errorHandler';
import { createBaby } from '../grapghQl/mutations/createBaby';
import { getBabyQuery } from '../grapghQl/queries/getBaby';
import { updateBaby } from '../grapghQl/mutations/updateBaby';
import { babyForm } from '../grapghQl/fragments/babyForm';
import BabyProfile from '../components/index';
import { setFields } from 'web/utils/setFields';

const mapStateToProps = state => ({
  babyEditForm: state.form.BabyForm && state.form.BabyForm.values,
  currentBabyPhoto: state.babies.currentBabyPhoto,
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
              handleError(new Error('Baby has not been created'));
            }
          })
          .catch(handleError),
    }),
    options: {
      refetchQueries: ['Profile', 'getBabies'],
    },
  }),
  graphql(updateBaby, {
    props: ({ mutate, ownProps: { babyEditForm, history, changeBaby } }) => ({
      handleEditBaby: () =>
        mutate({
          variables: {
            input: setFields(babyForm, babyEditForm),
          },
        })
          .then(({ data }) => {
            const updatedBaby = path(['updateBaby', 'edge', 'node'], data);
            if (updatedBaby) {
              changeBaby(updatedBaby.id);
              history.push('/profile');
            } else {
              handleError(new Error('Baby has not been updated'));
            }
          })
          .catch(handleError),
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
