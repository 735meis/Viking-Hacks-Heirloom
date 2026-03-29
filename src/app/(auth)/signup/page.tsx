'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { toast } from 'sonner'

type Role = 'owner' | 'beneficiary'

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('owner')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()

    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error || !data.user) {
      toast.error(error?.message ?? 'Sign up failed')
      setLoading(false)
      return
    }

    const userId = data.user.id

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({ id: userId, email, role, full_name: fullName })

    if (profileError) {
      toast.error('Failed to create profile: ' + profileError.message)
      setLoading(false)
      return
    }

    if (role === 'owner') {
      const { error: vaultError } = await supabase
        .from('vaults')
        .insert({ owner_id: userId, title: 'My Heirloom' })

      if (vaultError) {
        toast.error('Failed to create vault: ' + vaultError.message)
        setLoading(false)
        return
      }

      router.push('/dashboard')
    } else {
      router.push('/vault')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md border border-stone-200 shadow-sm">
        <CardHeader className="text-center pb-2">
          <h1
            className="text-3xl font-serif tracking-tight"
            style={{ color: '#8B5E6A' }}
          >
            Heirloom
          </h1>
          <p className="text-sm text-stone-500 mt-1">Create your account</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role selector */}
            <div className="space-y-2">
              <Label>I am…</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('owner')}
                  className={`rounded-xl border-2 p-4 text-left transition-all ${
                    role === 'owner'
                      ? 'border-[#8B5E6A] bg-[#F5E8EC]'
                      : 'border-stone-200 bg-card hover:border-stone-300'
                  }`}
                >
                  <div className="text-lg mb-1">🏠</div>
                  <div className="font-medium text-sm text-stone-800">Setting up my Heirloom</div>
                  <div className="text-xs text-stone-500 mt-0.5">I want to organize my digital estate</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('beneficiary')}
                  className={`rounded-xl border-2 p-4 text-left transition-all ${
                    role === 'beneficiary'
                      ? 'border-[#8B5E6A] bg-[#F5E8EC]'
                      : 'border-stone-200 bg-card hover:border-stone-300'
                  }`}
                >
                  <div className="text-lg mb-1">💌</div>
                  <div className="font-medium text-sm text-stone-800">I received a vault link</div>
                  <div className="text-xs text-stone-500 mt-0.5">I was named as a beneficiary</div>
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Jane Smith"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full text-white"
              style={{ backgroundColor: '#8B5E6A' }}
              disabled={loading}
            >
              {loading ? 'Creating account…' : 'Create account'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-stone-500">
            Already have an account?{' '}
            <Link href="/login" className="underline" style={{ color: '#8B5E6A' }}>
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
