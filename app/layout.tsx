import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Colour picker',
  description: 'This app serves as a perfect tool for modern web designers, UI developers, and creative professionals to experiment and fine-tune their color choices with ease.',
  generator: 'DENNIS sABU',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
