/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: "#B7B3B3",
        sidebarButton: "#D9D9D9",
        sidebarLine: "#877D7D",
        sidebarTitleButton: "#CAC7C7",
        homeInputColor: "#F6F5F5",
        trashCan: "🗑️",
      },
    },
  },
  plugins: [],
};

