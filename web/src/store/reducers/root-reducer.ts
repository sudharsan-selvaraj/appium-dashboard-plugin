import { combineReducers } from "@reduxjs/toolkit";
import EntitiesReducer from "./entities";

export default combineReducers({
  entities: EntitiesReducer,
});
