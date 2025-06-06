# レシピアプリ フロントエンド

## 💻 技術スタック

- Next.js
- TypeScript
- Tailwind CSS
- Firebase Authentication

## 🔧 開発環境のセットアップ

### 必要条件

- Node.js 18.x以上
- npm 9.x以上

### インストール手順

1. 依存関係のインストール

```bash
npm install
```

2. 環境変数の設定

```bash
cp .env.example .env.local
```

必要な環境変数:

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_FIREBASE_CONFIG_*`

3. 開発サーバーの起動

```bash
npm run dev
```

### スクリプト

- `npm run dev`: 開発サーバーの起動
- `npm run build`: プロダクションビルド
- `npm run lint`: ESLintによるコード検証
- `npm test`: テストの実行

## ディレクトリ構造

```
frontend/
├── src/
│   ├── app/         # ページコンポーネント
│   ├── api/         # APIクライアント
│   ├── components/  # 共通コンポーネント
│   ├── libs/        # ライブラリ初期化（Firebase等）
│   ├── services/    # ビジネスロジック
│   └── utils/       # ユーティリティ関数
└── public/          # 静的ファイル
```
