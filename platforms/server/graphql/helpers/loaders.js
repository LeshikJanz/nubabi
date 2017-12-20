// @flow
import DataLoader from 'dataloader';
import * as babies from '../connectors/babiesConnector';

const genBabyLoader = (token, loadFn) => {
  return new DataLoader(keys => {
    return Promise.all(
      keys.map(id => {
        return loadFn(token, id);
      }),
    );
  });
};

export function genLoaders(token: string, connectors) {
  return {
    // skillArea: new DataLoader(ids => genSkillAreas(token, ids))
    skillArea: genBabyLoader(token, babies.getSkillArea),
    expert: genBabyLoader(token, babies.getExpert),
  };
}

export function genSkillAreas(token: string, ids: Array<string>) {
  return Promise.all(ids.map(id => babies.getSkillArea(token, id)));
}
