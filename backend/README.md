# バックエンド (FastAPI)

## 環境構築

### 必要条件

- Python 3.8 以上
- Docker & Docker Compose
- PostgreSQL

### セットアップ手順

0. 前準備

cd backend

1. 仮想環境を作成して有効化

```bash
python3.12 -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
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

5. アプリケーションの起動

```bash
uvicorn app.main:app --reload
```

## プロジェクト構造

```
backend/
├── app/
│   ├── main.py          # アプリケーションのエントリーポイント
│   ├── routers/         # APIルーティング
│   ├── services/        # ビジネスロジック
│   └── models/          # データモデル
├── requirements.txt     # 依存パッケージ
├── .env.example         # 環境変数テンプレート
└── docker-compose.yml   # Docker設定
```

## 主な機能

- レシピ関連の CRUD 操作
- ユーザー認証（Firebase Authentication）
- お気に入りレシピの管理
- ChatGPT API を使用したレシピ提案

## API 設計

| メソッド | エンドポイント       | 概要                                                   | 認証 |
| -------- | -------------------- | ------------------------------------------------------ | ---- |
| `POST`   | `/api/recipes`       | 材料を送信 → ChatGPT がレシピを提案（DB 保存しない）   | ✅   |
| `GET`    | `/api/favorites`     | ログインユーザーのお気に入りレシピ一覧を**すべて取得** | ✅   |
| `POST`   | `/api/favorites`     | レシピをお気に入りとして新規登録                       | ✅   |
| `PUT`    | `/api/favorites/:id` | 特定のお気に入りを**編集**（レシピタイトル・内容など） | ✅   |
| `DELETE` | `/api/favorites/:id` | 特定のお気に入りを**削除**                             | ✅   |

### レスポンス形式

```json
// 成功時のレスポンス例
{
  "status": "success",
  "data": {
    // レスポンスデータ
  }
}

// エラー時のレスポンス例
{
  "status": "error",
  "message": "エラーメッセージ"
}
```
