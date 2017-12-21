// @flow
import React from 'react';
import styled from 'styled-components';
import ArrowRight from 'web/assets/images/icons/arrowRight.svg';

type Props = {
  name: string,
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
  opacity: 0.8;
  cursor: pointer;
  font-size: 12px;

  > svg {
    margin-right: 10px;
    transform: rotate(180deg);
    width: 10px;
    height: 13px;
  }

  &:hover {
    opacity: 1;
    transition: 0.2s opacity;
  }
`;

const BackButton = ({ name, handleClick }: Props) => (
  <Button onClick={handleClick} type="button">
    <ArrowRight />
    {name}
  </Button>
);

export default BackButton;
