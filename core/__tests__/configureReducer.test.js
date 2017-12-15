import configureReducer from '../configureReducer';

describe('configureReducer', () => {
  it('configures platform specific reducers', () => {
    const initialState = {};
    const platformReducers = { some: () => ({ myPlatformState: 'foo' }) };
    const rootReducer = configureReducer(platformReducers, initialState);

    const state = rootReducer(initialState, { type: '@@INIT' });
    expect(state).toMatchSnapshot();
  });
});
