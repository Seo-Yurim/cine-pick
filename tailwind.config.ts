import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx,scss}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard Variable", "sans-serif"],
      },
      colors: {
        white: "hsl(var(--white))",
        black: "hsl(var(--black))",
        gray: {
          100: "hsl(var(--gray-100))",
          700: "hsl(var(--gray-700))",
          800: "hsl(var(--gray-800))",
        },
        red: "hsl(var(--red-100))",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "text-bg": "hsl(var(--text-bg))",
        "header-bg": "hsl(var(--header-bg))",
        "point-color": "hsl(var(--point-color))",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
