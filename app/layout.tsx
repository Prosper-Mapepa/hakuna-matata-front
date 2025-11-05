import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hakuna Matata Party - RSVP',
  description: 'RSVP for the Hakuna Matata Party',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

