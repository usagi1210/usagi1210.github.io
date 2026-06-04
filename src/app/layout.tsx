import type { Metadata } from 'next'
import { Big_Shoulders, Spectral, Geist } from 'next/font/google'
import './globals.css'

const bigShoulders = Big_Shoulders({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-display',
  display: 'swap',
})

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yuan Junhao — Computer Vision & Computational Imaging',
  description:
    'Undergraduate researcher in Computer Vision and Computational Imaging. Intelligent Science & Technology, Class of 2026.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${spectral.variable} ${geist.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
