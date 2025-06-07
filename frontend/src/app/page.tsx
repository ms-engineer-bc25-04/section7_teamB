'use client';

import { useState } from 'react';
import { fetchRecipes } from './api/fetchRecipes';
import RecipeForm from '../components/RecipeForm';
import RecipeList from '../components/RecipeList';
import LoginMenuButton from '../components/LoginMenu';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import PopupMessage from '../components/PopupMessage';

type Recipe = {
  title: string;
  instructions: string;
};

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

// ポップアップ用 state
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [autoClose, setAutoClose] = useState(true);
  const router = useRouter();

// ポップアップ閉じる関数
  const closePopup = () => {
    setPopupMessage(null);
  };

  const handleSearch = async (ingredients: string[]) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await fetchRecipes(ingredients.join(', '));
      
      setRecipes(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // お気に入り登録用関数（認証付きPOST）
  const addFavorite = async (recipe: Recipe) => {
      // FirebaseのcurrentUserからIDトークン取得
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
       // 未ログイン時 → tryに入れずここで完結
       setPopupMessage('ログインしてください');
       setAutoClose(true);
       setTimeout(() => {
         router.push('/login');
       }, 3000);
       return;
    }

  // 認証済み → ここからtry
  setIsSubmitting(true);
  try {
    const idToken = await user.getIdToken();

      // 認証付きでfetch
      const response = await fetch('http://localhost:8000/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          title: recipe.title,
          content: recipe.instructions,
        }),
      });

  if (response.ok) {
        // 成功時
        setPopupMessage('登録できました！');
        setAutoClose(true);
        setTimeout(() => {
          router.push('/favorites');
        }, 3000);
      } else if (response.status === 409) {
        // 重複時
        setPopupMessage('登録済みです');
        setAutoClose(false); // OKボタンで閉じる
      } else {
        const errorData = await response.json();
        throw new Error(`お気に入り登録に失敗しました (${response.status}): ${errorData.detail}`);
      }
    } catch (error) {
      console.error('エラー:', error);
      setError((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };    

  return (
    <div className="min-h-screen bg-white font-sans p-8 flex flex-col items-center gap-6">
      {/* ヘッダー */}
      <div className="w-full flex justify-end">
        <LoginMenuButton />
      </div>

     {/* 中央揃え部分（h1 ＋ フォーム ＋ メッセージ ＋ リスト） */}
      <div className="flex flex-col items-center w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold text-[#443627]">今日なにつくる？</h1>

     {/* 検索フォーム */}
      <RecipeForm onSearch={handleSearch} />

     {loading && <p>読み込み中...</p>}
     {error && <p className="text-red-500">{error}</p>}

    {/* レシピリスト */}
      <RecipeList
        recipes={recipes}
        addFavorite={addFavorite}
        isSubmitting={isSubmitting}
      />
    </div>
      
      {/* ★★★ ポップアップ表示 */}
      {popupMessage && (
        <PopupMessage
          message={popupMessage}
          onClose={closePopup}
          autoClose={autoClose}
          autoCloseDelay={3000}
        />
      )}
    </div>
  );
}
