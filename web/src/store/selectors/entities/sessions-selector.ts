import { AppState } from "../..";

export const getSessions = (state: AppState) => state.entities.sessions.items;

export const getSelectedSession = (state: AppState) => state.ui.selected.session;
