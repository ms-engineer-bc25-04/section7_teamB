'use client';

import Image from 'next/image';
import GoogleLoginButton from '@/components/GoogleLoginButton';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 px-2">
      <div className="w-full max-w-[350px] sm:max-w-[400px] bg-white rounded-2xl shadow-md border border-orange-100 py-10 px-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-5">ログイン</h1>
        {/* イラスト */}
        {/* Next.jsの最適化Imageコンポーネントを使用 */}
        <Image
          src="/login-illustration.png"
          alt="ログインイラスト"
          width={140}
          height={140}
          className="mx-auto mb-8"
          style={{ width: 140, height: 140 }}
        />
        <GoogleLoginButton />
      </div>
    </div>
  );
}
