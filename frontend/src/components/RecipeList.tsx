// src/components/RecipeList.tsx

type Recipe = {
  title: string;
  instructions: string;
};

type RecipeListProps = {
  recipes: Recipe[];
  addFavorite: (recipe: Recipe) => void;
  isSubmitting: boolean;
};

export default function RecipeList({
  recipes,
  addFavorite,
  isSubmitting,
}: RecipeListProps) {
  if (recipes.length === 0) {
    return <p>レシピはまだ表示されていません。</p>;
  }

return (
    <div className="flex flex-col gap-4">
      {recipes.map((recipe, index) => (
        <div
          key={index}
          className="border p-4 rounded bg-white shadow flex flex-col gap-2"
        >
          <div className="flex items-center gap-2">
            <span>🔍</span>
            <h2 className="text-lg font-bold text-[#443627]">{recipe.title}</h2>
          </div>
          {/* ここを preタグにする！ */}
          <pre className="whitespace-pre-wrap text-[#393E46]">{recipe.instructions}</pre>
          
           <button
            onClick={() => addFavorite(recipe)}
            disabled={isSubmitting}
            className="mt-2 px-4 py-2 border text-[#FF9D23] border-[#FF9D23] rounded transition hover:bg-[#FFF3E0] disabled:opacity-50"
          >
            {isSubmitting ? '登録中...' : '★ お気に入りに追加'}
          </button>

        </div>
      ))}
    </div>
  );
}
