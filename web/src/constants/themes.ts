export type themeConfig = {
  colors: Record<string, string>;
};

const LightTheme: themeConfig = {
  colors: {
    primary: "#1c87e5",
    secondary: "#69b6ff",
    tertiary: "#005bb2",
    border: "#BDBDBD",
    font: "rgba(33,33,33,.7)",
  },
};

export default {
  light: LightTheme,
};

export const DEFAULT_THEME = "light";
