import configureStorage from '../configureStorage';

describe('configureStorage', () => {
  it('setups redux-persist', () => {
    expect(configureStorage('testapp', ['store_path_to_serialize'])).toMatchSnapshot();
  });
});
