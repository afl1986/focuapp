import { MantineProvider } from '@mantine/core'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'

import { api } from '@/shared/utils/api'

import '@/styles/globals.css'
import '@mantine/core/styles.css'
import { theme } from 'theme'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
