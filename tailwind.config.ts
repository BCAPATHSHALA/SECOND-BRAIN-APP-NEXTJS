import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        seasalt: "#F8FAFC",
        mediumslateblue: "#726DD1",
        secondary: "#E1E7FE",
        primary: "#4F44E5",
        oxfordblue: "#171B2D",
        battleshipgray: "#888D93",
      },
      fontFamily: {
        PaytoneOne: ["Paytone One", "sans-serif"],
        RobotoSerifVar: ["Roboto Serif Variable", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
