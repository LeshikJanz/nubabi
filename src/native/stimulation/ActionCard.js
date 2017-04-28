// @flow
import React from 'react';
import { Card, Button, Text } from '../components/index';
import Icon from './ActionIcon';

type Props = {
  text: string,
  hint: string,
  icon: string,
  onPress: () => any,
  marginHorizontal?: number,
};

export const ActionCard = (
  {
    onPress,
    text,
    hint,
    icon,
    marginHorizontal = 0,
  }: Props,
) => (
  <Card padding={1} marginHorizontal={marginHorizontal} flex={1}>
    <Button flexDirection="column" flex={1} onPress={onPress}>
      <Icon
        size={30}
        color="primary"
        name={icon}
        style={{ textAlign: 'center' }}
      />

      <Text
        bold
        spacing={-0.31}
        align="center"
        style={theme => ({ letterSpacing: theme.heading.letterSpacing })}
      >
        {text}
      </Text>

      <Text color="secondary" align="center">{hint}</Text>
    </Button>
  </Card>
);

export default ActionCard;
