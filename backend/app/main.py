from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.routers import recipes, auth, favorites
from app.database import engine, Base

# .envファイルから環境変数を読み込む
load_dotenv()

# DBのテーブルを自動作成（開発用、本番はAlembic推奨）
Base.metadata.create_all(bind=engine)

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

# ルーターを登録（仮）
# app.include_router(recipes.router, prefix="/api/recipes", tags=["recipes"])
# app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
# app.include_router(favorites.router, prefix="/api/favorites", tags=["favorites"])


# ルートパス
@app.get("/")
async def root():
    return {"message": "Recipe App API"}


# ヘルスチェックAPI
@app.get("/health")
async def health_check():
    return {"status": "healthy"}
