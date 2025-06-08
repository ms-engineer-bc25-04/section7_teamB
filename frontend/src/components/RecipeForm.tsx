'use client';

import { useState } from 'react';

type RecipeFormProps = {
  onSearch: (ingredients: string[]) => void;
};

export default function RecipeForm({ onSearch }: RecipeFormProps) {
  const [ingredient1, setIngredient1] = useState('');
  const [ingredient2, setIngredient2] = useState('');
  const [ingredient3, setIngredient3] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch([ingredient1, ingredient2, ingredient3]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex flex-col gap-2 items-center"
    >
      {/* 小見出し */}
      <div className="w-full mb-2 text-center">
        <span className="text-base font-bold text-[#443627]">
          📝 食材を入力してください
        </span>
      </div>
      {/* 食材入力フォーム */}
      {/* 食材1 */}
      <input
        id="ingredient1"
        type="text"
        value={ingredient1}
        onChange={(e) => setIngredient1(e.target.value)}
        placeholder="食材1"
        className="border p-2 rounded text-[#393E46] w-64"
      />
      {/* 食材2 */}
      <input
        id="ingredient2"
        type="text"
        value={ingredient2}
        onChange={(e) => setIngredient2(e.target.value)}
        placeholder="食材2"
        className="border p-2 rounded text-[#393E46] w-64"
      />
      {/* 食材3 */}
      <input
        id="ingredient3"
        type="text"
        value={ingredient3}
        onChange={(e) => setIngredient3(e.target.value)}
        placeholder="食材3"
        className="border p-2 rounded text-[#393E46] w-64"
      />
      {/* <label htmlFor="ingredient1" className="text-[#443627] font-bold">
        📝 食材を入力してください
        <input
          id="ingredient1"
          type="text"
          value={ingredient1}
          onChange={(e) => setIngredient1(e.target.value)}
          placeholder="食材1"
          className="border p-2 rounded text-[#393E46] w-64"
        />
      </label>
      {/* アクセシビリティ対応（見た目は非表示、スクリーンリーダーのみ読まれる） */}
      {/* <label htmlFor="ingredient2" className="sr-only">
        食材2を入力してください
        <input
          id="ingredient2"
          type="text"
          value={ingredient2}
          onChange={(e) => setIngredient2(e.target.value)}
          placeholder="食材2"
          className="border p-2 rounded text-[#393E46] w-64"
        />
      </label>
        <label htmlFor="ingredient3" className="sr-only">
        食材3を入力してください
        <input
          id="ingredient3"
          type="text"
          value={ingredient3}
          onChange={(e) => setIngredient3(e.target.value)}
          placeholder="食材3"
          className="border p-2 rounded text-[#393E46] w-64"
        />
      </label>   */}
      <button
        type="submit"
        className="bg-[#FF9D23] text-white px-4 py-2 rounded hover:bg-orange-400 mt-2"
      >
        レシピを提案する
      </button>
    </form>
  );
}
