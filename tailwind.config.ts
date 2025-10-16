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
      animation: {
        slide: "slide 1.5s ease-in-out infinite",
        "slide-down": "slideDown 0.5s ease-out",
        "custom-pulse": "custom-pulse 1s ease-in-out infinite",
      },
      keyframes: {
        slide: {
          "0%": { left: "-33%" },
          "50%": { left: "100%" },
          "100%": { left: "100%" },
        },
        slideDown: {
          "0%": {
            opacity: "0",
            transform: "translateX(-50%) translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(-50%) translateY(0)",
          },
        },
        "custom-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;

export default config;
