import { combineReducers } from "redux";
import AppInitialised, { AppInitilisedState } from "./app-initialised";
import SelectedReducer, { SelectedState } from "./selected-reducer";
import ThemeReducer, { ThemeState } from "./theme-reducer";
import FilterReducer, { FilterState } from "./filter-reducer";

export type UIState = {
  theme: ThemeState;
  selected: SelectedState;
  appInitialised: AppInitilisedState;
  filter: FilterState;
};

export default combineReducers({
  theme: ThemeReducer,
  selected: SelectedReducer,
  appInitialised: AppInitialised,
  filter: FilterReducer,
});
