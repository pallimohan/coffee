/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          100: "#f5f5f5",
          700: "#5a3e36",
          800: "#4b2e2e",
          900: "#3a1f1f"
        }
      }
    },
  },
  plugins: [],
}
