import { ListEntityType } from ".";
import { ReduxActionType } from "../../../interfaces/redux";
import createReducer from "../../../utils/createReducer";
import ReduxActionTypes from "../../redux-action-types";

export type LogsState = {
  text: ListEntityType<any>;
  device: ListEntityType<any>;
  debug: ListEntityType<any>;
};

const initialState: LogsState = {
  text: {
    count: 0,
    items: [],
    isLoading: false,
  },
  device: {
    count: 0,
    items: [],
    isLoading: false,
  },
  debug: {
    count: 0,
    items: [],
    isLoading: false,
  },
};

export default createReducer(initialState, {
  [ReduxActionTypes.FETCH_SESSION_TEXT_LOG]: (
    state: LogsState,
    action: ReduxActionType<any>,
  ) => ({
    ...state,
    text: {
      ...state.text,
      isLoading: true,
    },
  }),
  [ReduxActionTypes.FETCH_SESSION_TEXT_LOG_SUCCESS]: (
    state: LogsState,
    action: ReduxActionType<any>,
  ) => ({
    ...state,
    text: {
      count: action.payload.count,
      items: action.payload.rows,
      isLoading: false,
    },
  }),
  [ReduxActionTypes.FETCH_SESSION_DEVICE_LOG]: (
    state: LogsState,
    action: ReduxActionType<any>,
  ) => ({
    ...state,
    device: {
      ...state.text,
      isLoading: true,
    },
  }),
  [ReduxActionTypes.FETCH_SESSION_DEVICE_LOG_SUCCESS]: (
    state: LogsState,
    action: ReduxActionType<any>,
  ) => ({
    ...state,
    device: {
      count: action.payload.count,
      items: action.payload.rows,
      isLoading: false,
    },
  }),
  [ReduxActionTypes.FETCH_SESSION_DEBUG_LOG]: (
    state: LogsState,
    action: ReduxActionType<any>,
  ) => ({
    ...state,
    debug: {
      ...state.text,
      isLoading: true,
    },
  }),
  [ReduxActionTypes.FETCH_SESSION_DEBUG_LOG_SUCCESS]: (
    state: LogsState,
    action: ReduxActionType<any>,
  ) => ({
    ...state,
    debug: {
      count: action.payload.count,
      items: action.payload.rows,
      isLoading: false,
    },
  }),
});
