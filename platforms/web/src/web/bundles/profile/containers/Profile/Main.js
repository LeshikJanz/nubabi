// @flow
import React, { PureComponent } from 'react';
import { Box } from 'grid-styled';
import { Main } from '../../../../../web/elements';
import Growth from './Growth';
import Activities from './Activities';
import Memories from './Memories';

type Props = {};

class ProfileMain extends PureComponent<Props> {
  render() {
    const { memories, growth, activities, name, dob } = this.props;

    console.log('memories', memories);

    return (
      <Box width={4 / 7} is={Main} p={15} pt={25}>
        <Growth growth={growth} dob={dob} />

        <Activities name={name} activities={activities} />

        <Memories memories={memories} />
      </Box>
    );
  }
}

export default ProfileMain;
