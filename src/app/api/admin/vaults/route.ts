import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  const { admin_password } = await request.json()

  if (admin_password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()

  const { data: vaults, error } = await supabase
    .from('vaults')
    .select('id, is_unlocked, owner_id')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Enrich with owner profile info
  const enriched = await Promise.all(
    (vaults ?? []).map(async vault => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', vault.owner_id)
        .single()
      return {
        id: vault.id,
        is_unlocked: vault.is_unlocked ?? false,
        owner_email: profile?.email ?? 'Unknown',
        owner_name: profile?.full_name ?? '',
      }
    })
  )

  return NextResponse.json({ vaults: enriched })
}
