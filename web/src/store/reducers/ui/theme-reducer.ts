import createReducer from "../../../utils/createReducer";
import themes, { themeConfig, DEFAULT_THEME } from "../../../constants/themes";

export type ThemeState = {
  name: string;
  config: themeConfig;
};

const initialState: ThemeState = {
  name: DEFAULT_THEME,
  config: themes[DEFAULT_THEME],
};

export default createReducer(initialState, {});
