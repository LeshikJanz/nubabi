import reducer, { initialState, skipGrowthGlobalIntro } from '../reducer';

test('handles GROWTH_SEEN_GLOBAL_INTRO when seen', () => {
  expect(reducer(initialState, skipGrowthGlobalIntro(true))).toMatchSnapshot();
});

test('handles GROWTH_SEEN_GLOBAL_INTRO when not seen', () => {
  expect(reducer(initialState, skipGrowthGlobalIntro(false))).toMatchSnapshot();
});
