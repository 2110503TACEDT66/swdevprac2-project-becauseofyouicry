import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import TopMenu from '@/components/TopMenu'
import NextAuthProvider from '@/providers/NextAuthProvider'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>
        <TopMenu/>
        {children}
        </NextAuthProvider>
        </body>
    </html>
  );
}