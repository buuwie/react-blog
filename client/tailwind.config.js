const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
    fontFamily: {
      'lobster': ['Lobster'],
    },
    colors: {
      buttextdark: '#05f7ff',
      buttextlight: '#009fcb',
      kechuyentextlight: '#cccccc',
      default: '#374151',
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

