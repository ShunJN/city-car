"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  MapPin,
  Clock,
  Euro,
  Star,
  Users,
  Shield,
  Phone,
  Car,
  Navigation,
  Zap,
  CheckCircle,
  ArrowLeft,
  TrendingUp,
} from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRouter } from "next/navigation"
import HeaderBolt from "@/components/header-bolt"
import Footer from "@/components/footer"

function useScrollAnimation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return { ref, isInView }
}

export default function BoltCarTrajetsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const { toast } = useToast()
  const router = useRouter()

  const heroRef = useScrollAnimation()
  const statsRef = useScrollAnimation()
  const featuresRef = useScrollAnimation()
  const stepsRef = useScrollAnimation()
  const formRef = useScrollAnimation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const features = [
    {
      icon: MapPin,
      title: "Géolocalisation précise",
      description: "Trouvez et récupérez vos clients rapidement grâce à notre système GPS avancé",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Clock,
      title: "Disponibilité 24h/7j",
      description: "Travaillez quand vous voulez, où vous voulez, selon votre emploi du temps",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Euro,
      title: "Revenus optimisés",
      description: "Tarification dynamique et bonus pour maximiser vos gains",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Shield,
      title: "Sécurité garantie",
      description: "Assurance complète et support d'urgence pour votre tranquillité d'esprit",
      color: "from-purple-500 to-purple-600",
    },
  ]

  const stats = [
    { number: "2€", label: "Économie par course", icon: Euro, color: "from-green-500 to-green-600" },
    { number: "4.8/5", label: "Note moyenne", icon: Star, color: "from-yellow-500 to-yellow-600" },
    { number: "50M+", label: "Trajets effectués", icon: Car, color: "from-blue-500 to-blue-600" },
    { number: "24h", label: "Support disponible", icon: Clock, color: "from-purple-500 to-purple-600" },
  ]

  const steps = [
    {
      step: "1",
      title: "Inscrivez-vous",
      description: "Créez votre compte chauffeur en quelques minutes avec vos documents",
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      step: "2",
      title: "Activez l'app",
      description: "Téléchargez l'app chauffeur et activez votre statut quand vous voulez",
      icon: Zap,
      color: "from-green-500 to-green-600",
    },
    {
      step: "3",
      title: "Commencez à gagner",
      description: "Recevez des demandes de trajets et commencez à générer des revenus",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Demande envoyée !",
      description: "Nous vous recontacterons dans les plus brefs délais pour discuter de votre inscription.",
    })
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <HeaderBolt />

      <div className="pt-24">
        {/* Hero Section */}
        <motion.section
          ref={heroRef.ref}
          initial={{ opacity: 0 }}
          animate={heroRef.isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white py-20 relative overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroRef.isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full px-4 py-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={heroRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={heroRef.isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Badge className="mb-4 bg-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-4 py-2">
                  <Car className="h-4 w-4 mr-2" />
                  Service Trajets
                </Badge>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={heroRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Devenez chauffeur{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-white">Bolt</span>
              </motion.h1>

              <motion.p
                className="text-xl text-green-100 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={heroRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Rejoignez des milliers de chauffeurs qui gagnent leur vie en conduisant avec Bolt. Flexibilité totale,
                revenus attractifs et support dédié.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={heroRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Navigation className="h-5 w-5 mr-2" />
                    Commencer maintenant
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full bg-transparent backdrop-blur-sm"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Nous contacter
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          ref={statsRef.ref}
          initial={{ opacity: 0 }}
          animate={statsRef.isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="py-16 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={statsRef.isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <motion.div
                    className="text-3xl font-bold text-gray-900 mb-2"
                    initial={{ opacity: 0 }}
                    animate={statsRef.isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          ref={featuresRef.ref}
          initial={{ opacity: 0 }}
          animate={featuresRef.isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="py-20 bg-gradient-to-br from-gray-50 to-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={featuresRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Pourquoi choisir Bolt Trajets ?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez tous les avantages de devenir chauffeur partenaire Bolt
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50, rotateY: -90 }}
                  animate={
                    featuresRef.isInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 50, rotateY: -90 }
                  }
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 group-hover:scale-105 border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <feature.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* How it works */}
        <motion.section
          ref={stepsRef.ref}
          initial={{ opacity: 0 }}
          animate={stepsRef.isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="py-20 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={stepsRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Comment ça marche ?</h2>
              <p className="text-xl text-gray-600">Simple, rapide et efficace</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 100, scale: 0.5 }}
                  animate={stepsRef.isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.5 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-center group"
                >
                  <div className="relative mb-6">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <item.icon className="h-10 w-10 text-white" />
                    </motion.div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                      initial={{ scale: 0 }}
                      animate={stepsRef.isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.5 + index * 0.2, type: "spring", stiffness: 300 }}
                    >
                      {item.step}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          ref={formRef.ref}
          initial={{ opacity: 0 }}
          animate={formRef.isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="py-20 bg-gradient-to-br from-gray-50 to-white"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={formRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Prêt à commencer ?</h2>
              <p className="text-xl text-gray-600">
                Contactez-nous pour plus d'informations sur le programme chauffeur Bolt
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={formRef.isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={formRef.isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Label htmlFor="name" className="text-gray-700 font-medium">
                          Nom complet
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-1 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={formRef.isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Label htmlFor="email" className="text-gray-700 font-medium">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-1 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg"
                        />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={formRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Label htmlFor="phone" className="text-gray-700 font-medium">
                        Téléphone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={formRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Label htmlFor="message" className="text-gray-700 font-medium">
                        Message (optionnel)
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="mt-1 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg"
                        placeholder="Parlez-nous de votre expérience de conduite, vos disponibilités..."
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={formRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ delay: 0.8 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Envoyer ma demande
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  )
}
