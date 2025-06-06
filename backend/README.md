# レシピアプリ バックエンド

## 技術スタック

- FastAPI
- Prisma ORM
- PostgreSQL
- Firebase Admin SDK

## 開発環境のセットアップ

### 必要条件

- Python 3.11 以上
- PostgreSQL 14 以上
- pipenv

### インストール手順

1. 仮想環境を作成して有効化

```bash
python3.11.12 -m venv venv

# macOS/Linux
source venv/bin/activate
# Windows
venv\Scripts\activate
```

2. 依存パッケージのインストール

```bash
pip install -r requirements.txt
```

3. 環境変数の設定

```bash
cp .env.example .env
# .envファイルを編集して必要な環境変数を設定
```

4. データベースの起動

```bash
docker-compose up -d
```

5. Prisma のセットアップ

```bash
# 1. データベースマイグレーションを実行
npx prisma migrate dev --name init

# 2. Prismaクライアントの生成
prisma generate

# 3. 初期データの投入
python prisma/seed.py（例）
```

6. アプリケーションの起動

```bash
uvicorn app.main:app --reload
```

### API ドキュメント

<URL>

## 📁 ディレクトリ構造

```
backend/
├── app/
│   ├── routers/    # APIエンドポイント
│   ├── deps/       # 依存関係（認証等）
│   ├── libs/       # 共通ライブラリ
│   ├── schemas/    # リクエスト/レスポンスのデータモデル
│   └── services/   # ビジネスロジック
│
├── prisma/         # Prismaスキーマ・マイグレーション
└── venv/           # Python仮想環境
```

---
