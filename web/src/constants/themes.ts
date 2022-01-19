type Color = string;

type ColorScale = [string, string, string, string, string, string, string];

export type ThemeConfig = {
  colors: Record<string, Color | ColorScale | Record<string, Color>>;
  fonts: Record<string, any>;
  borderRadius: Record<string, any>;
};

const LightTheme: ThemeConfig = {
  colors: {
    primary: "#102027",
    secondary: "#37474f",
    tertiary: "#62727b",
    border: "#BDBDBD",
    font: "rgba(33,33,33,.7)",
    success: "#0F720B",
    error: "#AE2727",
    warning: "#EED202",
    tab_active_header: "#0070F0",
    greyscale: [
      "#000000",
      "#333333",
      "#666666",
      "#999999",
      "#CCCCCC",
      "#EEEEEE",
      "#FFFFFF",
    ],
    controls: {
      background: "#fff",
    },
    components: {
      session_card_running_status: "#1271EE",
      session_card_active_bg: "#ABD2ED",
      session_card_default_bg: "#f0f4f7",

      log_entry_hover: "#fffdea",
    },
  },
  fonts: {
    size: {
      M: "10px",
      L: "12px",
      XL: "14px",
      XXL: "16px",
    },
    weight: {
      M: "200",
      L: "400",
      XL: "500",
      XXL: "700",
    },
  },
  borderRadius: {
    M: "3px",
    L: "6px",
    XL: "12px",
    XXL: "24px",
  },
};

export default {
  light: LightTheme,
};

export const DEFAULT_THEME = "light";
