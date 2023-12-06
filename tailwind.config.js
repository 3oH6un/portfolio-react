/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      width: {
        // 80 : 20
        // 96 :
        88: "22rem",
        128: "32rem",
        192: "64rem",
        220: "55rem",
      },
      minHeight: {
        16: "4rem",

        224: "56rem",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dark", "light", "black", "dracula"],
  },
};
