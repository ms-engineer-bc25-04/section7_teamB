import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

// Tailwindのfont-sansを使用するため、Google Fontsの設定は削除しました

export const metadata: Metadata = {
  title: 'レシピ提案アプリ', // プロジェクトタイトルを設定
  description: 'あなたの冷蔵庫の食材から簡単レシピを提案するWebアプリ', // プロジェクト説明を設定
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className="font-sans antialiased" // Tailwindのフォントとアンチエイリアス（文字や画像の縁をなめらかに補正する技術）を適用
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
