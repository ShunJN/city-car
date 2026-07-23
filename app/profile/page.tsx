"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  EyeOff,
  User,
  Car,
  FileText,
  Calendar,
  CreditCard,
  LogOut,
  ArrowLeft,
  Edit,
  Save,
  X,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Phone,
  Camera,
  Menu,
} from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { AddressAutocomplete } from "@/components/address-autocomplete"
import { PhoneInput } from "@/components/phone-input"
import { motion, AnimatePresence } from "framer-motion"

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [isEditing, setIsEditing] = useState(false)
  const [activeSection, setActiveSection] = useState("profile")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    memberSince: new Date().getFullYear(),
    profileImage: "",
  })
  const [editedUserInfo, setEditedUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    memberSince: new Date().getFullYear(),
    profileImage: "",
  })
  const { toast } = useToast()

  // Formulaire de connexion
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  // Formulaire d'inscription
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    postalCode: "",
    city: "",
  })

  // État pour les démarches utilisateur (vide par défaut)
  const [userDemarches, setUserDemarches] = useState({
    vehicles: [],
    documents: [],
    appointments: [],
    payments: [],
  })

  // États pour la validation du mot de passe
  const [passwordErrors, setPasswordErrors] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  })
  const [passwordMatchError, setPasswordMatchError] = useState(false)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLinkClick = (href: string) => {
    router.push(href)
  }

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const savedUser = localStorage.getItem("citycar_user")
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUserInfo(user)
      setEditedUserInfo(user)
      setProfileImage(user.profileImage || null)
      setIsLoggedIn(true)

      // Charger les démarches de l'utilisateur
      const savedDemarches = localStorage.getItem(`citycar_demarches_${user.email}`)
      if (savedDemarches) {
        setUserDemarches(JSON.parse(savedDemarches))
      }
    }
  }, [])

  const handleProfileImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validation du fichier
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une image valide.",
        variant: "destructive",
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erreur",
        description: "L'image ne doit pas dépasser 5MB.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", "profile")

      const response = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setProfileImage(result.file.url)
        setEditedUserInfo({ ...editedUserInfo, profileImage: result.file.url })
        toast({
          title: "Photo uploadée !",
          description: "Votre photo de profil a été mise à jour.",
        })
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'upload de la photo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Vérification si l'utilisateur existe avec le mot de passe
      const checkResponse = await fetch("/api/check-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          email: loginForm.email,
          password: loginForm.password,
        }),
      })

      const checkResult = await checkResponse.json()

      if (checkResult.success) {
        const user = {
          ...checkResult.user,
          memberSince: new Date(checkResult.user.createdAt).getFullYear(),
        }

        // Envoi d'email de notification de connexion
        await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "profile-login",
            data: user,
          }),
        })

        setUserInfo(user)
        setEditedUserInfo(user)
        localStorage.setItem("citycar_user", JSON.stringify(user))
        setIsLoggedIn(true)

        // Charger les démarches de l'utilisateur
        const savedDemarches = localStorage.getItem(`citycar_demarches_${user.email}`)
        if (savedDemarches) {
          setUserDemarches(JSON.parse(savedDemarches))
        }

        toast({
          title: `Bienvenue ${user.firstName} !`,
          description: "Vous êtes maintenant connecté à votre espace client.",
        })
      } else {
        toast({
          title: "Erreur de connexion",
          description: checkResult.message || "Vérifiez vos identifiants et réessayez.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Erreur de connexion au serveur.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction de validation du mot de passe
  const validatePassword = (password: string) => {
    const errors = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>[\]\\/_+=\-~`]/.test(password),
    }
    setPasswordErrors(errors)
    return Object.values(errors).every((error) => error === true)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    // Valider le mot de passe
    if (!validatePassword(registerForm.password)) {
      toast({
        title: "Erreur",
        description: "Le mot de passe ne respecte pas tous les critères requis.",
        variant: "destructive",
      })
      return
    }

    // Vérifier que les mots de passe correspondent
    if (registerForm.password !== registerForm.confirmPassword) {
      setPasswordMatchError(true)
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Vérification si l'utilisateur existe déjà
      const registerResponse = await fetch("/api/check-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "register",
          email: registerForm.email,
          userData: {
            firstName: registerForm.firstName,
            lastName: registerForm.lastName,
            email: registerForm.email,
            phone: registerForm.phone,
            address: registerForm.address,
            postalCode: registerForm.postalCode,
            city: registerForm.city,
            password: registerForm.password,
          },
        }),
      })

      const registerResult = await registerResponse.json()

      if (registerResult.success) {
        const user = {
          ...registerResult.user,
          memberSince: new Date().getFullYear(),
        }

        // Envoi d'email de notification d'inscription
        await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "profile-register",
            data: user,
          }),
        })

        setUserInfo(user)
        setEditedUserInfo(user)
        localStorage.setItem("citycar_user", JSON.stringify(user))
        setIsLoggedIn(true)

        // Initialiser les démarches vides pour le nouvel utilisateur
        const emptyDemarches = {
          vehicles: [],
          documents: [],
          appointments: [],
          payments: [],
        }
        setUserDemarches(emptyDemarches)
        localStorage.setItem(`citycar_demarches_${user.email}`, JSON.stringify(emptyDemarches))

        toast({
          title: `Bienvenue ${user.firstName} !`,
          description: "Votre compte a été créé avec succès. Vous êtes maintenant connecté.",
        })

        // Reset registration form
        setRegisterForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          address: "",
          postalCode: "",
          city: "",
        })
      } else {
        toast({
          title: registerResult.exists ? "Compte existant" : "Erreur d'inscription",
          description: registerResult.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de la création du compte.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateProfile = async () => {
    setIsLoading(true)

    try {
      // Simulation de mise à jour
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Envoi d'email de notification de modification
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "profile-update",
          data: editedUserInfo,
        }),
      })

      setUserInfo(editedUserInfo)
      setProfileImage(editedUserInfo.profileImage)
      localStorage.setItem("citycar_user", JSON.stringify(editedUserInfo))
      setIsEditing(false)

      toast({
        title: "Profil mis à jour !",
        description: "Vos informations ont été modifiées avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("citycar_user")
    setIsLoggedIn(false)
    setUserInfo({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      postalCode: "",
      city: "",
      memberSince: new Date().getFullYear(),
      profileImage: "",
    })
    setEditedUserInfo({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      postalCode: "",
      city: "",
      memberSince: new Date().getFullYear(),
      profileImage: "",
    })
    setProfileImage(null)
    setIsEditing(false)
    setActiveSection("profile")
    setUserDemarches({
      vehicles: [],
      documents: [],
      appointments: [],
      payments: [],
    })
    setShowLogoutModal(false)
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    })
  }

  const cancelEdit = () => {
    setEditedUserInfo(userInfo)
    setProfileImage(userInfo.profileImage)
    setIsEditing(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmé</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Payé</Badge>
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">À venir</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen">
        <div
          className="fixed inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/bolt-hero.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        {/* Header personnalisé pour la page de profil */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            {/* Menu Burger - Largeur fixe */}
            <div className="w-20 flex justify-start">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-black border-gray-800 text-white">
                  <div className="flex flex-col space-y-6 mt-8">
                    <button
                      onClick={() => handleLinkClick("/offres")}
                      className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                    >
                      Offres
                    </button>
                    <button
                      onClick={() => handleLinkClick("/dossier")}
                      className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                    >
                      Dossier
                    </button>
                    <button
                      onClick={() => handleLinkClick("/vehicules")}
                      className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                    >
                      Véhicules
                    </button>
                    <button
                      onClick={() => handleLinkClick("/vtc")}
                      className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                    >
                      VTC
                    </button>
                    <button
                      onClick={() => handleLinkClick("/leasing")}
                      className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                    >
                      Leasing
                    </button>
                    <button
                      onClick={() => handleLinkClick("/rent-to-buy")}
                      className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                    >
                      Rent to Buy
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo Central - Parfaitement centré */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="text-2xl font-bold">
                <span className="text-white">City</span>
                <span className="text-green-400">Car</span>
              </Link>
            </div>

            {/* Navigation Droite - Largeur fixe */}
            <div className="w-80 flex items-center justify-end">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10"
                onClick={() => handleLinkClick("/profile")}
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Profil</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-24 relative z-10 flex-grow">
          <Link href="/" className="inline-flex items-center text-white hover:text-green-400 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>

          <div className="max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-8">
              <span className="text-black">City</span>
              <span className="text-green-400">Car</span>
              <span className="text-black"> - Espace Client</span>
            </h1>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="exemple@email.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Link href="/reset-password" className="text-sm text-green-500 hover:text-green-600">
                          Mot de passe oublié?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={isLoading}>
                    {isLoading ? "Connexion en cours..." : "Se connecter"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <div className="max-h-[400px] overflow-y-auto pr-1">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="firstName">
                            Prénom <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            placeholder="Jean"
                            value={registerForm.firstName}
                            onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                            required
                            className="mt-1 border-gray-300 focus:border-green-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="lastName">
                            Nom <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            placeholder="Dupont"
                            value={registerForm.lastName}
                            onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                            required
                            className="mt-1 border-gray-300 focus:border-green-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="exemple@email.com"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                          required
                          className="mt-1 border-gray-300 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <PhoneInput
                          value={registerForm.phone}
                          onChange={(value) => setRegisterForm({ ...registerForm, phone: value })}
                          label="Téléphone"
                          required
                          id="phone"
                        />
                      </div>
                      <div>
                        <AddressAutocomplete
                          value={registerForm.address}
                          onChange={(address, postcode, city) => {
                            setRegisterForm((prev) => ({
                              ...prev,
                              address: address,
                            }))
                            if (postcode) {
                              setRegisterForm((prev) => ({
                                ...prev,
                                postalCode: postcode,
                              }))
                            }
                            if (city) {
                              setRegisterForm((prev) => ({
                                ...prev,
                                city: city,
                              }))
                            }
                          }}
                          onPostcodeChange={(postcode) => {
                            setRegisterForm((prev) => ({
                              ...prev,
                              postalCode: postcode,
                            }))
                          }}
                          onCityChange={(city) => {
                            setRegisterForm((prev) => ({
                              ...prev,
                              city: city,
                            }))
                          }}
                          label="Adresse"
                          required
                          id="address"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="postalCode">Code postal</Label>
                          <Input
                            id="postalCode"
                            placeholder="75001"
                            value={registerForm.postalCode}
                            onChange={(e) => setRegisterForm({ ...registerForm, postalCode: e.target.value })}
                            required
                            readOnly
                            className="bg-gray-100"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="city">Ville *</Label>
                          <Input
                            id="city"
                            placeholder="Paris"
                            value={registerForm.city}
                            onChange={(e) => setRegisterForm({ ...registerForm, city: e.target.value })}
                            required
                            readOnly
                            className="bg-gray-100"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="register-password">
                          Mot de passe <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="register-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={registerForm.password}
                            onChange={(e) => {
                              const newPassword = e.target.value
                              setRegisterForm({ ...registerForm, password: newPassword })
                              validatePassword(newPassword)
                              // Vérifier la correspondance en temps réel
                              if (registerForm.confirmPassword) {
                                setPasswordMatchError(newPassword !== registerForm.confirmPassword)
                              } else {
                                setPasswordMatchError(false)
                              }
                            }}
                            required
                            className={registerForm.password && !Object.values(passwordErrors).every((error) => error === true) ? "border-red-500 pr-10" : "pr-10"}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {registerForm.password && (
                          <div className="mt-2 space-y-1 text-xs">
                            <p className="text-gray-600 font-medium mb-1">Critères requis :</p>
                            <div className={`flex items-center ${passwordErrors.minLength ? "text-green-600" : "text-gray-500"}`}>
                              <span className={`mr-2 ${passwordErrors.minLength ? "text-green-600" : ""}`}>
                                {passwordErrors.minLength ? "✓" : "○"}
                              </span>
                              Au moins 8 caractères
                            </div>
                            <div className={`flex items-center ${passwordErrors.hasUpperCase ? "text-green-600" : "text-gray-500"}`}>
                              <span className={`mr-2 ${passwordErrors.hasUpperCase ? "text-green-600" : ""}`}>
                                {passwordErrors.hasUpperCase ? "✓" : "○"}
                              </span>
                              Une majuscule
                            </div>
                            <div className={`flex items-center ${passwordErrors.hasLowerCase ? "text-green-600" : "text-gray-500"}`}>
                              <span className={`mr-2 ${passwordErrors.hasLowerCase ? "text-green-600" : ""}`}>
                                {passwordErrors.hasLowerCase ? "✓" : "○"}
                              </span>
                              Une minuscule
                            </div>
                            <div className={`flex items-center ${passwordErrors.hasNumber ? "text-green-600" : "text-gray-500"}`}>
                              <span className={`mr-2 ${passwordErrors.hasNumber ? "text-green-600" : ""}`}>
                                {passwordErrors.hasNumber ? "✓" : "○"}
                              </span>
                              Un chiffre
                            </div>
                            <div className={`flex items-center ${passwordErrors.hasSpecialChar ? "text-green-600" : "text-gray-500"}`}>
                              <span className={`mr-2 ${passwordErrors.hasSpecialChar ? "text-green-600" : ""}`}>
                                {passwordErrors.hasSpecialChar ? "✓" : "○"}
                              </span>
                              Un caractère spécial (!@#$%^&*()[]{}|\\/_-+=~`...)
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="confirm-password">
                          Confirmer le mot de passe <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={registerForm.confirmPassword}
                            onChange={(e) => {
                              const newConfirmPassword = e.target.value
                              setRegisterForm({ ...registerForm, confirmPassword: newConfirmPassword })
                              // Vérifier la correspondance en temps réel
                              if (newConfirmPassword && registerForm.password) {
                                setPasswordMatchError(newConfirmPassword !== registerForm.password)
                              } else {
                                setPasswordMatchError(false)
                              }
                            }}
                            required
                            className={passwordMatchError ? "border-red-500 pr-10" : registerForm.confirmPassword && registerForm.password === registerForm.confirmPassword ? "border-green-500 pr-10" : "pr-10"}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {passwordMatchError && (
                          <p className="text-xs text-red-500 mt-1">Les mots de passe ne correspondent pas</p>
                        )}
                        {registerForm.confirmPassword && !passwordMatchError && registerForm.password === registerForm.confirmPassword && (
                          <p className="text-xs text-green-600 mt-1">✓ Les mots de passe correspondent</p>
                        )}
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 mt-4" disabled={isLoading}>
                      {isLoading ? "Inscription en cours..." : "S'inscrire"}
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <div className="bg-gray-900 w-full relative z-10 mt-auto">
          <Footer />
        </div>
      </div>
    )
  }

  // Interface utilisateur connecté
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/bolt-hero.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      {/* Header personnalisé pour la page de profil */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Menu Burger - Largeur fixe */}
          <div className="w-20 flex justify-start">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-black border-gray-800 text-white">
                <div className="flex flex-col space-y-6 mt-8">
                  <button
                    onClick={() => handleLinkClick("/offres")}
                    className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                  >
                    Offres
                  </button>
                  <button
                    onClick={() => handleLinkClick("/dossier")}
                    className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                  >
                    Dossier
                  </button>
                  <button
                    onClick={() => handleLinkClick("/vehicules")}
                    className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                  >
                    Véhicules
                  </button>
                  <button
                    onClick={() => handleLinkClick("/vtc")}
                    className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                  >
                    VTC
                  </button>
                  <button
                    onClick={() => handleLinkClick("/leasing")}
                    className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                  >
                    Leasing
                  </button>
                  <button
                    onClick={() => handleLinkClick("/rent-to-buy")}
                    className="text-lg font-medium hover:text-green-400 transition-colors text-left"
                  >
                    Rent to Buy
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo Central - Parfaitement centré */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-white">City</span>
              <span className="text-green-400">Car</span>
            </Link>
          </div>

          {/* Navigation Droite - Largeur fixe */}
          <div className="w-80 flex items-center justify-end">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={() => handleLinkClick("/profile")}
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Profil</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-24 relative z-10 flex-grow">
        <Link href="/" className="inline-flex items-center text-white hover:text-green-400 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <Card className="bg-white/90 backdrop-blur-md">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center py-4">
                    <div className="relative w-24 h-24 mb-4">
                      {profileImage || userInfo.profileImage ? (
                        <img
                          src={profileImage || userInfo.profileImage}
                          alt="Photo de profil"
                          className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                          <User size={40} className="text-green-500" />
                        </div>
                      )}
                      {isEditing && (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                        >
                          <Camera size={16} />
                        </button>
                      )}
                    </div>
                    <h3 className="font-bold text-lg">
                      {userInfo.firstName} {userInfo.lastName}
                    </h3>
                    <p className="text-gray-500 text-sm">Client depuis {userInfo.memberSince}</p>
                  </div>

                  <nav className="mt-6 space-y-1">
                    <Button
                      variant={activeSection === "profile" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection("profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Mon profil
                    </Button>
                    <Button
                      variant={activeSection === "vehicles" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection("vehicles")}
                    >
                      <Car className="mr-2 h-4 w-4" />
                      Mes véhicules
                    </Button>
                    <Button
                      variant={activeSection === "documents" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection("documents")}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Mes documents
                    </Button>
                    <Button
                      variant={activeSection === "appointments" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection("appointments")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Mes rendez-vous
                    </Button>
                    <Button
                      variant={activeSection === "payments" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection("payments")}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Paiements
                    </Button>
                  </nav>

                  <div className="mt-8 pt-4 border-t">
                    <Button
                      variant="outline"
                      className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 bg-transparent transition-all duration-200 hover:scale-105"
                      onClick={() => setShowLogoutModal(true)}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mon Profil */}
              {activeSection === "profile" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6 text-white">Mon Profil</h1>
                  <Card className="bg-white/90 backdrop-blur-md">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        Informations personnelles
                        {!isEditing ? (
                          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={cancelEdit}>
                              <X className="h-4 w-4 mr-2" />
                              Annuler
                            </Button>
                            <Button size="sm" onClick={handleUpdateProfile} disabled={isLoading}>
                              <Save className="h-4 w-4 mr-2" />
                              {isLoading ? "Sauvegarde..." : "Sauvegarder"}
                            </Button>
                          </div>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        className="hidden"
                      />

                      {!isEditing ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Nom complet</p>
                            <p className="font-medium">
                              {userInfo.firstName} {userInfo.lastName}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{userInfo.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Téléphone</p>
                            <p className="font-medium">{userInfo.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Adresse</p>
                            <p className="font-medium">
                              {userInfo.address}, {userInfo.postalCode} {userInfo.city}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="edit-firstName">Prénom</Label>
                            <Input
                              id="edit-firstName"
                              value={editedUserInfo.firstName}
                              onChange={(e) => setEditedUserInfo({ ...editedUserInfo, firstName: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-lastName">Nom</Label>
                            <Input
                              id="edit-lastName"
                              value={editedUserInfo.lastName}
                              onChange={(e) => setEditedUserInfo({ ...editedUserInfo, lastName: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-email">Email</Label>
                            <Input
                              id="edit-email"
                              type="email"
                              value={editedUserInfo.email}
                              onChange={(e) => setEditedUserInfo({ ...editedUserInfo, email: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-phone">Téléphone</Label>
                            <Input
                              id="edit-phone"
                              value={editedUserInfo.phone}
                              onChange={(e) => setEditedUserInfo({ ...editedUserInfo, phone: e.target.value })}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="edit-address">Adresse</Label>
                            <Input
                              id="edit-address"
                              value={editedUserInfo.address}
                              onChange={(e) => setEditedUserInfo({ ...editedUserInfo, address: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-postalCode">Code postal</Label>
                            <Input
                              id="edit-postalCode"
                              value={editedUserInfo.postalCode}
                              onChange={(e) => setEditedUserInfo({ ...editedUserInfo, postalCode: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-city">Ville</Label>
                            <Input
                              id="edit-city"
                              value={editedUserInfo.city}
                              onChange={(e) => setEditedUserInfo({ ...editedUserInfo, city: e.target.value })}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Mes Véhicules */}
              {activeSection === "vehicles" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6 text-white">Mes Véhicules</h1>
                  <Card className="bg-white/90 backdrop-blur-md">
                    <CardContent className="p-6">
                      {userDemarches.vehicles.length === 0 ? (
                        <div className="text-center py-12">
                          <Car className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun véhicule</h3>
                          <p className="text-gray-500 mb-6">
                            Vous n'avez pas encore de véhicule en cours. Commencez par explorer nos offres !
                          </p>
                          <Button
                            onClick={() => (window.location.href = "/vehicules")}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            Découvrir nos véhicules
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {userDemarches.vehicles.map((vehicle: any, index: number) => (
                            <Card key={index} className="border">
                              <CardContent className="p-6">
                                <div className="flex items-center space-x-6">
                                  <div className="w-32 h-24 bg-gray-200 rounded-lg overflow-hidden">
                                    <img
                                      src={vehicle.image || "/placeholder.svg?height=96&width=128"}
                                      alt={vehicle.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h3 className="text-xl font-bold">{vehicle.name}</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm text-gray-600">
                                          <div>
                                            <span className="font-medium">Type</span>
                                            <br />
                                            {vehicle.type}
                                          </div>
                                          <div>
                                            <span className="font-medium">Mensualité</span>
                                            <br />
                                            {vehicle.monthlyPayment}
                                          </div>
                                          <div>
                                            <span className="font-medium">Kilométrage</span>
                                            <br />
                                            {vehicle.mileage}
                                          </div>
                                          <div>
                                            <span className="font-medium">Fin de contrat</span>
                                            <br />
                                            {vehicle.endDate}
                                          </div>
                                        </div>
                                      </div>
                                      {getStatusBadge(vehicle.status)}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Mes Documents */}
              {activeSection === "documents" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6 text-white">Mes Documents</h1>
                  <Card className="bg-white/90 backdrop-blur-md">
                    <CardContent className="p-6">
                      {userDemarches.documents.length === 0 ? (
                        <div className="text-center py-12">
                          <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun document</h3>
                          <p className="text-gray-500 mb-6">
                            Vos documents apparaîtront ici une fois que vous aurez effectué des démarches.
                          </p>
                          <Button
                            onClick={() => (window.location.href = "/dossier")}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            Commencer un dossier
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {userDemarches.documents.map((doc: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center space-x-4">
                                <FileText className="h-8 w-8 text-blue-500" />
                                <div>
                                  <h3 className="font-semibold">{doc.name}</h3>
                                  <p className="text-sm text-gray-500">
                                    {doc.date} • {doc.size} • {doc.amount}
                                  </p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Télécharger
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Mes Rendez-vous */}
              {activeSection === "appointments" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6 text-white">Mes Rendez-vous</h1>
                  <Card className="bg-white/90 backdrop-blur-md">
                    <CardContent className="p-6">
                      {userDemarches.appointments.length === 0 ? (
                        <div className="text-center py-12">
                          <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun rendez-vous</h3>
                          <p className="text-gray-500 mb-6">Vous n'avez pas de rendez-vous programmé pour le moment.</p>
                          <Button
                            onClick={() => (window.location.href = "/contact")}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            Prendre rendez-vous
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {userDemarches.appointments.map((appointment: any, index: number) => (
                            <Card key={index} className="border">
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-xl font-bold">{appointment.title}</h3>
                                    <div className="flex items-center space-x-4 mt-2 text-gray-600">
                                      <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {appointment.date}
                                      </div>
                                      <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {appointment.location}
                                      </div>
                                      <div className="flex items-center">
                                        <Phone className="h-4 w-4 mr-1" />
                                        {appointment.phone}
                                      </div>
                                    </div>
                                  </div>
                                  {getStatusBadge(appointment.status)}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Paiements */}
              {activeSection === "payments" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6 text-white">Paiements</h1>
                  <Card className="bg-white/90 backdrop-blur-md">
                    <CardContent className="p-6">
                      {userDemarches.payments.length === 0 ? (
                        <div className="text-center py-12">
                          <CreditCard className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun paiement</h3>
                          <p className="text-gray-500 mb-6">
                            Votre historique de paiements apparaîtra ici une fois que vous aurez effectué des
                            transactions.
                          </p>
                          <Button
                            onClick={() => (window.location.href = "/vehicules")}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            Explorer nos offres
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {userDemarches.payments.map((payment: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                  {payment.status === "paid" ? (
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                  ) : payment.status === "pending" ? (
                                    <Clock className="h-5 w-5 text-yellow-600" />
                                  ) : (
                                    <AlertCircle className="h-5 w-5 text-blue-600" />
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-semibold">{payment.title}</h3>
                                  <p className="text-sm text-gray-500">{payment.description}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-lg">{payment.amount}</div>
                                {getStatusBadge(payment.status)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <div className="bg-gray-900 w-full relative z-10 mt-auto">
        <Footer />
      </div>

      {/* Modal de déconnexion moderne */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent className="sm:max-w-md">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <div className="flex items-center justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <LogOut className="h-8 w-8 text-white" />
                  </motion.div>
                </div>
                <DialogTitle className="text-center text-2xl font-bold">
                  Déconnexion
                </DialogTitle>
                <DialogDescription className="text-center text-gray-600 mt-2">
                  Êtes-vous sûr de vouloir vous déconnecter ?
                  <br />
                  <span className="text-sm text-gray-500">
                    Vous devrez vous reconnecter pour accéder à votre espace.
                  </span>
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-4">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 border border-red-100">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-700">
                      <p className="font-medium text-gray-900 mb-1">Informations importantes :</p>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Vos données seront conservées</li>
                        <li>• Vous pourrez vous reconnecter à tout moment</li>
                        <li>• Votre session sera fermée</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 border-gray-300 hover:bg-gray-50"
                >
                  Annuler
                </Button>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    onClick={handleLogout}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </Button>
                </motion.div>
              </DialogFooter>
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  )
}
