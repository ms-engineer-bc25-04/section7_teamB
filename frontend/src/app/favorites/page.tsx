'use client'

import { useEffect, useState } from 'react'

type Favorite = {
  id: string
  title: string
  content: string
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editId, setEditId] = useState<string | null>(null)

  // 一覧取得
  const fetchFavorites = async () => {
    const res = await fetch('http://localhost:8000/api/favorites', {
      credentials: 'include', // cookieにFirebaseのtokenなどがある場合はこれ必要
    })
    const data = await res.json()
    setFavorites(data)
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  // 追加 or 更新
  const submitFavorite = async () => {
    const method = editId ? 'PUT' : 'POST'
    const url = editId
      ? `http://localhost:8000/api/favorites/${editId}`
      : `http://localhost:8000/api/favorites`

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ title, content }),
    })

    setTitle('')
    setContent('')
    setEditId(null)
    fetchFavorites()
  }

  // 編集
  const startEdit = (fav: Favorite) => {
    setTitle(fav.title)
    setContent(fav.content)
    setEditId(fav.id)
  }

  // 削除
  const deleteFavorite = async (id: string) => {
    await fetch(`http://localhost:8000/api/favorites/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    fetchFavorites()
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">お気に入り編集</h1>

      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="タイトル"
          className="border px-2 py-1 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="内容"
          className="border px-2 py-1 w-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={submitFavorite}
        >
          {editId ? '更新する' : '追加する'}
        </button>
      </div>

      <ul className="space-y-4">
        {favorites.map((fav) => (
          <li key={fav.id} className="border p-2 rounded">
            <h2 className="font-bold">{fav.title}</h2>
            <p>{fav.content}</p>
            <div className="mt-2 space-x-2">
              <button
                className="text-blue-500"
                onClick={() => startEdit(fav)}
              >
                編集
              </button>
              <button
                className="text-red-500"
                onClick={() => deleteFavorite(fav.id)}
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
