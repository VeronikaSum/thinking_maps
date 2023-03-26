/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "thinking-map-bg": "url('../img/bubble-map.png')",
      },
    },
  },
  plugins: [require("daisyui")],
};
