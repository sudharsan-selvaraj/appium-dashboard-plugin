import { combineReducers } from "redux";
import SelectedReducer, { SelectedState } from "./selected-reducer";
import ThemeReducer, { ThemeState } from "./theme-reducer";

export type UIState = {
  theme: ThemeState;
  selected: SelectedState;
};

export default combineReducers({
  theme: ThemeReducer,
  selected: SelectedReducer,
});
