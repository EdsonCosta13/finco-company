"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Minus,
  TrendingUp,
  DollarSign,
  CreditCard,
  Download,
  Filter,
  Eye,
  EyeOff,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function CarteiraPage() {
  const [showBalance, setShowBalance] = useState(true)

  const transacoes = [
    {
      id: "1",
      tipo: "entrada",
      descricao: "Rendimento - Empréstimo #001",
      valor: 1250.0,
      data: "2024-01-15",
      status: "concluida",
      categoria: "rendimento",
    },
    {
      id: "2",
      tipo: "saida",
      descricao: "Investimento - João Santos",
      valor: 5000.0,
      data: "2024-01-14",
      status: "concluida",
      categoria: "investimento",
    },
    {
      id: "3",
      tipo: "entrada",
      descricao: "Depósito via PIX",
      valor: 10000.0,
      data: "2024-01-13",
      status: "concluida",
      categoria: "deposito",
    },
    {
      id: "4",
      tipo: "saida",
      descricao: "Saque para conta corrente",
      valor: 2500.0,
      data: "2024-01-12",
      status: "processando",
      categoria: "saque",
    },
    {
      id: "5",
      tipo: "entrada",
      descricao: "Rendimento - Empréstimo #002",
      valor: 875.5,
      data: "2024-01-11",
      status: "concluida",
      categoria: "rendimento",
    },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "Kzs",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Carteira</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Extrato
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Transação
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                Depositar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Minus className="mr-2 h-4 w-4" />
                Sacar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Cards de resumo da carteira */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{showBalance ? formatCurrency(45231.89) : "••••••"}</div>
            <p className="text-xs text-muted-foreground">+12.5% em relação ao mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Disponível</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{showBalance ? formatCurrency(12450.0) : "••••••"}</div>
            <p className="text-xs text-muted-foreground">Disponível para investimento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investido</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{showBalance ? formatCurrency(32781.89) : "••••••"}</div>
            <p className="text-xs text-muted-foreground">Em 12 investimentos ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rendimento Mensal</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{showBalance ? formatCurrency(2847.32) : "••••••"}</div>
            <p className="text-xs text-muted-foreground">+8.2% este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Ações rápidas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold">Depositar</h3>
              <p className="text-sm text-muted-foreground">Adicionar dinheiro à carteira</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Minus className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold">Sacar</h3>
              <p className="text-sm text-muted-foreground">Transferir para sua conta</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold">Investir</h3>
              <p className="text-sm text-muted-foreground">Encontrar oportunidades</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de transações */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Histórico de Transações</CardTitle>
              <CardDescription>Suas movimentações financeiras recentes</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todas" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="entradas">Entradas</TabsTrigger>
              <TabsTrigger value="saidas">Saídas</TabsTrigger>
              <TabsTrigger value="rendimentos">Rendimentos</TabsTrigger>
              <TabsTrigger value="investimentos">Investimentos</TabsTrigger>
            </TabsList>

            <TabsContent value="todas" className="space-y-4 mt-4">
              {transacoes.map((transacao) => (
                <div
                  key={transacao.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transacao.tipo === "entrada" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {transacao.tipo === "entrada" ? (
                        <ArrowDownLeft className="h-5 w-5" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transacao.descricao}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(transacao.data)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transacao.tipo === "entrada" ? "text-green-600" : "text-red-600"}`}>
                      {transacao.tipo === "entrada" ? "+" : "-"}
                      {formatCurrency(transacao.valor)}
                    </p>
                    <Badge variant={transacao.status === "concluida" ? "default" : "secondary"} className="text-xs">
                      {transacao.status === "concluida" ? "Concluída" : "Processando"}
                    </Badge>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="entradas" className="space-y-4 mt-4">
              {transacoes
                .filter((t) => t.tipo === "entrada")
                .map((transacao) => (
                  <div
                    key={transacao.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                        <ArrowDownLeft className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{transacao.descricao}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(transacao.data)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+{formatCurrency(transacao.valor)}</p>
                      <Badge variant={transacao.status === "concluida" ? "default" : "secondary"} className="text-xs">
                        {transacao.status === "concluida" ? "Concluída" : "Processando"}
                      </Badge>
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="saidas" className="space-y-4 mt-4">
              {transacoes
                .filter((t) => t.tipo === "saida")
                .map((transacao) => (
                  <div
                    key={transacao.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100 text-red-600">
                        <ArrowUpRight className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{transacao.descricao}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(transacao.data)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-600">-{formatCurrency(transacao.valor)}</p>
                      <Badge variant={transacao.status === "concluida" ? "default" : "secondary"} className="text-xs">
                        {transacao.status === "concluida" ? "Concluída" : "Processando"}
                      </Badge>
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="rendimentos" className="space-y-4 mt-4">
              {transacoes
                .filter((t) => t.categoria === "rendimento")
                .map((transacao) => (
                  <div
                    key={transacao.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{transacao.descricao}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(transacao.data)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+{formatCurrency(transacao.valor)}</p>
                      <Badge variant="default" className="text-xs">
                        Rendimento
                      </Badge>
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="investimentos" className="space-y-4 mt-4">
              {transacoes
                .filter((t) => t.categoria === "investimento")
                .map((transacao) => (
                  <div
                    key={transacao.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{transacao.descricao}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(transacao.data)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">-{formatCurrency(transacao.valor)}</p>
                      <Badge variant="secondary" className="text-xs">
                        Investimento
                      </Badge>
                    </div>
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
