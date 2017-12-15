import { resetStateOnSignOutReducer } from '../configureReducer';

const state = {
  app: {},
  device: {},
  navigation: {},
  config: {},
  somethingUserSpecific: {},
  viewer: {},
};

const innerReducer = jest.fn((state = state, action) => state);

describe('resetStateOnSignOut reducer', () => {
  const reducer = resetStateOnSignOutReducer(innerReducer, state);

  it('forwards actions to the inner reducer', () => {
    const newState = reducer(state, { type: 'SOME_ACTION'});
    expect(newState).toEqual(state);
    expect(innerReducer).toHaveBeenCalled();
  });

  it('strips sensitive info from state on logout', () => {
    const action = { type: 'ON_AUTH', payload: { user: null } };
    const newState = reducer(state, action);
    expect(newState).not.toEqual(state);
    expect(newState).not.toHaveProperty('viewer');
    expect(newState).not.toHaveProperty('somethingUserSpecific');
  });
});
