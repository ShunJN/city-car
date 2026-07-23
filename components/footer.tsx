import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-white">City</span>
              <span className="text-green-400">Car</span>
            </div>
            <p className="text-gray-400 mb-4">
              Société spécialisée dans la vente de véhicules d'occasion toutes marques à des prix imbattables.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-sm">96 Rue Anatole France, 92300 Levallois-Perret</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-sm">01 41 34 31 45</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-sm">contact@city-car.fr</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Marques</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/marques/smart" className="hover:text-white transition-colors">
                  Smart
                </Link>
              </li>
              <li>
                <Link href="/marques/mini" className="hover:text-white transition-colors">
                  Mini
                </Link>
              </li>
              <li>
                <Link href="/marques/fiat" className="hover:text-white transition-colors">
                  Fiat
                </Link>
              </li>
              <li>
                <Link href="/marques/peugeot" className="hover:text-white transition-colors">
                  Peugeot
                </Link>
              </li>
              <li>
                <Link href="/marques/renault" className="hover:text-white transition-colors">
                  Renault
                </Link>
              </li>
              <li>
                <Link href="/marques/mercedes" className="hover:text-white transition-colors">
                  Mercedes-Benz
                </Link>
              </li>
              <li>
                <Link href="/marques/volkswagen" className="hover:text-white transition-colors">
                  Volkswagen
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/leasing" className="hover:text-white transition-colors">
                  Leasing
                </Link>
              </li>
              <li>
                <Link href="/vtc" className="hover:text-white transition-colors">
                  VTC
                </Link>
              </li>
              <li>
                <Link href="/rent-to-buy" className="hover:text-white transition-colors">
                  Rent to Buy
                </Link>
              </li>
              <li>
                <Link href="/dossier" className="hover:text-white transition-colors">
                  Financement
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Localisation</h3>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.8937232!2d2.2836526!3d48.8937232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f842274539b%3A0xbb4d8faebff38b1c!2sCity%20Car!5e0!3m2!1sfr!2sfr!4v1699999999999!5m2!1sfr!2sfr"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-t-lg"
                ></iframe>
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-400 mb-2">Notre showroom</div>
                <div className="text-green-400 font-semibold mb-3">Levallois-Perret</div>
                <Link
                  href="https://www.google.com/maps/dir//City+Car,+96+Rue+Anatole+France,+92300+Levallois-Perret"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold">
                    Itinéraire
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 CityCar. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
