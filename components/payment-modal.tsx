"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, CreditCard, Lock, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plan: {
    name: string
    price: string
    features: string[]
  } | null
  onPaymentSuccess: () => void
}

export function PaymentModal({ isOpen, onClose, plan, onPaymentSuccess }: PaymentModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentData, setPaymentData] = useState({
    // Informations personnelles
    nom: "",
    prenom: "",
    email: "",
    telephone: "",

    // Adresse de facturation
    adresse: "",
    ville: "",
    codePostal: "",
    pays: "France",

    // Informations de paiement
    numeroCarteFormate: "",
    numeroCarte: "",
    dateExpiration: "",
    cvv: "",
    nomCarte: "",
  })

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handleInputChange = (field: string, value: string) => {
    if (field === "numeroCarte") {
      const formatted = formatCardNumber(value)
      setPaymentData((prev) => ({
        ...prev,
        numeroCarteFormate: formatted,
        numeroCarte: value.replace(/\s+/g, ""),
      }))
    } else if (field === "dateExpiration") {
      const formatted = formatExpiryDate(value)
      setPaymentData((prev) => ({
        ...prev,
        [field]: formatted,
      }))
    } else {
      setPaymentData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      // Simulation de validation bancaire
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Simulation de succès (95% de chance de succès)
      if (Math.random() > 0.05) {
        setCurrentStep(3) // Succès
        setTimeout(() => {
          onPaymentSuccess()
          onClose()
          setCurrentStep(1)
          setPaymentData({
            nom: "",
            prenom: "",
            email: "",
            telephone: "",
            adresse: "",
            ville: "",
            codePostal: "",
            pays: "France",
            numeroCarteFormate: "",
            numeroCarte: "",
            dateExpiration: "",
            cvv: "",
            nomCarte: "",
          })
        }, 2000)
      } else {
        // Simulation d'échec
        alert("Paiement refusé. Veuillez vérifier vos informations bancaires.")
      }
    } catch (error) {
      console.error("Erreur de paiement:", error)
      alert("Une erreur est survenue lors du paiement.")
    } finally {
      setIsProcessing(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!plan) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Finaliser votre commande</span>
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {/* Étape 1: Informations personnelles et adresse */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Récapitulatif de la commande */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Récapitulatif de votre commande</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold">{plan.name}</h3>
                      <p className="text-sm text-gray-600">Plan mensuel</p>
                    </div>
                    <Badge variant="outline" className="text-lg font-bold">
                      {plan.price}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Informations personnelles */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nom">Nom *</Label>
                      <Input
                        id="nom"
                        value={paymentData.nom}
                        onChange={(e) => handleInputChange("nom", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input
                        id="prenom"
                        value={paymentData.prenom}
                        onChange={(e) => handleInputChange("prenom", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={paymentData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="telephone">Téléphone *</Label>
                    <Input
                      id="telephone"
                      type="tel"
                      value={paymentData.telephone}
                      onChange={(e) => handleInputChange("telephone", e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Adresse de facturation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Adresse de facturation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="adresse">Adresse *</Label>
                    <Input
                      id="adresse"
                      value={paymentData.adresse}
                      onChange={(e) => handleInputChange("adresse", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ville">Ville *</Label>
                      <Input
                        id="ville"
                        value={paymentData.ville}
                        onChange={(e) => handleInputChange("ville", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="codePostal">Code postal *</Label>
                      <Input
                        id="codePostal"
                        value={paymentData.codePostal}
                        onChange={(e) => handleInputChange("codePostal", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="pays">Pays *</Label>
                    <select
                      id="pays"
                      value={paymentData.pays}
                      onChange={(e) => handleInputChange("pays", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="France">France</option>
                      <option value="Belgique">Belgique</option>
                      <option value="Suisse">Suisse</option>
                      <option value="Luxembourg">Luxembourg</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={onClose}>
                  Annuler
                </Button>
                <Button onClick={nextStep}>Continuer vers le paiement</Button>
              </div>
            </motion.div>
          )}

          {/* Étape 2: Informations de paiement */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Lock className="h-5 w-5 text-green-600" />
                    <span>Paiement sécurisé SSL</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="numeroCarte">Numéro de carte *</Label>
                    <Input
                      id="numeroCarte"
                      value={paymentData.numeroCarteFormate}
                      onChange={(e) => handleInputChange("numeroCarte", e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dateExpiration">Date d'expiration *</Label>
                      <Input
                        id="dateExpiration"
                        value={paymentData.dateExpiration}
                        onChange={(e) => handleInputChange("dateExpiration", e.target.value)}
                        placeholder="MM/AA"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        value={paymentData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="nomCarte">Nom sur la carte *</Label>
                    <Input
                      id="nomCarte"
                      value={paymentData.nomCarte}
                      onChange={(e) => handleInputChange("nomCarte", e.target.value)}
                      placeholder="Nom tel qu'il apparaît sur la carte"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Récapitulatif final */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Récapitulatif final</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total à payer :</span>
                    <span className="text-green-600">{plan.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Paiement sécurisé par SSL. Vos données sont protégées.</p>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
                <Button onClick={handlePayment} disabled={isProcessing} className="bg-green-600 hover:bg-green-700">
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Validation en cours...</span>
                    </div>
                  ) : (
                    `Payer ${plan.price}`
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Étape 3: Succès */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Paiement réussi !</h2>
              <p className="text-gray-600 mb-6">
                Votre abonnement {plan.name} a été activé avec succès.
                <br />
                Vous allez être redirigé vers votre profil.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">
                  Un email de confirmation vous a été envoyé à {paymentData.email}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
