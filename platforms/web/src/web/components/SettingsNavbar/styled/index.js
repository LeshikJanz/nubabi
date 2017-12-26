import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavbarContainer = styled(Flex)`
  flex-direction: column;
  flex-grow: 1;
  max-width: 290px;
`;

export const MenuItem = styled(Link)`
  display: flex;
  flex-direction: row;
  height: 60px;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  font-size: 17px;
  font-weight: 300;
  padding-left: ${props => (props.icon ? 0 : '20px')};
  color: ${props => props.theme.colors.label};
  background-color: ${props =>
    props.isactive ? props.theme.colors.border : props.theme.colors.white};
  border-left: 2px solid
    ${props =>
      props.isactive ? props.theme.colors.primary : props.theme.colors.white};
  &:hover {
    text-decoration: none;
    background-color: ${props => props.theme.colors.panel};
  }
`;

export const IconBox = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 50px;
`;
