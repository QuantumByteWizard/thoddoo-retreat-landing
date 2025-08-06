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
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        gradient: 'gradient 6s ease infinite',
        scroll: 'scroll 60s linear infinite',
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
