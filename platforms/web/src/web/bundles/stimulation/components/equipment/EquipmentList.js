// @flow
import React from 'react';
import { compose } from 'ramda';
import showNoContentViewIf from 'web/components/showNoContentViewIf';
import EquipmentItem from './EquipmentItem';
import * as EquipmentListStyled from '../../styled/equipment/EquipmentListStyled';

type Props = {
  equipments: any,
  handleCheckbox: Function,
};

const EquipmentList = ({ equipments, handleCheckbox }: Props) => (
  <EquipmentListStyled.List>
    {equipments.map(e => (
      <EquipmentItem key={e.id} {...e} handleCheckbox={handleCheckbox} />
    ))}
  </EquipmentListStyled.List>
);

export default compose(showNoContentViewIf(props => !props.equipments))(
  EquipmentList,
);
