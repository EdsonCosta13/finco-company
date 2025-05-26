import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 ml-[3rem] md:ml-[16rem] transition-[margin]">
        {children}
      </main>
    </div>
  )
} 