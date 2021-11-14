import { combineReducers } from "@reduxjs/toolkit";
import SessionsReducer, { SessionEntityType } from "./sessions-reducer";

export type ListEntityType<T> = {
  count: number;
  items: Array<T>;
  isLoading: boolean;
};

export type EntitiesState = {
  sessions: SessionEntityType;
};

export default combineReducers({
  sessions: SessionsReducer,
});
