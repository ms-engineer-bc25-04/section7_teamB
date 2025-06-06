import { auth } from '@/libs/firebase';

// FirebaseのIDトークンを取得するユーティリティ関数
export default async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) {
    console.warn(
      'Firebaseユーザーが見つかりません。ログインしていない可能性があります。'
    );
    return null;
  }
  return user.getIdToken();
}
