/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "electric-cyan": "#00F5FF",
        "neon-petri": "#39FF14",
        "pale-mint": "#CCFBF1",
        "cool-gray": "#D1D5DB",
      }
    }
  },
  plugins: []
};
