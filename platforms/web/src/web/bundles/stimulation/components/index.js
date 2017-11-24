// @flow
import React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { Activities } from './Activities';
import { Baby } from 'core/types/modelTypes';

type Props = {
  baby: Baby,
  activities: Baby.activities,
};

const Wrapper = styled(Flex)`
  margin-top: 30px;
  background: ${props => props.theme.bg.panel};
  padding: 15px;
`;

const Stimulation = ({ baby }: Props) => (
  <Wrapper>
    <Activities activities={baby && baby.activities} />
  </Wrapper>
);

export default Stimulation;
