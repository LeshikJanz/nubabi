// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Box, Markdown, Image, Card } from '../components';

type Props = {
  text: ?string,
  onSkip: () => void,
};

export const Introduction = ({ text, onSkip }: Props) => {
  if (!text) {
    return null;
  }

  return (
    <Card padding={0} justifyContent="flex-start">
      <Box>
        <Box flexDirection="row" justifyContent="space-around">
          <Box margin={1}>
            <Image
              src={require('../../common/images/growth_introduction.png')}
              size={{ width: 48, height: 48 }}
            />
          </Box>
          <Box flex={1} marginVertical={1} marginRight={1}>
            <Markdown text={text} />
          </Box>
          <TouchableOpacity onPress={onSkip} style={{ margin: 10, padding: 5 }}>
            <Icon name="ios-close" size={20} />
          </TouchableOpacity>
        </Box>
      </Box>
    </Card>
  );
};

export default Introduction;
