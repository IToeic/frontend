/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      padding: {
        5.5: "1.425rem", // px-5.5 (22px)
      },
    },
  },
  plugins: [],
};
