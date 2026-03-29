'use client'

import { useState } from 'react'
import { createAdminClient } from '@/lib/supabase/admin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

interface Vault {
  id: string
  is_unlocked: boolean
  owner_email: string
  owner_name: string
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [vaults, setVaults] = useState<Vault[]>([])
  const [loading, setLoading] = useState(false)
  const [unlocking, setUnlocking] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/admin/vaults', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ admin_password: password }),
    })

    setLoading(false)
    if (!res.ok) { toast.error('Wrong password'); return }
    const data = await res.json()
    setVaults(data.vaults)
    setAuthed(true)
  }

  async function handleUnlock(vaultId: string) {
    setUnlocking(vaultId)
    const res = await fetch('/api/admin/unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vault_id: vaultId, admin_password: password }),
    })

    setUnlocking(null)
    if (!res.ok) { toast.error('Failed to unlock'); return }
    setVaults(prev => prev.map(v => v.id === vaultId ? { ...v, is_unlocked: true } : v))
    toast.success('Vault unlocked')
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-serif text-center mb-6" style={{ color: '#8B5E6A' }}>
            Admin Panel
          </h1>
          <form onSubmit={handleLogin} className="space-y-4 bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
            <div className="space-y-1.5">
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full text-white"
              style={{ backgroundColor: '#8B5E6A' }}
              disabled={loading}
            >
              {loading ? 'Verifying…' : 'Enter'}
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 px-6 py-4">
        <h1 className="text-2xl font-serif" style={{ color: '#8B5E6A' }}>Admin Panel</h1>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-400 mb-4">
          All Vaults
        </h2>

        {vaults.length === 0 && (
          <p className="text-stone-400 text-sm">No vaults found.</p>
        )}

        <div className="space-y-3">
          {vaults.map(vault => (
            <div
              key={vault.id}
              className="bg-white border border-stone-200 rounded-xl p-4 flex items-center justify-between shadow-sm"
            >
              <div>
                <p className="font-medium text-stone-800">{vault.owner_name || vault.owner_email}</p>
                <p className="text-sm text-stone-400">{vault.owner_email}</p>
                <p className="text-xs mt-1">
                  {vault.is_unlocked ? (
                    <span className="text-green-600 font-medium">✓ Unlocked</span>
                  ) : (
                    <span className="text-stone-400">Locked</span>
                  )}
                </p>
              </div>

              {!vault.is_unlocked && (
                <Button
                  onClick={() => handleUnlock(vault.id)}
                  disabled={unlocking === vault.id}
                  className="text-white"
                  style={{ backgroundColor: '#8B5E6A' }}
                >
                  {unlocking === vault.id ? 'Unlocking…' : 'Unlock Vault'}
                </Button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
