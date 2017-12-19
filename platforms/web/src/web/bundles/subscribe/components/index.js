// @flow
import React, { PureComponent } from 'react';
import { SubscribeContainer, SubscribePages } from '../styled';
import { Router, Route } from 'react-router-dom';
import { SUBSCRIBE_ROUTES, CURRENT_PLAN } from 'web/constants';
import { SettingsNavbar, SubscribeRightSidebar } from 'web/components';

type Props = {
  match: any,
  history: any,
  location: {
    pathname: string,
  },
};

class Subscribe extends PureComponent<Props> {
  renderSubscribePage = (page, match) => {
    return (
      <Route
        path={`${match.url}/${page.route}`}
        render={() => page.component(this.props)}
        key={page.id}
      />
    );
  };

  render() {
    const { match, history, location } = this.props;
    return (
      <Router history={history}>
        <SubscribeContainer>
          <SettingsNavbar
            match={match}
            menuItems={SUBSCRIBE_ROUTES}
            location={location}
          />

          <SubscribePages>
            {SUBSCRIBE_ROUTES.map(page =>
              this.renderSubscribePage(page, match),
            )}
          </SubscribePages>
          <SubscribeRightSidebar plan={CURRENT_PLAN} />
        </SubscribeContainer>
      </Router>
    );
  }
}

export default Subscribe;
