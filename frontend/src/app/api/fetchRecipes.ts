// src/app/api/fetchRecipes.ts

export async function fetchRecipes(keyword: string): Promise<{ title: string; instructions: string; }[]> {
  const response = await fetch('http://localhost:8000/api/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyword }),
  });

  if (!response.ok) {
    throw new Error('レシピ取得に失敗しました');
  }

  const data = await response.json();

// ⭐ ここに入れる！！(本番では削除)
  console.log('API response:', data);

  // FastAPI 側が { recipes: [{ title, instructions }, ...] } を返している場合
  return data.recipe;
}
