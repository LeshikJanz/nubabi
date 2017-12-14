import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';
import InfoChanger from './components/InfoChanger';

export default compose(
  connect((state, ownProps) => ({
    initialValues: ownProps.user,
  })),
  reduxForm({
    form: 'changeCredentials',
  }),
)(InfoChanger);
