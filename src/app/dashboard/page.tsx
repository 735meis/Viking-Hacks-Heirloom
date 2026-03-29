import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'owner') redirect('/vault')

  const { data: vault } = await supabase
    .from('vaults')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!vault) {
    // Create vault if missing (edge case)
    const { data: newVault } = await supabase
      .from('vaults')
      .insert({ owner_id: user.id })
      .select('id')
      .single()
    if (!newVault) redirect('/login')
    const { data: items } = await supabase
      .from('vault_items')
      .select('*')
      .eq('vault_id', newVault.id)
      .order('created_at', { ascending: false })
    return (
      <DashboardClient
        vaultId={newVault.id}
        initialItems={items ?? []}
        userName={profile?.full_name ?? user.email ?? 'Owner'}
        userEmail={user.email ?? ''}
      />
    )
  }

  const { data: items } = await supabase
    .from('vault_items')
    .select('*')
    .eq('vault_id', vault.id)
    .order('created_at', { ascending: false })

  return (
    <DashboardClient
      vaultId={vault.id}
      initialItems={items ?? []}
      userName={profile?.full_name ?? user.email ?? 'Owner'}
      userEmail={user.email ?? ''}
    />
  )
}
