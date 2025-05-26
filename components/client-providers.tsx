"use client"

import { Providers } from "@/components/providers"
import { ThemeProvider } from "@/components/theme-provider"
import { CookiesProvider } from "react-cookie"

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <CookiesProvider>
        {children}
      </CookiesProvider>
    </ThemeProvider>
  )
}
