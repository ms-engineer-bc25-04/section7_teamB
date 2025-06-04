# 内容: ユーザー情報を取得するAPIエンドポイント
# 内容をさらに確認します
from fastapi import APIRouter, Depends, HTTPException
from app.db import prisma_client
from app.deps.auth import get_current_user

router = APIRouter()


@router.get("/user")
async def get_current_user_profile(user=Depends(get_current_user)):
    db_user = await prisma_client.user.find_unique(where={"uid": user["uid"]})
    if not db_user:
        # 新規ユーザーとして自動登録
        db_user = await prisma_client.user.create(
            {
                "uid": user["uid"],
                "email": user.get("email", ""),
                "name": user.get("name", ""),
            }
        )
    return db_user
