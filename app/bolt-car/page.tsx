"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle,
  Mail,
  User,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  Car,
  Euro,
  Clock,
  Zap,
  TrendingDown,
  Phone,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { AddressAutocomplete } from "@/components/address-autocomplete"
import { PhoneInput } from "@/components/phone-input"

export default function BoltCarPage() {
  const [showForm, setShowForm] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [videoTime, setVideoTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [allInfosDisappeared, setAllInfosDisappeared] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  // Vérifier si l'utilisateur est déjà inscrit depuis la base de données
  useEffect(() => {
    const checkRegistration = async () => {
      // Vérifier d'abord dans localStorage (pour compatibilité)
      if (typeof window !== "undefined") {
        const savedUser = localStorage.getItem("citycar_user")
        if (savedUser) {
          try {
            const user = JSON.parse(savedUser)
            if (user.email) {
              // Vérifier dans la base de données
              const response = await fetch("/api/check-bolt-car", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: user.email,
                }),
              })
              
              const result = await response.json()
              if (result.success && result.isRegistered) {
                setIsRegistered(true)
                // Mettre à jour localStorage pour compatibilité
                localStorage.setItem("boltCarRegistered", "true")
              }
            }
          } catch (error) {
            console.error("Erreur lors de la vérification de l'inscription:", error)
            // Fallback sur localStorage
            const registered = localStorage.getItem("boltCarRegistered")
            if (registered === "true") {
              setIsRegistered(true)
            }
          }
        } else {
          // Fallback sur localStorage si pas d'utilisateur connecté
          const registered = localStorage.getItem("boltCarRegistered")
          if (registered === "true") {
            setIsRegistered(true)
          }
        }
      }
    }
    
    checkRegistration()
  }, [])

  // Données du formulaire
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    codePostal: "",
    ville: "",
    telephone: "",
    email: "",
    carteVTC: "",
    societe: "",
  })

  // 🎬 SUIVI DU TEMPS DE LA VIDÉO pour synchronisation EXACTE
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setVideoTime(video.currentTime)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    return () => video.removeEventListener("timeupdate", handleTimeUpdate)
  }, [])

  const handleVideoEnd = () => {
    setVideoEnded(true)
    setIsPlaying(false)
    console.log("🎬 Vidéo terminée - Début disparition progressive des infos...")

    // Déclencher la disparition progressive après 1 seconde
    setTimeout(() => {
      setAllInfosDisappeared(true)
    }, 8000) // 8 secondes pour que toutes les infos disparaissent + délai
  }

  const handleVideoError = () => {
    setVideoError(true)
    setVideoEnded(true)
    console.log("⚠️ Vidéo non disponible - bouton d'inscription activé")
  }

  const toggleVideo = async () => {
    if (!videoRef.current) return

    try {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        setIsTransitioning(true)
        setTimeout(async () => {
          try {
            await videoRef.current?.play()
            setIsPlaying(true)
          } catch (error) {
            console.log("⚠️ Erreur lecture vidéo:", error)
            setVideoError(true)
            setVideoEnded(true)
          }
        }, 300)
      }
    } catch (error) {
      console.log("⚠️ Erreur lecture vidéo:", error)
      setVideoError(true)
      setVideoEnded(true)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone) {
      const errorToast = document.createElement("div")
      errorToast.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-2"
      errorToast.innerHTML = `
       <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
       </svg>
       <span>Veuillez remplir tous les champs obligatoires</span>
     `
      document.body.appendChild(errorToast)
      setTimeout(() => document.body.removeChild(errorToast), 4000)
      return
    }

    setIsSubmitting(true)

    try {
      console.log("🚀 Début envoi EmailJS...")

      const templateParams = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        adresse: formData.adresse || "Non renseignée",
        codePostal: formData.codePostal || "Non renseigné",
        ville: formData.ville || "Non renseignée",
        carteVTC: formData.carteVTC || "Non renseigné",
        societe: formData.societe || "Non renseigné",
      }

      console.log("📧 Données à envoyer:", templateParams)

      const emailjs = await import("emailjs-com")
      console.log("📦 EmailJS chargé:", emailjs)

      emailjs.default.init("8sXkBDuXVyKyzLrxP")
      console.log("🔑 EmailJS initialisé")

      const result = await emailjs.default.send("service_4xbq3kx", "template_trlo3fo", templateParams)

      console.log("✅ Email envoyé avec succès:", result.status, result.text)

      try {
        await fetch("/api/send-bolt-car-inscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        console.log("💾 Sauvegarde serveur OK")
      } catch (serverError) {
        console.log("⚠️ Sauvegarde serveur échouée (pas grave):", serverError)
      }

      // Sauvegarder dans localStorage que l'utilisateur est inscrit (pour compatibilité)
      if (typeof window !== "undefined") {
        localStorage.setItem("boltCarRegistered", "true")
        setIsRegistered(true)
        // L'inscription est déjà sauvegardée dans la base de données via l'API
      }

      setShowSuccessModal(true)

      setTimeout(() => {
        setFormData({
          nom: "",
          prenom: "",
          adresse: "",
          codePostal: "",
          ville: "",
          telephone: "",
          email: "",
          carteVTC: "",
          societe: "",
        })
      }, 3000)
    } catch (error) {
      console.error("❌ Erreur EmailJS:", error)

      const errorToast = document.createElement("div")
      errorToast.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-2"
      errorToast.innerHTML = `
       <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
       </svg>
       <span>Erreur technique - Vérifiez la console</span>
     `
      document.body.appendChild(errorToast)
      setTimeout(() => document.body.removeChild(errorToast), 4000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/bolt-hero.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <header className="relative z-50 p-6">
        <div className="flex items-center">
          <div className="flex-1">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Retour
              </Button>
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="text-2xl font-bold">
              <span className="text-white">Bolt</span>
              <span className="text-green-400">Car</span>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      </header>

      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
        <AnimatePresence mode="wait">
          {isRegistered ? (
            // Si l'utilisateur est déjà inscrit, afficher directement le bouton Bolt Car
            <motion.div
              key="registered"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto w-full"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-8"
              >
                Bienvenue sur <span className="text-green-400">Bolt Car</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-300 mb-12"
              >
                Vous êtes déjà inscrit. Accédez directement à votre espace Bolt Car.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link href="/bolt-car/welcome">
                  <Button
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 text-white px-12 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Accéder à Bolt Car
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          ) : !showForm ? (
            <motion.div
              key="video"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-7xl mx-auto w-full"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-8"
              >
                Découvrez <span className="text-green-400">Bolt Car</span>
              </motion.h1>

              {/* 🎬 LAYOUT : INFOS GAUCHE + VIDÉO CENTRE + INFOS DROITE */}
              <div className="flex items-center justify-center gap-8 mb-8 relative">
                {/* 📋 INFORMATIONS GAUCHE (4 INFOS) */}
                <div className="flex-1 max-w-xs space-y-4">
                  {/* 💰 2€ PAR COURSE (0:13) */}
                  <AnimatePresence>
                    {isPlaying && videoTime >= 13 && !videoEnded && (
                      <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          x: -100,
                          scale: 0.8,
                          transition: { duration: 0.8, delay: 0 },
                        }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-l-4 border-green-500"
                      >
                        <div className="flex items-center">
                          <TrendingDown className="h-5 w-5 text-green-600 mr-2" />
                          <div>
                            <div className="text-black font-bold text-lg">2€ d'économie</div>
                            <div className="text-gray-600 text-sm">par course</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 📊 50 COURSES (0:24) */}
                  <AnimatePresence>
                    {isPlaying && videoTime >= 24 && !videoEnded && (
                      <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          x: -100,
                          scale: 0.8,
                          transition: { duration: 0.8, delay: 1 },
                        }}
                        transition={{ duration: 0.6, type: "spring", delay: 0.1 }}
                        className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-l-4 border-blue-500"
                      >
                        <div className="flex items-center">
                          <Euro className="h-5 w-5 text-blue-600 mr-2" />
                          <div>
                            <div className="text-black font-bold text-lg">50 courses</div>
                            <div className="text-gray-600 text-sm">par semaine</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 💳 LOYER MODULÉ (0:33) */}
                  <AnimatePresence>
                    {isPlaying && videoTime >= 33 && !videoEnded && (
                      <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          x: -100,
                          scale: 0.8,
                          transition: { duration: 0.8, delay: 2.5 },
                        }}
                        transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
                        className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-l-4 border-yellow-500"
                      >
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                          <div>
                            <div className="text-black font-bold text-lg">199-219€</div>
                            <div className="text-gray-600 text-sm">loyer/semaine</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 🚗 TOYOTA MODÈLES (0:44) - DÉPLACÉ À GAUCHE */}
                  <AnimatePresence>
                    {isPlaying && videoTime >= 44 && !videoEnded && (
                      <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          x: -100,
                          scale: 0.8,
                          transition: { duration: 0.8, delay: 3 },
                        }}
                        transition={{ duration: 0.6, type: "spring", delay: 0.3 }}
                        className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-l-4 border-indigo-500"
                      >
                        <div className="flex items-center">
                          <Car className="h-5 w-5 text-indigo-600 mr-2" />
                          <div>
                            <div className="text-black font-bold text-sm">Toyota CHR</div>
                            <div className="text-black font-bold text-sm">Corolla Touring</div>
                            <div className="text-gray-600 text-xs">dernière génération</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 📺 VIDÉO CENTRE (TAILLE FIXE) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative flex-shrink-0"
                >
                  <div className="relative bg-black/80 rounded-2xl overflow-hidden shadow-2xl w-[48rem] h-[28rem]">
                    {!videoError ? (
                      <>
                        <video
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          onEnded={handleVideoEnd}
                          onError={handleVideoError}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                          poster="/placeholder.svg?height=400&width=700&text=Vidéo+Bolt+Car"
                          preload="metadata"
                        >
                          <source
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bolt-car-promo-sVLLj22gt70xss4dWlWw9JbElajLjw.mp4"
                            type="video/mp4"
                          />
                          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bolt-car-promo-sVLLj22gt70xss4dWlWw9JbElajLjw.mp4" type="video/mp4" />
                          Votre navigateur ne supporte pas la vidéo HTML5.
                        </video>

                        <AnimatePresence>
                          {!isPlaying && (
                            <motion.div
                              initial={{ opacity: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.8, delay: 0.4 }}
                              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all cursor-pointer group"
                            >
                              <Button
                                onClick={toggleVideo}
                                size="lg"
                                className="bg-green-500 hover:bg-green-600 text-black rounded-full p-4 opacity-80 group-hover:opacity-100 transition-opacity absolute"
                              >
                                <Play className="h-8 w-8" />
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {isPlaying && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all cursor-pointer group opacity-0 hover:opacity-100"
                          >
                            <Button
                              onClick={toggleVideo}
                              size="lg"
                              className="bg-green-500 hover:bg-green-600 text-black rounded-full p-4 transition-opacity"
                            >
                              <Pause className="h-8 w-8" />
                            </Button>
                          </motion.div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center rounded-2xl">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🚗</div>
                          <h3 className="text-2xl font-bold mb-2">Bolt Car</h3>
                          <p className="text-green-100">Votre partenaire mobilité</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* 📋 INFORMATIONS DROITE (4 INFOS) */}
                <div className="flex-1 max-w-xs space-y-4">
                  {/* 🎯 90 COURSES (0:16) */}
                  <AnimatePresence>
                    {isPlaying && videoTime >= 16 && !videoEnded && (
                      <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          x: 100,
                          scale: 0.8,
                          transition: { duration: 0.8, delay: 0.5 },
                        }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-r-4 border-purple-500"
                      >
                        <div className="flex items-center justify-end">
                          <div className="text-right mr-2">
                            <div className="text-black font-bold text-lg">90 courses</div>
                            <div className="text-gray-600 text-sm">maximum</div>
                          </div>
                          <Zap className="h-5 w-5 text-purple-600" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 💯 100€ D'ÉCONOMIE (0:25) */}
                  <AnimatePresence>
                    {isPlaying && videoTime >= 25 && !videoEnded && (
                      <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          x: 100,
                          scale: 0.8,
                          transition: { duration: 0.8, delay: 1.5 },
                        }}
                        transition={{ duration: 0.6, type: "spring", delay: 0.1 }}
                        className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-r-4 border-green-500"
                      >
                        <div className="flex items-center justify-end">
                          <div className="text-right mr-2">
                            <div className="text-black font-bold text-lg">100€ économie</div>
                            <div className="text-gray-600 text-sm">50 courses</div>
                          </div>
                          <Euro className="h-5 w-5 text-green-600" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 🚀 180€ RÉDUCTION (0:27) */}
                  <AnimatePresence>
                    {isPlaying && videoTime >= 27 && !videoEnded && (
                      <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          x: 100,
                          scale: 0.8,
                          transition: { duration: 0.8, delay: 2 },
                        }}
                        transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
                        className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-r-4 border-red-500"
                      >
                        <div className="flex items-center justify-end">
                          <div className="text-right mr-2">
                            <div className="text-black font-bold text-lg">180€ réduction</div>
                            <div className="text-gray-600 text-sm">90 courses</div>
                          </div>
                          <TrendingDown className="h-5 w-5 text-red-600" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 📞 CONTACTEZ CITYCAR (0:55) */}
                  <AnimatePresence>
                    {isPlaying && videoTime >= 55 && !videoEnded && (
                      <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          x: 100,
                          scale: 0.8,
                          transition: { duration: 0.8, delay: 3.5 },
                        }}
                        transition={{ duration: 0.6, type: "spring", delay: 0.3 }}
                        className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-r-4 border-orange-500"
                      >
                        <div className="flex items-center justify-end">
                          <div className="text-right mr-2">
                            <div className="text-black font-bold text-lg">Contactez</div>
                            <div className="text-orange-600 font-bold text-sm">CityCAR</div>
                          </div>
                          <Phone className="h-5 w-5 text-orange-600" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* 🎯 BOUTON D'INSCRIPTION */}
              <AnimatePresence>
                {((videoEnded && allInfosDisappeared) || videoError) && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      type: "spring",
                      bounce: 0.3,
                      delay: 0.5, // Petit délai après la dernière disparition
                    }}
                    className="mt-8"
                  >
                    <Button
                      onClick={() => setShowForm(true)}
                      size="lg"
                      className="bg-green-500 hover:bg-green-600 text-black font-semibold px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      🚗 Commencer mon inscription
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {!videoEnded && !videoError && !isPlaying && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                  className="text-white/70 text-lg mt-6"
                >
                  Regardez la vidéo pour découvrir le programme Bolt Car
                </motion.p>
              )}
            </motion.div>
          ) : (
            // 📝 FORMULAIRE CENTRÉ
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl mx-auto"
            >
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-black">Inscription Bolt Car</h2>
                    <Button
                      onClick={() => setShowForm(false)}
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      Retour à la vidéo
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nom" className="text-black font-medium">
                          Nom <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="nom"
                          value={formData.nom}
                          onChange={(e) => handleInputChange("nom", e.target.value)}
                          className="mt-1 border-gray-300 focus:border-green-500"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="prenom" className="text-black font-medium">
                          Prénom <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="prenom"
                          value={formData.prenom}
                          onChange={(e) => handleInputChange("prenom", e.target.value)}
                          className="mt-1 border-gray-300 focus:border-green-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <AddressAutocomplete
                        value={formData.adresse}
                        onChange={(address, postcode, city) => {
                          handleInputChange("adresse", address)
                          if (postcode) {
                            handleInputChange("codePostal", postcode)
                          }
                          if (city) {
                            handleInputChange("ville", city)
                          }
                        }}
                        label="Adresse"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="codePostal" className="text-black font-medium">
                          Code Postal
                        </Label>
                        <Input
                          id="codePostal"
                          value={formData.codePostal}
                          onChange={(e) => handleInputChange("codePostal", e.target.value)}
                          className="mt-1 border-gray-300 focus:border-green-500"
                          readOnly
                        />
                      </div>
                      <div>
                        <Label htmlFor="ville" className="text-black font-medium">
                          Ville
                        </Label>
                        <Input
                          id="ville"
                          value={formData.ville}
                          onChange={(e) => handleInputChange("ville", e.target.value)}
                          className="mt-1 border-gray-300 focus:border-green-500"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <PhoneInput
                          value={formData.telephone}
                          onChange={(value) => handleInputChange("telephone", value)}
                          label="Numéro De Téléphone"
                          required
                          id="telephone"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-black font-medium">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="mt-1 border-gray-300 focus:border-green-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-black font-medium mb-3 block">Carte De VTC</Label>
                      <RadioGroup
                        value={formData.carteVTC}
                        onValueChange={(value) => handleInputChange("carteVTC", value)}
                        className="flex space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="oui" id="vtc-oui" />
                          <Label htmlFor="vtc-oui" className="text-black">
                            Oui
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="non" id="vtc-non" />
                          <Label htmlFor="vtc-non" className="text-black">
                            Non
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-black font-medium mb-3 block">Société</Label>
                      <RadioGroup
                        value={formData.societe}
                        onValueChange={(value) => handleInputChange("societe", value)}
                        className="flex space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="oui" id="societe-oui" />
                          <Label htmlFor="societe-oui" className="text-black">
                            Oui
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="non" id="societe-non" />
                          <Label htmlFor="societe-non" className="text-black">
                            Non
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 text-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Envoi en cours...</span>
                        </div>
                      ) : (
                        "VALIDER"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal de succès moderne */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-gray-900 mb-2"
                >
                  Inscription envoyée !
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-800 mb-6"
                >
                  Votre demande d'inscription Bolt Car a été transmise avec succès. Notre équipe vous recontactera
                  bientôt.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center space-x-4 mb-6"
                >
                  <div className="flex items-center space-x-2 text-sm text-gray-800 font-medium">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span>Email envoyé</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-800 font-medium">
                    <User className="w-4 h-4 text-green-600" />
                    <span>Dossier créé</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <Button
                    onClick={() => {
                      setShowSuccessModal(false)
                      window.location.href = "/bolt-car"
                    }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    Parfait !
                  </Button>
                  <Button
                    onClick={() => {
                      setShowSuccessModal(false)
                      setShowForm(false)
                      window.location.href = "/bolt-car/plan"
                    }}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-900 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Voir les plans Bolt Car
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
