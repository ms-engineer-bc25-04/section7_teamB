import os
import openai

# OpenAI APIキーを環境変数から取得
openai.api_key = os.getenv("OPENAI_API_KEY")

# ChatGPT からレシピを取得する関数
def get_recipe_from_chatgpt(keyword: str) -> str:
    prompt = f"{keyword} を使った料理のレシピを教えて"

    # 同期版のAPI呼び出し
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ],
        max_tokens=500,
        temperature=0.7,
    )

    # レスポンスからレシピ文を取り出す
    recipe_text = response.choices[0].message.content
    return recipe_text
