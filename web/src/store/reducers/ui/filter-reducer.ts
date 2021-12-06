import { ReduxActionType } from "../../../interfaces/redux";
import createReducer from "../../../utils/createReducer";
import ReduxActionTypes from "../../redux-action-types";

export type FilterState = {
  session: Record<string, string>;
};

const InitialState: FilterState = {
  session: {},
};

export default createReducer(InitialState, {
  [ReduxActionTypes.SET_SESSION_FILTER]: (
    state: FilterState,
    action: ReduxActionType<Record<string, string>>,
  ) => ({
    ...state,
    session: action.payload,
  }),
});
