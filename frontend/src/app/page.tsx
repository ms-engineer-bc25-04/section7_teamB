'use client';

import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { fetchRecipes } from './api/fetchRecipes';
import RecipeForm from '../components/RecipeForm';
import RecipeList from '../components/RecipeList';
import LoginMenuButton from '../components/LoginMenu';

type Recipe = {
  title: string;
  instructions: string;
};

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    try {
      // FirebaseのcurrentUserからIDトークン取得
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('ユーザーがログインしていません');
      }

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `お気に入り登録に失敗しました (${response.status}): ${errorData.detail}`
        );
      }

      console.log('お気に入り登録成功！');
    } catch (err) {
      console.error('エラー:', error);
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans p-8 flex flex-col items-center gap-6">
      {/* ヘッダー */}
      <div className="flex justify-between w-full max-w-3xl items-center">
        <h1 className="text-3xl font-bold text-[#443627]">今日なにつくる？</h1>
        <LoginMenuButton /> {/* 右上に表示 */}
      </div>
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
  );
}
