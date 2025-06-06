import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/libs/firebase';

// Googleログイン処理。ログイン結果を返す
const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result;
};

export default signInWithGoogle;
