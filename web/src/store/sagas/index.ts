import { all, takeLatest } from "redux-saga/effects";
import ReduxActionTypes from "../redux-action-types";
import applicationSaga from "./application-saga";
import sessionSaga from "./session-saga";

export default function* initSaga() {
  yield all([
    takeLatest(ReduxActionTypes.INIT_APP, applicationSaga),
    takeLatest(ReduxActionTypes.INIT_SESSION_SAGA, sessionSaga),
  ]);
}
