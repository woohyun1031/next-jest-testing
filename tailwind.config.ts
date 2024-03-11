import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        brand: '1232px',
      },
      colors: {
        arrow: '#ccc',
        page: '#999',
        brand: '#4D74D0',
        label: '#4D74D0',
        icon_text: '#7d7e80',
        filter: {
          50: '#efeff0',
          100: '#e0e0e0',
          200: '#d0d1d1',
          300: '#c1c2c2',
          400: '#b2b3b4',
          500: '#a4a4a5',
          600: '#959697',
          700: '#878889',
          800: '#797a7c',
          900: '#6b6c6e',
          950: '#5e5f61',
        },
        css_gray: 'rgb(128,128,128)',
      },
      lineHeight: {
        card: '1.6',
      },
      maxWidth: {
        container: '1280px',
      },
      backgroundColor: {
        body: 'rgb(240, 241, 243);',
        search: 'rgb(255, 255, 255)',
        filter_header: 'rgb(249, 250, 252)',
      },
      borderColor: {
        brand: '#4D74D0',
        search: 'rgb(201, 202, 204)',
        filter: 'rgb(225, 226, 228)',
      },
      width: {
        brand_card: 'calc(25% - 12px)',
        md_card: 'calc(33.33333% - 12px)',
        sm_card: 'calc(50% - 12px)',
      },
      height: {
        card: '338px',
      },
    },
  },
  plugins: [],
};
export default config;
