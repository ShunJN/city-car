"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Wrench, Shield, Car } from "lucide-react"
import HeaderSimple from "@/components/header-simple"
import Footer from "@/components/footer"
import AnimatedFadeIn from "@/components/animated-fade-in"
import AnimatedImage from "@/components/animated-image"

export default function OffresPage() {
  // Références pour les animations
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])

  // Fonction pour gérer les clics sur les liens avec scroll en haut
  const handleLinkClick = (href: string) => {
    window.location.href = href
  }

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

  useEffect(() => {
    // Observer pour les images
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            imageObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observer pour les textes (avec délai)
    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("opacity-100", "translate-y-0")
            }, 300) // Délai pour que le texte apparaisse après l'image
            textObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observer les éléments
    imageRefs.current.forEach((ref) => {
      if (ref) imageObserver.observe(ref)
    })

    textRefs.current.forEach((ref) => {
      if (ref) textObserver.observe(ref)
    })

    return () => {
      imageObserver.disconnect()
      textObserver.disconnect()
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
          <h1 className="text-4xl font-bold mb-4">Offres</h1>
          <p className="text-lg">
            <span>Accueil</span> / Offres
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <button
            onClick={() => handleLinkClick("/")}
            className="inline-flex items-center text-green-500 hover:text-green-600 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </button>

          <div className="text-center mb-16">
            <AnimatedFadeIn delay={0.2}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                CITY CAR, C'EST TOUT D'ABORD LA QUALITÉ ET L'ENGAGEMENT
              </h2>
            </AnimatedFadeIn>
            <AnimatedFadeIn delay={0.4}>
              <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed">
                City Car est une société spécialisée dans la vente de véhicules d'occasions toutes marques à des prix
                imbattables. Découvrez notre établissement au cœur de Levallois-Perret où une équipe compétente et
                professionnelle vous apportera une parfaite connaissance du marché automobile. Implantée depuis de
                nombreuses années sur la région parisienne, nous sommes à votre disposition pour faire de vos ventes ou
                de vos achats une transaction aussi simple qu'efficace.
              </p>
            </AnimatedFadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
            {/* Maintenance */}
            <AnimatedFadeIn delay={0.2} direction="up">
              <div className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wrench className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">MAINTENANCE</h3>
                <p className="text-gray-700">
                  Toutes les opérations de maintenance et de révisions préconisées par le constructeur automobile.
                </p>
              </div>
            </AnimatedFadeIn>

            {/* Assistance */}
            <AnimatedFadeIn delay={0.4} direction="up">
              <div className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">ASSISTANCE & VÉHICULE DE PRÊT</h3>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">(ASSURANCE)</h4>
                <div className="text-gray-700 space-y-2">
                  <p>Dépannage Hébergement Remorquage Rapatriement</p>
                  <p>Véhicule de remplacement jusqu'à 30 jours.</p>
                  <p>Pannes ou accidents, vols, tentatives de vol.</p>
                  <p>7 jours sur 7, 24H/24</p>
                  <p>En France sans franchise kilométrique et dans 38 pays.</p>
                </div>
              </div>
            </AnimatedFadeIn>

            {/* Lease */}
            <AnimatedFadeIn delay={0.6} direction="up">
              <div className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Car className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">LEASE</h3>
                <p className="text-gray-700">
                  L'assurance Lease rembourse 100 % de la différence entre le solde du dossier et la valeur expert en
                  cas de disparition ou de destruction du véhicule.
                </p>
              </div>
            </AnimatedFadeIn>
          </div>

          {/* Engagement Qualité Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <AnimatedImage
              src="/images/citroen-engagement.png"
              alt="Citroën DS7 Crossback"
              className="w-full h-auto rounded-lg shadow-lg"
              delay={0.2}
            />
            <AnimatedFadeIn delay={0.4} direction="right">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Engagement qualité</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  Tous nos véhicules proviennent de concessions, loueurs, sociétés et particuliers. Ils sont examinés
                  avant d'être mis en vente et nous nous engageons à vous livrer un véhicule en bon état de
                  fonctionnement, révisé avec un contrôle technique valide de moins de 6 mois.
                </p>
                <p>
                  Chaque véhicule est vendu avec une garantie mécanique de 6 à 24 mois à l'aide de notre partenaire
                  "Garanties France" et vous donne la possibilité, en cas de panne, de faire réparer votre véhicule dans
                  le garage ou concessionnaire de France de votre choix !
                </p>
              </div>
            </AnimatedFadeIn>
          </div>

          {/* Engagement Tarifs Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <AnimatedFadeIn className="order-2 md:order-1" delay={0.2} direction="left">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Engagement tarifs</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  Nos tarifs sont de 20 % à 30 % moins chers que ceux des professionnels de l'automobile et 15 % plus
                  intéressants que ceux des particuliers, avec le même service qu'un concessionnaire.
                </p>
                <p>
                  Parce que chaque client est unique, nous vous accompagnons dans l'achat de votre véhicule par une
                  rencontre à votre convenance, un essai du véhicule, une mise à disposition de tous les documents
                  nécessaires, un financement et même la personnalisation de votre future automobile.
                </p>
              </div>
            </AnimatedFadeIn>
            <AnimatedImage
              src="/images/volvo-showroom.png"
              alt="Volvo XC60 dans notre showroom"
              className="order-1 md:order-2 w-full h-auto rounded-lg shadow-lg"
              delay={0.4}
            />
          </div>

          {/* Nos Services Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div
              ref={(el) => (imageRefs.current[2] = el)}
              className="opacity-0 translate-y-10 transition-all duration-1000 ease-out"
            >
              <div className="relative">
                <img
                  src="/images/peugeot-service.jpeg"
                  alt="Peugeot 2008 - Nos Services"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center">
                  <h3 className="text-4xl font-bold text-white drop-shadow-lg">NOS SERVICES</h3>
                </div>
              </div>
            </div>
            <div
              ref={(el) => (textRefs.current[2] = el)}
              className="space-y-6 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-green-500 rounded-full p-2 flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Sécurité</h4>
                  <p className="text-gray-700">
                    Achat et dépôt-vente : Vous souhaitez vendre votre véhicule ? Nous garantissons la sécurité de la
                    transaction.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-500 rounded-full p-2 flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Garantie mécanique</h4>
                  <p className="text-gray-700">
                    Lors de la vente, une garantie mécanique de 3 à 12 mois est incluse dans notre prix de vente.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-500 rounded-full p-2 flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Préparation de véhicule</h4>
                  <p className="text-gray-700">
                    Une préparation de votre véhicule (Lavage et préparation à la vente) facilite la vente.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-500 rounded-full p-2 flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Exposition</h4>
                  <p className="text-gray-700">
                    En plus de l'exposition sur notre parc, nous diffusons vos annonces sur les sites les plus consultés
                    du web.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Leasing & Financement Section */}
          <div className="bg-white py-16">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Leasing & Véhicules d'occasion :</h2>
                <div className="h-1 w-16 bg-green-500 mb-8"></div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-500 rounded-full p-1 flex-shrink-0 mt-2">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      City Car, c'est aussi le leasing de véhicules d'occasion avec options d'achat. Plus d'informations
                      dans la rubrique "leasing".
                    </p>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-500 rounded-full p-1 flex-shrink-0 mt-2">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Vous souhaitez un véhicule que nous ne possédons pas en stock, nous nous chargeons de la recherche
                      du véhicule.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Financement :</h2>
                <div className="h-1 w-16 bg-green-500 mb-8"></div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-500 rounded-full p-1 flex-shrink-0 mt-2">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Grâce à nos partenaires financiers CETELEM Autos, VIAXEL et le LCL, nous sommes en mesure de vous
                      apporter une large gamme de solutions de financement.
                    </p>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-500 rounded-full p-1 flex-shrink-0 mt-2">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Des mensualités de 100 € à 700 €/mois remboursables sur une durée minimale de 12 à 72 mois.
                    </p>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-500 rounded-full p-1 flex-shrink-0 mt-2">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Un taux de 3 % à 10 % vous sera proposé selon le dossier.
                    </p>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-500 rounded-full p-1 flex-shrink-0 mt-2">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Une réponse de principe immédiate et un déblocage des fonds sous 48 h après acceptation du
                      dossier.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-green-50 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Intéressé par nos offres ?</h3>
            <p className="text-gray-700 mb-6">
              Contactez-nous pour découvrir comment nous pouvons vous accompagner dans votre projet automobile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => handleLinkClick("/vehicules")}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Voir nos véhicules
              </Button>
              <Button
                onClick={() => handleLinkClick("/dossier")}
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-50"
              >
                Constituer un dossier
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
