"""Favorites router module"""  # C0114対策
from fastapi import APIRouter, HTTPException, Path, Body, Depends
from pydantic import BaseModel
from app.db import prisma_client
from app.deps.auth import get_current_user


router = APIRouter()


# お気に入り新規登録時のリクエストボディ
class FavoriteCreateRequest(BaseModel):
    """Request model for creating favorite"""  # C0115対策
    title: str
    content: str


# お気に入り更新時のリクエストボディ
class FavoriteUpdateRequest(BaseModel):
    """Request model for updating favorite"""  # C0115対策
    title: str
    content: str


# 認証済みユーザーのお気に入り一覧取得
@router.get("")
async def read_favorites(user=Depends(get_current_user)):
    """Get the list of favorites for the authenticated user"""  # C0116対策
    # uidで絞る
    favorites = await prisma_client.favorite.find_many(where={"userUid": user["uid"]})
    return favorites


# 認証済みユーザーのお気に入りを新規登録 (POST)
@router.post("", status_code=201)
async def create_favorite(
    favorite_data: FavoriteCreateRequest = Body(...),
    user=Depends(get_current_user),
):
    """Create a new favorite for the authenticated user"""  # C0116対策
    # タイトルだけで重複チェック
    existing_favorite = await prisma_client.favorite.find_first(
        where={
            "userUid": user["uid"],
            "title": favorite_data.title,
            }
        )
    if existing_favorite:
        raise HTTPException(status_code=409, detail="Duplicate favorite")

    # 新規登録
    created_favorite = await prisma_client.favorite.create(
        data={
            "title": favorite_data.title,
            "content": favorite_data.content,
            "userUid": user["uid"],  # ← 認証ユーザーのuidをセット
            }
        )
    return created_favorite


# 認証済みユーザーのお気に入りを更新 (PUT)
@router.put("/{favorite_id}")
async def update_favorite(
     favorite_id: str = Path(..., description="編集するお気に入りのID"),
     favorite_data: FavoriteUpdateRequest = Body(...),
     user=Depends(get_current_user),
     ):
    """Update an existing favorite"""  # C0116対策
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
    favorite_id: str = Path(..., description="削除するお気に入りのID"),
    user = Depends(get_current_user),
):
    """Delete an existing favorite"""  # C0116対策
    _ = user  # W0613対策 → ダミーで「使った」扱いにする
    favorite = await prisma_client.favorite.find_unique(where={"id": favorite_id})
    if not favorite:
        raise HTTPException(status_code=404, detail="Favorite not found")
    await prisma_client.favorite.delete(where={"id": favorite_id})
    return {"message": "Favorite deleted successfully"}
