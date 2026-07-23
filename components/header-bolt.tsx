"use client"

import { useState, useEffect } from "react"
import { Menu, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"

export default function HeaderBolt() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getMenuItems = () => {
    // Vérifier si on est dans une page Bolt Car
    const isBoltCarPage = pathname.startsWith("/bolt-car")
    
    const allItems = [
      { href: "/", label: isBoltCarPage ? "City Car" : "Accueil" },
      { href: "/bolt-car/welcome", label: "Bolt Car" },
      { href: "/bolt-car/plan", label: "Plans" },
      { href: "/bolt-car/trajets", label: "Trajets" },
      { href: "/bolt-car/autopartage", label: "Autopartage" },
    ]

    const filteredItems = allItems.filter((item) => item.href !== pathname)

    if (pathname !== "/") {
      // Si on est dans Bolt Car, on met "City Car" en premier, sinon "Accueil"
      const homeItem = { href: "/", label: isBoltCarPage ? "City Car" : "Accueil" }
      const otherItems = filteredItems.filter((item) => item.href !== "/")
      return [homeItem, ...otherItems]
    }

    return filteredItems
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
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

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/bolt-car/welcome" className="text-2xl font-bold">
            <span className="text-white">Bolt</span>
            <span className="text-green-400">Car</span>
          </Link>
        </div>

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
