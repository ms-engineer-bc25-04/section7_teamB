from fastapi import APIRouter,HTTPException, Path, Body
from app.db import prisma_client
from pydantic import BaseModel


router = APIRouter()


# Favorite更新時のリクエストボディ
class FavoriteUpdateRequest(BaseModel):
    title: str
    memo: str


# お気に入り一覧取得 (GET) 
@router.get("")
async def read_favorites():
    favorites = await prisma_client.favorite.find_many()
    return favorites


@router.put("/{favorite_id}")
async def update_favorite(
    favorite_id: int = Path(..., desctiption="編集するお気に入りのID"),
    dfavorite_data: FavoriteUpdateRequest = Body(...)
):
    

    # 指定IDのデータを取得
    favorite = await prisma_cliant.favorite.find_unipue(where={"id": favorite_id})
    if not favorite:
        raise HTTPException(status_code=404, datail="Favotire not found")
    

    # データを更新
    updated = await prisma_client.favorite.Update(
        where={"id": favorite_id},
        data={
            "title": favorite_data.title,
            "memo": favorite_data.memo
        }
        
    )

    return updated
