import getIdToken from '@/utils/auth';

// 認証付きでユーザー情報を取得する関数
export default async function fetchUser() {
  const idToken = await getIdToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  if (!res.ok) throw new Error('認証失敗');
  return res.json(); // return await を return だけに修正
}
