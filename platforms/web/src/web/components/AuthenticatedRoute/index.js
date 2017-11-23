// @flow
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  component: React.Element<*>,
  props: {
    isAuthenticated: boolean,
  },
  location: {
    pathname: string,
    search: string,
  }
};

export const AuthenticatedRoute = ({ component: C, props: cProps, ...rest }: Props) => (
  <Route
    {...rest}
    render={props =>
      cProps.isAuthenticated ? (
        <C {...props} {...cProps} />
      ) : (
        <Redirect
          to={`/login?redirect=${props.location.pathname}${
            props.location.search
          }`}
        />
      )
    }
  />
);

export default AuthenticatedRoute;
