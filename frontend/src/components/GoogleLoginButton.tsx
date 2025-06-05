import { useState } from 'react';
import { auth, googleProvider } from '@/libs/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export const GoogleLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Google認証ポップアップ表示
      const result = await signInWithPopup(auth, googleProvider);
      // ★ Firebase IDトークンを取得
      const idToken = await result.user.getIdToken();
      // ★ /api/user に認証付きでアクセス
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${baseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (res.ok) {
        const userData = await res.json();
        alert('認証OK！ユーザー情報: ' + JSON.stringify(userData));
        // 認証OKならリダイレクトやstate更新
        router.push('/'); // あとで更新　お気に入りページにリダイレクトする
      } else {
        const err = await res.json();
        alert('認証エラー: ' + err.detail);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Googleログインに失敗しました。再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full bg-orange-400 hover:bg-orange-500 text-white text-base font-semibold transition shadow mb-2"
      style={{ boxShadow: '0 1px 3px #f2e3c6' }}
    >
      {isLoading ? (
        <span>ログイン中...</span>
      ) : (
        <>
          <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
          <span>Googleでログイン</span>
        </>
      )}
    </button>
  );
};
