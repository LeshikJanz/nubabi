// @flow
import type {
  MemoryConnection,
  ActivityConnection,
  ProfileGrowthFragment,
} from 'core/types';
import React from 'react';
import { Box } from 'grid-styled';
import { Main } from 'web/elements';
import Growth from './Growth';
import Activities from './Activities';
import Memories from './Memories';

type Props = {
  memories: MemoryConnection,
  activities: ActivityConnection,
  growth: ProfileGrowthFragment,
  dob: Date,
  name: string,
};

const ProfileMain = ({ memories, growth, activities, name, dob }: Props) => (
  <Box is={Main} p={15} pt={25}>
    <Growth growth={growth} dob={dob} />

    <Activities name={name} activities={activities} />

    <Memories memories={memories} />
  </Box>
);

export default ProfileMain;
