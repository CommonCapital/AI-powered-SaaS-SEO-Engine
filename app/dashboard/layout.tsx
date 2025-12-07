import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/')
  }
  
  return (
    <div>
      {children}
    </div>
  )
}

export default Layout