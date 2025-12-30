/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F9F7F2",
        beige: "#F0EBE3",
        "soft-blue": "#D4E2E7",
        "sage-green": "#C9D6C5",
        "brand-purple": "#7F00FF",
        "dark-text": "#2C3E50",
        frosty: "#F9F9F9",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
