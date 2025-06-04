// FirebaseのIDトークンを取得するユーティリティ関数

import { auth } from '@/libs/firebase';

export async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
}
