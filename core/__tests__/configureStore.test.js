import configureStore from '../configureStore';
import config from '../config';

describe('configureStore', () => {
  it('configures store and platform-specific extensions', () => {
    const initialState = { config };
    const platformDeps = {};
    const platformReducers = {};
    const platformMiddleware = [];
    const platformStoreEnhancers = [];
    const platformEpics = [];

    const store = configureStore({
      initialState,
      platformDeps,
      platformReducers,
      platformMiddleware,
      platformStoreEnhancers,
      platformEpics,
    });

    expect(store).toBeDefined();
  });
});
