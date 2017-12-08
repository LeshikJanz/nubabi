// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Props = {
  match: {
    url: string,
  },
  menuItems: Array<any>,
};

const NavbarContainer = styled(Flex)`
  flex-direction: column;
`;
const MenuItem = styled(Link)``;

const renderMenuItem = (item, i, match) =>
  item.menuItemComponent ? (
    item.menuItemComponent({
      to: `${match.url}/${item.route}`,
      label: item.label,
    })
  ) : (
    <MenuItem to={`${match.url}/${item.route}`} key={i}>
      {item.label}
    </MenuItem>
  );

const SettingsNavbar = ({ match, menuItems }: Props) => {
  return (
    <NavbarContainer>
      {menuItems.map((item, i) => renderMenuItem(item, i, match))}
    </NavbarContainer>
  );
};

export default SettingsNavbar;
