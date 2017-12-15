import reducer from '../reducer';

describe('config', () => {
  const configEnvVars = [
    'NUBABI_APP_NAME',
    'NUBABI_API_URL',
    'NUBABI_APP_VERSION',
    'NUBABI_ENV',
    'NUBABI_GRAPHQL_ENDPOINT',
    'NUBABI_FIREBASE_API_KEY',
    'NUBABI_FIREBASE_DATABASE_URL',
    'NUBABI_FIREBASE_AUTH_DOMAIN',
    'NUBABI_FIREBASE_STORAGE_BUCKET',
    'NUBABI_FIREBASE_MESSAGING_SENDER_ID',
    'NUBABI_SENTRY_URL',
  ];
  const oldVars = {};

  beforeAll(() => {
    configEnvVars.forEach(key => {
      oldVars[key] = process.env[key];
      process.env[key] = 'mock';
    });
  });

  afterAll(() => {
    configEnvVars.forEach(key => {
      process.env[key] = oldVars[key];
    });
  });

  it('gets config from environment variables', () => {
    const config = require('../index').default;
    expect(config).toMatchSnapshot();
  });

  it('transforms a config map for bundling', () => {
    const getConfig = require('../getConfig');
    configEnvVars.forEach(key => {
      expect(getConfig[`process.env.${key}`]).toBeTruthy();
    });
  });
});

describe('config reducer', () => {
  it('has a default state even though gets rehydrated to config', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toMatchSnapshot();
  });
});
