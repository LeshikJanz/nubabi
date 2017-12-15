import configureMockStore from 'redux-mock-store';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

export const setupEpic = (epic) => {
  const epicMiddleware = createEpicMiddleware(epic);
  const mockStore = configureMockStore([epicMiddleware]);

  return {
    middleware: epicMiddleware,
    mockStore: mockStore,
    afterEach: () => {
      epicMiddleware.replaceEpic(epic);
    }
  }
};
