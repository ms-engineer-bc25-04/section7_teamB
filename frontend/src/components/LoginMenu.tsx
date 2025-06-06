import { useState, useRef, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/libs/firebase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginMenuButton() {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // ドロップダウンメニュー用のref
  const menuRef = useRef<HTMLDivElement>(null);

  // 外側クリックでドロップダウンを閉じる
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // ログアウト処理
  const handleLogout = async () => {
    await auth.signOut();
    toast.success('ログアウトしました！');
    setTimeout(() => {
      router.push('/');
    }, 700);
  };

  if (!user) {
    // 未ログイン時は「ログイン」ボタン（やわらかいオレンジ・丸み）
    return (
      <button
        type="button" // 明示的にtypeを指定（form誤動作防止）
        onClick={() => router.push('/login')}
        className="px-4 py-2 rounded-full bg-orange-400 text-white font-semibold hover:bg-orange-500 transition"
        style={{ boxShadow: '0 1px 3px #f2e3c6' }}
      >
        ログイン
      </button>
    );
  }

  // ログイン時は丸い共通アイコン＋ドロップダウンメニュー
  return (
    <div className="relative">
      <button
        type="button" // 明示的にtypeを指定（form誤動作防止）
        onClick={() => setOpen((v) => !v)}
        className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 transition relative"
        title="ログイン中"
        style={{ border: '2px solid #f59e42' }}
      >
        {/* 共通の人型アイコン（SVG） */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#F9D7A0" />
          <path
            d="M12 13c2.7 0 4.5 1.2 4.5 2.3v1.2H7.5v-1.2C7.5 14.2 9.3 13 12 13Zm0-1.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
            fill="#F59E42"
          />
        </svg>
        {/* 緑の小さいバッジ */}
        <span className="absolute right-0 bottom-0 block w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
      </button>
      {/* ドロップダウンメニュー */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg border border-orange-200 shadow-md z-50">
          <button
            type="button"
            className="block w-full px-4 py-2 hover:bg-orange-50 text-left text-gray-700"
            onClick={() => {
              setOpen(false);
              router.push('/');
            }}
          >
            トップ
          </button>
          <button
            type="button"
            className="block w-full px-4 py-2 hover:bg-orange-50 text-left text-gray-700"
            onClick={() => {
              setOpen(false);
              router.push('/favorites');
            }}
          >
            お気に入り
          </button>
          <button
            type="button"
            className="block w-full px-4 py-2 hover:bg-orange-100 text-left text-orange-500"
            onClick={handleLogout}
          >
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
}
