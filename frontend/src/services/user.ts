import { getIdToken } from '@/utils/auth';

export async function fetchUser() {
  const idToken = await getIdToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  if (!res.ok) throw new Error('認証失敗');
  return await res.json();
}
