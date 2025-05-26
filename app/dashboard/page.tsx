import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, CreditCard, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">

      {/* Cards de resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Kzs 45.231,89</div>
            <p className="text-xs text-muted-foreground">+20.1% em relação ao mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investimentos Ativos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Kzs 32.450,00</div>
            <p className="text-xs text-muted-foreground">+12.5% de rendimento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empréstimos</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Kzs 15.000,00</div>
            <p className="text-xs text-muted-foreground">2 empréstimos ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rendimento Mensal</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Kzs 2.847,32</div>
            <p className="text-xs text-muted-foreground">+8.2% este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Seção de atividades recentes */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Investimentos Recentes</CardTitle>
            <CardDescription>Suas últimas oportunidades de investimento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Empréstimo Pessoal - João Santos</p>
                <p className="text-xs text-muted-foreground">Kzs 25.000 • 18 meses • 15% a.a.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Aprovado</Badge>
                <ArrowUpRight className="h-4 w-4 text-green-600" />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Empréstimo Empresarial - Tech Solutions</p>
                <p className="text-xs text-muted-foreground">Kzs 50.000 • 24 meses • 12% a.a.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Em análise</Badge>
                <ArrowUpRight className="h-4 w-4 text-blue-600" />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <p className="text-sm font-medium">Empréstimo Pessoal - Maria Silva</p>
                <p className="text-xs text-muted-foreground">Kzs 15.000 • 12 meses • 16% a.a.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge>Ativo</Badge>
                <ArrowDownRight className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Metas de Investimento</CardTitle>
            <CardDescription>Progresso das suas metas financeiras</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Meta Anual</p>
                <p className="text-sm text-muted-foreground">Kzs 50.000</p>
              </div>
              <Progress value={65} className="w-full" />
              <p className="text-xs text-muted-foreground">Kzs 32.450 de Kzs 50.000</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Diversificação</p>
                <p className="text-sm text-muted-foreground">8 de 10</p>
              </div>
              <Progress value={80} className="w-full" />
              <p className="text-xs text-muted-foreground">8 tipos de empréstimo diferentes</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Rendimento Mensal</p>
                <p className="text-sm text-muted-foreground">Kzs 3.000</p>
              </div>
              <Progress value={95} className="w-full" />
              <p className="text-xs text-muted-foreground">Kzs 2.847 de Kzs 3.000</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
