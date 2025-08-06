module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./constants.tsx",
  ],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 6s ease infinite',
      },
      utilities: {
        '.pause': {
          'animation-play-state': 'paused',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
