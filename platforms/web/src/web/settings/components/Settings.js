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
import { Router, Route } from 'react-router-dom';
import { MenuProfileDetails } from 'web/elements';

type Props = {
  match: any,
  history: any,
};

const menuItems = [
  {
    route: 'profiledetails',
    label: 'My Profile Details',
    component: ProfileDetails,
    menuItemComponent: MenuProfileDetails,
  },
  {
    route: 'subscriptions',
    label: 'My subscription',
    component: Subscriptions,
  },
  {
    route: 'notifications',
    label: 'Notifications',
    component: Notifications,
  },
  {
    route: 'familyfriends',
    label: 'Family & Friends',
    component: FamilyFriends,
  },
  {
    route: 'unitpreferences',
    label: 'Unit Preferences',
    component: UnitPreferences,
  },
];

const SettingsContainer = styled(Flex)`
  width: 100%;
  max-width: 1166px;
  background-color: red;
`;

const SettingsPages = styled(Flex)``;

class Settings extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  renderSettingsInnerPage = (page, i, match) => {
    return (
      <Route
        path={`${match.url}/${page.route}`}
        component={page.component}
        key={i}
      />
    );
  };

  render() {
    return (
      <Router history={this.props.history}>
        <SettingsContainer>
          <SettingsNavbar match={this.props.match} menuItems={menuItems} />

          <SettingsPages>
            {menuItems.map((page, i) =>
              this.renderSettingsInnerPage(page, i, this.props.match),
            )}
          </SettingsPages>
        </SettingsContainer>
      </Router>
    );
  }
}

export default Settings;
