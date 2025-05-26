"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

// Form schema for password recovery
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
})

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  
  // Initialize the form
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    setIsLoading(true)
    
    try {
      // Here you would typically make an API call to send a recovery email
      console.log(values)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Email enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      })
      
      setEmailSent(true)
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao enviar email",
        description: "Não foi possível enviar o email de recuperação. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Recuperação de senha</CardTitle>
          <CardDescription className="text-center">
            Insira seu email para receber um link de redefinição de senha
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!emailSent ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="exemplo@empresa.com" 
                          type="email" 
                          autoComplete="email"
                          disabled={isLoading} 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Enviaremos um link para redefinir sua senha neste email
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Enviar link de recuperação
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center space-y-4">
              <div className="py-4">
                <div className="mx-auto w-16 h-16 bg-green-100 text-green-800 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium">Email enviado com sucesso</h3>
              <p className="text-sm text-muted-foreground">
                Enviamos as instruções para recuperação de senha para seu email.
                Por favor, verifique sua caixa de entrada.
              </p>
              <Button variant="outline" className="w-full mt-4" onClick={() => setEmailSent(false)}>
                Tentar com outro email
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="mt-2 text-center text-sm">
            <Link href="/auth/login" className="text-primary hover:underline">
              Voltar para o login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
