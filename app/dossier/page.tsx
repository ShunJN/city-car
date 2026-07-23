"use client"

import React, { useEffect } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RecaptchaCheckbox } from "@/components/recaptcha-checkbox"
import {
  Upload,
  FileText,
  CheckCircle,
  X,
  AlertCircle,
  User,
  CreditCard,
  Home,
  Briefcase,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import HeaderSimple from "@/components/header-simple"
import Footer from "@/components/footer"
import { BirthplaceAutocomplete } from "@/components/birthplace-autocomplete"
import { AddressAutocomplete } from "@/components/address-autocomplete"
import { CityAutocomplete } from "@/components/city-autocomplete"
import { PhoneInput } from "@/components/phone-input"
import { NationalityAutocomplete } from "@/components/nationality-autocomplete"

export default function DossierPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false)

  const [formData, setFormData] = useState({
    // Informations personnelles
    nom: "",
    prenom: "",
    dateNaissance: "",
    lieuNaissance: "",
    nationalite: "",
    situationFamiliale: "",

    // Contact
    email: "",
    telephone: "",
    adresse: "",
    codePostal: "",
    ville: "",

    // Situation professionnelle
    profession: "",
    employeur: "",
    anciennete: "",
    typeContrat: "",
    salaire: "",

    // Informations financières
    revenus: "",
    charges: "",
    credits: "",

    // Projet
    typeVehicule: "",
    budget: "",
    financement: "",
    commentaires: "",
  })

  const steps = [
    { id: 1, title: "Informations personnelles", icon: User },
    { id: 2, title: "Situation professionnelle", icon: Briefcase },
    { id: 3, title: "Informations financières", icon: CreditCard },
    { id: 4, title: "Votre projet", icon: Home },
    { id: 5, title: "Documents", icon: FileText },
  ]

  const requiredDocuments = [
    "Pièce d'identité (recto-verso)",
    "Justificatif de domicile (-3 mois)",
    "3 derniers bulletins de salaire",
    "Dernier avis d'imposition",
    "RIB",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isRecaptchaVerified) {
      alert("Veuillez vérifier que vous n'êtes pas un robot")
      return
    }

    setIsSubmitting(true)

    try {
      // Simuler l'envoi du dossier
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSuccess(true)
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / steps.length) * 100

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <HeaderSimple />

      {/* Hero Section with BMW Background */}
      <div className="relative h-96 bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/bmw-hero-real.png')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        {/* Title and Breadcrumb */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Dossier</h1>
          <p className="text-xl text-gray-200">Accueil / Dossier</p>
        </div>
      </div>

      {/* Back to Home */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>
      </div>

      {/* Main Content - Réorganisé */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Section titre et description en haut */}
        <div className="text-center mb-12">
          <div className="text-sm text-green-500 font-semibold mb-2">City Car Services</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">CONSTITUTION DE DOSSIER EN LIGNE</h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed space-y-4">
            <p>
              Vous venez de Province (Lyon, Toulouse, Strasbourg...) ou vos contraintes personnelles vous empêchent de
              vous déplacer directement dans nos points de vente.
            </p>
            <p>
              City Car Lease vous offre la possibilité de transmettre vos documents en ligne sur notre page sécurisée en
              téléchargeant vos pièces depuis votre ordinateur. Dès réception de votre dossier complet nous nous
              engageons à vous donner une réponse sous 24H à 48H maximum.
            </p>
          </div>
        </div>

        {/* Section dossier en dessous - Centré */}
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">
                Étape {currentStep} sur {steps.length}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% complété</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps Navigation */}
          <div className="flex justify-between mb-8 overflow-x-auto">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center min-w-0 flex-1 ${
                    step.id <= currentStep ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step.id < currentStep
                        ? "bg-green-500 text-white"
                        : step.id === currentStep
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                    }`}
                  >
                    {step.id < currentStep ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className="text-xs text-center font-medium">{step.title}</span>
                </div>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4">Dossier envoyé avec succès !</h2>
                <p className="text-gray-600 mb-6">
                  Votre dossier a été transmis à nos équipes. Vous recevrez une réponse sous 48h.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button asChild>
                    <Link href="/">Retour à l'accueil</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/vehicules">Voir nos véhicules</Link>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {React.createElement(steps[currentStep - 1].icon, { className: "h-6 w-6" })}
                    <span>{steps[currentStep - 1].title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Step 1: Informations personnelles */}
                      {currentStep === 1 && (
                        <div className="space-y-6">
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
                              <Label htmlFor="dateNaissance">Date de naissance *</Label>
                              <Input
                                id="dateNaissance"
                                type="date"
                                value={formData.dateNaissance}
                                onChange={(e) => handleInputChange("dateNaissance", e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <BirthplaceAutocomplete
                                value={formData.lieuNaissance}
                                onChange={(value) => handleInputChange("lieuNaissance", value)}
                                required
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <NationalityAutocomplete
                                value={formData.nationalite}
                                onChange={(value) => handleInputChange("nationalite", value)}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="situationFamiliale">Situation familiale *</Label>
                              <select
                                id="situationFamiliale"
                                value={formData.situationFamiliale}
                                onChange={(e) => handleInputChange("situationFamiliale", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              >
                                <option value="">Sélectionnez</option>
                                <option value="celibataire">Célibataire</option>
                                <option value="marie">Marié(e)</option>
                                <option value="pacs">Pacsé(e)</option>
                                <option value="divorce">Divorcé(e)</option>
                                <option value="veuf">Veuf/Veuve</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-4">
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
                              <PhoneInput
                                value={formData.telephone}
                                onChange={(value) => handleInputChange("telephone", value)}
                                required
                              />
                            </div>
                            <div>
                              <AddressAutocomplete
                                value={formData.adresse}
                                onChange={(address, postcode, city) => {
                                  handleInputChange("adresse", address)
                                  if (postcode) {
                                    handleInputChange("codePostal", postcode)
                                  }
                                  if (city) {
                                    handleInputChange("ville", city)
                                  }
                                }}
                                onPostcodeChange={(postcode) => handleInputChange("codePostal", postcode)}
                                onCityChange={(city) => handleInputChange("ville", city)}
                                required
                              />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
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
                                <CityAutocomplete
                                  value={formData.ville}
                                  onChange={(city, postcode) => {
                                    handleInputChange("ville", city)
                                    if (postcode) {
                                      handleInputChange("codePostal", postcode)
                                    }
                                  }}
                                  onPostcodeChange={(postcode) => handleInputChange("codePostal", postcode)}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Situation professionnelle */}
                      {currentStep === 2 && (
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="profession">Profession *</Label>
                            <Input
                              id="profession"
                              value={formData.profession}
                              onChange={(e) => handleInputChange("profession", e.target.value)}
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="employeur">Employeur *</Label>
                            <Input
                              id="employeur"
                              value={formData.employeur}
                              onChange={(e) => handleInputChange("employeur", e.target.value)}
                              required
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="anciennete">Ancienneté *</Label>
                              <select
                                id="anciennete"
                                value={formData.anciennete}
                                onChange={(e) => handleInputChange("anciennete", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              >
                                <option value="">Sélectionnez</option>
                                <option value="moins-6-mois">Moins de 6 mois</option>
                                <option value="6-12-mois">6 à 12 mois</option>
                                <option value="1-2-ans">1 à 2 ans</option>
                                <option value="2-5-ans">2 à 5 ans</option>
                                <option value="plus-5-ans">Plus de 5 ans</option>
                              </select>
                            </div>
                            <div>
                              <Label htmlFor="typeContrat">Type de contrat *</Label>
                              <select
                                id="typeContrat"
                                value={formData.typeContrat}
                                onChange={(e) => handleInputChange("typeContrat", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              >
                                <option value="">Sélectionnez</option>
                                <option value="cdi">CDI</option>
                                <option value="cdd">CDD</option>
                                <option value="interim">Intérim</option>
                                <option value="freelance">Freelance</option>
                                <option value="fonctionnaire">Fonctionnaire</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="salaire">Salaire net mensuel *</Label>
                            <Input
                              id="salaire"
                              type="number"
                              value={formData.salaire}
                              onChange={(e) => handleInputChange("salaire", e.target.value)}
                              placeholder="En euros"
                              required
                            />
                          </div>
                        </div>
                      )}

                      {/* Step 3: Informations financières */}
                      {currentStep === 3 && (
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="revenus">Revenus mensuels totaux *</Label>
                            <Input
                              id="revenus"
                              type="number"
                              value={formData.revenus}
                              onChange={(e) => handleInputChange("revenus", e.target.value)}
                              placeholder="En euros"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="charges">Charges mensuelles *</Label>
                            <Input
                              id="charges"
                              type="number"
                              value={formData.charges}
                              onChange={(e) => handleInputChange("charges", e.target.value)}
                              placeholder="Loyer, crédits, etc."
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="credits">Crédits en cours</Label>
                            <Textarea
                              id="credits"
                              value={formData.credits}
                              onChange={(e) => handleInputChange("credits", e.target.value)}
                              placeholder="Détaillez vos crédits en cours (montant, durée restante...)"
                              rows={4}
                            />
                          </div>
                        </div>
                      )}

                      {/* Step 4: Votre projet */}
                      {currentStep === 4 && (
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="typeVehicule">Type de véhicule souhaité *</Label>
                            <select
                              id="typeVehicule"
                              value={formData.typeVehicule}
                              onChange={(e) => handleInputChange("typeVehicule", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            >
                              <option value="">Sélectionnez</option>
                              <option value="citadine">Citadine</option>
                              <option value="berline">Berline</option>
                              <option value="suv">SUV</option>
                              <option value="break">Break</option>
                              <option value="utilitaire">Utilitaire</option>
                            </select>
                          </div>

                          <div>
                            <Label htmlFor="budget">Budget souhaité *</Label>
                            <select
                              id="budget"
                              value={formData.budget}
                              onChange={(e) => handleInputChange("budget", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            >
                              <option value="">Sélectionnez</option>
                              <option value="moins-10000">Moins de 10 000€</option>
                              <option value="10000-20000">10 000€ - 20 000€</option>
                              <option value="20000-30000">20 000€ - 30 000€</option>
                              <option value="30000-50000">30 000€ - 50 000€</option>
                              <option value="plus-50000">Plus de 50 000€</option>
                            </select>
                          </div>

                          <div>
                            <Label htmlFor="financement">Type de financement *</Label>
                            <select
                              id="financement"
                              value={formData.financement}
                              onChange={(e) => handleInputChange("financement", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            >
                              <option value="">Sélectionnez</option>
                              <option value="credit-classique">Crédit classique</option>
                              <option value="loa">LOA (Location avec Option d'Achat)</option>
                              <option value="lld">LLD (Location Longue Durée)</option>
                              <option value="rent-to-buy">Rent to Buy</option>
                            </select>
                          </div>

                          <div>
                            <Label htmlFor="commentaires">Commentaires</Label>
                            <Textarea
                              id="commentaires"
                              value={formData.commentaires}
                              onChange={(e) => handleInputChange("commentaires", e.target.value)}
                              placeholder="Précisez vos besoins, préférences..."
                              rows={4}
                            />
                          </div>
                        </div>
                      )}

                      {/* Step 5: Documents */}
                      {currentStep === 5 && (
                        <div className="space-y-6">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                              <AlertCircle className="h-5 w-5 mr-2" />
                              Documents requis
                            </h3>
                            <ul className="space-y-2">
                              {requiredDocuments.map((doc, index) => (
                                <li key={index} className="flex items-center text-blue-800">
                                  <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                                  {doc}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <Label>Télécharger vos documents</Label>
                            <div className="mt-2">
                              <input
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                className="hidden"
                                id="file-upload"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                              />
                              <label
                                htmlFor="file-upload"
                                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                              >
                                <div className="text-center">
                                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                  <p className="text-sm text-gray-600">Cliquez pour ajouter vos documents</p>
                                  <p className="text-xs text-gray-500">PDF, Images, Word</p>
                                </div>
                              </label>
                            </div>

                            {uploadedFiles.length > 0 && (
                              <div className="mt-4 space-y-2">
                                {uploadedFiles.map((file, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <FileText className="h-5 w-5 text-gray-500" />
                                      <div>
                                        <p className="text-sm font-medium text-gray-700">{file.name}</p>
                                        <p className="text-xs text-gray-500">
                                          {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                      </div>
                                    </div>
                                    <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <RecaptchaCheckbox onVerificationChange={setIsRecaptchaVerified} className="py-4" />
                        </div>
                      )}
                    </motion.div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t">
                      <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                        Précédent
                      </Button>

                      {currentStep < steps.length ? (
                        <Button type="button" onClick={nextStep}>
                          Suivant
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={isSubmitting || !isRecaptchaVerified}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Envoi en cours...</span>
                            </div>
                          ) : (
                            "Envoyer le dossier"
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </AnimatePresence>
        </div>

        {/* Section témoignages en bas */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">Ils nous font confiance</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sophie M.",
                location: "Paris",
                text: "J'ai pu constituer mon dossier en ligne et obtenir une réponse en 24h. Le processus était simple et rapide !",
              },
              {
                name: "Thomas L.",
                location: "Lyon",
                text: "Venant de province, j'ai apprécié de pouvoir tout faire à distance. La livraison s'est faite comme prévu et la voiture correspond parfaitement à mes attentes.",
              },
              {
                name: "Julien D.",
                location: "Marseille",
                text: "L'équipe de City Car a été très réactive et professionnelle. Mon dossier a été traité rapidement et j'ai pu obtenir mon financement sans difficulté.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gray-50 border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">{testimonial.text}</p>
                  <div className="mt-4 flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
