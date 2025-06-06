//一覧ページ
'use client'

import { useEffect, useState } from 'react'
import { getIdToken } from '@/utils/auth'
import LoginMenuButton from '@/components/LoginMenu'

type Favorite = {
  id: string
  title: string
  content: string
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFavorites = async () => {
    try {
      setLoading(true)
      setError(null)

      const token = await getIdToken()
      if (!token) {
        throw new Error('認証トークンが取得できません')
      }

      const res = await fetch('http://localhost:8000/api/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`エラーが発生しました (${res.status})`)
      }

      const data = await res.json()
      setFavorites(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans p-8 flex flex-col items-center gap-6">
      {/* ヘッダー */}
      <div className="flex justify-between w-full max-w-3xl items-center">
        <h1 className="text-3xl font-bold text-[#443627]">お気に入り一覧</h1>
        <LoginMenuButton />
      </div>

      {loading && <p className="text-gray-500">読み込み中...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* お気に入りリスト */}
      <div className="w-full max-w-3xl space-y-4">
        {favorites.length === 0 && !loading ? (
          <p className="text-gray-400 text-center">お気に入りはまだ登録されていません。</p>
        ) : (
          favorites.map((fav) => (
            <div
              key={fav.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <h2 className="text-xl font-semibold text-[#443627]">{fav.title}</h2>
              <p className="text-gray-600 mt-1 whitespace-pre-wrap">{fav.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
