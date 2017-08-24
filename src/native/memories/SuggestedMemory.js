// @flow
import React from 'react';
import { Card, HorizontalCardItem } from '../components';

type Props = {
  title: string,
  icon: string,
};

export const SuggestedMemory = ({ title, icon }: Props) => {
  return (
    <Card margin={0} padding={0} justifyContent="flex-start">
      <HorizontalCardItem title={title} icon={icon} />
    </Card>
  );
};

export default SuggestedMemory;
