"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 shrink-0 items-center gap-2 bg-gradient-to-r from-background via-background/98 to-background border-b border-border/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="flex items-center gap-2 px-6">
        <SidebarTrigger className="-ml-1 hover:bg-accent/80 transition-colors" />
        <Separator orientation="vertical" className="mr-2 h-4 opacity-60" />

        {/* Logo/Brand */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg hidden sm:block">Company</span>
        </div>
      </div>

      <div className="flex flex-1 items-center gap-4 px-6">


        <div className="ml-auto flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-accent/80 transition-colors">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-primary text-primary-foreground">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 border-border/60">
              <div className="p-3 border-b border-border/60">
                <h4 className="font-semibold">Notificações</h4>
              </div>
              <DropdownMenuItem className="p-3">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Novo investimento disponível</p>
                  <p className="text-xs text-muted-foreground">Empréstimo de Kzs 50.000 com taxa de 12% a.a.</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Pagamento recebido</p>
                  <p className="text-xs text-muted-foreground">Kzs 1.250,00 creditados na sua carteira</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Empréstimo aprovado</p>
                  <p className="text-xs text-muted-foreground">Seu empréstimo de Kzs 25.000 foi aprovado</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
