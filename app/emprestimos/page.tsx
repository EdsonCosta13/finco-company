import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Filter } from "lucide-react"

export default function EmprestimosPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Empréstimos</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Solicitar Empréstimo
          </Button>
        </div>
      </div>

      {/* Resumo dos empréstimos */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Empréstimos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Total: Kzs 15.000,00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Próximo Vencimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 dias</div>
            <p className="text-xs text-muted-foreground">Parcela: Kzs 1.250,00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14,5%</div>
            <p className="text-xs text-muted-foreground">ao ano</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de empréstimos */}
      <Card>
        <CardHeader>
          <CardTitle>Meus Empréstimos</CardTitle>
          <CardDescription>Acompanhe o status dos seus empréstimos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Empréstimo Pessoal #001</h3>
                <p className="text-sm text-muted-foreground">Solicitado em 15/01/2024</p>
              </div>
              <Badge>Ativo</Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Valor</p>
                <p className="font-semibold">Kzs 10.000,00</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Taxa</p>
                <p className="font-semibold">15% a.a.</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Prazo</p>
                <p className="font-semibold">12 meses</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Parcela</p>
                <p className="font-semibold">Kzs 950,00</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso do pagamento</span>
                <span>3 de 12 parcelas</span>
              </div>
              <Progress value={25} />
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Empréstimo Empresarial #002</h3>
                <p className="text-sm text-muted-foreground">Solicitado em 01/02/2024</p>
              </div>
              <Badge variant="secondary">Em análise</Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Valor</p>
                <p className="font-semibold">Kzs 25.000,00</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Taxa</p>
                <p className="font-semibold">12% a.a.</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Prazo</p>
                <p className="font-semibold">18 meses</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-semibold">Aguardando aprovação</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
