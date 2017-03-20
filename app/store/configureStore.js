import { createStore, applyMiddleware, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import { persistStore, autoRehydrate } from 'redux-persist';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      autoRehydrate(),
    ),
  );
  sagaMiddleware.run(sagas);
  persistStore(store, { storage: AsyncStorage });
  return store;
}
