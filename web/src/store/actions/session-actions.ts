import { PaginatedResponse } from "../../interfaces/api";
import { ReduxActionType } from "../../interfaces/redux";
import Session from "../../interfaces/session";
import { ListEntityType } from "../reducers/entities";
import ReduxActionTypes from "../redux-action-types";

export const fetchSessionsSuccess = (payload: PaginatedResponse<Session>) => ({
  type: ReduxActionTypes.FETCH_SESSIONS_SUCCESS,
  payload,
});

export const fetchSessionSuccess = (payload: Session) => ({
  type: ReduxActionTypes.FETCH_SESSION_SUCCESS,
  payload,
});

export const setSelectedSession = (payload: Session) => ({
  type: ReduxActionTypes.SELECT_SESSION,
  payload,
});

export const fetchSessionTextLogs = (
  payload: string,
): ReduxActionType<string> => ({
  type: ReduxActionTypes.FETCH_SESSION_TEXT_LOG,
  payload,
});

export const fetchSessionTextLogsSuccess = (payload: any) => ({
  type: ReduxActionTypes.FETCH_SESSION_TEXT_LOG_SUCCESS,
  payload,
});

export const fetchSessionDeviceLogs = (payload: any) => ({
  type: ReduxActionTypes.FETCH_SESSION_DEVICE_LOG,
  payload,
});

export const fetchSessionDeviceLogsSuccess = (payload: any) => ({
  type: ReduxActionTypes.FETCH_SESSION_DEVICE_LOG_SUCCESS,
  payload,
});

export const fetchSessionDebugLogs = (payload: any) => ({
  type: ReduxActionTypes.FETCH_SESSION_DEBUG_LOG,
  payload,
});

export const fetchSessionDebugLogsSuccess = (payload: any) => ({
  type: ReduxActionTypes.FETCH_SESSION_DEBUG_LOG_SUCCESS,
  payload,
});

export const setSessionFilter = (payload: any) => ({
  type: ReduxActionTypes.SET_SESSION_FILTER,
  payload,
});

export const deleteSession = (payload: string) => ({
  type: ReduxActionTypes.DELETE_SESSION,
  payload,
});
