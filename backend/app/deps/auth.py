"""Authentication dependency module."""  # C0114対策
# Firebase の ID トークン認証用ミドルウェア
# APIリクエストのAuthorizationヘッダーからIDトークンを抽出し検証する

from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.libs.firebase_admin import initialize_firebase
from firebase_admin import auth as firebase_auth

# Bearer認証のスキーマを設定
security = HTTPBearer()

async def get_current_user(token: HTTPAuthorizationCredentials = Security(security)):
    """
    Firebase の ID トークンを検証し、認証済みユーザー情報（デコード済みトークン）を返す
    """
    try:
        print("受け取ったトークン:", token.credentials)  # 追加
        # Authorizationヘッダーからトークンを抽出し、Firebaseで検証
        decoded_token = firebase_auth.verify_id_token(token.credentials)
        print("デコード後:", decoded_token)  # 追加
        return decoded_token
    except Exception as e:
        print("認証エラー:", e)
        raise HTTPException(status_code=401, detail="認証に失敗しました")
