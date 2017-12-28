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
import * as Notifications from 'web/components/NotificationSystem';

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
      handleCreateBaby: () => {
        return mutate({
          variables: {
            input: setFields(babyForm, babyEditForm),
          },
        })
          .then(({ data }) => {
            const createdBaby = path(['createBaby', 'edge', 'node'], data);
            if (createdBaby) {
              changeBaby(createdBaby.id);
              history.push('/profile');
            } else {
              handleError(new Error('Baby has not been created'));
            }
          })
          .catch(handleError);
      },
    }),
    options: {
      refetchQueries: ['Profile', 'getBabies'],
    },
  }),
  graphql(updateBaby, {
    props: ({ mutate, ownProps: { babyEditForm, changeBaby } }) => ({
      handleEditBaby: () => {
        return mutate({
          variables: {
            input: setFields(babyForm, babyEditForm),
          },
        })
          .then(({ data }) => {
            Notifications.addNotification({
              level: 'success',
              message: 'Baby successfully saved',
            });
            const updatedBaby = path(['updateBaby', 'edge', 'node'], data);
            if (updatedBaby) {
              changeBaby(updatedBaby.id);
            } else {
              Notifications.addNotification({
                level: 'error',
                message: 'Baby has not been updated',
              });
            }
          })
          .catch(error => {
            Notifications.addNotification({ level: 'error', message: error });
          });
      },
    }),
    options: {
      refetchQueries: ['Profile', 'getBabies'],
    },
  }),
  withHandlers({
    handleSubmit: ({ match, handleCreateBaby, handleEditBaby }) => () =>
      match.params.id ? handleEditBaby() : handleCreateBaby(),
  }),
)(BabyProfile);
