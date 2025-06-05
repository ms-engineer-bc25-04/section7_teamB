'use client';

import { useState } from 'react';
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

  const handleSearch = async (ingredients: string[]) => {
    try {
      setLoading(true);
      setError(null);
      // 今は仮のAPI呼び出し → ここで実際のfetchRecipesを改良予定
      const result = await fetchRecipes(ingredients.join(', '));
      // 仮にAPIから [{title, instructions}, ...] 形式で返ってくる前提
      setRecipes(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
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

      <RecipeList recipes={recipes} />
    </div>
  );
}
