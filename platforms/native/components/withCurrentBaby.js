// @flow
import type { State } from '../../../core/types';
import { connect } from 'react-redux';

export const withCurrentBaby = connect((state: State) => ({
  currentBabyId: state.babies.currentBabyId,
}));

export default withCurrentBaby;
