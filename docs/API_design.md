# 📄 API 設計書

「今日なにつくる？」アプリの
ユーザー情報・生成レシピ情報・お気に入りレシピ情報 を管理・提供するための RESTful API です。

フロントエンド（Next.js）と連携し、レシピ生成機能（ChatGPT API 連携）、
お気に入り管理機能（登録・取得・更新・削除）、
ユーザー情報取得機能（Firebase Authentication 連携） をサポートします。

# 1. API 概要

- **Base URL**:
  - 開発環境（ローカル） → `http://localhost:8000`
  - 本番環境 → TBD（デプロイ後に記載）
- **認証**: Firebase 認証（Authorization ヘッダーに Firebase ID Token）
- **データ形式**: JSON
- **バージョン**: v1

---

# 2. エンドポイント一覧

## 2.1 ユーザー管理

- **エンドポイント**: `/api/user`
- **メソッド**: `GET`
- **説明**: ユーザーテーブル全体の情報（id / uid / email / name / createdAt / updatedAt / favorites）を取得する

### リクエスト例

```http
GET /api/user
Authorization: Bearer <Firebase ID Token>
```

### レスポンス例

```json
{
  "id": "clxyzabc12345",
  "uid": "GZahYKu5DIMSxxxxxxx",
  "email": "sample@example.com",
  "name": "サンプル ユーザー",
  "createdAt": "2025-06-01T01:00:00Z",
  "updatedAt": "2025-06-02T01:00:00Z",
  "favorites": []
}
```

---

## 2.2 お気に入り管理

### ① 取得（一覧取得）

- **エンドポイント**: `/api/favorites`
- **メソッド**: `GET`
- **説明**: ログインユーザーのお気に入りレシピ一覧を取得する（Prisma モデル全フィールドを返す）

#### リクエスト例

```http
GET /api/favorites
Authorization: Bearer <Firebase ID Token>
```

#### レスポンス例

```json
[
  {
    "id": "fav_123",
    "title": "オムレツ",
    "content": "1. 卵を溶き、塩を加える。\n2. 玉ねぎを炒めて、卵と合わせて焼く。\n3. 牛乳でふわっと仕上げる。",
    "createdAt": "2025-06-02T01:00:00Z",
    "updatedAt": "2025-06-03T01:00:00Z",
    "userUid": "GZahYKu5DIMSxxxxxxx"
  }
]
```

---

### ② 新規登録

- **エンドポイント**: `/api/favorites`
- **メソッド**: `POST`
- **説明**: レシピをお気に入りとして登録する（登録後、Favorite モデル全体が返る）

#### リクエスト例

```http
POST /api/favorites
Authorization: Bearer <Firebase ID Token>
Content-Type: application/json

{
  "title": "オムレツ",
  "content": "1. 卵を溶き、塩を加える。\n2. 玉ねぎを炒めて、卵と合わせて焼く。\n3. 牛乳でふわっと仕上げる."
}
```

#### レスポンス例

```json
{
  "id": "fav_123",
  "title": "オムレツ",
  "content": "1. 卵を溶き、塩を加える。\n2. 玉ねぎを炒めて、卵と合わせて焼く。\n3. 牛乳でふわっと仕上げる。",
  "createdAt": "2025-06-02T01:00:00Z",
  "updatedAt": "2025-06-02T01:00:00Z",
  "userUid": "GZahYKu5DIMSxxxxxxx"
}
```

---

### ③ 編集

- **エンドポイント**: `/api/favorites/:id`
- **メソッド**: `PUT`
- **説明**: 指定したお気に入りレシピを編集する（更新後、Favorite モデル全体が返る）

#### リクエスト例

```http
PUT /api/favorites/fav_123
Authorization: Bearer <Firebase ID Token>
Content-Type: application/json

{
  "title": "ふわふわオムレツ",
  "content": "1. 卵3つを溶き、塩を加える。\n2. バターでふわっと焼き上げる。\n3. パセリを散らして完成。"
}
```

#### レスポンス例

```json
{
  "id": "fav_123",
  "title": "ふわふわオムレツ",
  "content": "1. 卵3つを溶き、塩を加える。\n2. バターでふわっと焼き上げる。\n3. パセリを散らして完成。",
  "createdAt": "2025-06-02T01:00:00Z",
  "updatedAt": "2025-06-03T02:00:00Z",
  "userUid": "GZahYKu5DIMSxxxxxxx"
}
```

---

### ④ 削除

- **エンドポイント**: `/api/favorites/:id`
- **メソッド**: `DELETE`
- **説明**: 指定したお気に入りレシピを削除する

#### リクエスト例

```http
DELETE /api/favorites/fav_123
Authorization: Bearer <Firebase ID Token>
```

#### レスポンス例

```json
{
  "message": "Favorite deleted successfully"
}
```

---

## 2.3 レシピ生成（ChatGPT）

- **エンドポイント**: `/api/recipes`
- **メソッド**: `POST`
- **説明**: 入力した食材をもとに ChatGPT がレシピを生成する（保存はしない）

#### リクエスト例

```http
POST /api/recipes
Content-Type: application/json

{
  "keyword": "卵, 玉ねぎ, 牛乳"
}
```

#### レスポンス例

```json
{
  "recipe": {
    "title": "ふわふわオムレツ",
    "content": "1. 卵を溶き、塩を加える。\n2. 玉ねぎを炒めて、卵と合わせて焼く。\n3. 牛乳でふわっと仕上げる。"
  }
}
```

---

# 3. 認証

- **方式**: Firebase Authentication（Token 認証）
- **ヘッダー**:

```http
Authorization: Bearer <Firebase ID Token>
```

---

# 4. ステータスコード

- 200 OK : 正常終了  
  → FastAPI のデフォルト動作（`GET` / `PUT` / `DELETE` では `status_code=200` を明示していない）
- 201 Created : リソース作成（POST /api/favorites）
- 400 Bad Request : リクエストエラー（Pydantic バリデーションエラー時）  
  → Pydantic により自動発生（明示はしていない）
- 401 Unauthorized : 認証エラー（ID トークン無効・期限切れなど）
- 403 Forbidden : 権限エラー（許可されていないユーザー）
- 404 Not Found : リソース未検出（存在しない Favorite や User）
- 409 Conflict : 重複エラー（お気に入り登録時の Duplicate）
- 500 Internal Server Error : サーバーエラー（Firebase 初期化失敗時、または未捕捉エラー時）  
  → Firebase 初期化は明示、他は FastAPI が自動で返す（recipes など）

---
