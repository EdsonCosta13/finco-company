"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarFooter as SidebarFooterComponent,
  SidebarLogoutButton,
  SidebarMenuItems,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Dados de navegação para crédito colaborativo
const data = {
  user: {
    name: "João Silva",
    email: "joao@exemplo.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  navMain: [
    {
      title: "Visão Geral",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: "Home",
        }
      ],
    },
    {
      title: "Colaboradores",
      items: [
        {
          title: "Gerir Colaboradores",
          url: "/emprestimos/solicitar",
          icon: "CreditCard",
        },
        {
          title: "Convites",
          url: "/emprestimos/solicitar",
          icon: "CreditCard",
        }
      ],
    },
    {
      title: "Finanças",
      items: [
        {
          title: "Empréstimos",
          url: "/emprestimos/solicitar",
          icon: "CreditCard",
        },
        {
          title: "Investimentos",
          url: "/emprestimos/solicitar",
          icon: "CreditCard",
        }
      ],
    },
  ],
}

export function AppSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <SidebarProvider value={{ isCollapsed }}>
      <Sidebar 
        isCollapsed={isCollapsed}
        onCollapsedChange={setIsCollapsed}
        className="fixed left-0 top-0 z-30"
      >
        <SidebarHeader>
          <div className="flex items-center gap-2">
            {!isCollapsed ? (
              <>
                {/* Replace with your logo */}
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  F
                </div>
                <span className="font-semibold text-xl text-sidebar-foreground">Finco</span>
              </>
            ) : (
              /* Logo only for collapsed state */
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                F
              </div>
            )}
          </div>
        </SidebarHeader>
        
        <SidebarContent className="mt-4">
          <SidebarMenu>
            <SidebarMenuItems />
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooterComponent>
          <SidebarLogoutButton />
        </SidebarFooterComponent>
      </Sidebar>
    </SidebarProvider>
  )
}
