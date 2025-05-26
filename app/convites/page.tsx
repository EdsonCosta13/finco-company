"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Mail, Check, X, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Form schema for invite creation
const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  role: z.string({
    required_error: "Por favor, selecione um cargo.",
  }),
  message: z.string().optional(),
})

// Mock data for existing invites
const mockInvites = [
  {
    id: "inv-001",
    email: "maria.silva@exemplo.com",
    role: "Colaborador",
    status: "pending",
    createdAt: "2024-03-01",
    expiresAt: "2024-03-15",
  },
  {
    id: "inv-002",
    email: "carlos.santos@exemplo.com",
    role: "Administrador",
    status: "accepted",
    createdAt: "2024-02-20",
    expiresAt: "2024-03-06",
    acceptedAt: "2024-02-21",
  },
  {
    id: "inv-003",
    email: "ana.costa@exemplo.com",
    role: "Colaborador",
    status: "expired",
    createdAt: "2024-01-15",
    expiresAt: "2024-01-29",
  },
  {
    id: "inv-004",
    email: "pedro.oliveira@exemplo.com",
    role: "Gestor",
    status: "pending",
    createdAt: "2024-02-28",
    expiresAt: "2024-03-13",
  },
  {
    id: "inv-005",
    email: "julia.martins@exemplo.com",
    role: "Colaborador",
    status: "rejected",
    createdAt: "2024-02-10",
    expiresAt: "2024-02-24",
    rejectedAt: "2024-02-12",
  },
]

export default function ConvitesPage() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "",
      message: "",
    },
  })

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically make an API call to send the invite
    console.log(values)
    
    toast({
      title: "Convite enviado",
      description: `Um convite foi enviado para ${values.email}`,
    })
    
    form.reset()
    setOpen(false)
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  // Helper function to get badge variant based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "accepted":
        return "success"
      case "rejected":
        return "destructive"
      case "expired":
        return "outline"
      default:
        return "secondary"
    }
  }

  // Helper function to get badge text
  const getBadgeText = (status: string) => {
    switch (status) {
      case "accepted":
        return "Aceito"
      case "rejected":
        return "Recusado"
      case "expired":
        return "Expirado"
      default:
        return "Pendente"
    }
  }

  // Helper function to get badge icon
  const getBadgeIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <Check className="mr-1 h-3 w-3" />
      case "rejected":
        return <X className="mr-1 h-3 w-3" />
      case "expired":
        return <Clock className="mr-1 h-3 w-3" />
      default:
        return <Clock className="mr-1 h-3 w-3" />
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Convites</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Criar Convite
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Criar Convite</DialogTitle>
              <DialogDescription>
                Envie um convite para um novo colaborador se juntar à sua equipe.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="colaborador@exemplo.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        O convite será enviado para este endereço de email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um cargo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="colaborador">Colaborador</SelectItem>
                          <SelectItem value="gestor">Gestor</SelectItem>
                          <SelectItem value="administrador">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        O nível de acesso que o colaborador terá.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem (opcional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Olá! Gostaria de convidá-lo para juntar-se à nossa equipe..." 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Enviar convite</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Convites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInvites.length}</div>
            <p className="text-xs text-muted-foreground">Desde o início</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Convites Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockInvites.filter((i) => i.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Aguardando resposta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aceitação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (mockInvites.filter((i) => i.status === "accepted").length /
                  mockInvites.filter((i) => i.status !== "pending").length) *
                  100
              )}%
            </div>
            <p className="text-xs text-muted-foreground">Baseado em convites respondidos</p>
          </CardContent>
        </Card>
      </div>

      {/* Invites list */}
      <Card>
        <CardHeader>
          <CardTitle>Convites Enviados</CardTitle>
          <CardDescription>Gerencie os convites enviados aos seus colaboradores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInvites.map((invite) => (
              <div
                key={invite.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{invite.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Cargo: {invite.role} • Enviado em: {formatDate(invite.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="text-right flex flex-col gap-2 items-end">
                  <Badge className="flex items-center" variant={getBadgeVariant(invite.status) as any}>
                    {getBadgeIcon(invite.status)}
                    {getBadgeText(invite.status)}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {invite.status === "pending" 
                      ? `Expira em ${formatDate(invite.expiresAt)}` 
                      : invite.status === "accepted" 
                      ? `Aceito em ${formatDate(invite.acceptedAt!)}` 
                      : invite.status === "rejected" 
                      ? `Recusado em ${formatDate(invite.rejectedAt!)}` 
                      : `Expirado em ${formatDate(invite.expiresAt)}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
