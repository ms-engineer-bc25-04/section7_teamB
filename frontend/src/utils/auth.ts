// FirebaseのIDトークンを取得するユーティリティ関数

import { auth } from '@/libs/firebase';

export async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) {
    console.warn('Firebaseユーザーが見つかりません。ログインしていない可能性があります。')
    return null
  }
  return await user.getIdToken()
}
