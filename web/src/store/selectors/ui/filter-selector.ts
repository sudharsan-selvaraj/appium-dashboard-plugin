import { AppState } from "../..";

export const getSessionFilterCount = (state: AppState): number => {
  return Object.values(state.ui.filter.session).filter((d) => !!d).length;
};

export const getSessionFilters = (state: AppState) => state.ui.filter.session;
