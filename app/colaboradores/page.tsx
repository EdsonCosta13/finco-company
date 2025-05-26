"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Filter, 
  Search, 
  MoreHorizontal, 
  Plus, 
  UserPlus, 
  Mail, 
  Trash, 
  UserMinus, 
  Shield, 
  CheckCircle2, 
  Clock, 
  XCircle 
} from "lucide-react"

// Mock data for collaborators
const mockCollaborators = [
  {
    id: "col-001",
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    role: "Administrador",
    status: "active",
    lastActive: "2024-03-15",
    avatar: "",
  },
  {
    id: "col-002",
    name: "Maria Oliveira",
    email: "maria.oliveira@exemplo.com",
    role: "Gestor",
    status: "active",
    lastActive: "2024-03-14",
    avatar: "",
  },
  {
    id: "col-003",
    name: "Carlos Santos",
    email: "carlos.santos@exemplo.com",
    role: "Colaborador",
    status: "inactive",
    lastActive: "2024-02-28",
    avatar: "",
  },
  {
    id: "col-004",
    name: "Ana Costa",
    email: "ana.costa@exemplo.com",
    role: "Colaborador",
    status: "pending",
    lastActive: "-",
    avatar: "",
  },
  {
    id: "col-005",
    name: "Pedro Sousa",
    email: "pedro.sousa@exemplo.com",
    role: "Gestor",
    status: "active",
    lastActive: "2024-03-15",
    avatar: "",
  },
]

export default function ColaboradoresPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  
  // Filter collaborators based on search and active tab
  const filteredCollaborators = mockCollaborators.filter(collaborator => {
    const matchesSearch = 
      collaborator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collaborator.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collaborator.role.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && collaborator.status === "active"
    if (activeTab === "inactive") return matchesSearch && collaborator.status === "inactive"
    if (activeTab === "pending") return matchesSearch && collaborator.status === "pending"
    
    return matchesSearch
  })

  // Format date
  const formatDate = (dateString: string) => {
    if (dateString === "-") return "-"
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  // Get badge variant based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "inactive":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "default"
    }
  }

  // Get badge text based on status
  const getBadgeText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo"
      case "inactive":
        return "Inativo"
      case "pending":
        return "Pendente"
      default:
        return status
    }
  }

  // Get badge icon based on status
  const getBadgeIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="mr-1 h-3 w-3" />
      case "inactive":
        return <XCircle className="mr-1 h-3 w-3" />
      case "pending":
        return <Clock className="mr-1 h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Colaboradores</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Convidar Colaborador
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Convidar Colaborador</DialogTitle>
                <DialogDescription>
                  Envie um convite para um novo colaborador se juntar à sua equipe.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" placeholder="colaborador@exemplo.com" />
                  <p className="text-xs text-muted-foreground">
                    O convite será enviado para este endereço de email.
                  </p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">Cargo</label>
                  <select 
                    id="role" 
                    className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="" disabled selected>Selecione um cargo</option>
                    <option value="colaborador">Colaborador</option>
                    <option value="gestor">Gestor</option>
                    <option value="administrador">Administrador</option>
                  </select>
                  <p className="text-xs text-muted-foreground">
                    O nível de acesso que o colaborador terá.
                  </p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Mensagem (opcional)</label>
                  <textarea 
                    id="message" 
                    className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    placeholder="Olá! Gostaria de convidá-lo para juntar-se à nossa equipe..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Enviar Convite</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Colaboradores</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCollaborators.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Colaboradores Ativos</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCollaborators.filter(c => c.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Convites Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCollaborators.filter(c => c.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administradores</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCollaborators.filter(c => c.role === "Administrador").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Buscar colaborador..." 
            className="w-full pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs 
          defaultValue="all" 
          className="w-full sm:w-auto"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Ativos</TabsTrigger>
            <TabsTrigger value="inactive">Inativos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Collaborators table */}
      <Card>
        <CardHeader>
          <CardTitle>Equipe</CardTitle>
          <CardDescription>Gerencie os colaboradores da sua empresa.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Colaborador</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Último Acesso</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCollaborators.length > 0 ? (
                filteredCollaborators.map((collaborator) => (
                  <TableRow key={collaborator.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={collaborator.avatar} />
                          <AvatarFallback>
                            {collaborator.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{collaborator.name}</p>
                          <p className="text-sm text-muted-foreground">{collaborator.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{collaborator.role}</TableCell>
                    <TableCell>
                      <Badge className="flex w-fit items-center gap-1" variant={getBadgeVariant(collaborator.status) as any}>
                        {getBadgeIcon(collaborator.status)}
                        {getBadgeText(collaborator.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(collaborator.lastActive)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Enviar mensagem
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Alterar cargo
                          </DropdownMenuItem>
                          {collaborator.status === "active" && (
                            <DropdownMenuItem>
                              <UserMinus className="mr-2 h-4 w-4" />
                              Desativar conta
                            </DropdownMenuItem>
                          )}
                          {collaborator.status === "inactive" && (
                            <DropdownMenuItem>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Reativar conta
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Remover colaborador
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    Nenhum colaborador encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
