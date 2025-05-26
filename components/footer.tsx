import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 FinCo. Todos os direitos reservados.</p>
          <p>Plataforma regulamentada pelo BNA</p>
        </div>
      </div>
    </footer>
  )
}
