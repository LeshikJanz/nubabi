// @flow
import React from 'react';
import { Text } from 'react-native';
import { gql } from 'react-apollo';
import Card from '../../components/Card';

type Props = {
  steps: Array<string>,
};

const Steps = ({ steps }: Props) => {
  // TODO: implement
  const stepsList = steps.map((step, i) => {
    return <Text key={i} style={{ margin: 10 }}>{step}</Text>;
  });

  return (
    <Card>
      {stepsList}
    </Card>
  );
};

Steps.fragments = {
  steps: gql`
    fragment Steps on Activity {
      steps
    }
  `,
};

export default Steps;
