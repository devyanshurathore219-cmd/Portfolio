/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        bgDark: '#07080a',
        textPrimary: '#f4f4f5',
        textSecondary: '#a1a1aa',
        textTertiary: '#71717a',
        accent: '#a3d4b6',
      }
    },
  },
  plugins: [],
}
