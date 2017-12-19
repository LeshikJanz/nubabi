// @flow
import { compose, withProps } from 'recompose';
import FinishedActivityButton from '../../components/activity/FinishedActivityButton';
import { ACTIVITY_BUTTONS } from '../../constants';

export default compose(
  withProps(() => ({
    completedActivity: ACTIVITY_BUTTONS.find(a => a.type === 'done'),
  })),
)(FinishedActivityButton);
