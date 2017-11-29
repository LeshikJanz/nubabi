// @flow
import React from 'react';
import EquipmentItem from './EquipmentItem';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import ShowNoContentViewIf from 'web/components/showNoContentViewIf';
import { compose } from 'ramda';

type Props = {
  equipments: any,
  handleCheckbox: Function,
};

const List = styled(Flex)`
  flex-direction: column;
  text-align: left;
  margin-top: 18px;
`;

const EquipmentList = ({ equipments, handleCheckbox }: Props) => (
  <List>
    {equipments.map(e => (
      <EquipmentItem key={e.id} {...e} handleCheckbox={handleCheckbox} />
    ))}
  </List>
);

export default compose(ShowNoContentViewIf(props => !props.equipments))(
  EquipmentList,
);
