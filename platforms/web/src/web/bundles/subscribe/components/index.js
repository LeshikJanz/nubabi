// @flow
import React, { PureComponent } from 'react';
import { SubscribeContainer, SubscribePages } from '../styled';
import { Router, Route } from 'react-router-dom';
import {
  SUBSCRIBE_ROUTES,
  CURRENT_PLAN,
  SUBSCRIBE_ROUTES_MONTH,
  MONTH_PLAN,
} from 'web/constants';
import { SettingsNavbar, SubscribeRightSidebar } from 'web/components';

type Props = {
  match: any,
  history: any,
  location: {
    pathname: string,
  },
};

class Subscribe extends PureComponent<Props> {
  constructor() {
    super();

    this.state = {
      month_subscription: false,
    };
  }

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
            menuItems={
              this.state.month_subscription
                ? SUBSCRIBE_ROUTES_MONTH
                : SUBSCRIBE_ROUTES
            }
            location={location}
          />

          {this.state.month_subscription ? (
            <SubscribePages>
              {this.renderSubscribePage(SUBSCRIBE_ROUTES_MONTH[0], match)}
            </SubscribePages>
          ) : (
            <SubscribePages>
              {SUBSCRIBE_ROUTES.map(page =>
                this.renderSubscribePage(page, match),
              )}
            </SubscribePages>
          )}
          <SubscribeRightSidebar
            plan={this.state.month_subscription ? MONTH_PLAN : CURRENT_PLAN}
            monthSubscription={this.state.month_subscription}
          />
        </SubscribeContainer>
      </Router>
    );
  }
}

export default Subscribe;
