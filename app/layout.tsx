import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '3D Battery Component',
  description: 'Interactive 3D battery visualization',
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
