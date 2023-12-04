/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          500: "#121522",
          900: "#03093F"
        },
      },
    },
  },
  plugins: [],
};
