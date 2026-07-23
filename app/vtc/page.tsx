"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Check, ChevronRight } from "lucide-react"
import HeaderSimple from "@/components/header-simple"
import Footer from "@/components/footer"
import AnimatedFadeIn from "@/components/animated-fade-in"

export default function VtcPage() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Intersection Observer pour la vidéo - lecture automatique au scroll
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // La vidéo est visible, on la lance
            video.play().catch((error) => {
              // Gérer les erreurs de lecture automatique (politique du navigateur)
              console.log("Lecture automatique bloquée:", error)
            })
          } else {
            // La vidéo n'est plus visible, on la met en pause
            video.pause()
          }
        })
      },
      {
        threshold: 0.5, // Déclenche quand 50% de la vidéo est visible
      }
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
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
          <h1 className="text-4xl font-bold mb-4">VTC</h1>
          <p className="text-lg">
            <span>Accueil</span> / VTC
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

          {/* Section Solutions de financement VTC avec image et vidéo */}
          <div className="mb-16">
            <AnimatedFadeIn>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Nos solutions de financement VTC</h2>
            </AnimatedFadeIn>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              {/* Image du chauffeur */}
              <AnimatedFadeIn delay={0.2}>
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="/images/financement-vtc.jpg"
                    alt="Chauffeur VTC dans une voiture premium"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </AnimatedFadeIn>

              {/* Texte descriptif */}
              <AnimatedFadeIn delay={0.4}>
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Que vous soyez un chauffeur expérimenté ou un nouvel entrepreneur, le choix du financement est crucial.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Chez CITY CAR, nous comprenons les spécificités du métier de VTC et vous proposons trois options souples et adaptées pour démarrer ou renouveler votre activité sans stress financier.
                  </p>
                </div>
              </AnimatedFadeIn>
            </div>

            {/* Vidéo Financement */}
            <AnimatedFadeIn delay={0.6}>
              <div className="bg-gray-50 rounded-lg p-8 mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Découvrez nos solutions de financement
                </h3>
                <div className="max-w-4xl mx-auto">
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                      poster="/images/financement-vtc.jpg"
                      playsInline
                      muted
                    >
                      <source src="https://2025.city-car.fr/videos/financement.mp4" type="video/mp4" />
                      Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                  </div>
                </div>
              </div>
            </AnimatedFadeIn>
          </div>

          {/* VTC Advantages */}
          <div className="mb-16">
            <AnimatedFadeIn>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Avantages de nos solutions VTC</h3>
            </AnimatedFadeIn>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Financement adapté",
                  description:
                    "Solutions de financement spécifiquement conçues pour les chauffeurs VTC, avec des mensualités adaptées à votre activité.",
                },
                {
                  title: "Véhicules premium",
                  description:
                    "Sélection de véhicules haut de gamme répondant aux exigences des plateformes VTC et offrant un confort optimal à vos clients.",
                },
                {
                  title: "Accompagnement complet",
                  description:
                    "Assistance dans toutes les démarches administratives et conseils personnalisés pour optimiser votre activité VTC.",
                },
              ].map((advantage, index) => (
                <AnimatedFadeIn key={index} delay={0.2 * index}>
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110 mx-auto">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{advantage.title}</h4>
                    <p className="text-gray-700">{advantage.description}</p>
                  </div>
                </AnimatedFadeIn>
              ))}
            </div>
          </div>

          {/* Options de financement VTC */}
          <div className="mb-16">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "LLD avec option d'achat",
                  href: "/vtc/lld",
                },
                {
                  title: "LOA / Crédit-bail PRO",
                  href: "/vtc/loa",
                },
                {
                  title: "Micro-financement VO",
                  href: "/vtc/micro-financement",
                },
              ].map((option, index) => (
                <AnimatedFadeIn key={index} delay={0.2 * index}>
                  <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-8 flex flex-col items-center text-center">
                      <h4 className="text-xl font-bold text-gray-800 mb-8">{option.title}</h4>
                      <Link href={option.href} className="w-full">
                        <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md">
                          Faire une demande
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </AnimatedFadeIn>
              ))}
            </div>
          </div>

          {/* VTC Vehicles Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: "audi-q3-diesel", // Changed ID to match vehiculesDetails key
                marque: "AUDI",
                modele: "Q3 DIESEL",
                prix: 494,
                image: "/images/audi-q3.jpeg",
              },
              {
                id: "acura-csx-hybride", // Changed ID to match vehiculesDetails key
                marque: "ACURA",
                modele: "CSX HYBRIDE",
                prix: 400,
                image: "/images/acura-csx.png",
              },
              {
                id: "kia-sportage", // Changed ID to match vehiculesDetails key
                marque: "KIA",
                modele: "SPORTAGE HYBRIDE",
                prix: 459,
                image: "/images/kia-sportage.png",
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
