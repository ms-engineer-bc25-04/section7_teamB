//お気に入り一覧ページ
'use client'

import { useEffect, useState } from 'react'
import getIdToken from '@/utils/auth'
import LoginMenuButton from '@/components/LoginMenu'
import { z } from 'zod'

type Favorite = {
  id: string
  title: string
  content: string
}

// Zodバリデーションスキーマ
const favoriteSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(50, 'タイトルは50文字以内'),
  content: z.string().min(1, '作り方は必須です').max(1000, '作り方は1000文字以内'),
})

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // 編集モーダル
  const [editTarget, setEditTarget] = useState<Favorite | null>(null)
  const [form, setForm] = useState({ title: '', content: '' })
  const [formError, setFormError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // お気に入り一覧取得
  const fetchFavorites = async () => {
    try {
      setLoading(true)
      setError(null)

      const token = await getIdToken()
      if (!token) throw new Error('認証トークンが取得できません')

      const res = await fetch('http://localhost:8000/api/favorites', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error(`エラーが発生しました (${res.status})`)

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

  // 編集モーダルを開く
  const openEditModal = (fav: Favorite) => {
    setEditTarget(fav)
    setForm({ title: fav.title, content: fav.content })
    setFormError(null)
  }
  // 編集モーダルを閉じる
  const closeEditModal = () => {
    setEditTarget(null)
    setForm({ title: '', content: '' })
    setFormError(null)
  }

  // 編集保存
  const handleEditSave = async () => {
    setSaving(true)
    setFormError(null)
    try {
      favoriteSchema.parse(form) // Zodバリデーション
      const token = await getIdToken()
      const res = await fetch(`http://localhost:8000/api/favorites/${editTarget?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('更新に失敗しました')
      closeEditModal()
      fetchFavorites() // 一覧を再取得
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setFormError(err.errors[0].message)
      } else {
        setFormError((err as Error).message)
      }
    } finally {
      setSaving(false)
    }
  }

  // 削除
  const handleDelete = async (id: string) => {
    if (!confirm('本当に削除しますか？')) return
    setDeleting(true)
    try {
      const token = await getIdToken()
      await fetch(`http://localhost:8000/api/favorites/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchFavorites()
    } catch (err) {
      alert('削除に失敗しました')
    } finally {
      setDeleting(false)
    }
  }

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
            <div key={fav.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <h2 className="text-xl font-semibold text-[#443627]">{fav.title}</h2>
              <p className="text-gray-600 mt-1 whitespace-pre-wrap">{fav.content}</p>
              <div className="flex gap-2 mt-2">
                <button
                  className="px-3 py-1 rounded bg-blue-100 hover:bg-blue-200"
                  onClick={() => openEditModal(fav)}
                >
                  ✏️ 編集
                </button>
                <button
                  className="px-3 py-1 rounded bg-red-100 hover:bg-red-200"
                  onClick={() => handleDelete(fav.id)}
                  disabled={deleting}
                >
                  🗑️ 削除
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 編集モーダル */}
      {editTarget && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">⭐️ お気に入りレシピ編集</h2>
            <div className="mb-2">
              <input
                className="w-full px-3 py-2 border rounded mb-2"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                maxLength={50}
                placeholder="レシピタイトル"
              />
            </div>
            <div className="mb-2">
              <textarea
                className="w-full px-3 py-2 border rounded"
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                maxLength={1000}
                placeholder="作り方"
              />
            </div>
            {formError && <div className="text-red-500 mb-2">{formError}</div>}
            <div className="flex gap-4 mt-4">
              <button
                className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded"
                onClick={handleEditSave}
                disabled={saving}
              >
                {saving ? '保存中...' : '💾 保存'}
              </button>
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded"
                onClick={closeEditModal}
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
