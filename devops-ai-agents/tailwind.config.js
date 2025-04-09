/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        msBlue: {
          100: "#E6F2FF",
          200: "#CCE5FF",
          300: "#99CBFF",
          400: "#66B0FF",
          500: "#3396FF",
          600: "#0078D4", // Microsoft blue
          700: "#005A9E",
          800: "#004578",
          900: "#002F52",
        },
        msGray: {
          100: "#F5F5F5",
          200: "#E6E6E6",
          300: "#CCCCCC",
          400: "#B3B3B3",
          500: "#999999",
          600: "#737373",
          700: "#666666",
          800: "#4D4D4D",
          900: "#333333",
        },
      },
      fontFamily: {
        'segoe': ['"Segoe UI"', 'sans-serif'],
      },
      backgroundImage: {
        'ms-gradient': 'linear-gradient(to right, #0078D4, #50e6ff)',
        'ms-gradient-dark': 'linear-gradient(to right, #005A9E, #0078D4)',
      },
    },
  },
  plugins: [],
}
