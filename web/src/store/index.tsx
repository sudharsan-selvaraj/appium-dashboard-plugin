import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import initSaga from "./sagas";
import rootReducer from "./reducers/root-reducer";
import { EntitiesState } from "./reducers/entities";

const sagaMiddleware = createSagaMiddleware();
export default createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(initSaga);

export type AppState = {
  entities: EntitiesState;
};
