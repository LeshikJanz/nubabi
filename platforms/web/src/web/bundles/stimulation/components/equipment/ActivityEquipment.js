import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

const Wrapper = styled(Flex)`
  justify-content: flex-start;
  padding: 28px 15px;
  border: 1px solid ${props => props.theme.colors.open.white2};
  border-top: none;
  background-color: #fff;
`;

const EquipmentText = styled.div`
  ${props => props.theme.text.h3};
`;

const ActivityEquipment = () => (
  <Wrapper>
    <EquipmentText>Equipment you need to start</EquipmentText>
  </Wrapper>
);

export default ActivityEquipment;
