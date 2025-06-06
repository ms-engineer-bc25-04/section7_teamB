// frontend/src/components/PopupMessage.tsx
'use client';

import { useEffect } from 'react';

type PopupMessageProps = {
  message: string;
  onClose?: () => void; // OKボタン用
  autoClose?: boolean;
  autoCloseDelay?: number; // ミリ秒
};

export default function PopupMessage({
  message,
  onClose,
  autoClose = false,
  autoCloseDelay = 3000,
}: PopupMessageProps) {
  // 自動クローズ処理
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow text-center">
        <p>{message}</p>
        {!autoClose && (
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
}