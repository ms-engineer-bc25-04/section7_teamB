import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

async def get_recipe_from_chatgpt(keyword: str) -> str:
    prompt = f"「{keyword}」を使った料理のレシピを教えてください。"

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ],
        max_tokens=500,
        temperature=0.7,
    )

    # レスポンスからレシピの文章を取り出す
    recipe_text = response['choices'][0]['message']['content']
    return recipe_text
