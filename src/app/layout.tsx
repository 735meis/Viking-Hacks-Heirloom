import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import CursorHalo from '@/components/CursorHalo'
import FloatingPetals from '@/components/FloatingPetals'
import Butterflies from '@/components/Butterflies'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Heirloom — Leave nothing behind',
  description: 'Organize your entire digital life into one secure vault for the people you love.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background">
        <FloatingPetals />
        <Butterflies />
        <CursorHalo />
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
