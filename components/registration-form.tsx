"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

interface RegistrationFormProps {
  onSuccess?: () => void
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler un délai d'inscription
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
      })

      if (onSuccess) {
        onSuccess()
      }
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input id="firstName" placeholder="Jean" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input id="lastName" placeholder="Dupont" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="exemple@email.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone</Label>
        <Input id="phone" type="tel" placeholder="06 12 34 56 78" required />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" type="password" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input id="confirmPassword" type="password" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Adresse</Label>
        <Input id="address" placeholder="123 Rue de Paris" required />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postalCode">Code postal</Label>
          <Input id="postalCode" placeholder="75001" required />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="city">Ville</Label>
          <Input id="city" placeholder="Paris" required />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" required />
        <Label htmlFor="terms" className="text-sm">
          J'accepte les{" "}
          <a href="/terms" className="text-green-500 hover:text-green-600">
            conditions générales
          </a>{" "}
          et la{" "}
          <a href="/privacy" className="text-green-500 hover:text-green-600">
            politique de confidentialité
          </a>
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="newsletter" />
        <Label htmlFor="newsletter" className="text-sm">
          Je souhaite recevoir les actualités et offres promotionnelles de CityCar
        </Label>
      </div>

      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={isLoading}>
        {isLoading ? "Inscription en cours..." : "S'inscrire"}
      </Button>
    </form>
  )
}
