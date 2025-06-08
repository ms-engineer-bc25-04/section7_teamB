import { auth } from '@/libs/firebase';

// FirebaseのIDトークンを取得するユーティリティ関数
export default async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) {
    return null;
  }
  return user.getIdToken();
}
