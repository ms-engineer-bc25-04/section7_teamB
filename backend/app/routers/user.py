# 内容: ユーザー情報を取得するAPIエンドポイント
from fastapi import APIRouter, Depends, HTTPException
from app.db import prisma_client
from app.deps.auth import get_current_user

router = APIRouter()


@router.get("/user")
async def get_current_user_profile(user=Depends(get_current_user)):
    db_user = await prisma_client.user.find_unique(where={"uid": user["uid"]})
    if not db_user:
        # 登録されていないユーザーの場合はエラーを返す
        raise HTTPException(status_code=403, detail="許可されていないユーザーです")
    return db_user
