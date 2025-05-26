"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useCookies } from "react-cookie"

import {
  LayoutDashboard,
  Wallet,
  Users,
  Mail,
  BadgeDollarSign,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarState = {
  collapsed: boolean
}

export function Sidebar({
  children,
  className,
  isCollapsed: isCollapsedProp,
  onCollapsedChange,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  isCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}) {
  const pathname = usePathname()
  const [cookies, setCookie] = useCookies([SIDEBAR_COOKIE_NAME])
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(
    isCollapsedProp !== undefined
      ? isCollapsedProp
      : cookies[SIDEBAR_COOKIE_NAME]
      ? JSON.parse(cookies[SIDEBAR_COOKIE_NAME]).collapsed
      : false
  )

  React.useEffect(() => {
    if (isCollapsedProp !== undefined) {
      setIsCollapsed(isCollapsedProp)
    }
  }, [isCollapsedProp])

  // Handle browser resize
  const handleResize = React.useCallback(() => {
    if (isCollapsedProp !== undefined) return
    if (isMobile) {
      setIsCollapsed(true)
    }
  }, [isCollapsedProp, isMobile])

  React.useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  // Persist collapsed state in cookie
  React.useEffect(() => {
    setCookie(
      SIDEBAR_COOKIE_NAME,
      JSON.stringify({ collapsed: isCollapsed }),
      { maxAge: SIDEBAR_COOKIE_MAX_AGE }
    )
    onCollapsedChange?.(isCollapsed)
  }, [isCollapsed, setCookie, onCollapsedChange])

  // Toggle collapsed state with keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsCollapsed(prev => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div
      className={cn(
        "bg-sidebar border-r border-sidebar-border z-20 flex h-screen flex-col",
        isCollapsed ? "w-[--sidebar-width-icon]" : "w-[--sidebar-width]",
        className
      )}
      style={{
        "--sidebar-width": isMobile ? SIDEBAR_WIDTH_MOBILE : SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
      } as React.CSSProperties}
      data-collapsed={isCollapsed}
      {...props}
    >
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
        {children}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 md:hidden"
        onClick={() => setIsCollapsed(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute -right-4 top-24 hidden h-7 w-7 rounded-full border bg-background md:flex",
          isCollapsed ? "rotate-0" : "rotate-180"
        )}
        onClick={() => setIsCollapsed(prev => !prev)}
      >
        <ChevronRight className="h-3 w-3" />
      </Button>
    </div>
  )
}

export function SidebarHeader({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { isCollapsed } = useSidebar()
  
  return (
    <div
      className={cn(
        "flex h-16 items-center border-b border-sidebar-border px-4",
        isCollapsed ? "justify-center" : "justify-between",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("px-3", className)} {...props} />
}

export function SidebarMenu({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      className={cn("flex flex-col gap-1 px-2", className)}
      {...props}
    />
  )
}

export function SidebarMenuItems() {
  const pathname = usePathname()
  
  const navItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      title: "Carteira",
      icon: <Wallet className="h-5 w-5" />,
      href: "/carteira",
      active: pathname === "/carteira",
    },
    {
      title: "Empréstimos",
      icon: <BadgeDollarSign className="h-5 w-5" />,
      href: "/emprestimos",
      active: pathname === "/emprestimos",
    },
    {
      title: "Colaboradores",
      icon: <Users className="h-5 w-5" />,
      href: "/colaboradores",
      active: pathname === "/colaboradores",
    },
    {
      title: "Convites",
      icon: <Mail className="h-5 w-5" />,
      href: "/convites",
      active: pathname === "/convites",
    },
    {
      title: "Configurações",
      icon: <Settings className="h-5 w-5" />,
      href: "/configuracoes",
      active: pathname === "/configuracoes",
    },
  ]
  
  return (
    <>
      {navItems.map((item) => (
        <SidebarMenuItem 
          key={item.href}
          icon={item.icon}
          href={item.href}
          active={item.active}
        >
          {item.title}
        </SidebarMenuItem>
      ))}
    </>
  )
}

export function SidebarMenuItem({
  className,
  children,
  icon,
  href,
  active,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & {
  icon?: React.ReactNode
  href: string
  active?: boolean
}) {
  const { isCollapsed } = useSidebar()
  
  return (
    <Link
      href={href}
      className={cn(
        "flex h-9 items-center rounded-md px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        active && "bg-sidebar-accent font-medium text-sidebar-accent-foreground",
        isCollapsed && "justify-center px-2",
        className
      )}
      {...props}
    >
      {icon && (
        <span className={cn("mr-2", isCollapsed && "mr-0")}>{icon}</span>
      )}
      {!isCollapsed && <span>{children}</span>}
    </Link>
  )
}

export function SidebarFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "mt-auto border-t border-sidebar-border p-4",
        className
      )}
      {...props}
    />
  )
}

export function SidebarLogoutButton() {
  const { isCollapsed } = useSidebar()
  
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isCollapsed && "justify-center"
      )}
    >
      <LogOut className="mr-2 h-5 w-5" />
      {!isCollapsed && <span>Sair</span>}
    </Button>
  )
}

// Context for sidebar state
interface SidebarContextValue {
  isCollapsed: boolean
}

const SidebarContext = React.createContext<SidebarContextValue>({
  isCollapsed: false,
})

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function SidebarProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: SidebarContextValue
}) {
  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}

// Export components for usage
export function SidebarRail() {
  return null // Implementation omitted for brevity
}

export function SidebarGroup() {
  return null // Implementation omitted for brevity
}

export function SidebarGroupLabel() {
  return null // Implementation omitted for brevity
}

export function SidebarGroupContent() {
  return null // Implementation omitted for brevity
}

export function SidebarMenuButton() {
  return null // Implementation omitted for brevity
}
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

