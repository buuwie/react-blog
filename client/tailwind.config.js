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
      'courier': ['Courier New'],
      'poetsen-one': ['Poetsen One'],
      'poppins': ['Poppins'],
      'moon-dance': ['Moon Dance'],
      'merriweather': ['Merriweather'],
      'bellota': ['Bellota'],
      'comic': ['Comic Sans MS'],
      'square-peg': ['Square Peg'],
    },
    colors: {
      buttextdark: '#05f7ff',
      buttextlight: '#009fcb',
      kechuyentextlight: '#cccccc',
      default: '#374151',
      signupsignin: '#F6F6F6',
      quilltool: '#434341',
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
  ],
}

