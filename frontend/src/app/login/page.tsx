"use client";
import { auth, provider } from "@/libs/firebase";
import { signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    // このidTokenをAPIへ送る（例↓）
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { Authorization: `Bearer ${idToken}` },
    });
    // レスポンス処理
  };
  return <button onClick={handleLogin}>Googleでログイン</button>;
}
