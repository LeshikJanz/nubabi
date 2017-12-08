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
    route: '',
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
  flex-direction: row;
  justify-content: space-between;
`;

const SettingsPages = styled(Flex)``;

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
    const { match, history } = this.props;
    return (
      <Router history={history}>
        <SettingsContainer>
          <SettingsNavbar match={match} menuItems={menuItems} />
          <SettingsPages>
            {menuItems.map((page, i) =>
              this.renderSettingsInnerPage(page, i, match),
            )}
          </SettingsPages>
        </SettingsContainer>
      </Router>
    );
  }
}

export default Settings;
