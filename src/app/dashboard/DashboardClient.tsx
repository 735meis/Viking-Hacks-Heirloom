'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Trash2, Plus } from 'lucide-react'

type Section = 'accounts' | 'subscriptions' | 'documents' | 'letters'

interface VaultItem {
  id: string
  vault_id: string
  section: Section
  title: string
  data: Record<string, string>
  created_at: string
}

interface FieldConfig {
  key: string
  label: string
  placeholder?: string
  isTitle?: boolean
  multiline?: boolean
  rows?: number
}

const SECTION_LABELS: Record<Section, string> = {
  accounts: 'Accounts',
  subscriptions: 'Subscriptions',
  documents: 'Documents',
  letters: 'Letters',
}

const SECTION_FIELDS: Record<Section, FieldConfig[]> = {
  accounts: [
    { key: 'title', label: 'Account Name', placeholder: 'Chase Checking', isTitle: true },
    { key: 'bank_name', label: 'Bank', placeholder: 'Chase Bank' },
    { key: 'account_type', label: 'Type', placeholder: 'Checking, Savings, Investment…' },
    { key: 'notes', label: 'Notes', placeholder: 'Any additional details', multiline: true },
  ],
  subscriptions: [
    { key: 'title', label: 'Service Name', placeholder: 'Netflix', isTitle: true },
    { key: 'monthly_cost', label: 'Monthly Cost', placeholder: '$15.99' },
    { key: 'login_email', label: 'Login Email', placeholder: 'john@gmail.com' },
    { key: 'how_to_cancel', label: 'How to Cancel', placeholder: 'Go to account settings → Cancel membership', multiline: true },
  ],
  documents: [
    { key: 'title', label: 'Document Name', placeholder: 'Life Insurance Policy', isTitle: true },
    { key: 'document_type', label: 'Type', placeholder: 'Insurance Policy, Will, Deed…' },
    { key: 'description', label: 'Description', placeholder: 'What is this document?', multiline: true },
    { key: 'location', label: 'Where to Find It', placeholder: 'Bottom drawer of office desk', multiline: true },
  ],
  letters: [
    { key: 'recipient_name', label: 'To', placeholder: 'Sarah', isTitle: true },
    { key: 'content', label: 'Letter', placeholder: "Sarah, if you're reading this…", multiline: true, rows: 8 },
  ],
}

interface Props {
  vaultId: string
  initialItems: VaultItem[]
  userName: string
  userEmail: string
}

export default function DashboardClient({ vaultId, initialItems, userName, userEmail }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const [items, setItems] = useState<VaultItem[]>(initialItems)
  const [activeSection, setActiveSection] = useState<Section>('accounts')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  const sectionItems = items.filter(item => item.section === activeSection)

  function openAddDialog() {
    setFormValues({})
    setDialogOpen(true)
  }

  async function handleAdd() {
    const fields = SECTION_FIELDS[activeSection]
    const titleField = fields.find(f => f.isTitle)
    const title = formValues[titleField?.key ?? 'title']?.trim()
    if (!title) {
      toast.error(`${titleField?.label ?? 'Name'} is required`)
      return
    }

    const data: Record<string, string> = {}
    fields.forEach(f => { data[f.key] = formValues[f.key] ?? '' })

    setSaving(true)
    const { data: newItem, error } = await supabase
      .from('vault_items')
      .insert({ vault_id: vaultId, section: activeSection, title, data })
      .select()
      .single()

    setSaving(false)
    if (error) { toast.error('Failed to save: ' + error.message); return }
    setItems(prev => [newItem as VaultItem, ...prev])
    setDialogOpen(false)
    toast.success('Saved')
  }

  async function handleDelete(itemId: string) {
    const { error } = await supabase.from('vault_items').delete().eq('id', itemId)
    if (error) { toast.error('Failed to delete'); return }
    setItems(prev => prev.filter(i => i.id !== itemId))
    toast.success('Deleted')
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="bg-card border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-serif" style={{ color: '#8B5E6A' }}>Heirloom</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-stone-500 hidden sm:block">{userEmail}</span>
          <Button variant="outline" size="sm" onClick={handleSignOut} className="border-stone-300">
            Sign out
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-stone-800">
            {userName}&apos;s Vault
          </h2>
          <p className="text-sm text-stone-500 mt-0.5">Add and manage what you&apos;re leaving behind.</p>
        </div>

        <Tabs value={activeSection} onValueChange={v => setActiveSection(v as Section)}>
          <TabsList className="mb-6 bg-stone-100 w-full sm:w-auto">
            {(Object.keys(SECTION_LABELS) as Section[]).map(s => (
              <TabsTrigger key={s} value={s} className="relative">
                {SECTION_LABELS[s]}
                {items.filter(i => i.section === s).length > 0 && (
                  <Badge
                    className="ml-1.5 text-white text-[10px] h-4 px-1.5"
                    style={{ backgroundColor: '#8B5E6A' }}
                  >
                    {items.filter(i => i.section === s).length}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {(Object.keys(SECTION_LABELS) as Section[]).map(s => (
            <TabsContent key={s} value={s}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-stone-700">{SECTION_LABELS[s]}</h3>
                <Button
                  size="sm"
                  onClick={openAddDialog}
                  className="text-white gap-1"
                  style={{ backgroundColor: '#8B5E6A' }}
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>

              {sectionItems.length === 0 ? (
                <div className="text-center py-16 text-stone-400 border border-dashed border-stone-200 rounded-xl">
                  <p className="text-sm">No {SECTION_LABELS[s].toLowerCase()} yet.</p>
                  <button
                    onClick={openAddDialog}
                    className="mt-2 text-sm underline"
                    style={{ color: '#8B5E6A' }}
                  >
                    Add the first one
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {sectionItems.map(item => (
                    <ItemCard key={item.id} item={item} onDelete={handleDelete} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Add Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add {SECTION_LABELS[activeSection]}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {SECTION_FIELDS[activeSection].map(field => (
              <div key={field.key} className="space-y-1.5">
                <Label>{field.label}</Label>
                {field.multiline ? (
                  <Textarea
                    value={formValues[field.key] ?? ''}
                    onChange={e => setFormValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    rows={field.rows ?? 3}
                  />
                ) : (
                  <Input
                    value={formValues[field.key] ?? ''}
                    onChange={e => setFormValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleAdd}
              disabled={saving}
              className="text-white"
              style={{ backgroundColor: '#8B5E6A' }}
            >
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ItemCard({ item, onDelete }: { item: VaultItem; onDelete: (id: string) => void }) {
  const fields = SECTION_FIELDS[item.section as Section].filter(f => !f.isTitle)
  const nonEmptyFields = fields.filter(f => item.data[f.key])

  return (
    <div className="bg-card border border-stone-200 rounded-xl p-4 flex justify-between items-start gap-4 shadow-sm">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-stone-800">
          {item.section === 'letters' ? `To: ${item.title}` : item.title}
        </p>
        {nonEmptyFields.slice(0, 3).map(f => (
          item.data[f.key] && (
            <p key={f.key} className="text-sm text-stone-500 mt-0.5 truncate">
              <span className="text-stone-400">{f.label}:</span> {item.data[f.key]}
            </p>
          )
        ))}
      </div>
      <button
        onClick={() => onDelete(item.id)}
        className="text-stone-300 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
