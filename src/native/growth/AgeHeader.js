// @flow
import React from 'react';
import { gql } from 'react-apollo';
import moment from 'moment';
import theme from '../../common/themes/defaultTheme';
import { Box, Text } from '../components';
import NubabiIcon from '../../common/icons/nubabi';
import { formatAge } from '../shared/formatAge';

type Props = {
  name: string,
  dob: string,
};

export const AgeHeader = ({ name, dob }: Props) => {
  return (
    <Box
      padding={1}
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
      style={() => ({
        shadowOpacity: 0.1,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 0.5,
      })}
    >
      <NubabiIcon name="growth" color={theme.colors.primary} />
      <Text color="secondary" size={1} spacing={-0.88} marginHorizontal={1}>
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
