"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, User, ChevronDown, Phone, Mail, MapPin, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSecondSection, setShowSecondSection] = useState(true)
  const [selectedVehicle, setSelectedVehicle] = useState("")
  const [currentLeasingIndex, setCurrentLeasingIndex] = useState(0)
  const leasingScrollRef = useRef<HTMLDivElement>(null)

  // Ajouter un nouvel état pour suivre l'étape de sélection et le type de financement
  const [searchStep, setSearchStep] = useState(1) // 1: sélection véhicule, 2: sélection financement
  const [selectedFinancing, setSelectedFinancing] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])



  const scrollToNextSection = () => {
    const element = document.getElementById("selection-section")
    if (element) {
      const headerHeight = 45 // Hauteur du header fixe
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  // Données des véhicules VTC (2 voitures)
  const vtcVehicles = [
    {
      id: "audi-q3-diesel",
      model: "AUDI Q3",
      price: "494 € / mois*",
      image: "/images/audi-q3.jpeg",
    },
    {
      id: "acura-csx-hybride",
      model: "ACURA CSX",
      price: "400 € / mois*",
      image: "/images/acura-csx.png",
    },
  ]

  // Données des véhicules Leasing (4 voitures pour le carousel)
  const leasingVehicles = [
    {
      id: "mercedes-cla-black",
      model: "MERCEDES-BENZ CLA",
      price: "469 € / mois*",
      image: "/images/mercedes-cla-black.png",
    },
    {
      id: "audi-q3-diesel",
      model: "AUDI Q3",
      price: "494 € / mois*",
      image: "/images/audi-q3.jpeg",
    },
    {
      id: "bmw-serie3",
      model: "BMW SÉRIE 3",
      price: "550 € / mois*",
      image: "/images/bmw-interior.png",
    },
    {
      id: "kia-sportage",
      model: "KIA SPORTAGE",
      price: "459 € / mois*",
      image: "/images/kia-sportage.png",
    },
  ]

  const scrollLeasingNext = () => {
    if (leasingScrollRef.current) {
      const cardWidth = 320 // largeur d'une carte + gap
      const maxIndex = leasingVehicles.length - 1
      let newIndex = currentLeasingIndex + 1

      // Scroll infini : si on arrive au bout, on continue avec les véhicules dupliqués
      if (newIndex > maxIndex) {
        newIndex = 0
      }

      setCurrentLeasingIndex(newIndex)

      // Calcul de la position de scroll pour l'effet infini
      const scrollPosition = (currentLeasingIndex + 1) * cardWidth

      leasingScrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }
  }

  // Fonction pour gérer les clics sur les véhicules
  const handleVehicleClick = (vehicleId: string) => {
    window.location.href = `/vehicules/${vehicleId}`
  }

  // Fonction pour gérer les clics sur les liens avec scroll en haut
  const handleLinkClick = (href: string) => {
    window.location.href = href
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Menu Burger - Largeur fixe */}
          <div className="w-20 flex justify-start">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-black border-gray-800 text-white">
                <div className="flex flex-col space-y-6 mt-8">
                  <button
                    onClick={() => handleLinkClick("/offres")}
                    className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                  >
                    Offres
                  </button>
                  <button
                    onClick={() => handleLinkClick("/dossier")}
                    className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                  >
                    Dossier
                  </button>
                  <button
                    onClick={() => handleLinkClick("/vehicules")}
                    className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                  >
                    Véhicules
                  </button>
                  <button
                    onClick={() => handleLinkClick("/vtc")}
                    className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                  >
                    VTC
                  </button>
                  <button
                    onClick={() => handleLinkClick("/leasing")}
                    className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                  >
                    Leasing
                  </button>
                  <button
                    onClick={() => handleLinkClick("/rent-to-buy")}
                    className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                  >
                    Rent to Buy
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo Central - Parfaitement centré */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-white">City</span>
              <span className="text-green-400">Car</span>
            </Link>
          </div>

          {/* Navigation Droite - Largeur fixe */}
          <div className="w-80 flex items-center justify-end space-x-4">
            <button
              onClick={() => handleLinkClick("/contact")}
              className="hidden md:block text-sm hover:text-green-400 transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => handleLinkClick("/faq")}
              className="hidden md:block text-sm hover:text-green-400 transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => handleLinkClick("/about")}
              className="hidden md:block text-sm hover:text-green-400 transition-colors"
            >
              À propos
            </button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={() => handleLinkClick("/profile")}
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Profil</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/bolt-hero.jpeg')",
          }}
        >
          {/* Overlay réduit pour mieux voir l'image */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/40" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Bienvenue chez
            <br />
            <span className="text-green-400">CityCar</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto"
          >
            Votre partenaire du programme Bolt Car
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              onClick={() => handleLinkClick("/bolt-car")}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 text-lg"
            >
              Découvrez l'offre
            </Button>
          </motion.div>
        </div>

        {/* Scroll Arrow */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          onClick={scrollToNextSection}
          className="absolute bottom-8 right-8 p-3 border border-white/30 hover:border-white/60 transition-all duration-300 hover:bg-white/10"
          aria-label="Défiler vers le bas"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.button>
      </section>

      {/* Search Section */}
      <section
        id="selection-section"
        className={`py-20 bg-gray-100 transition-all duration-1000 ${
          showSecondSection ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">CityCar</h2>
            <p className="text-xl text-gray-700">FINANCEMENT ET LEASING DE VOITURES D'OCCASION</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Recherche Rapide Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-green-400 text-white text-center py-4">
                  <h3 className="text-2xl font-bold">Recherche rapide</h3>
                </div>
                <CardContent className="p-6">
                  <div className="mb-6">
                    {searchStep === 1 ? (
                      <>
                        <h4 className="text-lg font-semibold text-black mb-3">Vous recherchez :</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: "citadine", label: "citadine", icon: "🚗" },
                            { id: "berline", label: "Berline", icon: "🚙" },
                            { id: "suv", label: "suv/monospace", icon: "🚐" },
                            { id: "hybrid", label: "hybride/électrique", icon: "⚡" },
                          ].map((vehicle) => (
                            <button
                              key={vehicle.id}
                              onClick={() => setSelectedVehicle(vehicle.id)}
                              className={`p-3 border-2 rounded-lg text-center transition-all ${
                                selectedVehicle === vehicle.id
                                  ? "bg-green-400 text-white border-green-400"
                                  : "bg-gray-50 text-gray-700 border-gray-200 hover:border-green-400"
                              }`}
                            >
                              <div className="text-2xl mb-2">{vehicle.icon}</div>
                              <div className="font-medium">{vehicle.label}</div>
                            </button>
                          ))}
                        </div>
                        <Button
                          className="w-full bg-green-400 hover:bg-green-500 text-white py-3 text-lg font-semibold mt-4"
                          disabled={!selectedVehicle}
                          onClick={() => {
                            if (selectedVehicle) {
                              setSearchStep(2)
                            }
                          }}
                        >
                          Continuer
                        </Button>
                      </>
                    ) : (
                      <>
                        <h4 className="text-lg font-semibold text-black mb-4">Type de financement :</h4>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <button
                            onClick={() => setSelectedFinancing("credit")}
                            className={`p-4 border-2 rounded-lg text-center transition-all ${
                              selectedFinancing === "credit"
                                ? "bg-green-400 text-white border-green-400"
                                : "bg-gray-50 text-gray-700 border-gray-200 hover:border-green-400"
                            }`}
                          >
                            <div className="text-2xl mb-2">💳</div>
                            <div className="font-medium">CREDIT</div>
                          </button>
                          <button
                            onClick={() => setSelectedFinancing("loa")}
                            className={`p-4 border-2 rounded-lg text-center transition-all ${
                              selectedFinancing === "loa"
                                ? "bg-green-400 text-white border-green-400"
                                : "bg-gray-50 text-gray-700 border-gray-200 hover:border-green-400"
                            }`}
                          >
                            <div className="text-2xl mb-2">🚗</div>
                            <div className="font-medium">LOA</div>
                          </button>
                        </div>
                        <div className="flex flex-col space-y-4">
                          <Button
                            className="w-full bg-green-400 hover:bg-green-500 text-white py-3 text-lg font-semibold"
                            disabled={!selectedFinancing}
                            onClick={() => {
                              if (selectedVehicle && selectedFinancing) {
                                handleLinkClick(`/vehicules?type=${selectedVehicle}&financement=${selectedFinancing}`)
                              }
                            }}
                          >
                            RECHERCHER
                          </Button>
                          <Button
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 text-lg font-semibold"
                            onClick={() => {
                              setSearchStep(1)
                            }}
                          >
                            Retour
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 4 Étapes Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-green-400 text-white text-center py-4">
                  <h3 className="text-2xl font-bold">Votre nouvelle auto en 4 étapes</h3>
                </div>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        1
                      </div>
                      <p className="text-gray-700">
                        Visualisez les vidéos intérieures et extérieures du véhicule ainsi que le dossier complet depuis
                        chez vous.
                      </p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        2
                      </div>
                      <p className="text-gray-700">Envoyez vos documents</p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        3
                      </div>
                      <p className="text-gray-700">Recevez votre réponse de principe sous 48h.</p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        4
                      </div>
                      <p className="text-gray-700">Livraison de votre véhicule en agence sous 8 jours.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vehicle Selection Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm text-green-500 font-semibold mb-2">NOTRE SÉLECTION</h2>
            <h3 className="text-3xl font-bold text-black mb-8">DE VOITURES FIABLES</h3>

            {/* Price Circles */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {[
                { price: "150€", label: "Moins de", color: "border-green-400 text-green-400" },
                { price: "299€", label: "de 150€ à", color: "border-gray-800 text-gray-800" },
                { price: "499€", label: "de 300€ à", color: "border-green-400 text-green-400" },
                { price: "700€", label: "de 500€ à", color: "border-gray-800 text-gray-800" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div
                    className={`w-32 h-32 mx-auto rounded-full border-4 flex flex-col items-center justify-center ${item.color} hover:scale-110 transition-transform duration-300 cursor-pointer`}
                  >
                    <span className="text-xs text-gray-600">{item.label}</span>
                    <span className="text-2xl font-bold">{item.price}</span>
                    <span className="text-xs text-gray-500">PAR MOIS</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              onClick={() => handleLinkClick("/leasing")}
              className="bg-green-400 hover:bg-green-500 text-white mb-8"
            >
              Toutes nos voitures en leasing
            </Button>

            {/* Video Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/9d30UtezhEA"
                  title="Les voitures luxueux"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* VTC Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-black">VTC</h3>
              <p className="text-gray-600">NOS PROMOTIONS</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
              {vtcVehicles.map((car, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                    onClick={() => handleVehicleClick(car.id)}
                  >
                    <div className="aspect-video bg-gray-200 overflow-hidden">
                      <img
                        src={car.image || "/placeholder.svg?height=200&width=300&query=car"}
                        alt={car.model}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">{car.price}</p>
                      <h4 className="font-bold text-lg">{car.model}</h4>
                      <Button variant="ghost" size="icon" className="mt-2 hover:bg-green-50 transition-colors">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mb-8">
              <Button onClick={() => handleLinkClick("/vtc")} className="bg-green-400 hover:bg-green-500 text-white">
                Toutes nos promotions VTC
              </Button>
            </div>

          </div>

          {/* Leasing Section avec Carousel */}
          <div id="leasing-section" className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-black">Leasing</h3>
              <p className="text-gray-600">NOS PROMOTIONS</p>
            </div>

            {/* Carousel Container */}
            <div className="relative max-w-6xl mx-auto">
              <div
                ref={leasingScrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {/* Tripler les véhicules pour un scroll vraiment infini */}
                {[...leasingVehicles, ...leasingVehicles, ...leasingVehicles].map((car, index) => (
                  <Card
                    key={index}
                    className="flex-shrink-0 w-80 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleVehicleClick(car.id)}
                  >
                    <div className="aspect-video bg-gray-200">
                      <img
                        src={car.image || "/placeholder.svg?height=200&width=300&query=car"}
                        alt={car.model}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">{car.price}</p>
                      <h4 className="font-bold text-lg">{car.model}</h4>
                      <Button variant="ghost" size="icon" className="mt-2">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Navigation infinie pour Leasing */}
            <div className="text-center hidden">
              <button
                onClick={scrollLeasingNext}
                className="p-3 border border-gray-300 hover:border-gray-500 transition-all duration-300 hover:bg-gray-50 rounded-full"
                aria-label="Véhicule suivant"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Arrow to Blog */}
        <div className="text-center">
          <button
            onClick={() => document.getElementById("blog-section")?.scrollIntoView({ behavior: "smooth" })}
            className="p-3 border border-gray-300 hover:border-gray-500 transition-all duration-300 hover:bg-gray-50"
            aria-label="Voir le blog"
          >
            <ChevronDown className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog-section" className="py-20 bg-green-400">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-black mb-8">LE BLOG DE CITYCAR</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                id: "achat-confinement",
                title: "Acheter sa voiture d'occasion en période de confinement",
                excerpt:
                  "Chaque année, de nombreux Français achètent leur voiture d'occasion afin de profiter de prix plus abordables. Cette année, les consommateurs ont vu leurs habitudes d'achat changer avec la fermeture des commerces et les restrictions de déplacements. Dans ce contexte particulier, certains se demandent alors si un nouveau confinement viendra freiner l'achat de leur véhicule. D'une [&#8230;]",
              },
              {
                id: "leasing-electrique",
                title: "Leasing de voiture électrique : quels avantages et inconvénients ?",
                excerpt:
                  "Le nombre de Français optant pour une location avec option d'achat grandit de jour en jour. Cette méthode de financement d'un véhicule neuf ou d'occasion présente de nombreux avantages pour les consommateurs ne souhaitant pas s'engager dans des dépenses excessives. Toutefois, avec l'arrivée des voitures électriques et hybrides sur le marché, le leasing a vu [&#8230;]",
              },
              {
                id: "leasing-credit-auto",
                title: "Leasing ou Crédit Auto : quel financement pour votre véhicule d'occasion ?",
                excerpt:
                  "Indispensable à vos déplacements quotidiens, un véhicule représente toutefois des frais réguliers et un coût important au moment de son acquisition. Alors que les véhicules d'occasion représentent une alternative intéressante avec des prix attractifs, il reste à déterminer votre type de financement pour son achat. Nous faisons le point avec vous sur les avantages et [&#8230;]",
              },
            ].map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-black mb-4 leading-tight">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">{article.excerpt}</p>
                    <button
                      onClick={() => handleLinkClick(`/blog/${article.id}`)}
                      className="text-green-500 hover:text-green-600 font-medium inline-flex items-center transition-colors"
                    >
                      Lire la suite
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-white">City</span>
                <span className="text-green-400">Car</span>
              </div>
              <p className="text-gray-400 mb-4">
                Société spécialisée dans la vente de véhicules d'occasion toutes marques à des prix imbattables.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-green-400" />
                  <span className="text-sm">96 Rue Anatole France, 92300 Levallois-Perret</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-green-400" />
                  <span className="text-sm">01 41 34 31 45</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-green-400" />
                  <span className="text-sm">contact@city-car.fr</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Marques</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button
                    onClick={() => handleLinkClick("/marques/smart")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Smart
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("/marques/mini")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Mini
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("/marques/fiat")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Fiat
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("/marques/peugeot")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Peugeot
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("/marques/renault")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Renault
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("/marques/mercedes")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Mercedes-Benz
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("/marques/volkswagen")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Volkswagen
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button
                    onClick={() => handleLinkClick("/leasing")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Leasing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("/vtc")}
                    className="hover:text-white transition-colors text-left"
                  >
                    VTC
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("/rent-to-buy")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Rent to Buy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("/dossier")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Financement
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Localisation</h3>
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                {/* Google Maps Embed */}
                <div className="relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.8937232!2d2.2836526!3d48.8937232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f842274539b%3A0xbb4d8faebff38b1c!2sCity%20Car!5e0!3m2!1sfr!2sfr!4v1699999999999!5m2!1sfr!2sfr"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-t-lg"
                  ></iframe>
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-400 mb-2">Notre showroom</div>
                  <div className="text-green-400 font-semibold mb-3">Levallois-Perret</div>
                  <Button
                    onClick={() => {
                      window.open(
                        "https://www.google.com/maps/dir//City+Car,+96+Rue+Anatole+France,+92300+Levallois-Perret",
                        "_blank",
                      )
                    }}
                    className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold"
                  >
                    Itinéraire
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 CityCar. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
