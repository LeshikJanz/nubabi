import reducer, {
  getClosestContentForPeriod,
  initialState,
  skipGrowthGlobalIntro,
} from '../reducer';

describe('growth reducer', () => {
  it('has an initial state', () => {
    expect(reducer(undefined, { type: '@@INIT'})).toMatchSnapshot();
  });

  it('handles GROWTH_SEEN_GLOBAL_INTRO when seen', () => {
    expect(
      reducer(initialState, skipGrowthGlobalIntro(true)),
    ).toMatchSnapshot();
  });

  it('handles GROWTH_SEEN_GLOBAL_INTRO when not seen', () => {
    expect(
      reducer(initialState, skipGrowthGlobalIntro(false)),
    ).toMatchSnapshot();
  });
});

describe('getClosestContentForPeriod', () => {
  // TODO: this seems wrong, check with real data
  const periods = [
    {
      id: 1,
      minimumAge: 4,
      maximumAge: 2,
      ageDuration: 'WEEK',
    },
    {
      id: 2,
      minimumAge: 2,
      maximumAge: 1,
      ageDuration: 'MONTH',
    },
    {
      id: 3,
      minimumAge: 1,
      maximumAge: 1,
      ageDuration: 'YEAR'
    },
  ];

  const rawPeriods = [
    {
      id: 1,
      age_min: 4,
      age_max: 2,
      age_duration: 'week',
    },
    {
      id: 2,
      age_min: 2,
      age_max: 1,
      age_duration: 'month',
    },
    {
      id: 3,
      age_min: 1,
      age_max: 1,
      age_duration: 'year'
    },
  ];

  it('finds the closes period', () => {
    expect(getClosestContentForPeriod(periods, '2017-11-15')).toEqual(periods[0]);
    expect(getClosestContentForPeriod(periods, '2017-10-15')).toEqual(periods[1]);
    expect(getClosestContentForPeriod(periods, '2016-10-15')).toEqual(periods[2]);
  });

  it('supports raw', () => {
    expect(getClosestContentForPeriod(rawPeriods, '2017-11-15')).toEqual(rawPeriods[0]);
    expect(getClosestContentForPeriod(rawPeriods, '2017-10-15')).toEqual(rawPeriods[1]);
    expect(getClosestContentForPeriod(rawPeriods, '2016-10-15')).toEqual(rawPeriods[2]);
  });
});
