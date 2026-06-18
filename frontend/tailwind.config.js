/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B1120',
        panel: '#1E293B',
        accent: '#38BDF8',
        accepted: '#22C55E',
        rejected: '#EF4444',
        warning: '#EAB308'
      }
    },
  },
  plugins: [],
}
