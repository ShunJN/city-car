"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Check, ChevronRight, Calculator, FileCheck, Calendar, Globe, Users } from "lucide-react"
import HeaderSimple from "@/components/header-simple"
import Footer from "@/components/footer"
import AnimatedFadeIn from "@/components/animated-fade-in"

export default function LeasingPage() {
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
          <h1 className="text-4xl font-bold mb-4">Leasing</h1>
          <p className="text-lg">
            <span>Accueil</span> / Leasing
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center text-green-500 hover:text-green-600 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Leasing de véhicules d'occasion</h2>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Le leasing, ou Location avec Option d'Achat (LOA), est une solution de financement flexible qui vous
              permet de rouler dans un véhicule récent avec des mensualités maîtrisées. À la fin du contrat, vous avez
              le choix entre acheter le véhicule, le restituer ou opter pour un nouveau modèle.
            </p>
          </div>

          {/* How Leasing Works */}
          <div className="mb-16">
            <AnimatedFadeIn>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Comment fonctionne le leasing ?</h3>
            </AnimatedFadeIn>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: 1,
                  title: "Choisissez votre véhicule",
                  description:
                    "Sélectionnez le véhicule qui correspond à vos besoins parmi notre large gamme de voitures d'occasion.",
                },
                {
                  step: 2,
                  title: "Définissez votre contrat",
                  description: "Déterminez la durée (24 à 60 mois) et le kilométrage annuel selon votre utilisation.",
                },
                {
                  step: 3,
                  title: "Profitez de votre véhicule",
                  description:
                    "Utilisez votre véhicule pendant toute la durée du contrat en payant des mensualités fixes.",
                },
                {
                  step: 4,
                  title: "Choisissez votre option",
                  description:
                    "À la fin du contrat, achetez le véhicule, restituez-le ou optez pour un nouveau leasing.",
                },
              ].map((step, index) => (
                <AnimatedFadeIn key={index} delay={0.2 * index}>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110">
                      <span className="text-2xl font-bold text-green-600">{step.step}</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">{step.title}</h4>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </AnimatedFadeIn>
              ))}
            </div>
          </div>

          {/* Leasing Advantages */}
          <div className="mb-16 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Avantages du leasing</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Mensualités réduites</h4>
                      <p className="text-gray-700">Des mensualités généralement plus basses qu'un crédit classique.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Budget maîtrisé</h4>
                      <p className="text-gray-700">Mensualités fixes pendant toute la durée du contrat.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Apport minimal</h4>
                      <p className="text-gray-700">Possibilité de démarrer avec un apport réduit ou sans apport.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Flexibilité</h4>
                      <p className="text-gray-700">Plusieurs options à la fin du contrat selon vos besoins.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Garantie incluse</h4>
                      <p className="text-gray-700">Véhicules couverts par une garantie pendant la durée du contrat.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Renouvellement facilité</h4>
                      <p className="text-gray-700">Possibilité de changer régulièrement de véhicule.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Stats Banner */}
          <div className="mb-16 bg-gray-800 py-12 rounded-lg" style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: FileCheck,
                  number: "30",
                  text: "% d'économies",
                },
                {
                  icon: Calendar,
                  number: "60",
                  text: "mois de locations",
                },
                {
                  icon: Globe,
                  number: "20",
                  text: "pays d'europe",
                },
                {
                  icon: Users,
                  number: "6000",
                  text: "clients",
                },
              ].map((stat, index) => (
                <AnimatedFadeIn key={index} delay={0.1 * index}>
                  <div className="text-center text-white">
                    <stat.icon className="h-12 w-12 mx-auto mb-4 text-white" />
                    <div className="text-5xl font-bold mb-2">{stat.number}</div>
                    <div className="text-lg text-gray-300">{stat.text}</div>
                  </div>
                </AnimatedFadeIn>
              ))}
            </div>
          </div>

          {/* Featured Leasing Vehicles */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Nos véhicules en leasing</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  id: "mercedes-cla-leasing",
                  marque: "MERCEDES-BENZ",
                  modele: "CLA ESSENCE",
                  prix: 469,
                  image: "/images/mercedes-cla-black.png",
                },
                {
                  id: "audi-q3-leasing",
                  marque: "AUDI",
                  modele: "Q3 DIESEL",
                  prix: 494,
                  image: "/images/audi-q3.jpeg",
                },
                {
                  id: "bmw-serie3-leasing",
                  marque: "BMW",
                  modele: "SÉRIE 3 DIESEL",
                  prix: 550,
                  image: "/images/bmw-interior.png",
                },
              ].map((vehicle, index) => (
                <AnimatedFadeIn key={vehicle.id} delay={0.2 * index}>
                  <Link href={`/vehicules/${vehicle.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                      <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                        <img
                          src={vehicle.image || "/placeholder.svg"}
                          alt={`${vehicle.marque} ${vehicle.modele}`}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4 flex flex-col flex-grow">
                        <div className="text-center mb-4">
                          <h3 className="font-bold text-lg text-gray-900">
                            {vehicle.marque} - {vehicle.modele}
                          </h3>
                          <div className="h-1 w-16 bg-green-400 mx-auto my-2"></div>
                          <p className="text-green-600 font-bold text-xl">{vehicle.prix}€ / mois</p>
                        </div>
                        <div className="mt-auto text-center">
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                            Voir les détails <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedFadeIn>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/vehicules">
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Voir tous nos véhicules en leasing
                </Button>
              </Link>
            </div>
          </div>

          {/* Leasing Calculator */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Simulateur de leasing</h3>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-6">
                <Calculator className="h-12 w-12 text-green-500 mr-4" />
                <h4 className="text-xl font-bold text-gray-900">Estimez vos mensualités</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Prix du véhicule</label>
                    <div className="relative">
                      <input
                        type="range"
                        min="5000"
                        max="50000"
                        step="1000"
                        defaultValue="20000"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>5 000 €</span>
                        <span>50 000 €</span>
                      </div>
                    </div>
                    <div className="text-center mt-2 font-semibold">20 000 €</div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Durée du contrat</label>
                    <div className="relative">
                      <input
                        type="range"
                        min="24"
                        max="60"
                        step="12"
                        defaultValue="36"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>24 mois</span>
                        <span>60 mois</span>
                      </div>
                    </div>
                    <div className="text-center mt-2 font-semibold">36 mois</div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Apport initial</label>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="500"
                        defaultValue="2000"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0 €</span>
                        <span>5 000 €</span>
                      </div>
                    </div>
                    <div className="text-center mt-2 font-semibold">2 000 €</div>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg flex flex-col justify-center items-center">
                  <h5 className="text-lg text-gray-700 mb-4">Estimation mensuelle</h5>
                  <div className="text-4xl font-bold text-green-600 mb-6">389 €</div>
                  <p className="text-sm text-gray-500 mb-6 text-center">
                    Cette estimation est donnée à titre indicatif et peut varier selon votre profil et les conditions du
                    marché.
                  </p>
                  <Link href="/dossier">
                    <Button className="bg-green-500 hover:bg-green-600 text-white w-full">
                      Demander une offre personnalisée
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Questions fréquentes</h3>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Puis-je résilier mon contrat de leasing avant son terme ?
                </h4>
                <p className="text-gray-700">
                  Oui, il est possible de résilier un contrat de leasing avant son terme, mais cela entraîne
                  généralement des frais de résiliation anticipée. Ces frais varient selon les conditions du contrat et
                  la durée restante.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Que se passe-t-il si je dépasse le kilométrage prévu ?
                </h4>
                <p className="text-gray-700">
                  En cas de dépassement du kilométrage contractuel, des frais supplémentaires sont appliqués,
                  généralement calculés par kilomètre excédentaire. Il est donc important de bien estimer votre
                  kilométrage annuel lors de la signature du contrat.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  L'entretien du véhicule est-il inclus dans le leasing ?
                </h4>
                <p className="text-gray-700">
                  Cela dépend du contrat. Certains contrats incluent l'entretien et les réparations, tandis que d'autres
                  laissent ces frais à la charge du locataire. Chez CityCar, nous proposons des formules avec ou sans
                  entretien inclus selon vos besoins.
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/faq">
                <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                  Voir toutes les questions fréquentes
                </Button>
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Prêt à démarrer votre leasing ?</h3>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir nos solutions de leasing
              adaptées à votre situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dossier">
                <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg">
                  Constituer un dossier
                </Button>
              </Link>
              <Link href="/vehicules">
                <Button
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-green-50 px-8 py-3 text-lg"
                >
                  Voir nos véhicules
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
