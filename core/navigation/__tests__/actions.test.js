import { resetNavigation } from '../actions';

describe('navigation actions', () => {
  describe('resetNavigation', () => {
    it('creates a RESET_NAVIGATION action', () => {
      expect(resetNavigation('home')).toMatchSnapshot();
    });
  });
});
