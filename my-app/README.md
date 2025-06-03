week 7 チーム開発：今日なにつくる？

## 🏗️ アプリ構成（技術スタック）

| 項目 | 内容 |
| --- | --- |
| **フロントエンド** | Next.js（TypeScript）+ Tailwind CSS |
| **バックエンド** | FastAPI（Python） |
| **データベース** | PostgreSQL（Prismaで管理） |
| **認証** | Firebase Authentication（Google） |
| **その他** | Docker + docker-compose、
ChatGPT API（OpenAI）連携、
envで秘密情報管理 |




my-app/
├── frontend/                             # フロントエンド (Next.js + TypeScript)
│   ├── public/                           # 静的ファイル（画像・faviconなど）
│   ├── src/
│   │   ├── pages/                        # App Router または Page Router 構成
│   │   ├── components/                   # 再利用可能なUIパーツ
│   │   ├── styles/                       # TailwindやCSS設定
│   │   └── utils/                        # クライアント用ユーティリティ関数
│   ├── .env.example                      # フロントエンド用環境変数テンプレート
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.js
│
├── backend/                              # バックエンド (FastAPI + Prisma + Docker)
│   ├── app/
│   │   ├── main.py                       # FastAPIのエントリーポイント
│   │   ├── routers/                      # APIルーティング（recipes, favoritesなど）
│   │   ├── models/                       # Pydanticスキーマ（Request/Response用）
│   │   └── services/                     # GPT連携、認証、DB操作などのロジック
│   ├── prisma/                           # Prismaスキーマとマイグレーション
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── .env.example                      # バックエンド用環境変数テンプレート
│   ├── Dockerfile                        # FastAPI サーバーのDocker設定　（ことね：ここ削除したいです！）
│   └── docker-compose.yml                # DB（PostgreSQL）の統合設定　（ことね：ここ修正したいです！　docker databaseのみ））
│
├── docs/                                 # ドキュメント類（ER図、API仕様など）
│   ├── ER図.drawio                        # ER図の元ファイル（またはPNG）
│   └── api.md                       # API仕様書（エンドポイント定義など）
│
├── README.md                             # プロジェクト概要・技術構成・起動手順
└── .gitignore                            # Git管理除外ファイル設定