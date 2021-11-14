import { ListEntityType } from ".";
import { AppState } from "../..";
import createReducer from "../../../utils/createReducer";
import ReduxActionTypes from "../../redux-action-types";

export type SessionEntityType = ListEntityType<any>;

const initialState: SessionEntityType = {
  count: 0,
  items: [],
  isLoading: false,
};

export default createReducer(initialState, {
  [ReduxActionTypes.FETCH_SESSION_SUCCESS]: (state: AppState) => state,
});
