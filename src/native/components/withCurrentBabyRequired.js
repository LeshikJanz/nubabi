// @flow
import { compose } from 'ramda';
import withCurrentBaby from './withCurrentBaby';
import requireBaby from './requireBaby';

export default Component => compose(withCurrentBaby, requireBaby)(Component);
