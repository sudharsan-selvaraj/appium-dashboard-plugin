import { all, takeEvery } from "redux-saga/effects";
import ReduxActionTypes from "../redux-action-types";
import applicationSaga from "./application-saga";

export default function* initSaga() {
  yield all([takeEvery(ReduxActionTypes.INIT_APP, applicationSaga)]);
}
