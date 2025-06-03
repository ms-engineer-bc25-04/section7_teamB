// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Next.jsでよく使うパス
  ],
  theme: {
    extend: {
      colors: {
        // デザイン要件に合わせたカスタムカラー
        primary: '#393E46', // 任意の既存カラー
        button: {
          white: '#FFFFFF',        // ボタン用ホワイト
          orange: '#FF9D23',       // ボタン用オレンジ
        },
        title: '#443627',          // タイトル用 茶色
        text: '#393E46',           // テキスト用 灰黒色
        background: '#FFFFFF',     // 背景用ホワイト
      },
      fontFamily: {
        // 日本語対応フォント
        sans: ['"Yu Gothic Medium"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
