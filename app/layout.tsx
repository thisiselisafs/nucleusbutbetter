import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  weight: ['400', '600'],
  style: ['normal', 'italic']
})

export const metadata: Metadata = {
  title: 'Embryo Insights Demo',
  description: 'A high-fidelity iPad demo of an embryo analysis application.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-beige-100 text-stone-800 antialiased h-screen overflow-hidden flex items-center justify-center`}>
        <div id="root" className="w-full h-full flex items-center justify-center">
           {children}
        </div>
      </body>
    </html>
  )
}