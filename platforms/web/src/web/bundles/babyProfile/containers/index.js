import BabyProfile from '../components/index';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { createBaby } from '../grapghQl/createBaby';

const mapStateToProps = state => ({
  babyForm: state.form.BabyForm && state.form.BabyForm.values,
});

export default compose(
  connect(mapStateToProps),
  graphql(createBaby, {
    props: ({ mutate, ownProps: { babyForm } }) => ({
      handleSubmit: () => mutate({ variables: { input: babyForm } }),
    }),
    options: {
      refetchQueries: ['Profile', 'getBabies'],
    },
  }),
)(BabyProfile);
