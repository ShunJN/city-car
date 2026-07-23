"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp, Search, RefreshCw, ArrowLeft } from "lucide-react"
import Link from "next/link"
import HeaderSimple from "@/components/header-simple"
import Footer from "@/components/footer"
import AnimatedFadeIn from "@/components/animated-fade-in"

// Types de véhicules disponibles
const categories = [
  { value: "all", label: "Toutes catégories" },
  { value: "coupe", label: "Coupé" },
  { value: "berline", label: "Berline" },
  { value: "suv", label: "SUV" },
  { value: "citadine", label: "Citadine" },
]

// Marques disponibles
const marques = [
  { value: "acura", label: "Acura" },
  { value: "audi", label: "Audi" },
  { value: "mercedes", label: "Mercedes-Benz" },
  { value: "kia", label: "Kia" },
  { value: "bmw", label: "BMW" },
  { value: "volkswagen", label: "Volkswagen" },
  { value: "toyota", label: "Toyota" },
  { value: "smart", label: "Smart" },
]

// Types de financement
const financements = [
  { value: "credit", label: "CRÉDIT" },
  { value: "loa", label: "LOA" },
  { value: "loa-credit", label: "LOA/CRÉDIT" },
]

// Types de moteurs
const moteurs = [
  { value: "hybride", label: "Hybride" },
  { value: "diesel", label: "Diesel" },
  { value: "essence", label: "Essence" },
]

// Années disponibles
const annees = Array.from({ length: 11 }, (_, i) => {
  const year = 2025 - i
  return { value: year.toString(), label: year.toString() }
})

// Données des véhicules
const vehicules = [
  {
    id: "mercedes-cla-black",
    marque: "MERCEDES-BENZ",
    modele: "CLA ESSENCE",
    prix: 469,
    annee: 2023,
    transmission: "Auto",
    kilometrage: 15000,
    image: "/images/mercedes-cla-black.png",
    moteur: "essence",
    financement: ["credit", "loa"],
  },
  {
    id: "acura-csx-hybride",
    marque: "ACURA",
    modele: "CSX HYBRIDE",
    prix: 900,
    annee: 2024,
    transmission: "Auto",
    kilometrage: 3000,
    image: "/images/acura-csx-hybride.jpeg",
    moteur: "hybride",
    financement: ["credit", "loa"],
  },
  {
    id: "acura-csx-essence",
    marque: "ACURA",
    modele: "CSX ESSENCE",
    prix: 400,
    annee: 2024,
    transmission: "Auto",
    kilometrage: 1000,
    image: "/images/acura-csx.png",
    moteur: "essence",
    financement: ["loa"],
  },
  {
    id: "audi-q3-diesel",
    marque: "AUDI",
    modele: "Q3 DIESEL",
    prix: 494,
    annee: 2021,
    transmission: "Auto",
    kilometrage: 43779,
    image: "/images/audi-q3.jpeg",
    moteur: "diesel",
    financement: ["credit", "loa"],
  },
  {
    id: "kia-sportage",
    marque: "KIA",
    modele: "SPORTAGE HYBRIDE",
    prix: 459,
    annee: 2023,
    transmission: "Auto",
    kilometrage: 67000,
    image: "/images/kia-sportage.png",
    moteur: "hybride",
    financement: ["loa", "credit"],
  },
  {
    id: "volkswagen-golf",
    marque: "VOLKSWAGEN",
    modele: "GOLF ESSENCE",
    prix: 350,
    annee: 2022,
    transmission: "Auto",
    kilometrage: 45000,
    image: "/images/volkswagen-white.png",
    moteur: "essence",
    financement: ["credit", "loa"],
  },
  {
    id: "bmw-serie3",
    marque: "BMW",
    modele: "SÉRIE 3 DIESEL",
    prix: 550,
    annee: 2023,
    transmission: "Auto",
    kilometrage: 35000,
    image: "/images/bmw.png",
    moteur: "diesel",
    financement: ["loa"],
  },
  {
    id: "toyota-chr",
    marque: "TOYOTA",
    modele: "C-HR HYBRIDE",
    prix: 380,
    annee: 2022,
    transmission: "Auto",
    kilometrage: 25000,
    image: "/images/toyota-chr.jpeg",
    moteur: "hybride",
    financement: ["credit", "loa"],
  },
  {
    id: "smart-fortwo",
    marque: "SMART",
    modele: "FORTWO ESSENCE",
    prix: 280,
    annee: 2020,
    transmission: "Auto",
    kilometrage: 30000,
    image: "/images/smart-fortwo.jpeg",
    moteur: "essence",
    financement: ["credit", "loa"],
  },
]

