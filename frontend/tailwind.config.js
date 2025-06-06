/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        button: {
          white: 'var(--color-button-white)',
          orange: 'var(--color-button-orange)',
        },
        title: 'var(--color-title)', // タイトル用 茶色
        text: 'var(--color-text)', // テキスト用 灰黒色
        background: 'var(--color-background)', // 背景用ホワイト
      },
      fontFamily: {
        // 日本語対応フォント
        sans: ['"Yu Gothic Medium"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};