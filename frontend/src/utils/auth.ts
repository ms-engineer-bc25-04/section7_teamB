import { auth } from '@/libs/firebase';

// FirebaseのIDトークンを取得するユーティリティ関数
export default async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (user) {
    // ユーザーがログインしている場合、IDトークンを強制リフレッシュして返す
    // 1回のAPIコールで済むようにする、return await は不要
    return user.getIdToken(true); // ← これだけでOK
  }
  return null;
}
