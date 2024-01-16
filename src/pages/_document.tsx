import { cn } from '@/shared/lib'
import { GeistSans } from 'geist/font/sans'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        className={cn(
          'bg-background font-sans antialiased',
          GeistSans.variable,
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
