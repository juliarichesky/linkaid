/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "480px" },
        sm: { min: "481px", max: "767px" },
        md: { min: "768px", max: "991px" },
        lg: { min: "992px", max: "1299px" },
        xl: "1300px",
      },
    },
  },
  plugins: [],
};
