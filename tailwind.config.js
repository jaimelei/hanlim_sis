module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kalayaan: ["Kalayaan", "sans-serif"],
        luckybones: ["Luckybones", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
        loading: "load 3s ease-out forwards",
      },
      keyframes: {
        load: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
