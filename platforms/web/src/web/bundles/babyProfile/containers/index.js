import BabyProfile from '../components/index';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { createBaby } from '../grapghQl/createBaby';
import { withRouter } from 'react-router-dom';
import { selectBaby } from 'web/actions';
import path from 'ramda/src/path';

const mapStateToProps = state => ({
  babyForm: state.form.BabyForm && state.form.BabyForm.values,
});

const mapDispatchToProps = dispatch => ({
  changeBaby: babyId => dispatch(selectBaby(babyId)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  graphql(createBaby, {
    props: ({ mutate, ownProps: { babyForm, history, changeBaby } }) => ({
      handleSubmit: () =>
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
)(BabyProfile);
