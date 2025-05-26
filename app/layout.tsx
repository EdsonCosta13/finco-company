import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { AppSidebar } from "@/components/app-sidebar"
import { Footer } from "@/components/footer"
import { CookiesProvider } from "react-cookie"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FinCo - Crédito Colaborativo",
  description: "Plataforma de crédito colaborativo que conecta investidores e tomadores de empréstimo",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CookiesProvider>
            <div className="flex min-h-screen">
              <AppSidebar />
                  <main className="flex-1 ml-[3rem] md:ml-[16rem] transition-[margin]">{children}</main>
                </div>
              </CookiesProvider>
            </ThemeProvider>
          </body>
        </html>
      )
    }