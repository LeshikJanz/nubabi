// @flow
import React from 'react';
import { gql } from 'react-apollo';
import theme from '../../../core/themes/defaultTheme';
import { Box, Text } from '../components';
import NubabiIcon from '../../../core/icons/nubabi';
import { formatAge } from '../../../core/helpers/formatAge';

type Props = {
  name: string,
  dob: string,
};

export const AgeHeader = ({ name, dob }: Props) => {
  return (
    <Box
      backgroundColor="white"
      padding={1.55}
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
      style={() => ({
        borderColor: 'rgba(0,0,0,.1)',
        borderTopWidth: 1,
        borderBottomWidth: 1,
      })}
    >
      <NubabiIcon name="growth" color={theme.colors.primary} />
      <Text
        color="secondary"
        medium
        size={1}
        spacing={-0.88}
        marginHorizontal={1}
      >
        {name} is {formatAge(dob)}
      </Text>
    </Box>
  );
};

AgeHeader.fragments = {
  baby: gql`
    fragment AgeHeader on Baby {
      name
      dob
    }
  `,
};

export default AgeHeader;
