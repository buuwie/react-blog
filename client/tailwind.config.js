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
      'lora': ['Lora'],
      'philosopher': ['Philosopher'],
    },
    colors: {
      buttextdark: '#05f7ff',
      buttextlight: '#009fcb',
      kechuyentextlight: '#cccccc',
      default: '#374151',
      signupsignin: '#F6F6F6',
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
  ],
}

