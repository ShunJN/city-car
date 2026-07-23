"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Check, ChevronRight } from "lucide-react"
import HeaderSimple from "@/components/header-simple"
import Footer from "@/components/footer"
import AnimatedFadeIn from "@/components/animated-fade-in"

export default function RentToBuyPage() {
  // Scroll automatique en haut au chargement de la page
  useEffect(() => {
    window.scrollTo(0, 0)
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
          <h1 className="text-4xl font-bold mb-4">Rent to Buy</h1>
          <p className="text-lg">
            <span>Accueil</span> / Rent to Buy
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Rent to Buy : Louez puis achetez</h2>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Le Rent to Buy est une solution de financement innovante qui vous permet de louer un véhicule d'occasion
              avec la possibilité de l'acheter à tout moment. Cette formule flexible s'adapte à votre budget et vous
              offre la liberté de devenir propriétaire quand vous le souhaitez.
            </p>
          </div>

          {/* How Rent to Buy Works */}
          <div className="mb-16">
            <AnimatedFadeIn>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Comment fonctionne le Rent to Buy ?</h3>
            </AnimatedFadeIn>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: 1,
                  title: "Choisissez votre véhicule",
                  description:
                    "Sélectionnez le véhicule d'occasion qui correspond à vos besoins parmi notre large gamme de véhicules certifiés.",
                },
                {
                  step: 2,
                  title: "Louez avec flexibilité",
                  description:
                    "Commencez par louer le véhicule avec des mensualités adaptées à votre budget. Vous pouvez utiliser le véhicule immédiatement.",
                },
                {
                  step: 3,
                  title: "Achetez quand vous voulez",
                  description:
                    "À tout moment pendant la location, vous pouvez décider d'acheter le véhicule au prix convenu dès le départ.",
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

          {/* Rent to Buy Advantages */}
          <div className="mb-16 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Avantages du Rent to Buy</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Pas d'apport initial</h4>
                      <p className="text-gray-700">Commencez sans investissement important, idéal pour préserver votre trésorerie.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Flexibilité totale</h4>
                      <p className="text-gray-700">Décidez d'acheter quand vous le souhaitez, sans contrainte de durée minimale.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Prix d'achat garanti</h4>
                      <p className="text-gray-700">Le prix d'achat est fixé dès le départ, vous savez exactement ce que vous paierez.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Mensualités maîtrisées</h4>
                      <p className="text-gray-700">Des mensualités de location adaptées à votre budget, généralement plus basses qu'un crédit.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Véhicules certifiés</h4>
                      <p className="text-gray-700">Tous nos véhicules sont vérifiés et certifiés pour garantir leur qualité et leur fiabilité.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Essai avant achat</h4>
                      <p className="text-gray-700">Testez le véhicule en conditions réelles avant de vous engager définitivement.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Featured Rent to Buy Vehicles */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Nos véhicules en Rent to Buy</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  id: "peugeot-208-rent",
                  marque: "PEUGEOT",
                  modele: "208 ESSENCE",
                  prix: 189,
                  image: "https://cdn.media.stellantis.com/peugeot/resize/800x600/media/image/2023/08/16/peugeot-208-hd-2023-1001.jpg",
                },
                {
                  id: "renault-clio-rent",
                  marque: "RENAULT",
                  modele: "CLIO ESSENCE",
                  prix: 199,
                  image: "https://cdn.group.renault.com/ren/master/renault-new/clio/evolution/renault-clio-evolution-001.jpg",
                },
                {
                  id: "volkswagen-polo-rent",
                  marque: "VOLKSWAGEN",
                  modele: "POLO ESSENCE",
                  prix: 209,
                  image: "https://www.volkswagen-newsroom.com/media/vw-media-assets/2021/04/2021-04-21-polo-1-42694253.jpg",
                },
              ].map((vehicle, index) => (
                <AnimatedFadeIn key={vehicle.id} delay={0.2 * index}>
                  <Link href={`/vehicules/${vehicle.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                      <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                        <Image
                          src={vehicle.image || "/placeholder.svg"}
                          alt={`${vehicle.marque} ${vehicle.modele}`}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          unoptimized
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
                  Voir tous nos véhicules en Rent to Buy
                </Button>
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Questions fréquentes</h3>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Puis-je acheter le véhicule à tout moment ?
                </h4>
                <p className="text-gray-700">
                  Oui, c'est l'un des principaux avantages du Rent to Buy. Vous pouvez décider d'acheter le véhicule à
                  n'importe quel moment pendant la période de location, sans contrainte de durée minimale.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Le prix d'achat est-il fixé dès le départ ?
                </h4>
                <p className="text-gray-700">
                  Oui, le prix d'achat est convenu et garanti dès la signature du contrat de location. Vous savez
                  exactement combien vous devrez payer si vous décidez d'acheter le véhicule.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Que se passe-t-il si je ne souhaite pas acheter le véhicule ?
                </h4>
                <p className="text-gray-700">
                  Si vous décidez de ne pas acheter le véhicule, vous pouvez simplement le restituer à la fin de la
                  période de location, sans obligation d'achat. Vous avez la liberté de choisir.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Prêt à découvrir le Rent to Buy ?</h3>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir nos solutions de Rent to Buy
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
