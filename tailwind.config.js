/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-pattern': "url('../src/assets/images/background.jpg')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

