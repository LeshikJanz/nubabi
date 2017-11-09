import React from 'react';
import { Image } from 'react-native';
import { Box, Card, Text } from '../components';

export const HealthcareNotice = () => {
  const healthcareNoticeIcon = require('../../../core/images/healthcare-notice.png');

  return (
    <Card
      margin={1}
      padding={1}
      flex={1}
      flexDirection="row"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Box marginRight={1} alignSelf="center">
        <Image
          source={healthcareNoticeIcon}
          style={{ width: 60, height: 73 }}
        />
      </Box>
      <Box flex={1} justifyContent="space-around">
        <Text bold lineHeight={20} size={2}>
          Please Note
        </Text>

        <Text color="secondary" lineHeight={17}>
          This information does not replace your health care provider and should
          you be concerned in any way, we recommend that you please consult with
          them or visit your nearest clinic.
        </Text>
      </Box>
    </Card>
  );
};

export default HealthcareNotice;
