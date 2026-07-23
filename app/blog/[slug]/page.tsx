"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Share2, Clock, Tag } from "lucide-react"
import HeaderSimple from "@/components/header-simple"
import Footer from "@/components/footer"
import { motion } from "framer-motion"

const blogPosts = {
  "achat-confinement": {
    title: "Acheter sa voiture d'occasion en période de confinement",
    date: "13 Avril 2021",
    author: "Alexis",
    category: "Actualités",
    readTime: "5 min",
    image: "https://images.caradisiac.com/images/2/8/3/5/182835/S1-bien-vendre-son-occasion-apres-le-confinement-nos-astuces-628726.jpg",
    content: [
      {
        type: "paragraph",
        text: "Chaque année, de nombreux Français achètent leur voiture d'occasion afin de profiter de prix plus abordables. Cette année, les consommateurs ont vu leurs habitudes d'achat changer avec la fermeture des commerces et les restrictions de déplacements. Dans ce contexte particulier, certains se demandent alors si un nouveau confinement viendra freiner l'achat de leur véhicule.",
      },
      {
        type: "heading",
        text: "D'une ville à l'autre, est-il autorisé de se déplacer pour acheter son véhicule d'occasion ?",
      },
      {
        type: "paragraph",
        text: "L'achat d'un véhicule d'occasion a pour avantage premier de proposer un prix de vente plus bas que lors de l'achat d'un véhicule neuf, et ce pour diverses raisons : kilométrage, usure… Ce tarif baissé encourage parfois les Français à se déplacer à travers le pays pour aller chercher le véhicule en question. Toutefois, ces grands déplacements à travers la France sont-ils toujours autorisés en période de confinement et de restriction ?",
      },
      {
        type: "paragraph",
        text: "Bien que la distance autorisée puisse parfois être étendue selon le motif, l'achat d'un véhicule ne fait pas partie des exceptions. Si l'achat se situe à plus de 30 kilomètres du lieu où vous résidez, notez qu'il vous sera impossible de vous y rendre, y compris si le rendez-vous a été pris avant le début des restrictions. Les déplacements autorisés pour les achats se limitent au département, pouvant aller de 10 jusqu'à 30 kilomètres. Par exemple, si vous habitez à Lyon et que vous souhaitez acheter un véhicule d'occasion à Valence, cela ne sera pas possible. Toutefois, si le vendeur se trouve également à Lyon, l'achat de votre véhicule peut avoir lieu, en dehors des heures de couvre-feu national.",
      },
      {
        type: "heading",
        text: "Acheter sa voiture dans un département limitrophe",
      },
      {
        type: "paragraph",
        text: "Ces restrictions présentent de nombreuses subtilités qu'il est parfois difficile de clarifier. Qu'il s'agisse des limitations dans les déplacements interrégionaux ou interdépartementaux, ou de la restriction en kilomètres, les situations ambiguës peuvent nous amener à nous demander quelle mesure appliquer. Dans le cadre d'un achat de véhicule d'occasion dans un département limitrophe mais à moins de 30 kilomètres, il vous sera alors possible de vous déplacer.",
      },
      {
        type: "paragraph",
        text: "Il est à noter que si l'achat d'un véhicule est autorisé dans certaines situations, celles-ci demanderont de vous munir d'une attestation justifiant un tel déplacement. Dans celle-ci, il faudra cocher la case n°6, ayant pour motif un retrait de commandes ou une prestation de service qui autorise un achat au sein du département, ou dans les 30 kilomètres lorsque vous résidez aux frontières d'un département.",
      },
      {
        type: "heading",
        text: "Nos conseils pour l'achat de votre véhicule en période de confinement",
      },
      {
        type: "paragraph",
        text: "Si certaines conditions rendent possible, dans certains cas, l'achat de votre véhicule d'occasion pendant le confinement, il est cependant recommandé de suivre certaines recommandations.",
      },
      {
        type: "list",
        items: [
          "Tout d'abord, afin d'éviter tout problème, il sera conseillé si possible de reporter l'achat à la fin du confinement.",
          "Lorsque ce dernier ne peut attendre, il vous sera alors indispensable de vous munir d'une attestation dérogatoire de déplacement.",
          "Enfin, accompagné de celle-ci, nous vous conseillons d'apporter également un justificatif d'achat, prouvant ainsi le motif de votre déplacement.",
        ],
      },
      {
        type: "paragraph",
        text: "Acheter sa voiture d'occasion durant une période de confinement limitant les capacités de déplacement de chacun peut être contraignant. Il est ainsi nécessaire de se renseigner sur les modalités autorisées avant de parcourir des kilomètres et risquer une amende. En effet, un non-respect des restrictions de déplacement constitue une contravention de 4e classe.",
      },
    ],
  },
  "leasing-electrique": {
    title: "Leasing de voiture électrique : quels avantages et inconvénients ?",
    date: "6 Avril 2021",
    author: "Alexis",
    category: "Actualités",
    readTime: "6 min",
    image: "https://www.hessautomobile.com/modules/jscomposer/uploads/SEO/leasing-voiture-electrique/la-main-de-l-homme-tient-la-charge-de-la-voiture-electrique.jpg",
    content: [
      {
        type: "paragraph",
        text: "Le nombre de Français optant pour une location avec option d'achat grandit de jour en jour. Cette méthode de financement d'un véhicule neuf ou d'occasion présente de nombreux avantages pour les consommateurs ne souhaitant pas s'engager dans des dépenses excessives. Toutefois, avec l'arrivée des voitures électriques et hybrides sur le marché, le leasing a vu certains de ses prix augmenter.",
      },
      {
        type: "heading",
        text: "Principe du leasing",
      },
      {
        type: "paragraph",
        text: "Aussi appelé LOA, le leasing est une formule de financement avec laquelle un particulier ou un professionnel est en mesure de louer le véhicule de son choix, en échange de mensualités définies préalablement dans un contrat.",
      },
      {
        type: "paragraph",
        text: "En leasing, le locataire règle chaque mois un loyer représentant uniquement l'usage du véhicule. Cette alternative présente de nombreux avantages pour le consommateur qui peut alors profiter du modèle de son choix, à un prix raisonnable. À la suite de ce contrat, plusieurs choix s'offrent à lui : il peut en devenir propriétaire en réglant la somme restante, ou il peut souscrire à un nouveau contrat en leasing avec le véhicule de son choix.",
      },
      {
        type: "paragraph",
        text: "De cette manière, le consommateur bénéficie de la possibilité de toujours conduire un véhicule qui correspond à ses besoins et ses envies : modèle familial, tout équipé, électrique… le choix est large !",
      },
      {
        type: "heading",
        text: "L'arrivée croissante des véhicules électriques et hybrides sur le marché",
      },
      {
        type: "paragraph",
        text: "Si la majorité des offres proposées en leasing concernaient des voitures thermiques, le marché automobile et les sociétés de leasing ont aujourd'hui étendu leurs horizons afin d'inclure les véhicules électriques et hybrides. La location avec option d'achat ayant pour objectif de proposer des modèles plus récents et connectés aux consommateurs, cela leur donne également l'occasion d'opter pour une voiture électrique et ses nombreux avantages. Ces voitures moins polluantes et plus écologiques assurent une émission de CO2 moins élevée pour une conduite respectueuse de l'environnement.",
      },
      {
        type: "paragraph",
        text: "Soucieuses de toujours mettre en avant des véhicules répondant parfaitement à vos besoins, les sociétés de leasing s'efforcent de varier leurs offres pour répondre à une demande croissante en électrique.",
      },
      {
        type: "heading",
        text: "Une conséquence sur le leasing",
      },
      {
        type: "paragraph",
        text: "Le leasing est une formule offrant la possibilité de louer un véhicule au moyen de loyers mensualisés. Toutefois, le montant de ces derniers varie selon certains critères dont le modèle de voiture choisi. C'est ici que l'on remarque un nouvel inconvénient dans cette formule de financement. Si la LOA avait l'avantage de proposer l'utilisation d'un véhicule à un prix raisonnable, ce dernier s'est vu augmenter avec l'apparition des voitures électriques. En effet, en adaptant le montant des mensualités au modèle de véhicule, celles-ci ont subi une légère hausse avec la possibilité de louer des voitures électriques.",
      },
      {
        type: "paragraph",
        text: "Cette transition énergétique a un coût pour les particuliers et entreprises souhaitant adopter une conduite plus respectueuse de l'environnement. Si toutefois la LOA reste un mode de financement avantageux pour les consommateurs, ce dernier voit ses prix augmenter avec l'arrivée des véhicules électriques particulièrement mis en avant par les sociétés de leasing. Ceux-ci présentant de nombreux avantages pour le conducteur qui réduira son empreinte carbone tout en profitant d'un modèle récent équipé de nombreuses options innovantes.",
      },
    ],
  },
  "leasing-credit-auto": {
    title: "Leasing ou Crédit Auto : quel financement pour votre véhicule d'occasion ?",
    date: "30 Mars 2021",
    author: "Alexis",
    category: "Actualités",
    readTime: "7 min",
    image: "https://www.vivacar.fr/uploads/media/qc_landscape_normal/00/3350-Financement-auto-image-decorative-37.webp?v=1-0",
    content: [
      {
        type: "paragraph",
        text: "Indispensable à vos déplacements quotidiens, un véhicule représente toutefois des frais réguliers et un coût important au moment de son acquisition. Alors que les véhicules d'occasion représentent une alternative intéressante avec des prix attractifs, il reste à déterminer votre type de financement pour son achat. Nous faisons le point avec vous sur les avantages et les inconvénients du leasing et du crédit auto.",
      },
      {
        type: "heading",
        text: "Le leasing LOA : un mode d'achat de plus en plus populaire",
      },
      {
        type: "paragraph",
        text: "La Location avec Option d'Achat (LOA) s'est largement développée ces dernières années pour devenir aujourd'hui un moyen incontournable d'acquérir un nouveau véhicule pour les particuliers. Avec un apport moindre et des mensualités étalées sur 36 à 48 mois, ce système souple et accessible est fortement plébiscité par les Français. Une fois les mensualités terminées, le choix de conserver le véhicule ou de le rendre permet de s'adapter plus facilement à vos besoins du moment. Mais quels sont les réels avantages et les inconvénients d'un achat d'occasion en LOA ?",
      },
      {
        type: "subheading",
        text: "Avantages",
      },
      {
        type: "paragraph",
        text: "Un contrat LOA pour une voiture occasion tient compte de l'assurance et de l'entretien du véhicule durant toute la durée de la location. De cette manière, vous ne réglez qu'une mensualité unique pour un budget maîtrisé et sans surprises. Un véritable confort lorsqu'on sait les conséquences financières que peut avoir un imprévu avec son véhicule.",
      },
      {
        type: "paragraph",
        text: "De plus, la popularité grandissante du leasing offre aujourd'hui un parc automobile des plus attrayants, y compris sur le marché de l'occasion. Des modèles variés et récents qui vous permettent de bénéficier du confort et de la praticité des dernières technologies dans votre véhicule. Si vous ne souhaitez pas finaliser l'achat de votre voiture, vous renouvelez alors votre plaisir facilement avec un modèle plus adapté ou plus récent régulièrement.",
      },
      {
        type: "subheading",
        text: "Inconvénients",
      },
      {
        type: "paragraph",
        text: "Bien qu'un contrat LOA vous offre la possibilité d'acheter le véhicule à la fin des échéances, il n'en reste pas moins un contrat de location soumis à des conditions. La nécessité de maîtriser le renouvellement du parc automobile et les coûts liés à son entretien implique des critères précis dans l'utilisation de votre véhicule d'occasion.",
      },
      {
        type: "paragraph",
        text: "Le kilométrage est déterminé au moment de la souscription et s'applique durant toute la durée du contrat. Un dépassement vous expose à des frais supplémentaires particulièrement onéreux. Ainsi, si vous éprouvez des difficultés à quantifier précisément les kilomètres effectués au quotidien, un achat d'occasion en LOA risque de vous coûter bien plus cher que prévu. En cas de restitution, les éventuelles dégradations constatées vous seront également facturées. Un soin constant et régulier est donc indispensable.",
      },
      {
        type: "heading",
        text: "Le crédit auto : une utilisation libre de votre véhicule",
      },
      {
        type: "paragraph",
        text: "Formule classique par excellence, le crédit auto permet un emprunt adapté pour acheter votre véhicule d'occasion. Un financement sûr grâce auquel vous profitez rapidement de votre nouvelle voiture sans aucun contrat autre que le remboursement de vos mensualités. Ce mode d'achat est toutefois de moins en moins utilisé par les particuliers, au profit des formules de leasing. Quels sont les véritables avantages et inconvénients d'un prêt auto ?",
      },
      {
        type: "subheading",
        text: "Avantages",
      },
      {
        type: "paragraph",
        text: "C'est l'organisme bancaire qui avance l'argent nécessaire à votre achat de véhicule d'occasion. Vous êtes donc propriétaire de ce dernier immédiatement et les éventuels accrocs subis ne concernent que vous. Une sérénité qui n'est pas permise avec un contrat LOA durant lequel l'état de votre véhicule doit rester impeccable.",
      },
      {
        type: "paragraph",
        text: "Pour les mêmes raisons, le kilométrage n'est pas limité. Vous roulez autant que vous le souhaitez sans craindre des frais de pénalités onéreux. Plus libres dans vos déplacements, vous profitez pleinement de votre nouvelle voiture et des possibilités que cet équipement vous offre.",
      },
      {
        type: "subheading",
        text: "Inconvénients",
      },
      {
        type: "paragraph",
        text: "Le crédit auto est une solution de financement efficace qui ne propose toutefois que très peu de services en dehors de l'emprunt lui-même. En effet, un contrat LOA vous permet d'inclure l'entretien ou l'assurance de votre véhicule pour ne régler qu'une seule mensualité qui vous permet une plus grande maîtrise de votre budget. Un crédit auto vous impose de souscrire à des contrats différents pour bénéficier des mêmes avantages, avec la possibilité d'être pris de court en cas d'imprévu.",
      },
      {
        type: "paragraph",
        text: "De plus, la reprise ou la vente de votre véhicule est à effectuer vous-même. Des démarches souvent fastidieuses qui vous incombent pourtant si vous avez opté pour un crédit auto lors de l'achat de votre véhicule d'occasion.",
      },
      {
        type: "paragraph",
        text: "En conclusion, si les deux formules vous permettent de financer votre nouvelle voiture d'occasion, un leasing en LOA vous offre une souplesse et de nombreux avantages pour l'entretien du véhicule. Un achat facilité qui concurrence directement le crédit auto et qui a conquis des milliers de Français ces dernières années.",
      },
    ],
  },
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]
  const [comments, setComments] = useState<
    Array<{ id: number; name: string; email: string; website?: string; message: string; date: string }>
  >([])
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <HeaderSimple />
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
          <Link href="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const renderContent = () => {
    return post.content.map((block, index) => {
      switch (block.type) {
        case "heading":
          return (
            <motion.h2
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-3xl font-bold text-gray-900 mt-12 mb-6 leading-tight"
            >
              {block.text}
            </motion.h2>
          )
        case "paragraph":
          return (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-lg text-gray-700 leading-relaxed mb-6"
            >
              {block.text}
            </motion.p>
          )
        case "list":
          return (
            <motion.ul
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="list-disc list-inside space-y-3 mb-6 text-lg text-gray-700 ml-4"
            >
              {block.items?.map((item, itemIndex) => (
                <li key={itemIndex} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </motion.ul>
          )
        case "comparison":
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-x-auto mb-8"
            >
              <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
                <thead>
                  <tr className="bg-green-500 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Critère</th>
                    <th className="px-6 py-4 text-left font-semibold">Crédit Auto</th>
                    <th className="px-6 py-4 text-left font-semibold">Leasing</th>
                  </tr>
                </thead>
                <tbody>
                  {block.items?.map((item, itemIndex) => (
                    <tr
                      key={itemIndex}
                      className={itemIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">{item.criterion}</td>
                      <td className="px-6 py-4 text-gray-700">{item.credit}</td>
                      <td className="px-6 py-4 text-gray-700">{item.leasing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )
        default:
          return null
      }
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderSimple />

      {/* Hero Section avec image */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${post.image}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-4">
              <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{post.title}</h1>
            <div className="flex items-center justify-center space-x-6 text-gray-200">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/"
              className="inline-flex items-center text-green-500 hover:text-green-600 mb-8 transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </motion.div>

              {/* Contenu de l'article */}
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
                {renderContent()}
              </div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl p-8 md:p-12 text-white mb-12"
              >
            <h3 className="text-3xl font-bold mb-4">Besoin d'aide pour votre financement ?</h3>
            <p className="text-lg mb-6 text-green-50">
              Notre équipe d'experts est là pour vous accompagner dans votre projet automobile et
              vous aider à trouver la solution de financement la plus adaptée à vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8"
                >
                  Nous contacter
                </Button>
              </Link>
              <Link href="/vehicules">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8"
                >
                  Voir nos véhicules
                </Button>
              </Link>
            </div>
              </motion.div>

              {/* Partage social */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center space-x-4 pt-8 border-t border-gray-200"
              >
            <span className="text-gray-600 font-medium">Partager cet article :</span>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 hover:bg-gray-50"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    url: window.location.href,
                  })
                }
              }}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Partager
                </Button>
              </motion.div>

              {/* Article précédent/suivant */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-12 pt-8 border-t border-gray-200 space-y-4"
              >
                {params.slug === "achat-confinement" && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Article précédent</p>
                    <Link
                      href="/blog/leasing-electrique"
                      className="text-green-600 hover:text-green-700 font-medium text-lg"
                    >
                      Leasing de voiture électrique : quels avantages et inconvénients ?
                    </Link>
                  </div>
                )}
                {params.slug === "leasing-electrique" && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Article précédent</p>
                      <Link
                        href="/blog/leasing-credit-auto"
                        className="text-green-600 hover:text-green-700 font-medium text-lg"
                      >
                        Leasing ou Crédit Auto : quel financement pour votre véhicule d'occasion ?
                      </Link>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Article suivant</p>
                      <Link
                        href="/blog/achat-confinement"
                        className="text-green-600 hover:text-green-700 font-medium text-lg"
                      >
                        Acheter sa voiture d'occasion en période de confinement
                      </Link>
                    </div>
                  </>
                )}
                {params.slug === "leasing-credit-auto" && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Article précédent</p>
                      <Link
                        href="/blog/leasing-electrique"
                        className="text-green-600 hover:text-green-700 font-medium text-lg"
                      >
                        Comment obtenir le bonus écologique pour une voiture d'occasion ?
                      </Link>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Article suivant</p>
                      <Link
                        href="/blog/leasing-electrique"
                        className="text-green-600 hover:text-green-700 font-medium text-lg"
                      >
                        Leasing de voiture électrique : quels avantages et inconvénients ?
                      </Link>
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Articles liés */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">ARTICLES LIÉS</h3>
                  <div className="space-y-6">
                    {(() => {
                      const allArticles = [
                        {
                          id: "achat-confinement",
                          title: "Acheter sa voiture d'occasion en période de confinement",
                          image: "https://images.caradisiac.com/images/2/8/3/5/182835/S1-bien-vendre-son-occasion-apres-le-confinement-nos-astuces-628726.jpg",
                          date: "13 Avril 2021",
                        },
                        {
                          id: "leasing-electrique",
                          title: "Leasing de voiture électrique : quels avantages et inconvénients ?",
                          image: "https://www.hessautomobile.com/modules/jscomposer/uploads/SEO/leasing-voiture-electrique/la-main-de-l-homme-tient-la-charge-de-la-voiture-electrique.jpg",
                          date: "6 Avril 2021",
                        },
                        {
                          id: "leasing-credit-auto",
                          title: "Leasing ou Crédit Auto : quel financement pour votre véhicule d'occasion ?",
                          image: "https://www.vivacar.fr/uploads/media/qc_landscape_normal/00/3350-Financement-auto-image-decorative-37.webp?v=1-0",
                          date: "30 Mars 2021",
                        },
                      ]
                      return allArticles
                        .filter((article) => article.id !== params.slug)
                        .slice(0, 3)
                    })()
                      .map((article, index) => (
                        <Link
                          key={index}
                          href={`/blog/${article.id}`}
                          className="block group hover:opacity-80 transition-opacity"
                        >
                          <div className="flex gap-4">
                            <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden relative">
                              <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                unoptimized
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">{article.date}</p>
                              <h4 className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-green-600 transition-colors">
                                {article.title}
                              </h4>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </motion.div>

                {/* Section Commentaires existants */}
                {comments.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-lg shadow-md p-6 mb-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      COMMENTAIRES ({comments.length})
                    </h3>
                    <div className="space-y-6">
                      {comments.map((comment) => (
                        <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-0">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-lg">
                                {comment.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                                {comment.website && (
                                  <a
                                    href={comment.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-600 hover:text-green-700 text-sm"
                                  >
                                    {comment.website}
                                  </a>
                                )}
                                <span className="text-sm text-gray-500">{comment.date}</span>
                              </div>
                              <p className="text-gray-700 leading-relaxed">{comment.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Section Commentaires */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">LAISSER UN COMMENTAIRE</h3>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (!commentForm.name || !commentForm.email || !commentForm.message) {
                        return
                      }
                      setIsSubmitting(true)
                      const newComment = {
                        id: comments.length + 1,
                        name: commentForm.name,
                        email: commentForm.email,
                        website: commentForm.website || undefined,
                        message: commentForm.message,
                        date: new Date().toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }),
                      }
                      setComments([...comments, newComment])
                      setCommentForm({ name: "", email: "", website: "", message: "" })
                      setIsSubmitting(false)
                    }}
                  >
                    <div>
                      <label htmlFor="comment-name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom : <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="comment-name"
                        required
                        value={commentForm.name}
                        onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="comment-email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email : <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="comment-email"
                        required
                        value={commentForm.email}
                        onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Votre email"
                      />
                    </div>
                    <div>
                      <label htmlFor="comment-website" className="block text-sm font-medium text-gray-700 mb-2">
                        Site :
                      </label>
                      <input
                        type="url"
                        id="comment-website"
                        value={commentForm.website}
                        onChange={(e) => setCommentForm({ ...commentForm, website: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Votre site web (optionnel)"
                      />
                    </div>
                    <div>
                      <label htmlFor="comment-message" className="block text-sm font-medium text-gray-700 mb-2">
                        Commentaire : <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="comment-message"
                        required
                        rows={5}
                        value={commentForm.message}
                        onChange={(e) => setCommentForm({ ...commentForm, message: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Votre commentaire"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="save-info"
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label htmlFor="save-info" className="ml-2 text-sm text-gray-600">
                        Enregistrer mon nom, email et site web dans ce navigateur pour la prochaine fois que je
                        commenterai.
                      </label>
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold disabled:opacity-50"
                    >
                      {isSubmitting ? "Publication..." : "POSTER UN COMMENTAIRE"}
                    </Button>
                  </form>
                </motion.div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
