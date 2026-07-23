"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Euro,
  Phone,
  Download,
  Users,
  Clock,
  MapPin,
  Apple,
  PlayCircle,
  ArrowRight,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import HeaderBolt from "@/components/header-bolt"
import Footer from "@/components/footer"

function useScrollAnimation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return { ref, isInView }
}

export default function BoltCarWelcomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState<number | null>(null)
  const videoBoltRef = useRef<HTMLVideoElement>(null)

  const heroRef = useScrollAnimation()
  const servicesRef = useScrollAnimation()
  const statsRef = useScrollAnimation()
  const downloadRef = useScrollAnimation()

  const services = [
    {
      title: "Trajets",
      subtitle: "Quelques secondes pour commander et quelques minutes pour arriver.",
      description: "Commandez un trajet en temps réel avec géolocalisation précise",
      color: "from-green-600 to-green-800",
      buttonText: "Commencer dès maintenant",
      buttonColor: "bg-green-500 hover:bg-green-600",
      href: "/bolt-car/trajets",
      backgroundImage: "/images/bolt-gps-phone.png",
      icon: MapPin,
    },
    {
      title: "Autopartage",
      subtitle: "Location de voiture haut de gamme facile.",
      description: "Déverrouillez et conduisez des véhicules premium quand vous voulez",
      color: "from-purple-600 to-purple-800",
      buttonText: "Voir Bolt Drive",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
      href: "/bolt-car/autopartage",
      backgroundImage: "/images/bolt-car-service.png",
      icon: Zap,
    },
  ]

  const stats = [
    { number: "100M+", label: "Utilisateurs dans le monde", icon: Users, color: "from-blue-500 to-blue-600" },
    { number: "45+", label: "Pays et régions", icon: MapPin, color: "from-green-500 to-green-600" },
    { number: "2€", label: "Économie par course", icon: Euro, color: "from-yellow-500 to-yellow-600" },
    { number: "24/7", label: "Support disponible", icon: Clock, color: "from-purple-500 to-purple-600" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [services.length])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Intersection Observer pour la vidéo boltcar3.mp4 - lecture automatique au scroll
  useEffect(() => {
    const video = videoBoltRef.current
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

  const handleDownload = (platform: "ios" | "android") => {
    const urls = {
      ios: "https://apps.apple.com/app/bolt-request-a-ride/id675033630",
      android: "https://play.google.com/store/apps/details?id=ee.mtakso.client",
    }
    window.open(urls[platform], "_blank")
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <HeaderBolt />

      {/* Hero Section */}
      <motion.section
        ref={heroRef.ref}
        initial={{ opacity: 0 }}
        animate={heroRef.isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="pt-24 pb-16 bg-gradient-to-br from-gray-50 via-white to-green-50 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={heroRef.isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={heroRef.isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Badge className="mb-6 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 px-4 py-2 text-sm font-medium">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Inscription validée
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Des villes pour les{" "}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  habitants
                </motion.span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={heroRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8"
              >
                Partout et à tout moment
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="text-xl text-gray-600 mb-10 leading-relaxed"
              >
                Commandez des trajets partout avec Bolt.
                <br />
                Rejoignez des millions d'utilisateurs qui font confiance à Bolt.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => handleDownload("ios")}
                  >
                    Télécharger Bolt
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </motion.div>
                <Link href="/bolt-car/plan">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-10 py-4 text-lg rounded-full bg-transparent transition-all duration-300"
                    >
                      Voir les plans
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={heroRef.isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src="/images/bolt-driver-woman.png"
                  alt="Femme souriante conductrice Bolt à côté d'une voiture noire avec logo Bolt"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3"
                >
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section Vidéo Bolt Car au milieu de la page */}
      <section className="relative z-10 py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Découvrez <span className="text-green-500">Bolt Car</span>
            </h2>
            <p className="text-lg text-gray-600">
              Une solution de mobilité innovante pour votre quotidien
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-video rounded-lg overflow-hidden shadow-2xl"
          >
            <video
              ref={videoBoltRef}
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              playsInline
              muted
            >
              <source src="https://2025.city-car.fr/videos/boltcar3.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <motion.section
        ref={servicesRef.ref}
        initial={{ opacity: 0 }}
        animate={servicesRef.isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="py-24 bg-gradient-to-br from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={servicesRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2
              className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              Nos services
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Les produits et les fonctionnalités varient selon les pays. Certaines fonctionnalités listées ici peuvent
              ne pas être disponibles dans votre appli.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 100, scale: 0.8 }}
                  animate={servicesRef.isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.8 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative rounded-3xl overflow-hidden h-96 cursor-pointer group ${
                    currentSlide === index ? "ring-4 ring-green-500 shadow-2xl" : "shadow-xl hover:shadow-2xl"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={service.backgroundImage || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-85`} />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  {/* Animated overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: isHovered === index ? ["-100%", "100%"] : "-100%",
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative h-full flex flex-col justify-between p-8 text-white">
                    <div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"
                      >
                        <service.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <motion.h3
                        className="text-3xl font-bold mb-4"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        {service.title}
                      </motion.h3>
                      <motion.p
                        className="text-white/90 leading-relaxed text-lg mb-2"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                      >
                        {service.subtitle}
                      </motion.p>
                      <motion.p
                        className="text-white/70 text-sm"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 + index * 0.1 }}
                      >
                        {service.description}
                      </motion.p>
                    </div>

                    <Link href={service.href}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          className={`${service.buttonColor} text-white border-0 rounded-full self-start px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                        >
                          {service.buttonText}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-12 space-x-3">
            {services.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all duration-500 ${
                  currentSlide === index ? "bg-green-500 w-12" : "bg-gray-300 w-3 hover:bg-gray-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        ref={statsRef.ref}
        initial={{ opacity: 0 }}
        animate={statsRef.isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-10 blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={statsRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">Bolt en chiffres</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une plateforme de mobilité de confiance utilisée dans le monde entier
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 100, scale: 0.5 }}
                animate={statsRef.isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.5 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <stat.icon className="h-10 w-10 text-white" />
                </motion.div>
                <motion.div
                  className="text-4xl font-bold text-gray-900 mb-3"
                  initial={{ scale: 0 }}
                  animate={statsRef.isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Download Section */}
      <motion.section
        ref={downloadRef.ref}
        initial={{ opacity: 0 }}
        animate={downloadRef.isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={downloadRef.isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.h2
                className="text-5xl lg:text-6xl font-bold mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={downloadRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Téléchargez nos applis
              </motion.h2>
              <motion.p
                className="text-xl text-gray-300 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={downloadRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Disponible pour les appareils iOS et Android.
              </motion.p>

              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={downloadRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <motion.div
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-lg font-semibold">Trajets</span>
                </div>

                <h3 className="text-4xl font-bold mb-6">Tous vos déplacements au meilleur prix.</h3>
                <p className="text-gray-300 mb-8 text-lg">Disponible pour les appareils iOS et Android.</p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={downloadRef.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-10 py-4 text-lg rounded-full flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => handleDownload("ios")}
                  >
                    <Apple className="h-6 w-6 mr-3" />
                    App Store
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-10 py-4 text-lg rounded-full flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => handleDownload("android")}
                  >
                    <PlayCircle className="h-6 w-6 mr-3" />
                    Google Play
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={downloadRef.isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative flex justify-center"
            >
              <motion.div
                className="relative"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="/images/bolt-phone-final.png"
                  alt="iPhone avec l'application Bolt"
                  className="w-[500px] h-auto"
                />
                <motion.div
                  className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Download className="h-14 w-14 text-white" />
                </motion.div>

                {/* Floating elements */}
                <motion.div
                  className="absolute top-20 -left-10 w-6 h-6 bg-green-400 rounded-full"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute bottom-32 -right-8 w-4 h-4 bg-blue-400 rounded-full"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-500 via-green-600 to-green-500 text-white relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-5xl lg:text-6xl font-bold mb-8"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Prêt à rejoindre Bolt Car ?
            </motion.h2>
            <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto">
              Découvrez nos plans et commencez à économiser dès aujourd'hui
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/bolt-car/plan">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-white text-green-600 hover:bg-gray-100 px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Voir les plans
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 hover:border-white px-10 py-4 text-lg rounded-full bg-transparent transition-all duration-300"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Nous contacter
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
