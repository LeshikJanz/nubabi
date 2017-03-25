import React from 'react';
import { pathOr } from 'ramda';
import LeftHeader from './LeftHeader';
import RightHeader from './RightHeader';

const babyNameTitle = ({ state }) => (
  pathOr('Nubabi', ['params', 'babyName'], state)
);

export function getBabyTitle() {
  return { title: babyNameTitle };
}

export const getTabHeaders = (navigate) => ({
  left: <LeftHeader navigate={navigate} />,
  right: <RightHeader navigate={navigate} />,
});
