"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, LogOut, Car, FileText, CreditCard, Phone, Home, Briefcase, Users, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const savedUser = localStorage.getItem("citycar_user")
    if (savedUser) {
      setIsLoggedIn(true)
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("citycar_user")
    setIsLoggedIn(false)
    setUser(null)
    setIsOpen(false)
    router.push("/")
  }

  // Menu items based on current page
  const getMenuItems = () => {
    const baseItems = [{ name: "Accueil", href: "/", icon: Home }]

    // Add specific items based on current page
    if (pathname === "/dossier") {
      return [
        ...baseItems,
        { name: "Véhicules", href: "/vehicules", icon: Car },
        { name: "Offres", href: "/offres", icon: CreditCard },
        { name: "VTC", href: "/vtc", icon: Users },
        { name: "Leasing", href: "/leasing", icon: FileText },
        { name: "Rent to Buy", href: "/rent-to-buy", icon: Briefcase },
        { name: "Contact", href: "/contact", icon: Phone },
      ]
    } else if (pathname === "/rent-to-buy") {
      return [
        ...baseItems,
        { name: "Véhicules", href: "/vehicules", icon: Car },
        { name: "Offres", href: "/offres", icon: CreditCard },
        { name: "Dossier", href: "/dossier", icon: FileText },
        { name: "VTC", href: "/vtc", icon: Users },
        { name: "Leasing", href: "/leasing", icon: FileText },
        { name: "Contact", href: "/contact", icon: Phone },
      ]
    } else if (pathname === "/profile") {
      // Menu for profile page (without FAQ, Contact, À propos)
      return [
        ...baseItems,
        { name: "Véhicules", href: "/vehicules", icon: Car },
        { name: "Leasing", href: "/leasing", icon: FileText },
        { name: "Offres", href: "/offres", icon: CreditCard },
        { name: "VTC", href: "/vtc", icon: Users },
        { name: "Rent to Buy", href: "/rent-to-buy", icon: Briefcase },
        { name: "Dossier", href: "/dossier", icon: FileText },
        { name: "Bolt Car", href: "/bolt-car/welcome", icon: Zap },
      ]
    } else {
      // Default menu for other pages
      return [
        ...baseItems,
        { name: "Véhicules", href: "/vehicules", icon: Car },
        { name: "Leasing", href: "/leasing", icon: FileText },
        { name: "Offres", href: "/offres", icon: CreditCard },
        { name: "VTC", href: "/vtc", icon: Users },
        { name: "Rent to Buy", href: "/rent-to-buy", icon: Briefcase },
        { name: "Dossier", href: "/dossier", icon: FileText },
        { name: "À propos", href: "/about", icon: User },
        { name: "Contact", href: "/contact", icon: Phone },
        { name: "Bolt Car", href: "/bolt-car/welcome", icon: Zap },
      ]
    }
  }

  const menuItems = getMenuItems()

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">CityCar</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/vehicules" className="text-gray-700 hover:text-blue-600 transition-colors">
              Véhicules
            </Link>
            <Link href="/leasing" className="text-gray-700 hover:text-blue-600 transition-colors">
              Leasing
            </Link>
            <Link href="/offres" className="text-gray-700 hover:text-blue-600 transition-colors">
              Offres
            </Link>
            <Link href="/vtc" className="text-gray-700 hover:text-blue-600 transition-colors">
              VTC
            </Link>
            {pathname !== "/profile" && (
              <>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                  À propos
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Bonjour, {user?.prenom}</span>
                <Link href="/profile">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Mon compte
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link href="/profile">
                <Button>
                  <User className="h-4 w-4 mr-2" />
                  Se connecter
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Car className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">CityCar</span>
                  </div>
                </div>

                {/* User info */}
                {isLoggedIn && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {user?.prenom} {user?.nom}
                        </p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <nav className="flex-1">
                  <div className="space-y-2">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Auth buttons */}
                <div className="border-t pt-6 mt-6">
                  {isLoggedIn ? (
                    <div className="space-y-2">
                      <Link href="/profile" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <User className="h-4 w-4 mr-2" />
                          Mon compte
                        </Button>
                      </Link>
                      <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Se déconnecter
                      </Button>
                    </div>
                  ) : (
                    <Link href="/profile" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">
                        <User className="h-4 w-4 mr-2" />
                        Se connecter
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
