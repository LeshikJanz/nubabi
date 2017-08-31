// @flow
import React from 'react';
import { Box, Button, Card, Text } from '../components/index';
import Icon from './ActionIcon';

type Props = {
  text: string,
  hint: string,
  icon: string,
  onPress: () => any,
  marginHorizontal?: number,
};

export const ActionCard = ({
  onPress,
  text,
  hint,
  icon,
  marginHorizontal = 0,
}: Props) =>
  <Card
    padding={0}
    marginHorizontal={marginHorizontal}
    marginVertical={2}
    flex={1}
    justifyContent="space-between"
  >
    <Button flexDirection="column" flex={1} onPress={onPress}>
      <Box flex={1}>
        <Icon
          size={30}
          color="primary"
          name={icon}
          style={{ textAlign: 'center' }}
        />

        <Text
          marginTop={0.5}
          bold
          spacing={-0.31}
          align="center"
          style={theme => ({ letterSpacing: theme.heading.letterSpacing })}
        >
          {text}
        </Text>
      </Box>

      <Box justifyContent="flex-end" marginTop={0.5}>
        <Text color="secondary" align="center">
          {hint}
        </Text>
      </Box>
    </Button>
  </Card>;

export default ActionCard;
