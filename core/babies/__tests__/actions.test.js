import {
  deleteBaby,
  getBabiesFailure,
  getBabiesRequest,
  getBabiesSuccess,
  selectBaby,
} from '../actions';

describe('babies actions', () => {
  describe('getBabiesRequest', () => {
    test('creates GET_BABIES_REQUEST action', () => {
      expect(getBabiesRequest()).toMatchSnapshot();
    });
  });

  describe('getBabiesFailure', () => {
    it('creates GET_BABIES_FAILURE action', () => {
      expect(getBabiesFailure(new Error('foo'))).toMatchSnapshot();
    });
  });

  describe('getBabiesSuccess', () => {
    it('creates GET_BABIES_SUCCESS action', () => {
      expect(getBabiesSuccess([{ id: 1, name: 'Foo' }])).toMatchSnapshot();
    });
  });

  describe('selectBaby', () => {
    it('creates SELECT_BABY action', () => {
      expect(selectBaby(1)).toMatchSnapshot();
    });
  });

  describe('deleteBaby', () => {
    it('creates DELETE_BABY action', () => {
      expect(deleteBaby(1)).toMatchSnapshot();
    });
  });
});
