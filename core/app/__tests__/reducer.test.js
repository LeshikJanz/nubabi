import reducer, { initialState } from '../reducer';
import { appError, appInfo, appOnline, appStarted, appSuccess } from '../actions';

describe('app reducer', () => {
  it('has an initial state', () => {
    expect(reducer(undefined, { type: '@@INIT'})).toMatchSnapshot();
  });

  it('maps all actions ending with FAILURE to APP_ERROR', () => {
    expect(reducer(initialState, { type: 'SOME_FAILURE', payload: new Error('some')}))
      .toMatchSnapshot();
  });

  it('handles APP_ERROR', () => {
    expect(reducer(initialState, appError(new Error('bar')))).toMatchSnapshot();
  });

  it('handles APP_ONLINE', () => {
    expect(reducer(initialState, appOnline(true))).toMatchSnapshot();
  });

  it('handles APP_STARTED', () => {
    expect(reducer(initialState, appStarted())).toMatchSnapshot();
  });

  it('handles APP_SUCCESS', () => {
    expect(reducer(initialState, appSuccess('success!'))).toMatchSnapshot();
  });

  it('handles APP_INFO', () => {
    expect(reducer(initialState, appInfo('info'))).toMatchSnapshot();
  });
});
