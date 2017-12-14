// @flow
import * as React from 'react';
import { Icon } from 'web/elements';
import { NavbarContainer, MenuItem, IconBox } from './styled';

type Props = {
  match: {
    url: string,
  },
  menuItems: Array<any>,
  location: {
    pathname: string,
  },
  user: Object,
};

const renderMenuItem = (item, match, pathname, userData) =>
  item.menuItemComponent ? (
    item.menuItemComponent({
      to: `${match.url}/${item.route}`,
      label: item.label,
      user: userData,
      isActive: pathname === '/settings',
    })
  ) : (
    <MenuItem
      to={`${match.url}/${item.route}`}
      key={item.id}
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
  const { match, menuItems, location, user } = props;
  return (
    <NavbarContainer>
      {menuItems.map(item =>
        renderMenuItem(item, match, location.pathname, user),
      )}
    </NavbarContainer>
  );
};

export default SettingsNavbar;
