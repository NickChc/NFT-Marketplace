import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "custom-white": "#e8e8e8",
        add: "#663399",
        "add-2": "#111827",
      },
      textColor: {
        "custom-white": "#e8e8e8",
        add: "#663399",
        "add-2": "#111827",
      },
      borderColor: {
        add: "#663399",
        "add-2": "#111827",
      },
      fontFamily: {
        monoton: ["var(--font-monoton)"],
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(100px, 1fr))",
        fill: "repeat(auto-fill, minmax(100px, 1fr))",
      },
    },
    screens: {
      xs: "340px",
      ...defaultTheme.screens,
    },
  },

  plugins: [],
};
export default config;
