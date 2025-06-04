// UI 調整必須、内容もさらに調整必要
'use client';

import { GoogleLoginButton } from '@/components/GoogleLoginButton';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24">
      <h1 className="text-3xl justify-center font-bold mb-8">管理者ログイン</h1>
      <GoogleLoginButton />
    </div>
  );
}
