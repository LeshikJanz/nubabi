// @flow
import React from 'react';
import { Equipment } from 'web/types/custom';
import * as EquipmentItemStyled from '../../styled/equipment/EquipmentItemStyled';

type Props = Equipment;

const EquipmentItem = ({ heading, text, id, handleCheckbox }: Props) => (
  <EquipmentItemStyled.Wrapper>
    <EquipmentItemStyled.SquareCheckbox
      id={id}
      type="checkbox"
      className="rounded"
      onChange={handleCheckbox}
    />
    <label htmlFor={id} />
    <EquipmentItemStyled.Text>
      <div>{heading}</div>
      <div>{text}</div>
    </EquipmentItemStyled.Text>
  </EquipmentItemStyled.Wrapper>
);

export default EquipmentItem;
