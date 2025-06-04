# Firebase の ID トークン認証用ミドルウェア
# APIリクエストのAuthorizationヘッダーからIDトークンを抽出し検証する

from fastapi import Depends, HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin import auth as firebase_auth

# Bearer認証のスキーマを設定
security = HTTPBearer()


async def get_current_user(token: HTTPAuthorizationCredentials = Security(security)):
    """
    Firebase の ID トークンを検証し、認証済みユーザー情報（デコード済みトークン）を返す
    """
    try:
        # Authorizationヘッダーからトークンを抽出し、Firebaseで検証
        decoded_token = firebase_auth.verify_id_token(token.credentials)
        return decoded_token
    except Exception:
        # 認証失敗時は401エラー
        raise HTTPException(status_code=401, detail="認証に失敗しました")
