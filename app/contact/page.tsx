"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RecaptchaCheckbox } from "@/components/recaptcha-checkbox"
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react"
import HeaderSimple from "@/components/header-simple"
import Footer from "@/components/footer"
import AnimatedFadeIn from "@/components/animated-fade-in"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactPage() {
  // Scroll automatique en haut au chargement de la page
  useEffect(() => {
    window.scrollTo(0, 0)

    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isRecaptchaVerified) {
      alert("Veuillez vérifier que vous n'êtes pas un robot")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subject: formData.sujet,
          type: "contact",
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false)
          setFormData({
            nom: "",
            prenom: "",
            email: "",
            telephone: "",
            sujet: "",
            message: "",
          })
          setIsRecaptchaVerified(false)
        }, 3000)
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
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
          <h1 className="text-4xl font-bold mb-4">Contact</h1>
          <p className="text-lg">
            <span>Accueil</span> / Contact
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <AnimatedFadeIn delay={0.1} direction="up">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Phone className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="font-bold text-gray-900">Téléphone</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">01 23 45 67 89</p>
                    <p className="text-gray-600 text-sm">Lun-Ven: 9h-18h</p>
                  </div>
                </AnimatedFadeIn>

                <AnimatedFadeIn delay={0.2} direction="up">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Mail className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="font-bold text-gray-900">Email</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">contact@city-car.fr</p>
                    <p className="text-gray-600 text-sm">Réponse sous 24h</p>
                  </div>
                </AnimatedFadeIn>

                <AnimatedFadeIn delay={0.3} direction="up">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="font-bold text-gray-900">Adresse</span>
                    </div>
                    <p className="font-semibold text-gray-900">96 Rue Anatole France</p>
                    <p className="text-gray-600">92300 Levallois-Perret</p>
                  </div>
                </AnimatedFadeIn>

                <AnimatedFadeIn delay={0.4} direction="up">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="font-bold text-gray-900">Horaires</span>
                    </div>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between">
                        <span>Lun-Ven:</span>
                        <span className="font-semibold">9h00 - 19h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Samedi:</span>
                        <span className="font-semibold">10h00 - 18h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dimanche:</span>
                        <span className="text-gray-500">Fermé</span>
                      </div>
                    </div>
                  </div>
                </AnimatedFadeIn>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimatedFadeIn delay={0.2} direction="right">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>

                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-12"
                      >
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">Message envoyé !</h3>
                        <p className="text-gray-600">
                          Merci pour votre message. Nous vous recontacterons dans les plus brefs délais.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form key="form" initial={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
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
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
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
                            <Label htmlFor="telephone">Téléphone</Label>
                            <Input
                              id="telephone"
                              type="tel"
                              value={formData.telephone}
                              onChange={(e) => handleInputChange("telephone", e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="sujet">Sujet *</Label>
                          <Input
                            id="sujet"
                            value={formData.sujet}
                            onChange={(e) => handleInputChange("sujet", e.target.value)}
                            placeholder="Objet de votre demande"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            placeholder="Décrivez votre demande en détail..."
                            rows={6}
                            required
                          />
                        </div>

                        <RecaptchaCheckbox onVerificationChange={setIsRecaptchaVerified} className="py-4" />

                        <Button
                          type="submit"
                          disabled={isSubmitting || !isRecaptchaVerified}
                          className="w-full"
                          size="lg"
                        >
                          {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedFadeIn>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
