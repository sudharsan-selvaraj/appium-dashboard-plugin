import { AppState } from "../..";
import { ReduxActionType } from "../../../interfaces/redux";
import createReducer from "../../../utils/createReducer";
import ReduxActionTypes from "../../redux-action-types";

export type LoadersState = {
  delete: {
    isPending: boolean;
    response: Record<string, string> | null;
  };
  state: {
    isPending: boolean;
    response: Record<string, string> | null;
  };
};

const initialState: LoadersState = {
  delete: {
    isPending: false,
    response: null,
  },
  state: {
    isPending: false,
    response: null,
  },
};

export default createReducer(initialState, {
  [ReduxActionTypes.DELETE_SESSION]: (state: AppState) => ({
    ...state,
    delete: {
      isPending: true,
    },
  }),
  [ReduxActionTypes.SESSION_DELETE_FINISH]: (
    state: AppState,
    action: ReduxActionType<Record<string, string>>,
  ) => ({
    ...state,
    delete: {
      isPending: false,
      response: action.payload,
    },
  }),
  [ReduxActionTypes.PAUSE_SESSION]: (state: AppState) => ({
    ...state,
    state: {
      isPending: true,
    },
  }),
  [ReduxActionTypes.RESUME_SESSION]: (state: AppState) => ({
    ...state,
    state: {
      isPending: true,
    },
  }),
  [ReduxActionTypes.SESSION_STATE_CHANGE_FINISH]: (
    state: AppState,
    action: ReduxActionType<Record<string, string>>,
  ) => ({
    ...state,
    state: {
      isPending: false,
      response: action.payload,
    },
  }),
});
