import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'east-african': {
          'green': '#1e7e34',
          'red': '#dc3545',
          'yellow': '#ffc107',
          'black': '#000000',
          'gold': '#d4af37',
          'mustard': '#8B6914',
        },
      },
    },
  },
  plugins: [],
}
export default config

