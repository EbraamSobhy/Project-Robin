/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px', // Custom breakpoint for very small screens
        // Mobile device specific breakpoints
        'mobile-small': '388px',  // 388x852 devices
        'mobile-large': '480px',  // 480x1028 devices
      },
    },
  },
  plugins: [],
} 