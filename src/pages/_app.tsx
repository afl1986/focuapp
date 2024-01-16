import { cn } from '@/shared/lib'
import { api } from '@/shared/utils/api'
import { GeistSans } from 'geist/font/sans'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'

import { ThemeProvider } from '@/shared/components/theme-provider.tsx'
import '@/styles/globals.css'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <main
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            GeistSans.variable,
          )}
        >
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
