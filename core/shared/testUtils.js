/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import firebaseMock from 'firebase-mock';

export const setupEpic = epic => {
  const epicMiddleware = createEpicMiddleware(epic);
  const mockStore = configureMockStore([epicMiddleware]);

  return {
    middleware: epicMiddleware,
    mockStore,
    afterEach: () => {
      epicMiddleware.replaceEpic(epic);
    },
  };
};

export const mockFirebase = () => {
  const mockDb = new firebaseMock.MockFirebase();
  const mockAuth = new firebaseMock.MockFirebase();
  const mockSdk = firebaseMock.MockFirebaseSdk(
    path => {
      return path ? mockDb.child(path) : mockDb;
    },
    () => {
      return mockAuth;
    },
  );

  return mockSdk;
};
