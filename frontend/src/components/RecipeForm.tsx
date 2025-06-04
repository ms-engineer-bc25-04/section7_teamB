// src/components/RecipeForm.tsx
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
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2 items-start">
      <label className="text-[#443627] font-bold">📝 食材を入力してください</label>
      <input
        type="text"
        value={ingredient1}
        onChange={(e) => setIngredient1(e.target.value)}
        placeholder="食材1"
        className="border p-2 rounded text-[#393E46] w-64"
      />
      <input
        type="text"
        value={ingredient2}
        onChange={(e) => setIngredient2(e.target.value)}
        placeholder="食材2"
        className="border p-2 rounded text-[#393E46] w-64"
      />
      <input
        type="text"
        value={ingredient3}
        onChange={(e) => setIngredient3(e.target.value)}
        placeholder="食材3"
        className="border p-2 rounded text-[#393E46] w-64"
      />
      <button
        type="submit"
        className="bg-[#FF9D23] text-white px-4 py-2 rounded hover:bg-orange-400 mt-2"
      >
        レシピを提案する
      </button>
    </form>
  );
}