// @flow
import React, { PureComponent } from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import Activities from './Activities';
import { Baby } from 'core/types';
import Equipment from './equipment/index';
import equipmentsMockData from 'web/assets/mock-data/stimulation/equipments.json';

type Props = {
  baby: Baby,
};

const Wrapper = styled(Flex)`
  margin-top: 30px;
  background: ${props => props.theme.bg.panel};
  padding: 15px;
  flex-direction: column;
`;

class Stimulation extends PureComponent<Props> {
  render() {
    const { baby } = this.props;

    return (
      <Wrapper>
        <Activities activities={baby && baby.activities} />
        <Equipment equipments={equipmentsMockData} />
      </Wrapper>
    );
  }
}

export default Stimulation;
