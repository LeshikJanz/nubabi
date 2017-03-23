import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

export const sagaMiddleware = createSagaMiddleware();

export default () => sagaMiddleware.run(sagas);
