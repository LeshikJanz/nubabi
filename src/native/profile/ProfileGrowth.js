// @flow
import type { Growth } from '../../common/types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { gql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { Box, Card, Pill, Text } from '../components';
import { formatAge } from '../../common/helpers/formatAge';
import ExpertAdvice from '../growth/ExpertAdvice';

type Props = {
  dob: string,
  growth: {
    current: Growth,
  },
  onViewGrowth: () => void,
};

const skipIntroductionGreeting = (str: string) => {
  return str.replace(/^Hi (.*),\s+/, '');
};

export const ProfileGrowth = ({ dob, growth, onViewGrowth }: Props) => {
  return (
    <Box contentSpacing>
      <Card padding={0}>
        <Box contentSpacing flexDirection="row">
          <Box flex={1}>
            <Text size={4}>This Week's Growth</Text>
          </Box>
          <Pill
            backgroundColor="rgba(51, 183, 235, .1)"
            borderColor="transparent"
            style={{ padding: 2, paddingHorizontal: 8, borderRadius: 20 }}
          >
            <Text bold color="success" style={() => ({ letterSpacing: -0.41 })}>
              {formatAge(dob)}
            </Text>
          </Pill>
        </Box>
        <Box
          contentSpacing
          borderBottomWidth={1}
          style={() => ({ borderColor: '#EDF0F9' })}
        >
          <Text color="secondary" numberOfLines={4}>
            {skipIntroductionGreeting(growth.current.introduction)}
          </Text>

          <TouchableOpacity
            style={{ marginVertical: 5 }}
            onPress={onViewGrowth}
          >
            <Text color="primary" medium>
              Read More
            </Text>
          </TouchableOpacity>
        </Box>
        <Box>
          <ExpertAdvice
            withHeader={false}
            {...filter(ExpertAdvice.fragments.expert, growth.current.expert)}
          />
        </Box>
      </Card>
    </Box>
  );
};

ProfileGrowth.fragments = {
  growth: gql`
    fragment ProfileGrowth on Baby {
      id
      dob
      growth {
        current {
          id
          introduction
          expert {
            id
            ...ExpertAdvice
          }
        }
      }
    }
    ${ExpertAdvice.fragments.expert}
  `,
};
export default ProfileGrowth;
