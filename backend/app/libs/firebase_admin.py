# Firebase Admin SDK の初期化

import os
from pathlib import Path
import firebase_admin
from firebase_admin import credentials
from fastapi import HTTPException


def initialize_firebase():
    # ✅ テスト中は Firebase 初期化をスキップ
    if os.getenv("TESTING") == "1":
        print("[INFO] Skipping Firebase initialization (TESTING mode)")
        return
    
    try:
        # サービスアカウントキーのパスを環境変数から取得
        cred_path = os.environ.get(
            "FIREBASE_ADMIN_KEY_PATH", "./serviceAccountKey.json"
        )
        if not Path(cred_path).exists():
            raise FileNotFoundError(
                f"Firebase credentials file not found at {cred_path}"
            )

        # Firebaseアプリが未初期化なら初期化する
        if not firebase_admin._apps:
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Firebase initialization failed: {str(e)}"
        )


# FastAPIアプリ起動時に呼び出し
initialize_firebase()
