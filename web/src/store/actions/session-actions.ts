import { PaginatedResponse } from "../../interfaces/api";
import Session from "../../interfaces/session";
import { ListEntityType } from "../reducers/entities";
import ReduxActionTypes from "../redux-action-types";

export const fetchSessionSuccess = (payload: PaginatedResponse<Session>) => ({
  type: ReduxActionTypes.FETCH_SESSION_SUCCESS,
  payload,
});

export const setSelectedSession = (payload: Session) => ({
  type: ReduxActionTypes.SELECT_SESSION,
  payload,
});
