import { ListEntityType } from ".";
import createReducer from "../../../utils/createReducer";

export type LogsState = {
  text: ListEntityType<any>;
  device: ListEntityType<any>;
  debug: ListEntityType<any>
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

});
