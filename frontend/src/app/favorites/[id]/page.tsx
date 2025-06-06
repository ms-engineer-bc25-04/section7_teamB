//お気に入り編集ページ
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getIdToken } from '@/utils/auth'
import LoginMenuButton from '@/components/LoginMenu'

type Favorite = {
  id: string
  title: string
  content: string
}

export default function EditFavoritePage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [favorite, setFavorite] = useState<Favorite | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // お気に入り1件取得
  const fetchFavorite = async () => {
    try {
      setLoading(true)
      const token = await getIdToken()
      if (!token) throw new Error('認証が必要です')

      const res = await fetch('http://localhost:8000/api/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data: Favorite[] = await res.json()
      const target = data.find((item) => item.id === id)

      if (!target) {
        throw new Error('データが見つかりませんでした')
      }

      setFavorite(target)
      setTitle(target.title)
      setContent(target.content)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFavorite()
  }, [id])

  // 更新処理
  const handleUpdate = async () => {
    setSubmitting(true)
    try {
      const token = await getIdToken()
      if (!token) throw new Error('認証が必要です')

      const res = await fetch(`http://localhost:8000/api/favorites/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      })

      if (!res.ok) throw new Error('更新に失敗しました')

      router.push('/favorites')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  // 削除処理
  const handleDelete = async () => {
    if (!confirm('本当に削除しますか？')) return

    const token = await getIdToken()
    if (!token) return

    await fetch(`http://localhost:8000/api/favorites/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    router.push('/favorites')
  }

  return (
    <div className="min-h-screen bg-white font-sans p-8 flex flex-col items-center gap-6">
      {/* ヘッダー */}
      <div className="flex justify-between w-full max-w-3xl items-center">
        <h1 className="text-3xl font-bold text-[#443627]">お気に入りを編集</h1>
        <LoginMenuButton />
      </div>

      {loading ? (
        <p className="text-gray-500">読み込み中...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full max-w-3xl space-y-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex gap-4">
            <button
              onClick={handleUpdate}
              disabled={submitting}
              className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {submitting ? '保存中...' : '更新する'}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-md"
            >
              削除する
            </button>
          </div>
          <button
            onClick={() => router.push('/favorites')}
            className="text-sm text-gray-500 hover:underline mt-2"
          >
            一覧に戻る
          </button>
        </div>
      )}
    </div>
  )
}
