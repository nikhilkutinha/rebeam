const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./index.html",
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange
      }
    }
  },
  variants: {
    extend: {
      opacity: ["disabled"]
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/aspect-ratio")]
};
