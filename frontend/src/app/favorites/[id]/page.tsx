//お気に入り編集ページ
'use client'

export default function EditFavoritePage() {
  // 編集モーダルUIに移動した旨の案内
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-gray-600">
        この編集機能は「お気に入り一覧ページ」からモーダルで行えるようになりました。<br />
        <a href="/favorites" className="text-blue-500 underline">お気に入り一覧に戻る</a>
      </div>
    </div>
  );
}