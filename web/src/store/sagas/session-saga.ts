import { all, put, takeEvery } from "redux-saga/effects";
import SessionApi from "../../api/sessions";
import { ApiResponse, PaginatedResponse } from "../../interfaces/api";
import { ReduxActionType } from "../../interfaces/redux";
import Session from "../../interfaces/session";
import { fetchSessionSuccess } from "../actions/session-actions";
import ReduxActionTypes from "../redux-action-types";

function* fetchSessions(action: ReduxActionType<null>) {
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

export default function* () {
  yield all([takeEvery(ReduxActionTypes.FETCH_SESSION_INIT, fetchSessions)]);
}
