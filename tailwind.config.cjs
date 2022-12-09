module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        '80px': '80px',
      },
      backgroundImage: {
        wave: "url('/src/assets/stacked-waves-haikei.svg')",
        'wave-dark': "url('/src/assets/stacked-waves-dark-haikei.svg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-scoped-groups')({
      groups: ['one', 'two'],
    }),
  ],
};
