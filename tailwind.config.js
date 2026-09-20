/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      // Used as w-13 / h-13 (pillar icons) and mb-4.5 (footer headings); missing from Tailwind's default scale.
      spacing: {
        4.5: '1.125rem',
        13: '3.25rem',
      },
    },
  },
  plugins: [],
}
