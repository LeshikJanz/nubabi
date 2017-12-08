// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'web/elements';

type Props = {
  match: {
    url: string,
  },
  menuItems: Array<any>,
  location: {
    pathname: string,
  },
};

const NavbarContainer = styled(Flex)`
  flex-direction: column;
  background-color: ${props => props.theme.colors.white};
  flex-grow: 1;
  max-width: 290px;
  box-shadow: 0px 0px 5px -1px ${props => props.theme.colors.gray};
`;
const MenuItem = styled(Link)`
  display: flex;
  flex-direction: row;
  height: 60px;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  font-size: 17px;
  font-weight: 400;
  color: ${props => props.theme.colors.label};
  background-color: ${props =>
    props.isActive ? props.theme.colors.border : props.theme.colors.white};
  border-left: 2px solid
    ${props =>
      props.isActive ? props.theme.colors.primary : props.theme.colors.white};
  &:hover {
    text-decoration: none;
    background-color: ${props => props.theme.colors.panel};
  }
`;
//
const IconBox = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 50px;
`;

const renderMenuItem = (item, i, match, pathname) =>
  item.menuItemComponent ? (
    item.menuItemComponent({
      to: `${match.url}/${item.route}`,
      label: item.label,
      avatar: item.avatar,
      isActive: pathname === '/settings',
    })
  ) : (
    <MenuItem
      to={`${match.url}/${item.route}`}
      key={i}
      isActive={pathname === `${match.url}/${item.route}`}
    >
      <IconBox>
        <Icon
          name={item.iconName}
          isActive={pathname === `${match.url}/${item.route}`}
        />
      </IconBox>

      {item.label}
    </MenuItem>
  );

const SettingsNavbar = (props: Props) => {
  const { match, menuItems, location } = props;
  return (
    <NavbarContainer>
      {menuItems.map((item, i) =>
        renderMenuItem(item, i, match, location.pathname),
      )}
    </NavbarContainer>
  );
};

export default SettingsNavbar;
