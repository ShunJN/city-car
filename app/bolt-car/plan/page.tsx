"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  CheckCircle,
  Star,
  Users,
  Clock,
  ArrowLeft,
  Crown,
  Zap,
  Shield,
  ArrowRight,
  LogIn,
  CreditCard,
  Lock,
  AlertCircle,
} from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import HeaderBolt from "@/components/header-bolt"
import Footer from "@/components/footer"

function useScrollAnimation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return { ref, isInView }
}

export default function BoltCarPlanPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentStep, setPaymentStep] = useState(1) // 1: form, 2: processing, 3: success
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  })
  const router = useRouter()
  const { toast } = useToast()

  const heroRef = useScrollAnimation()
  const plansRef = useScrollAnimation()
  const featuresRef = useScrollAnimation()

  useEffect(() => {
    window.scrollTo(0, 0)

    // Vérifier si l'utilisateur est connecté
    const savedUser = localStorage.getItem("citycar_user")
    setIsLoggedIn(!!savedUser)

    // Pré-remplir les champs avec les infos du profil si connecté
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setPaymentData({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.email || "",
        address: user.address || "",
        city: user.city || "",
        postalCode: user.postalCode || "",
      })
    }

    // Vérifier s'il y a un plan en attente après connexion
    const pendingPlan = localStorage.getItem("bolt_selected_plan")
    if (pendingPlan && savedUser) {
      setSelectedPlan(pendingPlan)
      localStorage.removeItem("bolt_selected_plan")
      setShowPaymentModal(true)
    }
  }, [])

  const plans = [
    {
      id: "basic",
      name: "Bolt Basic",
      price: "9.99€",
      period: "/mois",
      description: "Parfait pour les utilisateurs occasionnels",
      color: "from-blue-500 to-blue-600",
      icon: Users,
      popular: false,
      features: [
        "5 trajets gratuits par mois",
        "Réduction de 10% sur tous les trajets",
        "Support client standard",
        "Accès aux véhicules standard",
        "Annulation gratuite (2h avant)",
      ],
    },
    {
      id: "premium",
      name: "Bolt Premium",
      price: "19.99€",
      period: "/mois",
      description: "Le choix des utilisateurs réguliers",
      color: "from-green-500 to-green-600",
      icon: Crown,
      popular: true,
      features: [
        "15 trajets gratuits par mois",
        "Réduction de 20% sur tous les trajets",
        "Support client prioritaire",
        "Accès aux véhicules premium",
        "Annulation gratuite (30min avant)",
        "Réservation à l'avance",
        "Points de fidélité doublés",
      ],
    },
    {
      id: "unlimited",
      name: "Bolt Unlimited",
      price: "39.99€",
      period: "/mois",
      description: "Pour les grands voyageurs",
      color: "from-purple-500 to-purple-600",
      icon: Zap,
      popular: false,
      features: [
        "Trajets illimités gratuits (jusqu'à 50€/mois)",
        "Réduction de 30% sur tous les trajets",
        "Support client VIP 24/7",
        "Accès à tous les véhicules",
        "Annulation gratuite à tout moment",
        "Réservation prioritaire",
        "Points de fidélité triplés",
        "Accès aux événements exclusifs",
      ],
    },
  ]

  const handleSelectPlan = async (planId: string) => {
    if (!isLoggedIn) {
      // Sauvegarder le plan sélectionné pour après la connexion
      localStorage.setItem("bolt_selected_plan", planId)

      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour souscrire à un plan. Redirection vers la page de connexion...",
        variant: "destructive",
      })

      // Redirection vers la page de profil (connexion) après 2 secondes
      setTimeout(() => {
        router.push("/profile")
      }, 2000)

      return
    }

    setSelectedPlan(planId)
    setShowPaymentModal(true)
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentStep(2)
    setIsProcessing(true)

    try {
      // Simulation de la validation bancaire
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const selectedPlanData = plans.find((p) => p.id === selectedPlan)
      const user = JSON.parse(localStorage.getItem("citycar_user") || "{}")

      // Vérifier si le nom sur la carte correspond au nom du client
      const cardNameParts = paymentData.cardName.trim().split(/\s+/).filter(p => p.length > 0)
      const userFirstName = (user.firstName || "").toLowerCase().trim()
      const userLastName = (user.lastName || "").toLowerCase().trim()
      const userFullName = `${userFirstName} ${userLastName}`.trim()
      
      // Vérifier si le nom correspond (en comparant prénom et nom)
      // Le nom doit contenir au moins le prénom OU le nom du client
      const cardNameLower = paymentData.cardName.toLowerCase().trim()
      const nameMatches = userFirstName && userLastName && (
        cardNameLower.includes(userFirstName) || 
        cardNameLower.includes(userLastName) ||
        cardNameParts.some(part => part.toLowerCase() === userFirstName) ||
        cardNameParts.some(part => part.toLowerCase() === userLastName) ||
        cardNameLower === userFullName ||
        cardNameLower === `${userLastName} ${userFirstName}`.trim()
      )

      // Si le nom correspond, mettre à jour le profil avec les nouvelles informations
      if (nameMatches && user.email) {
        const updatedUser = {
          ...user,
          // Mettre à jour seulement si les champs sont remplis
          email: paymentData.email || user.email,
          address: paymentData.address || user.address,
          city: paymentData.city || user.city,
          postalCode: paymentData.postalCode || user.postalCode,
        }
        localStorage.setItem("citycar_user", JSON.stringify(updatedUser))
      }

      // Ajouter le paiement à l'historique de l'utilisateur
      const existingDemarches = JSON.parse(
        localStorage.getItem(`citycar_demarches_${user.email}`) || '{"payments": []}',
      )

      const newPayment = {
        id: Date.now(),
        title: `Abonnement ${selectedPlanData?.name}`,
        description: `Plan mensuel ${selectedPlanData?.description.toLowerCase()}`,
        amount: selectedPlanData?.price,
        status: "paid",
        date: new Date().toLocaleDateString("fr-FR"),
        type: "subscription",
        cardNumber: `**** **** **** ${paymentData.cardNumber.replace(/\s/g, "").slice(-4)}`,
        cardName: paymentData.cardName,
      }

      existingDemarches.payments = existingDemarches.payments || []
      existingDemarches.payments.unshift(newPayment)

      localStorage.setItem(`citycar_demarches_${user.email}`, JSON.stringify(existingDemarches))

      setPaymentStep(3)

      // Redirection vers le profil après 3 secondes
      setTimeout(() => {
        setShowPaymentModal(false)
        router.push("/profile")
      }, 3000)
    } catch (error) {
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du traitement de votre paiement.",
        variant: "destructive",
      })
      setPaymentStep(1)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Formatage spécial pour le numéro de carte
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      if (formatted.length <= 19) {
        setPaymentData({ ...paymentData, [name]: formatted })
      }
    }
    // Formatage pour la date d'expiration
    else if (name === "expiryDate") {
      const formatted = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
      if (formatted.length <= 5) {
        setPaymentData({ ...paymentData, [name]: formatted })
      }
    }
    // Limitation CVV à 3 chiffres
    else if (name === "cvv") {
      if (value.length <= 3 && /^\d*$/.test(value)) {
        setPaymentData({ ...paymentData, [name]: value })
      }
    } else {
      setPaymentData({ ...paymentData, [name]: value })
    }
  }

  const selectedPlanData = plans.find((p) => p.id === selectedPlan)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <HeaderBolt />

      {/* Hero Section */}
      <motion.section
        ref={heroRef.ref}
        initial={{ opacity: 0 }}
        animate={heroRef.isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="pt-24 pb-16 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={heroRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full px-4 py-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={heroRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={heroRef.isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Badge className="mb-6 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 px-4 py-2 text-sm font-medium">
                <Crown className="h-4 w-4 mr-2" />
                Plans Bolt Car
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={heroRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Choisissez votre{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">plan</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={heroRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Découvrez nos plans adaptés à tous vos besoins de mobilité. Économisez plus, voyagez mieux.
            </motion.p>

            {!isLoggedIn && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mb-8"
              >
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                  <div className="flex items-center">
                    <LogIn className="h-5 w-5 text-yellow-600 mr-2" />
                    <p className="text-yellow-800 text-sm">Vous devez être connecté pour souscrire à un plan</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Plans Section */}
      <motion.section
        ref={plansRef.ref}
        initial={{ opacity: 0 }}
        animate={plansRef.isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={plansRef.isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.8 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.2 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 text-sm font-semibold">
                      <Star className="h-3 w-3 mr-1" />
                      Plus populaire
                    </Badge>
                  </motion.div>
                )}

                <Card
                  className={`h-full transition-all duration-500 hover:shadow-2xl ${
                    plan.popular ? "ring-2 ring-green-500 shadow-xl scale-105" : "hover:scale-105"
                  } ${selectedPlan === plan.id ? "ring-4 ring-green-400" : ""}`}
                >
                  <CardHeader className="text-center pb-4">
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <plan.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={plansRef.isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ delay: 1.2 + index * 0.1 + featureIndex * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={() => handleSelectPlan(plan.id)}
                        disabled={isProcessing}
                        className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-300 ${
                          plan.popular
                            ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                        }`}
                      >
                        Choisir ce plan
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef.ref}
        initial={{ opacity: 0 }}
        animate={featuresRef.isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="py-20 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Pourquoi choisir Bolt Car ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Des avantages exclusifs pour tous nos abonnés</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Sécurité garantie",
                description: "Assurance complète et support d'urgence 24h/7j pour votre tranquillité d'esprit",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Clock,
                title: "Disponibilité totale",
                description: "Accès aux véhicules 24h/24 et 7j/7 dans toutes les villes partenaires",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Zap,
                title: "Réservation instantanée",
                description: "Réservez et déverrouillez votre véhicule en quelques secondes via l'app",
                color: "from-purple-500 to-purple-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={featuresRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center group"
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4">
            <DialogTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>
                {paymentStep === 1 && "Paiement sécurisé"}
                {paymentStep === 2 && "Traitement en cours"}
                {paymentStep === 3 && "Paiement confirmé"}
              </span>
            </DialogTitle>
          </DialogHeader>

          {paymentStep === 1 && (
            <div className="space-y-4 overflow-y-auto flex-1 px-6 pb-4 pr-4">
              {/* Plan Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{selectedPlanData?.name}</h3>
                    <p className="text-sm text-gray-600">{selectedPlanData?.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{selectedPlanData?.price}</div>
                    <div className="text-sm text-gray-500">{selectedPlanData?.period}</div>
                  </div>
                </div>
              </div>

              <form id="payment-form" onSubmit={handlePaymentSubmit} className="space-y-3">
                {/* Card Information */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center text-sm text-gray-900">
                    <Lock className="h-4 w-4 mr-2 text-green-600" />
                    Informations de carte
                  </h4>

                  <div>
                    <Label htmlFor="cardNumber">Numéro de carte *</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Date d'expiration *</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                        required
                        className="font-mono"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className="font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cardName">Nom sur la carte *</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={paymentData.cardName}
                      onChange={handleInputChange}
                      placeholder="Jean Dupont"
                      required
                    />
                  </div>
                </div>

                {/* Billing Information */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-gray-900">Adresse de facturation</h4>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={paymentData.email}
                      onChange={handleInputChange}
                      placeholder="jean@exemple.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Adresse *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={paymentData.address}
                      onChange={handleInputChange}
                      placeholder="123 Rue de la Paix"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Ville *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={paymentData.city}
                        onChange={handleInputChange}
                        placeholder="Paris"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Code postal *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={paymentData.postalCode}
                        onChange={handleInputChange}
                        placeholder="75001"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-2.5">
                  <div className="flex items-start">
                    <Shield className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-green-800">
                      <p className="font-medium">Paiement 100% sécurisé</p>
                      <p className="text-xs">Vos données sont protégées par un cryptage SSL 256 bits</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setShowPaymentModal(false)} className="flex-1">
                    Annuler
                  </Button>
                  <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                    Payer {selectedPlanData?.price}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {paymentStep === 2 && (
            <div className="text-center py-8 px-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-6"
              />
              <h3 className="text-xl font-semibold mb-2">Traitement du paiement</h3>
              <p className="text-gray-600 mb-4">Validation en cours avec votre banque...</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-blue-600 mr-2" />
                  <p className="text-sm text-blue-800">Ne fermez pas cette fenêtre</p>
                </div>
              </div>
            </div>
          )}

          {paymentStep === 3 && (
            <div className="text-center py-8 px-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="h-10 w-10 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Paiement confirmé !</h3>
              <p className="text-gray-600 mb-4">Votre abonnement {selectedPlanData?.name} est maintenant actif.</p>
              <p className="text-sm text-gray-500">Redirection vers votre profil dans quelques secondes...</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
