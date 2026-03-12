import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        mist: '#f5f7fb',
        calm: '#d8e9f2',
        deep: '#5c7085'
      },
      boxShadow: {
        soft: '0 12px 30px rgba(49, 72, 94, 0.12)'
      }
    }
  },
  plugins: []
};

export default config;
