import configureMockStore from 'redux-mock-store';
import { configureApollo, authTokenMiddleware, configureApolloAuth } from '../configureApollo';
import { ApolloClient } from 'apollo-client';

const result = configureApollo();
const makeStore = configureMockStore([]);

describe('configureApollo', () => {
  it('returns an ApolloClient instance', () => {
    expect(result).toBeInstanceOf(ApolloClient);
  });

  it('memoizes the result', () => {
    expect(configureApollo()).toBe(result);
  });
});

describe('authTokenMiddleware', () => {
  const request = { options: {} };
  const next = jest.fn();

  it('appends an authorization token to every request', () => {
    const middleware = authTokenMiddleware(makeStore({
      auth: { token: 'SOME_TOKEN'}
    }));
    middleware.applyMiddleware(request, next);
    expect(request.options.headers.authorization).toEqual('Bearer SOME_TOKEN');
    expect(next).toHaveBeenCalled();


  });

  it('adds null if the user is not logged in', () => {
    const middleware = authTokenMiddleware(makeStore({
      auth: {
        token: null,
      }
    }));

    middleware.applyMiddleware(request, next);
    expect(request.options.headers.authorization).toBe(null);
    expect(next).toHaveBeenCalled();
  });
});

describe('configureApolloAuth', () => {
  it('uses the authTokenMiddleware', () => {
    configureApolloAuth(makeStore({
      auth: {
        token: 'SOME'
      }
    }));

    expect(result.networkInterface._middlewares.length).toEqual(1);
  });
});
