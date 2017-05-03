// @flow
import { createTransform } from 'redux-persist';
import { pick } from 'ramda';

const paths = [
  ['auth', ['token']],
  ['babies', ['currentBabyId']],
  ['growth', ['hasSeenGlobalIntro']],
  ['viewer'],
];

const transforms = [];
const whitelist = [];

// Paths always override the initialState, because upcoming service workers.
// Paths are explicit, because upcoming migration.
paths.forEach(([feature, props]) => {
  whitelist.push(feature);
  if (!props) return;
  const inOut = state => pick(props, state);
  transforms.push(createTransform(inOut, inOut, { whitelist: [feature] }));
});

const configureStorage = (appName: string) => ({
  debounce: 100,
  keyPrefix: `${appName}:`,
  transforms,
  whitelist,
});

export default configureStorage;
