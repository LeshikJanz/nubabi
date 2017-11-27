// @flow
import React, { PureComponent } from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { Equipment } from 'web/types/custom';

type Props = Equipment;

const Wrapper = styled(Flex)`
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  padding: 15px 20px;
`;

const SquareCheckbox = styled.input`
  ${props => props.theme.checkbox.squared};
`;

const EquipmentText = styled.div`
  margin-left: 13px;

  div:first-child {
    font-size: 16px;
    font-weight: 500;
    color: ${props => props.theme.colors.gray4};
  }
  div:last-child {
    font-size: 14px;
    line-height: 1.71;
    color: ${props => props.theme.colors.gray3};
  }
`;

class EquipmentItem extends PureComponent<Props> {
  render() {
    const { heading, text, id, handleCheckbox } = this.props;
    return (
      <Wrapper>
        <SquareCheckbox
          id={id}
          type="checkbox"
          className="rounded"
          onChange={handleCheckbox}
        />
        <label htmlFor={id} />
        <EquipmentText>
          <div>{heading}</div>
          <div>{text}</div>
        </EquipmentText>
      </Wrapper>
    );
  }
}

export default EquipmentItem;
