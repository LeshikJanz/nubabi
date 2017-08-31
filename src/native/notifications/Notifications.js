// @flow
import React from 'react';
import { compose } from 'ramda';
import { isEmptyProp } from '../../common/helpers/graphqlUtils';
import showNoContentViewIf from '../components/showNoContentViewIf';

type Props = {
  notifications: Array<any>,
};

export const Notifications = ({ notifications }: Props) => {
  return null;
};

export default compose(showNoContentViewIf(isEmptyProp('notifications')))(
  Notifications,
);
