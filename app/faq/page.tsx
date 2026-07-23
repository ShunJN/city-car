"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import HeaderSimple from "@/components/header-simple"
import Footer from "@/components/footer"
import { useEffect } from "react"
import AnimatedFadeIn from "@/components/animated-fade-in"

export default function FAQPage() {
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
    <div className="min-h-screen flex flex-col bg-[#1a1a1a]">
      <HeaderSimple />

      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/bmw-hero-real.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center text-white">
          <AnimatedFadeIn>
            <h1 className="text-4xl font-bold mb-4">FAQ : Vos questions / Nos réponses</h1>
            <p className="text-lg">
              <span className="text-green-400">Accueil</span> / Faq
            </p>
          </AnimatedFadeIn>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 flex-grow bg-[#1a1a1a]">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedFadeIn>
            <Link
              href="/"
              className="inline-flex items-center text-green-400 hover:text-green-500 mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </AnimatedFadeIn>

          <div className="space-y-6">
            <Accordion type="single" collapsible className="space-y-4">
              <AnimatedFadeIn delay={0.1}>
                <AccordionItem
                  value="item-1"
                  className="border border-gray-700 rounded-lg overflow-hidden mb-4 bg-[#222222]"
                >
                  <AccordionTrigger className="px-6 py-4 text-white hover:bg-[#2a2a2a] transition-colors">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white mr-3 text-xs font-bold">
                        ?
                      </div>
                      <span className="text-lg font-medium">
                        Quels sont les critères pour la constitution d'un dossier citycar lease ?
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-300 bg-[#1e1e1e]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#252525] p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <span className="text-green-600 text-lg">👤</span>
                          </div>
                          <h4 className="font-semibold text-green-400">Pour un particulier</h4>
                        </div>
                        <p>
                          Justifier de revenus stables et réguliers, être en CDI sans période d'essai ou en contrat de
                          travail longue durée
                        </p>
                      </div>
                      <div className="bg-[#252525] p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <span className="text-green-600 text-lg">🏢</span>
                          </div>
                          <h4 className="font-semibold text-green-400">Pour une entreprise</h4>
                        </div>
                        <p>Deux ans minimum de création et au moins un Bilan disponible.</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </AnimatedFadeIn>

              <AnimatedFadeIn delay={0.2}>
                <AccordionItem
                  value="item-2"
                  className="border border-gray-700 rounded-lg overflow-hidden mb-4 bg-[#222222]"
                >
                  <AccordionTrigger className="px-6 py-4 text-white hover:bg-[#2a2a2a] transition-colors">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white mr-3 text-xs font-bold">
                        ?
                      </div>
                      <span className="text-lg font-medium">
                        Quels sont les documents à fournir pour un particulier?
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-300 bg-[#1e1e1e]">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Pièce d'identité recto verso</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Pièce d'identité de l'époux ou épouse si marié</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>3 derniers bulletins de salaires</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>RIB original</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Justificatif de domicile (Échéancier EDF, GDF, téléphone portable...)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Dernier avis d'imposition (si possible)</span>
                      </li>
                    </ul>

                    <div className="mt-6">
                      <h4 className="font-semibold text-green-400 mb-3">
                        En cas d'hébergement par la famille (parents)
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>Pièce d'identité de l'hébergeur</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>Attestation d'hébergement</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>Justificatif de domicile au nom de l'hébergeur</span>
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </AnimatedFadeIn>

              <AnimatedFadeIn delay={0.3}>
                <AccordionItem
                  value="item-3"
                  className="border border-gray-700 rounded-lg overflow-hidden mb-4 bg-[#222222]"
                >
                  <AccordionTrigger className="px-6 py-4 text-white hover:bg-[#2a2a2a] transition-colors">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white mr-3 text-xs font-bold">
                        ?
                      </div>
                      <span className="text-lg font-medium">
                        Quels sont les documents à fournir pour une entreprise et profession libérale?
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-300 bg-[#1e1e1e]">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>K-Bis de moins de 3 mois</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Pièce d'identité du gérant ou président de l'entreprise</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Dernier bilan dont liasse fiscale</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>RIB original de l'entreprise</span>
                      </li>
                    </ul>

                    <div className="mt-6">
                      <h4 className="font-semibold text-green-400 mb-3">Pour une profession Libérale:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>Pièce d'identité recto verso</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>Déclaration N° 2035 ou Dernier avis d'imposition</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span>RIB original</span>
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </AnimatedFadeIn>

              <AnimatedFadeIn delay={0.4}>
                <AccordionItem
                  value="item-4"
                  className="border border-gray-700 rounded-lg overflow-hidden mb-4 bg-[#222222]"
                >
                  <AccordionTrigger className="px-6 py-4 text-white hover:bg-[#2a2a2a] transition-colors">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white mr-3 text-xs font-bold">
                        ?
                      </div>
                      <span className="text-lg font-medium">
                        Quels sont les différences entre un crédit, une location longue durée (lld) et une location avec
                        option d'achat (loa) ?
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-300 bg-[#1e1e1e]">
                    <p className="mb-4">Ce sont trois solutions de financement :</p>
                    <p className="mb-2">
                      En effet, lors de la souscription d'un crédit automobile, le véhicule est à vous depuis le départ
                      et vous réglez le capital dû en plusieurs mensualités sur le nombre d'années souhaité (en général
                      entre 48 mois et 72 mois) avec des intérêts en sus dus au prêteur.
                    </p>
                    <p className="mb-4">
                      La solution LLD est une location longue durée sur 36, 48 et 60 mois. Le véhicule appartient à
                      l'organisme bancaire et vous apparaissez en tant que locataire.
                    </p>

                    <h4 className="font-semibold text-green-400 mb-2">Les avantages :</h4>
                    <p className="mb-4">
                      Cette solution comprend d'ordre général l'entretien du véhicule et la garantie mécanique du
                      véhicule.
                    </p>

                    <h4 className="font-semibold text-green-400 mb-2">Les contraintes :</h4>
                    <p className="mb-4">
                      Le kilométrage annuel autorisé est très faible, le véhicule ne vous appartient pas et vous êtes
                      obligé de restituer le véhicule en fin de contrat.
                    </p>

                    <p className="mb-2">
                      La Location avec Option d'Achat, l'offre la plus courante et adaptée pour répondre aux besoins des
                      particuliers.
                    </p>
                    <p className="mb-2">
                      Vous souscrivez un contrat de location vous engageant sur 36, 48 et 60 mois avec la possibilité de
                      racheter le véhicule en fin de contrat.
                    </p>

                    <h4 className="font-semibold text-green-400 mb-2">Les avantages :</h4>
                    <p className="mb-4">
                      Vous connaissez le prix d'achat depuis le départ et libre à vous de solliciter l'option d'achat ou
                      pas en fin de contrat. L'entretien, la garantie mécanique, l'assurance perte financière et
                      l'assistance prêt de véhicule vous permettent de rouler en toute sérénité.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </AnimatedFadeIn>

              <AnimatedFadeIn delay={0.5}>
                <AccordionItem
                  value="item-5"
                  className="border border-gray-700 rounded-lg overflow-hidden mb-4 bg-[#222222]"
                >
                  <AccordionTrigger className="px-6 py-4 text-white hover:bg-[#2a2a2a] transition-colors">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white mr-3 text-xs font-bold">
                        ?
                      </div>
                      <span className="text-lg font-medium">
                        Est-il possible de choisir le modèle et options du véhicule?
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-300 bg-[#1e1e1e]">
                    <p className="mb-2">
                      City Car Lease vous propose un large choix de véhicules très bien équipés avec de nombreuses
                      options et plusieurs coloris.
                    </p>
                    <p className="mb-2">
                      Nous sommes concessionnaire multi-marques et nous achetons nos véhicules dans le réseau de la
                      marque avec les mêmes garanties.
                    </p>
                    <p className="mb-2">
                      La disponibilité de nos véhicules est immédiate ou au maximum sous huit jours.
                    </p>
                    <p>
                      Si l'automobile de votre choix n'est pas mentionnée sur notre site internet, il vous suffit de
                      nous en faire la demande.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </AnimatedFadeIn>

              <AnimatedFadeIn delay={0.6}>
                <AccordionItem
                  value="item-6"
                  className="border border-gray-700 rounded-lg overflow-hidden mb-4 bg-[#222222]"
                >
                  <AccordionTrigger className="px-6 py-4 text-white hover:bg-[#2a2a2a] transition-colors">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white mr-3 text-xs font-bold">
                        ?
                      </div>
                      <span className="text-lg font-medium">Comment se passe l'entretien?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-300 bg-[#1e1e1e]">
                    <p className="mb-2">Le Pack entretien est une option proposée par City Car Lease.</p>
                    <p className="mb-2">
                      La souscription se fait le jour de la signature du contrat moyennant un abonnement mensuel.
                    </p>
                    <p className="mb-2">Vous recevez une carte nominative à votre domicile.</p>
                    <p>
                      Dès que votre entretien périodique arrive à échéance, il vous suffit de vous rendre dans le garage
                      ou concessionnaire de la marque muni de votre carte pour y avoir accès.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </AnimatedFadeIn>

              <AnimatedFadeIn delay={0.7}>
                <AccordionItem
                  value="item-7"
                  className="border border-gray-700 rounded-lg overflow-hidden mb-4 bg-[#222222]"
                >
                  <AccordionTrigger className="px-6 py-4 text-white hover:bg-[#2a2a2a] transition-colors">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white mr-3 text-xs font-bold">
                        ?
                      </div>
                      <span className="text-lg font-medium">
                        Est-il possible d'interrompre le contrat avant son terme?
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-300 bg-[#1e1e1e]">
                    <p className="mb-4">
                      Le loyer est calculé dès le départ sur une durée correspondante à l'amortissement du véhicule.
                      Étant engagé sur une durée précise, il vous est impossible de rompre le contrat sans pénalités.
                      Néanmoins City Car Lease peut éventuellement reprendre le véhicule sous conditions :
                    </p>
                    <p className="mb-4 text-green-400">Exemple : Le kilométrage du véhicule est très faible</p>
                    <p className="mb-4">
                      Merci de contacter votre conseiller City Car Lease pour étude de votre dossier.
                    </p>
                    <p>
                      Sous conditions, City Car Lease peut vous aider à vendre le véhicule afin de vous rapprocher le
                      plus possible du solde de votre dossier de financement
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </AnimatedFadeIn>

              <AnimatedFadeIn delay={0.8}>
                <AccordionItem
                  value="item-8"
                  className="border border-gray-700 rounded-lg overflow-hidden mb-4 bg-[#222222]"
                >
                  <AccordionTrigger className="px-6 py-4 text-white hover:bg-[#2a2a2a] transition-colors">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white mr-3 text-xs font-bold">
                        ?
                      </div>
                      <span className="text-lg font-medium">
                        Quels sont les démarches de restitution et option d'achat?
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-300 bg-[#1e1e1e]">
                    <p className="mb-4">
                      Deux mois avant la fin du contrat, City Car Lease vous fait parvenir un courrier à votre domicile
                      afin de vous avertir de la fin proche de votre location et des différentes possibilités qui
                      s'offrent à vous.
                    </p>
                    <p className="mb-4">
                      Ainsi, vous devez nous transmettre par courrier, téléphone ou mail vos intentions.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Soit vous restituez le véhicule et alors nous fixons un RDV de restitution.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>Vous décidez de garder le véhicule en soldant l'option d'achat du véhicule.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span>
                          Vous n'avez pas la somme disponible pour solder le véhicule, libre à vous de continuer à payer
                          les mêmes mensualités pendant 24 mois et le véhicule vous sera acquis définitivement.
                        </span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </AnimatedFadeIn>

              <AnimatedFadeIn delay={0.9}>
                <AccordionItem
                  value="item-9"
                  className="border border-gray-700 rounded-lg overflow-hidden mb-4 bg-[#222222]"
                >
                  <AccordionTrigger className="px-6 py-4 text-white hover:bg-[#2a2a2a] transition-colors">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white mr-3 text-xs font-bold">
                        ?
                      </div>
                      <span className="text-lg font-medium">L'apport est-il obligatoire?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-300 bg-[#1e1e1e]">
                    <p className="mb-4">
                      Toutes nos annonces prévoient le versement d'un premier loyer majoré de 900€ (en général).
                    </p>
                    <p className="mb-4">
                      Ce 1er loyer est demandé afin d'obtenir la mensualité annoncée et aussi solidifier votre demande
                      de leasing.
                    </p>
                    <p>
                      Il vous est tout à fait possible de ne verser aucun apport en contrepartie vos mensualités
                      augmenteront de 20€ à 30€ par mois.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </AnimatedFadeIn>
            </Accordion>
          </div>
        </div>
      </main>

      <Footer className="bg-[#1a1a1a] border-t border-gray-800" />
    </div>
  )
}
