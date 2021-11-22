import { ReduxActionType } from "../../../interfaces/redux";
import createReducer from "../../../utils/createReducer";
import ReduxActionTypes from "../../redux-action-types";

export type AppInitilisedState = boolean;

const InitialState = false;

export default createReducer(InitialState, {
  [ReduxActionTypes.INIT_APP]: () => true,
});
