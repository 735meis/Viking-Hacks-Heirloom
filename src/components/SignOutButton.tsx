'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

export default function SignOutButton() {
  const router = useRouter()
  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }
  return (
    <Button variant="outline" size="sm" onClick={handleSignOut} className="border-stone-300">
      Sign out
    </Button>
  )
}
