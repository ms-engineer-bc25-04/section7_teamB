from fastapi import APIRouter, Request
from app.services import chatgpt_service

router = APIRouter()

@router.post("")
async def create_recipe(request: Request):
    data = await request.json()
    keyword = data.get("keyword")

    # ChatGPT API 呼び出し
    recipe = await chatgpt_service.get_recipe_from_chatgpt(keyword)

    return {"recipe": recipe}