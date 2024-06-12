/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        jomolhari: ["Jomolhari", "serif"],
      },
      colors: {
        blue1: "#C0D6E8",
        blue2: "#6895D2",
      },
    },
  },
  plugins: [],
};
