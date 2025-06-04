import os
import openai

# OpenAI APIキーを環境変数から取得
openai.api_key = os.getenv("OPENAI_API_KEY")

# ChatGPT からレシピを取得する関数
def get_recipe_from_chatgpt(keyword: str) -> list:
    prompt = f"""
    あなたはプロの料理研究家です。
    次の材料「{keyword}」を使った料理を2つ提案してください。
    以下の形式で、必ず **JSON形式** で返してください（文章は不要です）：
    "instructions" は **各手順を改行（\\n）で区切ってください**。

    {{
        "recipes": [
        {{
            "title": "レシピタイトル1",
            "instructions": "1. 手順1\\n2. 手順2\\n3. 手順3"
        }},
        {{
            "title": "レシピタイトル2",
            "instructions": "1. 手順1\\n2. 手順2\\n3. 手順3"
        }}
        ]
    }}
    """

    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ],
        max_tokens=500,
        temperature=0.7,
    )

    # レスポンスから content を取り出す
    recipe_text = response.choices[0].message.content

    # JSON部分を辞書に変換
    import json
    try:
        recipe_json = json.loads(recipe_text)
        return recipe_json["recipes"]
    except Exception as e:
        print("JSON parse error:", e)
        print("Response was:", recipe_text)
        # エラー時は空リストを返す
        return []