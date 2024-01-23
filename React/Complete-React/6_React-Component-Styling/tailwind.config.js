/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title:['"Pacifico"', 'cursive']//"Pacifico"는 구글 폰트에서 받아온 이름.
      }
    },
  },
  plugins: [],
};

