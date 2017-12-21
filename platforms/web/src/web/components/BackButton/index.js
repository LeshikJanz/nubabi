// @flow
import React from 'react';
import styled from 'styled-components';
import ArrowRight from 'web/assets/images/icons/arrowRight.svg';

type Props = {
  name: string,
  placeholder: string,
  handleClick: Function,
};

const Button = styled.button`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.secondary};
  padding: 6px 20px 6px 10px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.colors.secondary};
  outline: none;
  opacity: 0.7;
  cursor: pointer;
  font-size: 12px;
  transition: 0.2s opacity;

  > svg {
    margin-right: 10px;
    transform: rotate(180deg);
    width: 10px;
    height: 13px;
    > g > g {
      fill: ${props => props.theme.colors.secondary};
      transition: 0.2s fill;
    }
  }

  &:hover {
    opacity: 1;
    transition: 0.2s opacity;

    > svg > g > g {
      fill: ${props => props.theme.colors.secondary};
      transition: 0.2s fill;
    }
  }
`;

const BackButton = ({ name, handleClick, placeholder }: Props) => (
  <Button onClick={handleClick} placeholder={placeholder} type="button">
    <ArrowRight />
    {name}
  </Button>
);

export default BackButton;
