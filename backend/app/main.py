from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# いまはこうなっている：
# from app.routers import recipes, auth, favorites
# 一旦こうする
from app.routers import favorites
# auth や favorites はまだ作ってないなら、とりあえずコメントアウトでOK！
# from app.routers import auth, recipes

# Prisma Client を使うため、追加する import
from app.db import prisma_client


# .envファイルから環境変数を読み込む
load_dotenv()


# FastAPIアプリケーションのインスタンス生成
app = FastAPI(title="Recipe App API", version="1.0.0")


# CORS設定（フロントエンドのNext.jsなどと連携するため）
origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 許可するオリジン
    allow_credentials=True,
    allow_methods=["*"],  # 全メソッド許可
    allow_headers=["*"],  # 全ヘッダー許可
)


# Prisma Client の接続・切断イベントを追加
@app.on_event("startup")
async def startup():
    await prisma_client.connect()

@app.on_event("shutdown")
async def shutdown():
    await prisma_client.disconnect()


# ルーターを登録（仮）
app.include_router(favorites.router, prefix="/api/favorites", tags=["favorites"])

# まだ作ってないからコメントアウト！
# app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
# app.include_router(recipes.router, prefix="/api/recipes", tags=["recipes"])


# ルートパス
@app.get("/")
async def root():
    return {"message": "Recipe App API"}


# ヘルスチェックAPI
@app.get("/health")
async def health_check():
    return {"status": "healthy"}
