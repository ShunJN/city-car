"use client"

import { useState, useEffect } from "react"
import { Menu, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"

export default function HeaderSimple() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fonction pour obtenir les éléments du menu en fonction de la page actuelle
  const getMenuItems = () => {
    const allItems = [
      { href: "/", label: "Accueil" },
      { href: "/offres", label: "Offres" },
      { href: "/dossier", label: "Dossier" },
      { href: "/vehicules", label: "Véhicules" },
      { href: "/vtc", label: "VTC" },
      { href: "/leasing", label: "Leasing" },
      { href: "/rent-to-buy", label: "Rent to Buy" },
    ]

    // Filtrer l'élément actuel et s'assurer qu'Accueil est toujours présent
    const filteredItems = allItems.filter((item) => item.href !== pathname)

    // Si on n'est pas sur la page d'accueil, s'assurer qu'Accueil est en premier
    if (pathname !== "/") {
      const homeItem = { href: "/", label: "Accueil" }
      const otherItems = filteredItems.filter((item) => item.href !== "/")
      return [homeItem, ...otherItems]
    }

    return filteredItems
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-black/40 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Menu Burger - Largeur fixe */}
        <div className="w-16 flex justify-start">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black border-gray-800 text-white">
              <div className="flex flex-col space-y-6 mt-8">
                {getMenuItems().map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium hover:text-green-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo Central - Vraiment centré */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-white">City</span>
            <span className="text-green-400">Car</span>
          </Link>
        </div>

        {/* Icône Profil - Largeur fixe */}
        <div className="w-16 flex justify-end">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <User className="h-5 w-5" />
              <span className="sr-only">Profil</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
