// Firebase関連のライブラリをインポート
import { initializeApp, getApps } from 'firebase/app'; // Firebaseアプリの初期化・取得
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // 認証関連の関数・クラス

// Firebaseプロジェクトの設定情報（環境変数から取得）
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
};

// Firebaseアプリの初期化（すでに初期化済みの場合は再利用）
// サーバーサイドレンダリングやHotReload時の二重初期化を防ぐための実装
const app = !getApps().length
  ? initializeApp(firebaseConfig) // まだ初期化されていなければ初期化
  : getApps()[0]; // 既存のappインスタンスがあればそれを使う

// Firebase認証機能のインスタンスを取得・エクスポート
export const auth = getAuth(app);

// Google認証プロバイダーを作成・エクスポート
export const googleProvider = new GoogleAuthProvider();
// Googleログイン時、毎回アカウント選択画面を表示するようパラメータを設定
googleProvider.setCustomParameters({ prompt: 'select_account' });

// 初期化したFirebaseアプリのインスタンスをデフォルトエクスポート
export default app;
