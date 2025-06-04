// Google でサインインボタン
// Google認証成功時にIDトークン取得 → バックエンドAPIに渡す処理は別途必要です

import { useState } from 'react';
import { auth, googleProvider } from '@/libs/firebase'; // firebase.tsでexportしたもの
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export const GoogleLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Google認証ポップアップ表示
      await signInWithPopup(auth, googleProvider);
      // 認証成功後のリダイレクト（例：ダッシュボードへ）
      router.push('/dashboard');
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
      className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-100 transition-colors"
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