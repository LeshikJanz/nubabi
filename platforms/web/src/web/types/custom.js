// @flow
export type StimulationButtonType = {
  id: number,
  icon: string,
  text: string,
  type: string,
  level: 'INCREASE' | 'DECREASE',
};

export type Equipment = {
  id: number,
  heading: string,
  text: string,
};
