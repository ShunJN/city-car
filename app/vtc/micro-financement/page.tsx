"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Lightbulb, Plus, Car, CheckCircle } from "lucide-react"
import HeaderSimple from "@/components/header-simple"
import Footer from "@/components/footer"
import AnimatedFadeIn from "@/components/animated-fade-in"
import { PhoneInput } from "@/components/phone-input"

export default function VtcMicroFinancementPage() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    codePostal: "",
    statusVTC: "",
    element: "",
    caMois: "",
    montantApport: "",
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Envoyer le formulaire
    alert("Demande envoyée avec succès !")
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderSimple />

      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/bmw-hero-real.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">MICRO FINANCEMENT VO</h1>
          <p className="text-lg">
            <span>Accueil</span> / VTC / Micro-financement
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <Link
            href="/vtc"
            className="inline-flex items-center text-green-500 hover:text-green-600 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux solutions VTC
          </Link>

          {/* Informational Section */}
          <div className="mb-16">
            <AnimatedFadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center uppercase">
                LOCATION AVEC OPTION D'ACHAT (LOA) / CRÉDIT-BAIL PROFESSIONNEL POUR VTC
              </h2>
              <div className="w-24 h-1 bg-green-500 mx-auto mb-12"></div>
            </AnimatedFadeIn>

            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedFadeIn delay={0.2}>
                <Card className="bg-white shadow-md h-full">
                  <CardContent className="p-8 text-center">
                    <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Lightbulb className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Qu'est-ce que c'est ?</h3>
                    <p className="text-gray-700">
                      C'est une solution pour financer le reste à payer de votre Véhicule d'Occasion (VO). Vous apportez
                      un capital important (70% à 80% du prix), et CITY CAR vous étale la petite partie manquante en
                      plusieurs fois.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedFadeIn>

              <AnimatedFadeIn delay={0.4}>
                <Card className="bg-white shadow-md h-full">
                  <CardContent className="p-8 text-center">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Plus className="h-8 w-8 text-gray-800" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">+ Les Avantages pour le VTC</h3>
                    <p className="text-gray-700">
                      Propriété immédiate : Vous êtes propriétaire très rapidement. Zéro Intérêt : CITY CAR vous
                      finance le solde sans appliquer d'intérêts (Sous réserve d'acceptation de votre dossier).
                      Flexibilité : Pas d'engagement sur une longue durée de prêt bancaire lourd.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedFadeIn>

              <AnimatedFadeIn delay={0.6}>
                <Card className="bg-white shadow-md h-full">
                  <CardContent className="p-8 text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Car className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Votre Finalité</h3>
                    <p className="text-gray-700">
                      Vous achetez votre voiture plus rapidement et plus simplement, sans contracter de prêt classique
                      lourd.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedFadeIn>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <AnimatedFadeIn>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center uppercase">
                FAIRE UNE DEMANDE DE FINANCEMENT
              </h3>
            </AnimatedFadeIn>

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => handleInputChange("nom", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input
                    id="prenom"
                    value={formData.prenom}
                    onChange={(e) => handleInputChange("prenom", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <PhoneInput
                    value={formData.telephone}
                    onChange={(value) => handleInputChange("telephone", value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="codePostal">Code postal *</Label>
                  <Input
                    id="codePostal"
                    value={formData.codePostal}
                    onChange={(e) => handleInputChange("codePostal", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="statusVTC">Status VTC *</Label>
                  <select
                    id="statusVTC"
                    value={formData.statusVTC}
                    onChange={(e) => handleInputChange("statusVTC", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">-- Sélectionnez --</option>
                    <option value="chauffeur-independant">Chauffeur indépendant</option>
                    <option value="entreprise-vtc">Entreprise VTC</option>
                    <option value="salarie-vtc">Salarié VTC</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="caMois">CA / Mois (€) *</Label>
                  <Input
                    id="caMois"
                    type="number"
                    value={formData.caMois}
                    onChange={(e) => handleInputChange("caMois", e.target.value)}
                    placeholder="ex : 3000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="montantApport">Montant apport disponible *</Label>
                  <Input
                    id="montantApport"
                    type="number"
                    value={formData.montantApport}
                    onChange={(e) => handleInputChange("montantApport", e.target.value)}
                    placeholder="Ex: 9000"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="element">Élément</Label>
                  <Input
                    id="element"
                    value={formData.element}
                    onChange={(e) => handleInputChange("element", e.target.value)}
                    placeholder="Spécification..."
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 uppercase"
                >
                  ENVOYER MA DEMANDE
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

