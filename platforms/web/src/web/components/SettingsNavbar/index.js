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
  user?: Object,
};

const renderMenuItem = (item, match, pathname, userData) =>
  item.menuItemComponent ? (
    item.menuItemComponent({
      to: `${match.url}/${item.route}`,
      label: item.label,
      itemId: item.id,
      user: userData,
      isactive: pathname === '/settings' ? 1 : 0,
    })
  ) : (
    <MenuItem
      to={`${match.url}/${item.route}`}
      key={item.id}
      isactive={pathname === `${match.url}/${item.route}` ? 1 : 0}
    >
      {item.iconName ? (
        <IconBox>
          <Icon
            name={item.iconName}
            isactive={pathname === `${match.url}/${item.route}` ? 1 : 0}
          />
        </IconBox>
      ) : null}

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
