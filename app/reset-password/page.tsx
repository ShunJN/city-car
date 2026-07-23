"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Eye, EyeOff, CheckCircle } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"

export default function ResetPasswordPage() {
  const [step, setStep] = useState<"request" | "verify" | "reset">("request")
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [resetCode, setResetCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { toast } = useToast()

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (result.success) {
        setStep("verify")
        toast({
          title: "📧 Email envoyé !",
          description: `Un code de réinitialisation a été envoyé à ${email}`,
        })
      } else {
        toast({
          title: "❌ Erreur",
          description: result.message || "Erreur lors de l'envoi",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Erreur de connexion au serveur",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/verify-reset-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: resetCode }),
      })

      const result = await response.json()

      if (result.success) {
        setStep("reset")
        toast({
          title: "✅ Code validé !",
          description: "Vous pouvez maintenant définir votre nouveau mot de passe",
        })
      } else {
        toast({
          title: "❌ Code invalide",
          description: result.message || "Le code saisi est incorrect",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Erreur de connexion au serveur",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast({
        title: "❌ Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      })
      return
    }

    if (newPassword.length < 6) {
      toast({
        title: "❌ Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/reset-password-final", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: resetCode, newPassword }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "🎉 Mot de passe modifié !",
          description: "Votre mot de passe a été mis à jour avec succès",
        })
        setTimeout(() => {
          window.location.href = "/profile"
        }, 2000)
      } else {
        toast({
          title: "❌ Erreur",
          description: result.message || "Erreur lors de la modification",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Erreur de connexion au serveur",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/bolt-hero.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <Header />

      <main className="container mx-auto px-4 py-24 relative z-10 flex-grow">
        <Link
          href="/profile"
          className="inline-flex items-center text-white hover:text-green-400 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la connexion
        </Link>

        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">
              <span className="text-black">City</span>
              <span className="text-green-400">Car</span>
            </h1>
            <p className="text-gray-600 mt-2">Réinitialisation du mot de passe</p>
          </div>

          {/* Étape 1: Demande de réinitialisation */}
          {step === "request" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-green-500" />
                  Mot de passe oublié ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Saisissez votre adresse email et nous vous enverrons un code de réinitialisation.
                </p>
                <form onSubmit={handleRequestReset} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={isLoading}>
                    {isLoading ? "📧 Envoi en cours..." : "🚀 Envoyer le code"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Étape 2: Vérification du code */}
          {step === "verify" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-green-500" />
                  Vérification du code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Un code de réinitialisation a été envoyé à <strong>{email}</strong>. Vérifiez votre boîte mail et
                  saisissez le code reçu.
                </p>
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resetCode">Code de réinitialisation</Label>
                    <Input
                      id="resetCode"
                      type="text"
                      placeholder="123456"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      maxLength={6}
                      required
                      className="text-center text-2xl font-mono tracking-widest"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={isLoading}>
                    {isLoading ? "🔍 Vérification..." : "✅ Vérifier le code"}
                  </Button>
                  <Button type="button" variant="outline" className="w-full" onClick={() => setStep("request")}>
                    📧 Renvoyer un code
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Étape 3: Nouveau mot de passe */}
          {step === "reset" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  Nouveau mot de passe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Définissez votre nouveau mot de passe. Il doit contenir au moins 6 caractères.
                </p>
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={isLoading}>
                    {isLoading ? "🔄 Modification..." : "🔐 Modifier le mot de passe"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <div className="bg-gray-900 w-full relative z-10 mt-auto">
        <Footer />
      </div>
    </div>
  )
}
