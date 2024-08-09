/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      llg: '1200px',
      xl: '1440px',
      xxl: '1768px',
    },
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
    }
  },
  plugins: [],
}