"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github, Mail, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"

interface LoginForm {
  email: string
  password: string
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/dashboard"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password)
      router.push(redirectTo)
    } catch (error) {
      // L'erreur est gérée dans le contexte d'authentification
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">BT</span>
          </div>
        </div>
        <CardTitle className="text-2xl">Connexion</CardTitle>
        <CardDescription>Connectez-vous à votre compte BUG-TRACKER</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* OAuth Buttons */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            Continuer avec GitHub
          </Button>
          {/** <Button variant="outline" className="w-full" disabled> */}
          <Button variant="outline" className="w-full">
            <Mail className="mr-2 h-4 w-4" />
            Continuer avec Google
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Ou continuer avec</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email invalide",
                },
              })}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Le mot de passe est requis",
                  minLength: {
                    value: 6,
                    message: "Le mot de passe doit contenir au moins 6 caractères",
                  },
                })}
                className={errors.password ? "border-destructive pr-10" : "pr-10"}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground">
              Mot de passe oublié ?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Pas encore de compte ? </span>
          <Link href="/register" className="text-primary hover:underline">
            Créer un compte
          </Link>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Compte de démonstration :</p>
          <p className="text-xs text-muted-foreground">Email: admin@example.com</p>
          <p className="text-xs text-muted-foreground">Mot de passe: password</p>
        </div>
      </CardContent>
    </Card>
  )
}