export default function VehiculesPage() {
  // Scroll automatique en haut au chargement de la page
  useEffect(() => {
    // Scroll immédiat
    window.scrollTo(0, 0)

    // Scroll avec un petit délai pour s'assurer que la page est complètement chargée
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // États pour les filtres
  const [categorieFilter, setCategorieFilter] = useState("all")
  const [marqueFilters, setMarqueFilters] = useState<string[]>([])
  const [financementFilters, setFinancementFilters] = useState<string[]>([])
  const [moteurFilters, setMoteurFilters] = useState<string[]>([])
  const [prixRange, setPrixRange] = useState([100, 1000])
  const [kmRange, setKmRange] = useState([0, 200000])
  const [anneeMin, setAnneeMin] = useState("")
  const [anneeMax, setAnneeMax] = useState("")

  // État pour les véhicules filtrés
  const [filteredVehicules, setFilteredVehicules] = useState(vehicules)

  // États pour les sections de filtre dépliées/repliées
  const [expandedSections, setExpandedSections] = useState({
    categorie: true,
    marque: true,
    financement: true,
    moteur: true,
    prix: true,
    kilometrage: true,
    annees: true,
  })

  // Fonction pour basculer l'état d'une section
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  // Fonction pour gérer les changements de checkbox
  const handleCheckboxChange = (
    value: string,
    currentFilters: string[],
    setFilters: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (currentFilters.includes(value)) {
      setFilters(currentFilters.filter((item) => item !== value))
    } else {
      setFilters([...currentFilters, value])
    }
  }

  // Fonction pour réinitialiser tous les filtres
  const resetFilters = () => {
    setCategorieFilter("all")
    setMarqueFilters([])
    setFinancementFilters([])
    setMoteurFilters([])
    setPrixRange([100, 1000])
    setKmRange([0, 200000])
    setAnneeMin("")
    setAnneeMax("")
  }

  // Appliquer les filtres
  useEffect(() => {
    let result = [...vehicules]

    // Filtre par catégorie
    if (categorieFilter !== "all") {
      // Logique de filtrage par catégorie (à implémenter selon les données)
    }

    // Filtre par marque
    if (marqueFilters.length > 0) {
      result = result.filter((v) => marqueFilters.includes(v.marque.toLowerCase()))
    }

    // Filtre par financement
    if (financementFilters.length > 0) {
      result = result.filter((v) => v.financement.some((f) => financementFilters.includes(f)))
    }

    // Filtre par moteur
    if (moteurFilters.length > 0) {
      result = result.filter((v) => moteurFilters.includes(v.moteur))
    }

    // Filtre par prix
    result = result.filter((v) => v.prix >= prixRange[0] && v.prix <= prixRange[1])

    // Filtre par kilométrage
    result = result.filter((v) => v.kilometrage >= kmRange[0] && v.kilometrage <= kmRange[1])

    // Filtre par année min
    if (anneeMin) {
      result = result.filter((v) => v.annee >= Number.parseInt(anneeMin))
    }

    // Filtre par année max
    if (anneeMax) {
      result = result.filter((v) => v.annee <= Number.parseInt(anneeMax))
    }

    setFilteredVehicules(result)
  }, [categorieFilter, marqueFilters, financementFilters, moteurFilters, prixRange, kmRange, anneeMin, anneeMax])

  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-4xl font-bold mb-4">Notre sélection de véhicules</h1>
          <div className="flex items-center justify-center space-x-2">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-white">Véhicules</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-green-500 hover:text-green-600 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filtres */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">RECHERCHE AVANCÉE</h2>

              {/* Catégorie */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleSection("categorie")}
                >
                  <h3 className="font-semibold text-green-600">Catégorie</h3>
                  {expandedSections.categorie ? (
                    <ChevronUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-green-600" />
                  )}
                </div>

                {expandedSections.categorie && (
                  <Select value={categorieFilter} onValueChange={setCategorieFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Marque */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleSection("marque")}
                >
                  <h3 className="font-semibold text-green-600">Marque</h3>
                  {expandedSections.marque ? (
                    <ChevronUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-green-600" />
                  )}
                </div>

                {expandedSections.marque && (
                  <div className="space-y-2">
                    {marques.map((marque) => (
                      <div key={marque.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`marque-${marque.value}`}
                          checked={marqueFilters.includes(marque.value)}
                          onCheckedChange={() => handleCheckboxChange(marque.value, marqueFilters, setMarqueFilters)}
                        />
                        <Label htmlFor={`marque-${marque.value}`} className="text-sm cursor-pointer">
                          {marque.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Financement */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleSection("financement")}
                >
                  <h3 className="font-semibold text-green-600">Financement</h3>
                  {expandedSections.financement ? (
                    <ChevronUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-green-600" />
                  )}
                </div>

                {expandedSections.financement && (
                  <div className="space-y-2">
                    {financements.map((financement) => (
                      <div key={financement.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`financement-${financement.value}`}
                          checked={financementFilters.includes(financement.value)}
                          onCheckedChange={() =>
                            handleCheckboxChange(financement.value, financementFilters, setFinancementFilters)
                          }
                        />
                        <Label htmlFor={`financement-${financement.value}`} className="text-sm cursor-pointer">
                          {financement.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Moteur */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleSection("moteur")}
                >
                  <h3 className="font-semibold text-green-600">Moteur</h3>
                  {expandedSections.moteur ? (
                    <ChevronUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-green-600" />
                  )}
                </div>

                {expandedSections.moteur && (
                  <div className="space-y-2">
                    {moteurs.map((moteur) => (
                      <div key={moteur.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`moteur-${moteur.value}`}
                          checked={moteurFilters.includes(moteur.value)}
                          onCheckedChange={() => handleCheckboxChange(moteur.value, moteurFilters, setMoteurFilters)}
                        />
                        <Label htmlFor={`moteur-${moteur.value}`} className="text-sm cursor-pointer">
                          {moteur.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Prix */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleSection("prix")}
                >
                  <h3 className="font-semibold text-green-600">Prix</h3>
                  {expandedSections.prix ? (
                    <ChevronUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-green-600" />
                  )}
                </div>

                {expandedSections.prix && (
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Votre budget</span>
                      <span>
                        {prixRange[0]}€ - {prixRange[1]}€
                      </span>
                    </div>
                    <Slider
                      defaultValue={[100, 1000]}
                      min={100}
                      max={1000}
                      step={10}
                      value={prixRange}
                      onValueChange={setPrixRange}
                      className="mt-2"
                    />
                    <div className="h-2 bg-gradient-to-r from-green-200 to-green-500 rounded-full"></div>
                  </div>
                )}
              </div>

              {/* Kilométrage */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleSection("kilometrage")}
                >
                  <h3 className="font-semibold text-green-600">Kilométrage</h3>
                  {expandedSections.kilometrage ? (
                    <ChevronUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-green-600" />
                  )}
                </div>

                {expandedSections.kilometrage && (
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Kilométrage</span>
                      <span>max {kmRange[1].toLocaleString('fr-FR')}km</span>
                    </div>
                    <Slider
                      defaultValue={[0, 200000]}
                      min={0}
                      max={200000}
                      step={1000}
                      value={kmRange}
                      onValueChange={setKmRange}
                      className="mt-2"
                    />
                    <div className="h-2 bg-gradient-to-r from-green-200 to-green-500 rounded-full"></div>
                  </div>
                )}
              </div>

              {/* Années */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center cursor-pointer mb-3"
                  onClick={() => toggleSection("annees")}
                >
                  <h3 className="font-semibold text-green-600">Années</h3>
                  {expandedSections.annees ? (
                    <ChevronUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-green-600" />
                  )}
                </div>

                {expandedSections.annees && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="annee-min">De :</Label>
                      <Select value={anneeMin} onValueChange={setAnneeMin}>
                        <SelectTrigger id="annee-min" className="w-full">
                          <SelectValue placeholder="Sélectionnez l'année" />
                        </SelectTrigger>
                        <SelectContent>
                          {annees.map((annee) => (
                            <SelectItem key={`min-${annee.value}`} value={annee.value}>
                              {annee.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="annee-max">À :</Label>
                      <Select value={anneeMax} onValueChange={setAnneeMax}>
                        <SelectTrigger id="annee-max" className="w-full">
                          <SelectValue placeholder="Sélectionnez l'année" />
                        </SelectTrigger>
                        <SelectContent>
                          {annees.map((annee) => (
                            <SelectItem key={`max-${annee.value}`} value={annee.value}>
                              {annee.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              {/* Boutons d'action */}
              <div className="space-y-3 mt-8">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center">
                  <Search className="mr-2 h-4 w-4" />
                  RECHERCHER
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-green-300 text-green-600 hover:bg-green-50 flex items-center justify-center bg-transparent"
                  onClick={resetFilters}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  RÉINITIALISER
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content - Véhicules */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {filteredVehicules.length} véhicule{filteredVehicules.length !== 1 ? "s" : ""} trouvé
                  {filteredVehicules.length !== 1 ? "s" : ""}
                </h2>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <Select defaultValue="prix-asc">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prix-asc">Prix croissant</SelectItem>
                      <SelectItem value="prix-desc">Prix décroissant</SelectItem>
                      <SelectItem value="km-asc">Kilométrage croissant</SelectItem>
                      <SelectItem value="km-desc">Kilométrage décroissant</SelectItem>
                      <SelectItem value="annee-desc">Année récente</SelectItem>
                      <SelectItem value="annee-asc">Année ancienne</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Grille de véhicules */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicules.map((vehicule, index) => (
                  <AnimatedFadeIn key={vehicule.id} delay={0.1 * index} direction="up">
                    <Link href={`/vehicules/${vehicule.id}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                        <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                          <img
                            src={vehicule.image || "/placeholder.svg"}
                            alt={`${vehicule.marque} ${vehicule.modele}`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <CardContent className="p-4 flex flex-col flex-grow">
                          <div className="text-center mb-4">
                            <h3 className="font-bold text-lg text-gray-900">
                              {vehicule.marque} - {vehicule.modele}
                            </h3>
                            <div className="h-1 w-16 bg-green-400 mx-auto my-2"></div>
                            <p className="text-green-600 font-bold text-xl">{vehicule.prix}€ / mois</p>
                          </div>

                          <div className="grid grid-cols-3 gap-2 mt-auto">
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <p className="text-sm text-gray-600">{vehicule.annee}</p>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <p className="text-sm text-gray-600">{vehicule.transmission}</p>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <p className="text-sm text-gray-600">{vehicule.kilometrage.toLocaleString('fr-FR')} km</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </AnimatedFadeIn>
                ))}
              </div>

              {/* Message si aucun véhicule trouvé */}
              {filteredVehicules.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Aucun véhicule ne correspond à votre recherche</h3>
                  <p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche</p>
                  <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={resetFilters}>
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredVehicules.length > 0 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" className="w-8 h-8 p-0 bg-transparent">
                    <span className="sr-only">Page précédente</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-green-500 text-white hover:bg-green-600 border-green-500"
                  >
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="icon" className="w-8 h-8 p-0 bg-transparent">
                    <span className="sr-only">Page suivante</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
