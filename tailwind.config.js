import flowbite from "flowbite-react/tailwind";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin(),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
}
      })
    }),
  ],
};
