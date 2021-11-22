import { all, put, takeEvery, takeLatest } from "redux-saga/effects";
import SessionApi from "../../api/sessions";
import { ApiResponse, PaginatedResponse } from "../../interfaces/api";
import { ReduxActionType } from "../../interfaces/redux";
import Session from "../../interfaces/session";
import {
  fetchSessionSuccess,
  fetchSessionTextLogsSuccess,
  fetchSessionDeviceLogsSuccess,
  fetchSessionDebugLogsSuccess,
} from "../actions/session-actions";
import ReduxActionTypes from "../redux-action-types";

function* fetchSessions() {
  const sessions: ApiResponse<PaginatedResponse<Session>> =
    yield SessionApi.getAllSessions();
  if (sessions.success) {
    yield put(
      fetchSessionSuccess({
        count: sessions.result.count,
        rows: sessions.result.rows,
      }),
    );
  }
}

function* fetchSession(action: ReduxActionType<string>) {
  const sessions: ApiResponse<Session> = yield SessionApi.getSessionById(
    action.payload,
  );
  if (sessions.success) {
    yield put(fetchSessionSuccess(sessions.result));
  }
}

function* fetchSessionTextLog(action: ReduxActionType<string>) {
  const logs: ApiResponse<any> = yield SessionApi.getTextLogsForSession(
    action.payload,
  );
  if (logs.success) {
    yield put(fetchSessionTextLogsSuccess(logs.result));
  }
}

function* fetchSessionDeviceLog(action: ReduxActionType<string>) {
  const logs: ApiResponse<any> = yield SessionApi.getDeviceLogsForSession(
    action.payload,
  );
  if (logs.success) {
    yield put(fetchSessionDeviceLogsSuccess(logs.result));
  }
}

function* fetchSessionDebugLog(action: ReduxActionType<string>) {
  const logs: ApiResponse<any> = yield SessionApi.getDebugLogsForSession(
    action.payload,
  );
  if (logs.success) {
    yield put(fetchSessionDebugLogsSuccess(logs.result));
  }
}

export default function* () {
  yield all([
    takeEvery(ReduxActionTypes.FETCH_SESSIONS_INIT, fetchSessions),
    takeLatest(ReduxActionTypes.FETCH_SESSION, fetchSession),
    takeLatest(ReduxActionTypes.FETCH_SESSION_TEXT_LOG, fetchSessionTextLog),
    takeLatest(
      ReduxActionTypes.FETCH_SESSION_DEVICE_LOG,
      fetchSessionDeviceLog,
    ),
    takeLatest(ReduxActionTypes.FETCH_SESSION_DEBUG_LOG, fetchSessionDebugLog),
  ]);
}
