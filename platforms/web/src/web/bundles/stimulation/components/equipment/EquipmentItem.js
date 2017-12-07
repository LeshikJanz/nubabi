// @flow
import React from 'react';
import { Equipment } from 'web/types/custom';
import * as EqupipmentItemStyled from '../../styled/equipment/EquipmentItemStyled';

type Props = Equipment;

const EquipmentItem = ({ heading, text, id, handleCheckbox }: Props) => (
  <EqupipmentItemStyled.Wrapper>
    <EqupipmentItemStyled.SquareCheckbox
      id={id}
      type="checkbox"
      className="rounded"
      onChange={handleCheckbox}
    />
    <label htmlFor={id} />
    <EqupipmentItemStyled.Text>
      <div>{heading}</div>
      <div>{text}</div>
    </EqupipmentItemStyled.Text>
  </EqupipmentItemStyled.Wrapper>
);

export default EquipmentItem;
