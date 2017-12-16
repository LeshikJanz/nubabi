import {
  appError,
  appInfo,
  appOnline,
  appStarted,
  appSuccess,
  onAuth,
  resetSettings,
  resetSettingsEpic,
} from '../actions';
import { setupEpic } from '../../shared/testUtils';

describe('app actions', () => {
  describe('appStarted', () => {
    it('creates APP_STARTED action', () => {
      expect(appStarted()).toMatchSnapshot();
    });
  });

  describe('appOnline', () => {
    it('creates APP_ONLINE action', () => {
      expect(appOnline(true)).toMatchSnapshot();
    });
  });

  describe('appSuccess', () => {
    it('creates APP_SUCCESS action', () => {
      expect(appSuccess('success!')).toMatchSnapshot();
    });
  });

  describe('appInfo', () => {
    it('creates APP_INFO action', () => {
      expect(appInfo('info')).toMatchSnapshot();
    });
  });

  describe('appError', () => {
    it('creates APP_ERROR action', () => {
      expect(appError(new Error('foo'))).toMatchSnapshot();
    });
  });

  describe('onAuth', () => {
    it('creates ON_AUTH action', () => {
      expect(onAuth({ email: 'foo@example.com' }, 'TOKEN')).toMatchSnapshot();
    });
  });

  describe('resetSettings', () => {
    it('creates RESET_SETTINGS action', () => {
      expect(resetSettings()).toMatchSnapshot();
    });
  });
});

describe('app epics', () => {
  describe('resetSettingsEpic', () => {
    let store;
    const { mockStore } = setupEpic(resetSettingsEpic);

    beforeEach(() => {
      store = mockStore();
    });

    it('shows a success notification', () => {
      store.dispatch(resetSettings());
      expect(store.getActions()).toEqual([
        resetSettings(),
        appSuccess('Settings has been reset'),
      ]);
    });
  });
});
