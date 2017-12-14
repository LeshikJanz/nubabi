/* eslint-disable react/display-name */
// @flow
import React, { PureComponent } from 'react';
import SettingsNavbar from 'web/components/SettingsNavbar';
import Subscriptions from 'web/components/Subscriptions';
import Notifications from 'web/components/Notifications';
import FamilyFriends from 'web/components/FamilyFriends';
import UnitPreferences from 'web/components/UnitPreferences';
import ProfileDetails from 'web/components/ProfileDetails';
import SettingsRightSidebar from 'web/components/SettingsRightSidebar';
import { SettingsContainer, SettingsPages } from '../styled';
import { Router, Route } from 'react-router-dom';
import { MenuProfileDetails } from 'web/elements';

type Props = {
  match: any,
  history: any,
  location: {
    pathname: string,
  },
  user: any,
};

const menuItems = [
  {
    route: '/settings',
    label: 'My Profile Details',
    component: props => <ProfileDetails {...props} />,
    menuItemComponent: MenuProfileDetails,
    id: 'settings',
  },
  {
    route: 'subscriptions',
    label: 'My subscription',
    component: props => <Subscriptions {...props} />,
    iconName: 'stoller',
    id: 'subscriptions',
  },
  {
    route: 'notifications',
    label: 'Notifications',
    component: props => <Notifications {...props} />,
    iconName: 'notifications',
    id: 'notifications',
  },
  {
    route: 'familyfriends',
    label: 'Family & Friends',
    component: props => <FamilyFriends {...props} />,
    iconName: 'person',
    id: 'familyfriends',
  },
  {
    route: 'unitpreferences',
    label: 'Unit Preferences',
    component: props => <UnitPreferences {...props} />,
    iconName: 'gear',
    id: 'unitpreferences',
  },
];

class Settings extends PureComponent<Props> {
  renderSettingsInnerPage = (page, match) =>
    page.route === '/settings' ? (
      <Route
        exact
        path="/settings"
        render={() => page.component(this.props)}
        key={page.id}
      />
    ) : (
      <Route
        path={`${match.url}/${page.route}`}
        render={() => page.component(this.props)}
        key={page.id}
      />
    );

  render() {
    const { match, history, location } = this.props;
    return (
      <Router history={history}>
        <SettingsContainer>
          <SettingsNavbar
            match={match}
            menuItems={menuItems}
            location={location}
            user={this.props.user}
          />
          <SettingsPages>
            {menuItems.map(page => this.renderSettingsInnerPage(page, match))}
          </SettingsPages>
          <SettingsRightSidebar />
        </SettingsContainer>
      </Router>
    );
  }
}

export default Settings;
