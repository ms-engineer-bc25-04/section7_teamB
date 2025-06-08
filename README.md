# レシピ管理アプリケーション

## 概要

このプロジェクトは、AI を活用してユーザーの冷蔵庫の食材からレシピを提案し、お気に入りのレシピを管理・共有できる Web アプリケーションです。

## 🌟 実装機能一覧（MVP）

1. 🧂 **レシピ提案機能**

   - 材料を入力すると、ChatGPT が最適なレシピを提案
   - 季節や調理時間を考慮したレシピ生成

2. 👤 **ユーザー管理機能**
   - Google アカウントでの簡単ログイン
   - ユーザープロフィールの管理
3. ⭐ **お気に入り機能**
   - 気に入ったレシピの保存
   - お気に入りレシピの一覧表示と検索
   - レシピの編集と削除

## 💻 技術スタック

### フロントエンド

- Next.js 13 (App Router)
- TypeScript 5.3
- Tailwind CSS 3.4
- Firebase Authentication

### バックエンド

- FastAPI 0.104
- Python 3.11
- Prisma Client Python
- Firebase Admin SDK

### インフラ・外部サービス

- PostgreSQL 14
- Docker / docker-compose
- OpenAI API (ChatGPT o4-mini)

## 📂 ディレクトリ構造

```
section7_teamB/
├── frontend/     # フロントエンドアプリケーション
├── backend/      # バックエンドAPI
└── docs/         # プロジェクトドキュメント
```

## 🔧 開発環境のセットアップ

1. リポジトリのクローン

```bash
git clone https://github.com/ms-engineer-bc25-04/section7_teamB.git
cd section7_teamB
```

2. 環境変数の設定

- `.env.example`をコピーして`.env`を作成
- 必要な環境変数を設定

3. フロントエンドとバックエンドの起動

- [フロントエンドの README.md](./frontend/README.md)
- [バックエンドの README.md](./backend/README.md)

各環境のセットアップと起動手順の詳細については、上記のリンクを参照してください。

## ライセンス

MIT License
