import { injectMiddleware } from '../configureMiddleware';

const create = () => {
  const dep = jest.fn();
  const deps = {
    someDependency: dep,
  };

  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };

  const next = jest.fn();
  const invoke = action => injectMiddleware(deps)(store)(next)(action);

  return { store, next, invoke, dep };
};

describe('injectMiddleware', () => {
  it('passes through non-function actions', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('calls the function', () => {
    const { invoke } = create();
    const fn = jest.fn();
    invoke(fn);
    expect(fn).toHaveBeenCalled();
  });

  it('injects dependencies, getState and dispatch', () => {
    const { store, invoke, dep } = create();
    const fn = jest.fn(({ dispatch, getState, someDependency }) => {
      dispatch('TEST');
      getState();
      someDependency();
    });

    invoke(fn);
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.getState).toHaveBeenCalled();
    expect(dep).toHaveBeenCalled();
  });
});
