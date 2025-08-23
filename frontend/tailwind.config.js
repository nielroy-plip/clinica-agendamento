module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',
        'primary-dark': '#7C3AED',
        'primary-light': '#A78BFA'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: [],
}