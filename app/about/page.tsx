"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import HeaderSimple from "@/components/header-simple"
import Footer from "@/components/footer"
import AnimatedFadeIn from "@/components/animated-fade-in"
import AnimatedImage from "@/components/animated-image"

export default function AboutPage() {
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
          <h1 className="text-4xl font-bold mb-4">À propos</h1>
          <p className="text-lg">
            <span>Accueil</span> / À propos
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

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Left Column - Image */}
            <AnimatedImage
              src="/images/volkswagen-hero.png"
              alt="Volkswagen"
              className="w-full h-auto rounded-lg shadow-lg"
              delay={0.2}
            />

            {/* Right Column - Text */}
            <AnimatedFadeIn delay={0.4} direction="right">
              <div className="text-sm text-green-500 font-semibold mb-2">NOTRE HISTOIRE</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                CITY CAR, VOTRE PARTENAIRE AUTOMOBILE DEPUIS 2007
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Fondée en 2007, City Car s'est rapidement imposée comme un acteur incontournable du marché automobile
                  d'occasion en région parisienne. Notre entreprise est née d'une vision simple : rendre l'achat de
                  véhicules d'occasion aussi simple, transparent et sécurisé que possible.
                </p>
                <p>
                  Au fil des années, nous avons développé une expertise unique dans la sélection et la préparation de
                  véhicules d'occasion toutes marques. Notre équipe passionnée s'engage quotidiennement à offrir un
                  service personnalisé et des solutions adaptées aux besoins de chaque client.
                </p>
                <p>
                  Aujourd'hui, City Car c'est plus de 15 ans d'expérience, des milliers de clients satisfaits et une
                  gamme complète de services allant de la vente de véhicules à des solutions de financement innovantes
                  comme le leasing d'occasion et le Rent-to-Buy.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { text: "15+ années d'expérience" },
                  { text: "5000+ clients satisfaits" },
                  { text: "Garantie mécanique" },
                  { text: "Financement sur mesure" },
                ].map((item, index) => (
                  <AnimatedFadeIn key={index} delay={0.6 + index * 0.1} direction="up">
                    <div className="flex items-center space-x-2">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  </AnimatedFadeIn>
                ))}
              </div>
            </AnimatedFadeIn>
          </div>

          {/* Notre Mission */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">NOTRE MISSION</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Chez City Car, notre mission est de démocratiser l'accès à des véhicules d'occasion de qualité en
                proposant des solutions de financement adaptées à chaque situation. Nous croyons que chacun mérite de
                conduire une voiture fiable, quel que soit son budget.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "check-circle",
                  title: "Qualité",
                  description:
                    "Nous sélectionnons rigoureusement chaque véhicule et effectuons une préparation complète avant la vente pour garantir fiabilité et sécurité.",
                },
                {
                  icon: "dollar-sign",
                  title: "Accessibilité",
                  description:
                    "Nous proposons des solutions de financement adaptées à chaque budget et situation, rendant l'achat automobile accessible à tous.",
                },
                {
                  icon: "message-circle",
                  title: "Transparence",
                  description:
                    "Nous privilégions une communication claire et honnête, sans frais cachés ni mauvaises surprises pour une relation de confiance durable.",
                },
              ].map((card, index) => (
                <AnimatedFadeIn key={index} delay={0.2 * index}>
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{card.title}</h3>
                    <p className="text-gray-700 text-center">{card.description}</p>
                  </div>
                </AnimatedFadeIn>
              ))}
            </div>
          </div>

          {/* Notre Équipe */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">NOTRE ÉQUIPE</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Notre équipe est composée de professionnels passionnés par l'automobile et dédiés à votre satisfaction.
                Chaque membre apporte son expertise pour vous offrir un service personnalisé et de qualité.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <div className="bg-gray-200 rounded-full w-40 h-40 mx-auto mb-4 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=160&width=160"
                    alt="Jerome Elbaz"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Jerome Elbaz</h3>
                <p className="text-green-600 mb-2">Directeur Général</p>
                <p className="text-gray-600 text-sm">
                  Fondateur de City Car, Jerome supervise l'ensemble des opérations et définit la vision stratégique de
                  l'entreprise.
                </p>
              </div>

              {/* Team Member 2 */}
              <div className="text-center">
                <div className="bg-gray-200 rounded-full w-40 h-40 mx-auto mb-4 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=160&width=160"
                    alt="Maxence"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Maxence</h3>
                <p className="text-green-600 mb-2">Assistant du Directeur</p>
                <p className="text-gray-600 text-sm">
                  Bras droit du directeur, Maxence coordonne les différents services et assure le bon fonctionnement
                  quotidien de l'entreprise.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-8 mt-12">
              {/* Team Member 3 */}
              <div className="text-center">
                <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden">
                  <img src="/placeholder.svg?height=128&width=128" alt="Nacer" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Nacer</h3>
                <p className="text-green-600 mb-2">Logistique</p>
                <p className="text-gray-600 text-sm">
                  Responsable de la logistique et de la préparation des véhicules.
                </p>
              </div>

              {/* Team Member 4 */}
              <div className="text-center">
                <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden">
                  <img src="/placeholder.svg?height=128&width=128" alt="Eva" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Eva</h3>
                <p className="text-green-600 mb-2">Responsable commerciale</p>
                <p className="text-gray-600 text-sm">
                  Dirige l'équipe commerciale et développe nos offres de financement.
                </p>
              </div>

              {/* Team Member 5 */}
              <div className="text-center">
                <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=128&width=128"
                    alt="Mathilde"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Mathilde</h3>
                <p className="text-green-600 mb-2">Commerciale</p>
                <p className="text-gray-600 text-sm">
                  Conseillère clientèle, Mathilde vous accompagne dans votre projet automobile.
                </p>
              </div>

              {/* Team Member 6 */}
              <div className="text-center">
                <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=128&width=128"
                    alt="Claude"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Claude</h3>
                <p className="text-green-600 mb-2">Responsable Informatique</p>
                <p className="text-gray-600 text-sm">Gère l'infrastructure informatique et les solutions digitales.</p>
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <div className="text-center">
                <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=128&width=128"
                    alt="Thierry"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Thierry</h3>
                <p className="text-green-600 mb-2">Chef de Projet Web</p>
                <p className="text-gray-600 text-sm">
                  Responsable du développement et de la maintenance de notre présence en ligne.
                </p>
              </div>
            </div>
          </div>

          {/* Nos Partenaires */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">NOS PARTENAIRES</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Nous collaborons avec des partenaires de confiance pour vous offrir les meilleures solutions de
                financement, d'assurance et de garantie.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {/* Partner logos */}
              <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center h-24">
                <span className="text-gray-500 font-semibold">CETELEM</span>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center h-24">
                <span className="text-gray-500 font-semibold">VIAXEL</span>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center h-24">
                <span className="text-gray-500 font-semibold">LCL</span>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center h-24">
                <span className="text-gray-500 font-semibold">GARANTIES FRANCE</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
