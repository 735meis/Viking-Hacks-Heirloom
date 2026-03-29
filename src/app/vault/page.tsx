import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import SignOutButton from '@/components/SignOutButton'

type Section = 'accounts' | 'subscriptions' | 'documents' | 'letters'

interface VaultItem {
  id: string
  section: Section
  title: string
  data: Record<string, string>
}

const SECTION_LABELS: Record<Section, string> = {
  accounts: 'Accounts',
  subscriptions: 'Subscriptions',
  documents: 'Documents',
  letters: 'Letters',
}

export default async function VaultPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'beneficiary') redirect('/dashboard')

  const admin = createAdminClient()

  // Find vault linked to this beneficiary by email
  const { data: beneficiary } = await admin
    .from('beneficiaries')
    .select('vault_id')
    .eq('beneficiary_email', user.email!)
    .maybeSingle()

  if (!beneficiary) {
    return (
      <LockedScreen
        message="You haven't been linked to any vault yet."
        sub="The vault owner needs to add you as a beneficiary."
        userEmail={user.email!}
      />
    )
  }

  const { data: vault } = await admin
    .from('vaults')
    .select('id, is_unlocked')
    .eq('id', beneficiary.vault_id)
    .single()

  if (!vault?.is_unlocked) {
    return (
      <LockedScreen
        message="This vault is not yet available."
        sub="Access will be granted when an administrator unlocks it."
        userEmail={user.email!}
      />
    )
  }

  const { data: items } = await admin
    .from('vault_items')
    .select('id, section, title, data')
    .eq('vault_id', vault.id)
    .order('created_at', { ascending: true })

  const allItems = (items ?? []) as VaultItem[]
  const sections = (['accounts', 'subscriptions', 'documents', 'letters'] as Section[])
    .filter(s => allItems.some(i => i.section === s))

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-serif" style={{ color: '#8B5E6A' }}>Heirloom</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-stone-500 hidden sm:block">{user.email}</span>
          <SignOutButton />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-serif text-stone-800">
            {profile?.full_name ? `${profile.full_name},` : 'Hello,'} this was left for you.
          </h2>
          <p className="text-stone-500 mt-2 text-sm">Everything is organized. Take your time.</p>
        </div>

        {sections.length === 0 && (
          <p className="text-center text-stone-400 text-sm">The vault is empty.</p>
        )}

        <div className="space-y-8">
          {sections.map(section => (
            <section key={section}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
                {SECTION_LABELS[section]}
              </h3>
              <div className="space-y-3">
                {allItems.filter(i => i.section === section).map(item => (
                  <VaultItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

function VaultItemCard({ item }: { item: VaultItem }) {
  if (item.section === 'letters') {
    return (
      <div
        className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-6 shadow-sm"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        <p className="text-xs text-stone-400 mb-3 font-sans">To: {item.title}</p>
        <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
          {item.data.content}
        </p>
      </div>
    )
  }

  const entries = Object.entries(item.data).filter(([k, v]) => v && k !== 'title')

  const labelMap: Record<string, string> = {
    bank_name: 'Bank',
    account_type: 'Type',
    notes: 'Notes',
    monthly_cost: 'Monthly cost',
    login_email: 'Login email',
    how_to_cancel: 'How to cancel',
    document_type: 'Type',
    description: 'Description',
    location: 'Where to find it',
    recipient_name: 'Recipient',
  }

  return (
    <div className="bg-card border border-stone-200 rounded-xl p-4 shadow-sm">
      <p className="font-medium text-stone-800 mb-2">{item.title}</p>
      <dl className="space-y-1">
        {entries.map(([key, value]) => (
          <div key={key} className="flex gap-2 text-sm">
            <dt className="text-stone-400 shrink-0 min-w-[110px]">
              {labelMap[key] ?? key}
            </dt>
            <dd className="text-stone-600 whitespace-pre-wrap">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function LockedScreen({ message, sub, userEmail }: { message: string; sub: string; userEmail: string }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-serif" style={{ color: '#8B5E6A' }}>Heirloom</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-stone-500 hidden sm:block">{userEmail}</span>
          <SignOutButton />
        </div>
      </header>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-serif text-stone-700 mb-2">{message}</h2>
        <p className="text-sm text-stone-400">{sub}</p>
      </div>
    </div>
  )
}
