import React from 'react';
import styled from 'styled-components';
import ICross from '../../../common/icons/cross.svg';

type Props = {
  onClick: () => void,
  primary: boolean,
  children: Object,
};

const Common = styled.button`
  transition: ${props => props.theme.transition};
  border-radius: ${props => props.theme.button.borderRadius}px;
  padding: 7px 15px;
  text-transform: uppercase;
  cursor: pointer;
  font-family: ${props => props.theme.button.fontFamily};
  font-size: ${props => props.theme.button.fontSize}px;
`;

const Button = Common.extend`
  border: 1px solid ${props => props.theme.colors.primary};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  &:hover {
    background: ${props => props.theme.colors.open.red1};
  }
`;

const ButtonOutline = Common.extend`
  border: 1px solid ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.secondary};
  background: ${props => props.theme.colors.white};
`;

const ButtonPlus = Common.extend`
  width: 24px;
  height: 24px;
  border: 1px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ({
  onClick,
  primary,
  plus,
  children,
  disabled,
  p,
  ...rest,
  pink,
}: Props) =>
  primary ? (
    <Button onClick={onClick} disabled={disabled} p={p} {...rest}>
      {children}
    </Button>
  ) : plus ? (
    <ButtonPlus onClick={onClick} disabled={disabled} {...rest}>
      <ICross />
    </ButtonPlus>
  ) : (
    <ButtonOutline onClick={onClick} disabled={disabled} p={p} {...rest}>
      {children}
    </ButtonOutline>
  );
