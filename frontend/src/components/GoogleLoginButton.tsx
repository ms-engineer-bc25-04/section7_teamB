import { useState } from 'react';
import { auth, googleProvider } from '@/libs/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // エラー表示用state
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null); // 前のエラーをクリア
    try {
      // Google認証ポップアップ表示
      const result = await signInWithPopup(auth, googleProvider);
      // Firebase IDトークンを取得
      const idToken = await result.user.getIdToken();
      // /api/user に認証付きでアクセス
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${baseUrl}/api/user`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (res.ok) {
        toast.success('ログイン成功！');
        setTimeout(() => {
          router.push('/favorites');
        }, 700);
      } else {
        const err = await res.json();
        setError(`認証エラー: ${err.detail}`); // ここでエラーstateにセット
      }
    } catch (err) {
      setError('Googleログインに失敗しました。再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* エラーがあればボタン上部に表示 */}
      {error && (
        <div className="mb-2 text-red-600 bg-red-50 border border-red-300 rounded p-2">
          {error}
        </div>
      )}
      <button
        type="button"
        onClick={handleLogin}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 w-64 py-3 px-6 rounded-full bg-orange-400 hover:bg-orange-500 text-white text-base font-semibold transition shadow mb-2"
        style={{ boxShadow: '0 1px 3px #f2e3c6' }}
      >
        {isLoading ? (
          <span>ログイン中...</span>
        ) : (
          <>
            <Image src="/google-icon.svg" alt="Google" width={24} height={24} />
            <span>Googleでログイン</span>
          </>
        )}
      </button>
    </>
  );
}
