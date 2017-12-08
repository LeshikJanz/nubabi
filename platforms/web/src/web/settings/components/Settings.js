// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import SettingsNavbar from 'web/components/SettingsNavbar';
import Subscriptions from 'web/components/Subscriptions';
import Notifications from 'web/components/Notifications';
import FamilyFriends from 'web/components/FamilyFriends';
import UnitPreferences from 'web/components/UnitPreferences';
import ProfileDetails from 'web/components/ProfileDetails';
import SettingsRightSidebar from 'web/components/SettingsRightSidebar';
import { Router, Route } from 'react-router-dom';
import { MenuProfileDetails } from 'web/elements';
import Avatar from 'core/images/avatar.png';

type Props = {
  match: any,
  history: any,
  location: {
    pathname: string,
  },
};

const menuItems = [
  {
    route: '',
    label: 'My Profile Details',
    component: ProfileDetails,
    menuItemComponent: MenuProfileDetails,
    avatar: Avatar,
  },
  {
    route: 'subscriptions',
    label: 'My subscription',
    component: Subscriptions,
    iconName: 'stoller',
  },
  {
    route: 'notifications',
    label: 'Notifications',
    component: Notifications,
    iconName: 'notifications',
  },
  {
    route: 'familyfriends',
    label: 'Family & Friends',
    component: FamilyFriends,
    iconName: 'person',
  },
  {
    route: 'unitpreferences',
    label: 'Unit Preferences',
    component: UnitPreferences,
    iconName: 'gear',
  },
];

const SettingsContainer = styled(Flex)`
  width: 100%;
  max-width: 1166px;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
  font-family: sans-serif;
`;

const SettingsPages = styled(Flex)`
  background-color: ${props => props.theme.colors.white};
  flex-grow: 2;
  max-width: 600px;
  box-shadow: 0px 0px 5px -1px ${props => props.theme.colors.gray};
`;

class Settings extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  renderSettingsInnerPage = (page, i, match) => {
    return page.route ? (
      <Route
        path={`${match.url}/${page.route}`}
        component={page.component}
        key={i}
      />
    ) : (
      <Route exact path="/settings" component={page.component} key={i} />
    );
  };

  render() {
    const { match, history, location } = this.props;
    return (
      <Router history={history}>
        <SettingsContainer>
          <SettingsNavbar
            match={match}
            menuItems={menuItems}
            location={location}
          />
          <SettingsPages>
            {menuItems.map((page, i) =>
              this.renderSettingsInnerPage(page, i, match),
            )}
          </SettingsPages>
          <SettingsRightSidebar />
        </SettingsContainer>
      </Router>
    );
  }
}

export default Settings;
