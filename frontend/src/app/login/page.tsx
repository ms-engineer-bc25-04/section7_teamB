"use client";
import { signInWithGoogle } from '@/libs/signInWithGoogle';

const LoginPage = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      // Firebase IDトークン取得
      const idToken = await result.user.getIdToken();

      // APIにIDトークンを送信して認証する例
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`, {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (!res.ok) {
        throw new Error("認証APIエラー");
      }

      // 認証情報の保存・画面遷移など
      const data = await res.json();
      // ... ここで状態管理やリダイレクトなど
    } catch (err) {
      // エラー時の処理
      alert("ログイン失敗: " + err);
    }
  };

  return <button onClick={handleLogin}>Googleでログイン</button>;
};

export default LoginPage;
