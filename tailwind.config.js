/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#2F3645",
        light: "#ffffff",
        primary: "#987070",
        secondary: "#DBB5B5",
        background: "#EEEDEB",
      },
    },
  },
  plugins: [],
};
