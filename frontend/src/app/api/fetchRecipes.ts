async function fetchRecipes(
  keyword: string
): Promise<{ title: string; instructions: string }[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${baseUrl}/api/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyword }),
  });

  if (!response.ok) {
    throw new Error('レシピ取得に失敗しました');
  }

  const data = await response.json();

  // FastAPI 側が { recipes: [{ title, instructions }, ...] } を返している場合
  return data.recipe;
}

export default fetchRecipes;
