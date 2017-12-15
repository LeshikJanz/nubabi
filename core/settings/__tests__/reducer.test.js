import reducer, {
  initialState, setSettingsValue, resetSettings,
  unitDisplaySelector,
} from '../reducer';

describe('settings reducer', () => {
  it('has an initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toMatchSnapshot();
  });

  it('handles RESET_SETTINGS', () => {
    expect(reducer({
      ...initialState,
      unitDisplay: {
        weight: 'lb',
        height: 'cm',
      }
    }, resetSettings())).toEqual(initialState);
  });

  it('handles SETTINGS_SET_VALUE', () => {
    expect(
      reducer(initialState, setSettingsValue(['notifications', 'memories'])),
    ).toMatchSnapshot();
  });
});

describe('settings actions', () => {
  describe('resetSettings', () => {
    it('creates a RESET_SETTINGS action', () => {
      expect(resetSettings()).toMatchSnapshot();
    });
  });
});

describe('unitDisplaySelector', () => {
  it('returns the unit display preferences', () => {
    const state = { settings: initialState };

    expect(unitDisplaySelector(state)).toMatchObject({
      weight: 'kg',
      height: 'cm'
    });
  })
});
