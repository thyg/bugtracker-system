"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Github, Mail, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"

interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

const passwordRequirements = [
  { id: "length", text: "Au moins 8 caractères", regex: /.{8,}/ },
  { id: "uppercase", text: "Une lettre majuscule", regex: /[A-Z]/ },
  { id: "lowercase", text: "Une lettre minuscule", regex: /[a-z]/ },
  { id: "number", text: "Un chiffre", regex: /\d/ },
  { id: "special", text: "Un caractère spécial", regex: /[!@#$%^&*(),.?":{}|<>]/ },
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)
  const { register: registerUser, isLoading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>()

  const password = watch("password", "")
  const confirmPassword = watch("confirmPassword", "")

  const getPasswordStrength = (password: string) => {
    const validRequirements = passwordRequirements.filter((req) => req.regex.test(password))
    return validRequirements.length
  }

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 2) return "bg-red-500"
    if (strength < 4) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 2) return "Faible"
    if (strength < 4) return "Moyen"
    return "Fort"
  }

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data.email, data.password, data.name)
      router.push("/dashboard")
    } catch (error) {
      // L'erreur est gérée dans le contexte d'authentification
    }
  }

  const passwordStrength = getPasswordStrength(password)

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">BT</span>
          </div>
        </div>
        <CardTitle className="text-2xl">Créer un compte</CardTitle>
        <CardDescription>Rejoignez des milliers de développeurs qui utilisent BUG-TRACKER</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* OAuth Buttons */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            Continuer avec GitHub
          </Button>
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
            <span className="bg-background px-2 text-muted-foreground">Ou créer avec email</span>
          </div>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              type="text"
              placeholder="BADA André"
              {...register("name", {
                required: "Le nom est requis",
                minLength: {
                  value: 2,
                  message: "Le nom doit contenir au moins 2 caractères",
                },
              })}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

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
                    value: 8,
                    message: "Le mot de passe doit contenir au moins 8 caractères",
                  },
                })}
                className={errors.password ? "border-destructive pr-10" : "pr-10"}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
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

            {/* Password Strength Indicator */}
            {password && (passwordFocus || password.length > 0) && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                      style={{ width: `${(passwordStrength / passwordRequirements.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{getPasswordStrengthText(passwordStrength)}</span>
                </div>

                <div className="space-y-1">
                  {passwordRequirements.map((req) => {
                    const isValid = req.regex.test(password)
                    return (
                      <div key={req.id} className="flex items-center gap-2 text-xs">
                        {isValid ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-muted-foreground" />
                        )}
                        <span className={isValid ? "text-green-600" : "text-muted-foreground"}>{req.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("confirmPassword", {
                  required: "La confirmation du mot de passe est requise",
                  validate: (value) => value === password || "Les mots de passe ne correspondent pas",
                })}
                className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptTerms"
              {...register("acceptTerms", {
                required: "Vous devez accepter les conditions d'utilisation",
              })}
            />
            <Label htmlFor="acceptTerms" className="text-sm">
              J'accepte les{" "}
              <Link href="/terms" className="text-primary hover:underline">
                conditions d'utilisation
              </Link>{" "}
              et la{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                politique de confidentialité
              </Link>
            </Label>
          </div>
          {errors.acceptTerms && <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Création du compte..." : "Créer mon compte"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Déjà un compte ? </span>
          <Link href="/login" className="text-primary hover:underline">
            Se connecter
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
