from fastapi import APIRouter
from pydantic import BaseModel
from app.services import chatgpt_service

router = APIRouter()

# リクエストのBody用のSchema
class RecipeRequest(BaseModel):
    keyword: str

# POST /api/recipes
@router.post("")
async def create_recipe(request: RecipeRequest):
    keyword = request.keyword
    # await を外す → 同期関数だから
    recipe = chatgpt_service.get_recipe_from_chatgpt(keyword)
    return {"recipe": recipe}
