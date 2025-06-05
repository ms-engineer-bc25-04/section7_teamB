'use client';

import { GoogleLoginButton } from '@/components/GoogleLoginButton';

// export default function LoginPage() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 pt-20">
//       <div className="w-full max-w-sm bg-white rounded-xl shadow border border-orange-100 p-8 flex flex-col items-center">
//         <h1 className="text-2xl font-bold text-gray-800 mb-8">ログイン</h1>
//         <GoogleLoginButton />
//       </div>
//     </div>
//   );
// }
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 px-4">
      <div className="w-full max-w-xs sm:max-w-md bg-white rounded-2xl shadow-md border border-orange-100 py-8 px-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">ログイン</h1>
        {/* ロゴやイラスト（例） */}
        <img
          src="/login-illustration.png"
          alt="ログインイラスト"
          className="w-20 h-20 mb-6"
        />
        <GoogleLoginButton />
      </div>
    </div>
  );
}
