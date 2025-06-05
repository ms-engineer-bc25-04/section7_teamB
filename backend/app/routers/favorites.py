from fastapi import APIRouter, HTTPException, Path, Body, Depends
from app.db import prisma_client
from app.deps.auth import get_current_user
from pydantic import BaseModel

router = APIRouter()


# お気に入り更新時のリクエストボディ
class FavoriteUpdateRequest(BaseModel):
    title: str
    content: str  # memo→content


# 	•	APIすべてに認証を入れるのが必須（GET, POST, PUT, DELETEすべて）
# 	•	他人のデータ操作防止は userUid でチェック
# 	•	API経由のデータ流出・改ざんをしっかり防げる


# 認証済みユーザーのお気に入り一覧取得
@router.get("")
async def read_favorites(user=Depends(get_current_user)):
    # uidで絞る
    favorites = await prisma_client.favorite.find_many(where={"userUid": user["uid"]})
    return favorites


# 認証済みユーザーのお気に入りを更新 (PUT)
@router.put("/{favorite_id}")
async def update_favorite(
    favorite_id: str = Path(..., description="編集するお気に入りのID"),
    favorite_data: FavoriteUpdateRequest = Body(...),
    user=Depends(get_current_user),
):
    # 該当ID＋自分のデータのみ
    favorite = await prisma_client.favorite.find_unique(where={"id": favorite_id})
    if not favorite or favorite.userUid != user["uid"]:
        raise HTTPException(status_code=404, detail="Favorite not found or not yours")

    # データを更新
    return await prisma_client.favorite.update(
        where={"id": favorite_id},
        data={"title": favorite_data.title, "content": favorite_data.content},
    )


# 認証済みユーザーのお気に入りを削除(delete)
@router.delete("/{favorite_id}")
async def delete_favorite(
    favorite_id: int = Path(..., description="削除するお気に入りのID")
):
    favorite = await prisma_client.favorite.find_unique(where={"id": favorite_id})
    if not favorite:
        raise HTTPException(status_code=404, detail="Favorite not found")

    await prisma_client.favorite.delete(where={"id": favorite_id})
    return {"message": "Favorite deleted successfully"}
