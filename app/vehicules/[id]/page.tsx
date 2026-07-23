"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RecaptchaCheckbox } from "@/components/recaptcha-checkbox"
import {
  Car,
  Fuel,
  Calendar,
  Users,
  Gauge,
  Shield,
  Star,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Heart,
  Share2,
  ArrowLeft,
  X,
  Upload,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import HeaderSimple from "@/components/header-simple"

// Mock data for vehicles
const vehiclesData = {
  "mercedes-cla": {
    id: "mercedes-cla",
    name: "Mercedes CLA 200",
    price: "32,900€",
    monthlyPrice: "299€/mois",
    image: "/images/mercedes-cla.jpeg",
    images: [
      "/images/mercedes-cla.jpeg",
      "/images/mercedes-cla-black.png",
      "/placeholder.svg?height=400&width=600&text=Mercedes+CLA+Interior",
      "/placeholder.svg?height=400&width=600&text=Mercedes+CLA+Engine",
    ],
    year: 2023,
    mileage: "15,000 km",
    fuel: "Essence",
    transmission: "Automatique",
    seats: 5,
    power: "163 ch",
    consumption: "6.2L/100km",
    co2: "142 g/km",
    features: [
      "Climatisation automatique",
      "GPS intégré",
      "Bluetooth",
      "Régulateur de vitesse",
      'Jantes alliage 18"',
      "Phares LED",
      "Caméra de recul",
      "Détecteur d'angle mort",
    ],
    description:
      "Berline compacte premium alliant élégance et performance. Parfaite pour un usage urbain et autoroutier.",
    rating: 4.8,
    reviews: 24,
    availability: "Disponible",
    dealer: {
      name: "CityCar Paris 15",
      address: "123 Avenue de Versailles, 75015 Paris",
      phone: "01 23 45 67 89",
    },
  },
  "toyota-chr": {
    id: "toyota-chr",
    name: "Toyota C-HR",
    price: "28,500€",
    monthlyPrice: "259€/mois",
    image: "/images/toyota-chr.jpeg",
    images: [
      "/images/toyota-chr.jpeg",
      "/placeholder.svg?height=400&width=600&text=Toyota+CHR+Side",
      "/placeholder.svg?height=400&width=600&text=Toyota+CHR+Interior",
      "/placeholder.svg?height=400&width=600&text=Toyota+CHR+Engine",
    ],
    year: 2023,
    mileage: "8,500 km",
    fuel: "Hybride",
    transmission: "CVT",
    seats: 5,
    power: "122 ch",
    consumption: "4.5L/100km",
    co2: "102 g/km",
    features: [
      "Système hybride",
      'Écran tactile 8"',
      "Caméra 360°",
      "Sièges chauffants",
      "Détection piétons",
      "Aide au stationnement",
      "Feux LED adaptatifs",
      "Coffre électrique",
    ],
    description: "SUV compact hybride au design audacieux. Économique et respectueux de l'environnement.",
    rating: 4.6,
    reviews: 18,
    availability: "Disponible",
    dealer: {
      name: "CityCar Boulogne",
      address: "45 Route de la Reine, 92100 Boulogne",
      phone: "01 23 45 67 90",
    },
  },
  "smart-fortwo": {
    id: "smart-fortwo",
    name: "Smart ForTwo",
    price: "18,900€",
    monthlyPrice: "179€/mois",
    image: "/images/smart-fortwo.jpeg",
    images: [
      "/images/smart-fortwo.jpeg",
      "/placeholder.svg?height=400&width=600&text=Smart+ForTwo+Side",
      "/placeholder.svg?height=400&width=600&text=Smart+ForTwo+Interior",
      "/placeholder.svg?height=400&width=600&text=Smart+ForTwo+Engine",
    ],
    year: 2022,
    mileage: "12,000 km",
    fuel: "Électrique",
    transmission: "Automatique",
    seats: 2,
    power: "82 ch",
    consumption: "16.5 kWh/100km",
    co2: "0 g/km",
    features: [
      "100% électrique",
      "Autonomie 160 km",
      "Charge rapide",
      "Climatisation",
      'Écran 7"',
      "Bluetooth",
      "Toit panoramique",
      "Aide au stationnement",
    ],
    description: "Citadine électrique parfaite pour la ville. Compacte, agile et zéro émission.",
    rating: 4.4,
    reviews: 12,
    availability: "Disponible",
    dealer: {
      name: "CityCar Neuilly",
      address: "78 Avenue Charles de Gaulle, 92200 Neuilly",
      phone: "01 23 45 67 91",
    },
  },
  "peugeot-208-rent": {
    id: "peugeot-208-rent",
    name: "Peugeot 208",
    price: "15,900€",
    monthlyPrice: "189€/mois",
    image: "https://cdn.media.stellantis.com/peugeot/resize/800x600/media/image/2023/08/16/peugeot-208-hd-2023-1001.jpg",
    images: [
      "https://cdn.media.stellantis.com/peugeot/resize/800x600/media/image/2023/08/16/peugeot-208-hd-2023-1001.jpg",
      "https://cdn.media.stellantis.com/peugeot/resize/800x600/media/image/2023/08/16/peugeot-208-hd-2023-1003.jpg",
      "https://cdn.media.stellantis.com/peugeot/resize/800x600/media/image/2023/08/16/peugeot-208-hd-2023-1005.jpg",
      "https://cdn.media.stellantis.com/peugeot/resize/800x600/media/image/2023/08/16/peugeot-208-hd-2023-1001.jpg",
    ],
    year: 2022,
    mileage: "25,000 km",
    fuel: "Essence",
    transmission: "Manuelle",
    seats: 5,
    power: "100 ch",
    consumption: "5.1L/100km",
    co2: "116 g/km",
    features: [
      "Climatisation",
      "GPS intégré",
      "Bluetooth",
      "Régulateur de vitesse",
      'Jantes alliage 16"',
      "Phares LED",
      "Caméra de recul",
      "Aide au stationnement",
    ],
    description: "Citadine moderne et élégante, parfaite pour la ville. Économique et agréable à conduire.",
    rating: 4.5,
    reviews: 32,
    availability: "Disponible",
    dealer: {
      name: "CityCar Levallois",
      address: "123 Rue de la République, 92300 Levallois-Perret",
      phone: "01 23 45 67 92",
    },
  },
  "renault-clio-rent": {
    id: "renault-clio-rent",
    name: "Renault Clio",
    price: "16,500€",
    monthlyPrice: "199€/mois",
    image: "https://cdn.group.renault.com/ren/master/renault-new/clio/evolution/renault-clio-evolution-001.jpg",
    images: [
      "https://cdn.group.renault.com/ren/master/renault-new/clio/evolution/renault-clio-evolution-001.jpg",
      "https://cdn.group.renault.com/ren/master/renault-new/clio/evolution/renault-clio-evolution-004.jpg",
      "https://cdn.group.renault.com/ren/master/renault-new/clio/evolution/renault-clio-evolution-007.jpg",
      "https://cdn.group.renault.com/ren/master/renault-new/clio/evolution/renault-clio-evolution-001.jpg",
    ],
    year: 2021,
    mileage: "32,000 km",
    fuel: "Essence",
    transmission: "Manuelle",
    seats: 5,
    power: "90 ch",
    consumption: "5.3L/100km",
    co2: "120 g/km",
    features: [
      "Climatisation",
      "Bluetooth",
      "Régulateur de vitesse",
      'Jantes alliage 15"',
      "Phares LED",
      "Caméra de recul",
      "Aide au stationnement",
      "Écran tactile 7 pouces",
    ],
    description: "Citadine polyvalente et confortable. Idéale pour un usage quotidien en ville et sur route.",
    rating: 4.3,
    reviews: 28,
    availability: "Disponible",
    dealer: {
      name: "CityCar Levallois",
      address: "123 Rue de la République, 92300 Levallois-Perret",
      phone: "01 23 45 67 92",
    },
  },
  "volkswagen-polo-rent": {
    id: "volkswagen-polo-rent",
    name: "Volkswagen Polo",
    price: "17,200€",
    monthlyPrice: "209€/mois",
    image: "https://www.volkswagen-newsroom.com/media/vw-media-assets/2021/04/2021-04-21-polo-1-42694253.jpg",
    images: [
      "https://www.volkswagen-newsroom.com/media/vw-media-assets/2021/04/2021-04-21-polo-1-42694253.jpg",
      "https://www.volkswagen-newsroom.com/media/vw-media-assets/2021/04/2021-04-21-polo-2-42694254.jpg",
      "https://www.volkswagen-newsroom.com/media/vw-media-assets/2021/04/2021-04-21-polo-3-42694255.jpg",
      "https://www.volkswagen-newsroom.com/media/vw-media-assets/2021/04/2021-04-21-polo-1-42694253.jpg",
    ],
    year: 2022,
    mileage: "18,000 km",
    fuel: "Essence",
    transmission: "Manuelle",
    seats: 5,
    power: "95 ch",
    consumption: "5.0L/100km",
    co2: "114 g/km",
    features: [
      "Climatisation",
      "Caméra de recul",
      "Jantes alliage",
      "Bluetooth",
      "Régulateur de vitesse",
      "Phares LED",
      "Aide au stationnement",
      "Écran tactile",
    ],
    description: "Citadine allemande réputée pour sa fiabilité et son confort. Parfaite pour tous les trajets.",
    rating: 4.6,
    reviews: 35,
    availability: "Disponible",
    dealer: {
      name: "CityCar Levallois",
      address: "123 Rue de la République, 92300 Levallois-Perret",
      phone: "01 23 45 67 92",
    },
  },
  "mercedes-cla-black": {
    id: "mercedes-cla-black",
    name: "Mercedes-Benz CLA",
    price: "35,900€",
    monthlyPrice: "469€/mois",
    image: "/images/mercedes-cla-black.png",
    images: [
      "/images/mercedes-cla-black.png",
      "/images/mercedes-cla.jpeg",
      "/placeholder.svg?height=400&width=600&text=Mercedes+CLA+Interior",
      "/placeholder.svg?height=400&width=600&text=Mercedes+CLA+Engine",
    ],
    year: 2023,
    mileage: "15,000 km",
    fuel: "Essence",
    transmission: "Automatique",
    seats: 5,
    power: "163 ch",
    consumption: "6.2L/100km",
    co2: "142 g/km",
    features: [
      "Climatisation automatique",
      "GPS intégré",
      "Bluetooth",
      "Régulateur de vitesse",
      'Jantes alliage 18"',
      "Phares LED",
      "Caméra de recul",
      "Détecteur d'angle mort",
    ],
    description: "Berline compacte premium alliant élégance et performance. Parfaite pour un usage urbain et autoroutier.",
    rating: 4.8,
    reviews: 24,
    availability: "Disponible",
    dealer: {
      name: "CityCar Paris 15",
      address: "123 Avenue de Versailles, 75015 Paris",
      phone: "01 23 45 67 89",
    },
  },
  "acura-csx-hybride": {
    id: "acura-csx-hybride",
    name: "Acura CSX Hybride",
    price: "42,000€",
    monthlyPrice: "900€/mois",
    image: "/images/acura-csx-hybride.jpeg",
    images: [
      "/images/acura-csx-hybride.jpeg",
      "/images/acura-csx.png",
      "/placeholder.svg?height=400&width=600&text=Acura+CSX+Interior",
      "/placeholder.svg?height=400&width=600&text=Acura+CSX+Engine",
    ],
    year: 2024,
    mileage: "3,000 km",
    fuel: "Hybride",
    transmission: "Automatique",
    seats: 5,
    power: "215 ch",
    consumption: "5.8L/100km",
    co2: "132 g/km",
    features: [
      "Système hybride",
      "Climatisation automatique",
      "GPS premium",
      "Bluetooth",
      'Jantes alliage 19"',
      "Phares LED adaptatifs",
      "Caméra 360°",
      "Sièges cuir",
    ],
    description: "Berline hybride premium offrant performance et efficacité énergétique. Technologie de pointe.",
    rating: 4.9,
    reviews: 15,
    availability: "Disponible",
    dealer: {
      name: "CityCar Paris 15",
      address: "123 Avenue de Versailles, 75015 Paris",
      phone: "01 23 45 67 89",
    },
  },
  "acura-csx-essence": {
    id: "acura-csx-essence",
    name: "Acura CSX Essence",
    price: "32,000€",
    monthlyPrice: "400€/mois",
    image: "/images/acura-csx.png",
    images: [
      "/images/acura-csx.png",
      "/images/acura-csx-hybride.jpeg",
      "/placeholder.svg?height=400&width=600&text=Acura+CSX+Interior",
      "/placeholder.svg?height=400&width=600&text=Acura+CSX+Engine",
    ],
    year: 2024,
    mileage: "1,000 km",
    fuel: "Essence",
    transmission: "Automatique",
    seats: 5,
    power: "190 ch",
    consumption: "7.2L/100km",
    co2: "164 g/km",
    features: [
      "Climatisation automatique",
      "GPS intégré",
      "Bluetooth",
      "Régulateur de vitesse",
      'Jantes alliage 18"',
      "Phares LED",
      "Caméra de recul",
      "Sièges cuir",
    ],
    description: "Berline sportive essence avec un design moderne et des performances remarquables.",
    rating: 4.7,
    reviews: 18,
    availability: "Disponible",
    dealer: {
      name: "CityCar Paris 15",
      address: "123 Avenue de Versailles, 75015 Paris",
      phone: "01 23 45 67 89",
    },
  },
  "audi-q3-diesel": {
    id: "audi-q3-diesel",
    name: "Audi Q3",
    price: "38,500€",
    monthlyPrice: "494€/mois",
    image: "/images/audi-q3.jpeg",
    images: [
      "/images/audi-q3.jpeg",
      "/placeholder.svg?height=400&width=600&text=Audi+Q3+Side",
      "/placeholder.svg?height=400&width=600&text=Audi+Q3+Interior",
      "/placeholder.svg?height=400&width=600&text=Audi+Q3+Engine",
    ],
    year: 2021,
    mileage: "43,779 km",
    fuel: "Diesel",
    transmission: "Automatique",
    seats: 5,
    power: "150 ch",
    consumption: "5.5L/100km",
    co2: "144 g/km",
    features: [
      "Climatisation automatique",
      "GPS intégré",
      "Bluetooth",
      "Régulateur de vitesse",
      'Jantes alliage 18"',
      "Phares LED",
      "Caméra de recul",
      "Toit ouvrant",
    ],
    description: "SUV compact premium avec un excellent rapport qualité-prix. Confortable et polyvalent.",
    rating: 4.6,
    reviews: 42,
    availability: "Disponible",
    dealer: {
      name: "CityCar Boulogne",
      address: "45 Route de la Reine, 92100 Boulogne",
      phone: "01 23 45 67 90",
    },
  },
  "kia-sportage": {
    id: "kia-sportage",
    name: "Kia Sportage",
    price: "36,000€",
    monthlyPrice: "459€/mois",
    image: "/images/kia-sportage.png",
    images: [
      "/images/kia-sportage.png",
      "/placeholder.svg?height=400&width=600&text=Kia+Sportage+Side",
      "/placeholder.svg?height=400&width=600&text=Kia+Sportage+Interior",
      "/placeholder.svg?height=400&width=600&text=Kia+Sportage+Engine",
    ],
    year: 2023,
    mileage: "67,000 km",
    fuel: "Hybride",
    transmission: "Automatique",
    seats: 5,
    power: "230 ch",
    consumption: "5.9L/100km",
    co2: "135 g/km",
    features: [
      "Système hybride",
      "Climatisation automatique",
      "GPS intégré",
      "Bluetooth",
      'Jantes alliage 19"',
      "Phares LED",
      "Caméra 360°",
      "Toit panoramique",
    ],
    description: "SUV hybride spacieux et moderne. Idéal pour les familles avec une consommation optimisée.",
    rating: 4.5,
    reviews: 38,
    availability: "Disponible",
    dealer: {
      name: "CityCar Boulogne",
      address: "45 Route de la Reine, 92100 Boulogne",
      phone: "01 23 45 67 90",
    },
  },
  "volkswagen-golf": {
    id: "volkswagen-golf",
    name: "Volkswagen Golf",
    price: "28,500€",
    monthlyPrice: "350€/mois",
    image: "/images/volkswagen-white.png",
    images: [
      "/images/volkswagen-white.png",
      "/placeholder.svg?height=400&width=600&text=Volkswagen+Golf+Side",
      "/placeholder.svg?height=400&width=600&text=Volkswagen+Golf+Interior",
      "/placeholder.svg?height=400&width=600&text=Volkswagen+Golf+Engine",
    ],
    year: 2022,
    mileage: "45,000 km",
    fuel: "Essence",
    transmission: "Automatique",
    seats: 5,
    power: "150 ch",
    consumption: "6.1L/100km",
    co2: "139 g/km",
    features: [
      "Climatisation automatique",
      "GPS intégré",
      "Bluetooth",
      "Régulateur de vitesse",
      'Jantes alliage 17"',
      "Phares LED",
      "Caméra de recul",
      "Aide au stationnement",
    ],
    description: "Compacte polyvalente et fiable. Référence dans sa catégorie avec un excellent confort.",
    rating: 4.7,
    reviews: 56,
    availability: "Disponible",
    dealer: {
      name: "CityCar Neuilly",
      address: "78 Avenue Charles de Gaulle, 92200 Neuilly",
      phone: "01 23 45 67 91",
    },
  },
  "bmw-serie3": {
    id: "bmw-serie3",
    name: "BMW Série 3",
    price: "42,500€",
    monthlyPrice: "550€/mois",
    image: "/images/bmw.png",
    images: [
      "/images/bmw.png",
      "https://static.moniteurautomobile.be/imgcontrol/images_tmp/clients/moniteur/c680-d465/content/medias/images/news/29000/500/90/bmw-3-scoop-06.jpg",
      "https://static.moniteurautomobile.be/imgcontrol/images_tmp/clients/moniteur/c680-d465/content/medias/images/news/29000/500/90/bmw-3-scoop-09.jpg",
      "https://static.moniteurautomobile.be/imgcontrol/images_tmp/clients/moniteur/c680-d465/content/medias/images/news/29000/500/90/bmw-3-scoop-04.jpg",
    ],
    year: 2023,
    mileage: "35,000 km",
    fuel: "Diesel",
    transmission: "Automatique",
    seats: 5,
    power: "190 ch",
    consumption: "5.3L/100km",
    co2: "138 g/km",
    features: [
      "Climatisation automatique",
      "GPS intégré",
      "Bluetooth",
      "Régulateur de vitesse",
      'Jantes alliage 18"',
      "Phares LED adaptatifs",
      "Caméra de recul",
      "Sièges cuir",
    ],
    description: "Berline sportive premium offrant plaisir de conduite et confort. Excellence allemande.",
    rating: 4.8,
    reviews: 29,
    availability: "Disponible",
    dealer: {
      name: "CityCar Paris 15",
      address: "123 Avenue de Versailles, 75015 Paris",
      phone: "01 23 45 67 89",
    },
  },
  "toyota-rav4-hybride": {
    id: "toyota-rav4-hybride",
    name: "Toyota RAV4 Hybride",
    price: "32,500€",
    monthlyPrice: "389€/mois",
    image: "/images/toyota-rav4-hybride.jpg",
    images: [
      "/images/toyota-rav4-hybride.jpg",
      "/placeholder.svg?height=400&width=600&text=Toyota+RAV4+Side",
      "/placeholder.svg?height=400&width=600&text=Toyota+RAV4+Interior",
      "/placeholder.svg?height=400&width=600&text=Toyota+RAV4+Engine",
    ],
    year: 2021,
    mileage: "39,800 km",
    fuel: "Hybride",
    transmission: "Automatique",
    seats: 5,
    power: "218 ch",
    consumption: "5.0L/100km",
    co2: "115 g/km",
    features: [
      "Système hybride",
      "Climatisation automatique",
      "GPS intégré",
      "Bluetooth",
      'Jantes alliage 18"',
      "Phares LED",
      "Caméra de recul",
      "Aide au stationnement",
      "Toit panoramique",
    ],
    description: "SUV hybride spacieux et polyvalent. Parfait pour les familles et les longs trajets.",
    rating: 4.7,
    reviews: 42,
    availability: "Disponible",
    dealer: {
      name: "CityCar Boulogne",
      address: "45 Route de la Reine, 92100 Boulogne",
      phone: "01 23 45 67 90",
    },
  },
  "audi-q3-hybride": {
    id: "audi-q3-hybride",
    name: "Audi Q3 Hybride",
    price: "38,900€",
    monthlyPrice: "450€/mois",
    image: "/images/audi-Q3-hybride.webp",
    images: [
      "/images/audi-Q3-hybride.webp",
      "/images/audi-q3.jpeg",
      "/placeholder.svg?height=400&width=600&text=Audi+Q3+Interior",
      "/placeholder.svg?height=400&width=600&text=Audi+Q3+Engine",
    ],
    year: 2020,
    mileage: "122,000 km",
    fuel: "Hybride",
    transmission: "Automatique",
    seats: 5,
    power: "245 ch",
    consumption: "5.5L/100km",
    co2: "125 g/km",
    features: [
      "Système hybride",
      "Climatisation automatique",
      "GPS premium",
      "Bluetooth",
      'Jantes alliage 19"',
      "Phares LED Matrix",
      "Caméra 360°",
      "Sièges cuir",
      "Toit panoramique",
    ],
    description: "SUV compact premium avec technologie hybride. Allie performance et efficacité énergétique.",
    rating: 4.6,
    reviews: 38,
    availability: "Disponible",
    dealer: {
      name: "CityCar Neuilly",
      address: "78 Avenue Charles de Gaulle, 92200 Neuilly",
      phone: "01 23 45 67 91",
    },
  },
  "renault-clio": {
    id: "renault-clio",
    name: "Renault Clio Essence",
    price: "18,500€",
    monthlyPrice: "220€/mois",
    image: "/images/renault-clio-essence.webp",
    images: [
      "/images/renault-clio-essence.webp",
      "https://cdn.group.renault.com/ren/master/renault-new/clio/evolution/renault-clio-evolution-004.jpg",
      "https://cdn.group.renault.com/ren/master/renault-new/clio/evolution/renault-clio-evolution-007.jpg",
      "/images/renault-clio-essence.webp",
    ],
    year: 2024,
    mileage: "5,000 km",
    fuel: "Essence",
    transmission: "Automatique",
    seats: 5,
    power: "100 ch",
    consumption: "5.2L/100km",
    co2: "118 g/km",
    features: [
      "Climatisation automatique",
      "GPS intégré",
      "Bluetooth",
      "Régulateur de vitesse",
      'Jantes alliage 16"',
      "Phares LED",
      "Caméra de recul",
      "Aide au stationnement",
      "Écran tactile 10 pouces",
    ],
    description: "Citadine moderne et élégante, dernière génération. Parfaite pour la ville avec un excellent confort.",
    rating: 4.5,
    reviews: 28,
    availability: "Disponible",
    dealer: {
      name: "CityCar Levallois",
      address: "123 Rue de la République, 92300 Levallois-Perret",
      phone: "01 23 45 67 92",
    },
  },
  "tesla-model-3": {
    id: "tesla-model-3",
    name: "Tesla Model 3",
    price: "42,000€",
    monthlyPrice: "550€/mois",
    image: "/images/tesla-model-3.webp",
    images: [
      "/images/tesla-model-3.webp",
      "/placeholder.svg?height=400&width=600&text=Tesla+Model+3+Side",
      "/placeholder.svg?height=400&width=600&text=Tesla+Model+3+Interior",
      "/placeholder.svg?height=400&width=600&text=Tesla+Model+3+Charging",
    ],
    year: 2023,
    mileage: "25,000 km",
    fuel: "Électrique",
    transmission: "Automatique",
    seats: 5,
    power: "283 ch",
    consumption: "14.5 kWh/100km",
    co2: "0 g/km",
    features: [
      "100% électrique",
      "Autonomie 500 km",
      "Charge rapide",
      "Pilote automatique",
      "Écran tactile 15 pouces",
      "Toit panoramique",
      "Sièges chauffants",
      "Système audio premium",
      "Over-the-air updates",
    ],
    description: "Berline électrique premium offrant performance, technologie de pointe et zéro émission.",
    rating: 4.9,
    reviews: 156,
    availability: "Disponible",
    dealer: {
      name: "CityCar Paris 15",
      address: "123 Avenue de Versailles, 75015 Paris",
      phone: "01 23 45 67 89",
    },
  },
  "mini-cooper": {
    id: "mini-cooper",
    name: "Mini Cooper Essence",
    price: "24,900€",
    monthlyPrice: "320€/mois",
    image: "/images/mini-ccoper-essence.webp",
    images: [
      "/images/mini-ccoper-essence.webp",
      "/placeholder.svg?height=400&width=600&text=Mini+Cooper+Side",
      "/placeholder.svg?height=400&width=600&text=Mini+Cooper+Interior",
      "/placeholder.svg?height=400&width=600&text=Mini+Cooper+Engine",
    ],
    year: 2022,
    mileage: "35,000 km",
    fuel: "Essence",
    transmission: "Automatique",
    seats: 4,
    power: "136 ch",
    consumption: "5.8L/100km",
    co2: "132 g/km",
    features: [
      "Climatisation automatique",
      "GPS intégré",
      "Bluetooth",
      "Régulateur de vitesse",
      'Jantes alliage 17"',
      "Phares LED",
      "Caméra de recul",
      "Toit ouvrant",
      "Sièges sport",
    ],
    description: "Citadine iconique au design unique. Agréable à conduire avec un caractère bien trempé.",
    rating: 4.6,
    reviews: 67,
    availability: "Disponible",
    dealer: {
      name: "CityCar Neuilly",
      address: "78 Avenue Charles de Gaulle, 92200 Neuilly",
      phone: "01 23 45 67 91",
    },
  },
  "volkswagen-polo": {
    id: "volkswagen-polo",
    name: "Volkswagen Polo Essence",
    price: "19,900€",
    monthlyPrice: "240€/mois",
    image: "/images/volkswagen-polo-essence.jpeg",
    images: [
      "/images/volkswagen-polo-essence.jpeg",
      "https://www.volkswagen-newsroom.com/media/vw-media-assets/2021/04/2021-04-21-polo-2-42694254.jpg",
      "https://www.volkswagen-newsroom.com/media/vw-media-assets/2021/04/2021-04-21-polo-3-42694255.jpg",
      "/images/volkswagen-polo-essence.jpeg",
    ],
    year: 2023,
    mileage: "20,000 km",
    fuel: "Essence",
    transmission: "Automatique",
    seats: 5,
    power: "110 ch",
    consumption: "5.1L/100km",
    co2: "116 g/km",
    features: [
      "Climatisation automatique",
      "GPS intégré",
      "Bluetooth",
      "Régulateur de vitesse",
      'Jantes alliage 16"',
      "Phares LED",
      "Caméra de recul",
      "Aide au stationnement",
      "Écran tactile 8 pouces",
    ],
    description: "Citadine allemande réputée pour sa fiabilité et son confort. Parfaite pour tous les trajets quotidiens.",
    rating: 4.6,
    reviews: 45,
    availability: "Disponible",
    dealer: {
      name: "CityCar Levallois",
      address: "123 Rue de la République, 92300 Levallois-Perret",
      phone: "01 23 45 67 92",
    },
  },
  "fiat-500": {
    id: "fiat-500",
    name: "Fiat 500 Essence",
    price: "19,500€",
    monthlyPrice: "250€/mois",
    image: "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ZyL29yaWdpbmFsL0ZJQVQvNTAwLUhZQlJJRC80OTgxMl9IQVRDSEJBQ0stMy1ET09SUy9maWF0LTUwMC1mcm9udC12aWV3LmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAyNCwiaGVpZ2h0IjpudWxsLCJmaXQiOiJjb3ZlciJ9fX0=",
    images: [
      "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ZyL29yaWdpbmFsL0ZJQVQvNTAwLUhZQlJJRC80OTgxMl9IQVRDSEJBQ0stMy1ET09SUy9maWF0LTUwMC1mcm9udC12aWV3LmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAyNCwiaGVpZ2h0IjpudWxsLCJmaXQiOiJjb3ZlciJ9fX0=",
      "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ZyL29yaWdpbmFsL0ZJQVQvNTAwLUhZQlJJRC80OTgxMl9IQVRDSEJBQ0stMy1ET09SUy9maWF0LTUwMC1pbnRlcm4tMS5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEwMjQsImhlaWdodCI6bnVsbCwiZml0IjoiY292ZXIifX19",
      "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ZyL29yaWdpbmFsL0ZJQVQvNTAwLUhZQlJJRC80OTgxMl9IQVRDSEJBQ0stMy1ET09SUy9maWF0LTUwMC1pbnRlcm4tMi5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEwMjQsImhlaWdodCI6bnVsbCwiZml0IjoiY292ZXIifX19",
      "https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ZyL29yaWdpbmFsL0ZJQVQvNTAwLUhZQlJJRC80OTgxMl9IQVRDSEJBQ0stMy1ET09SUy9maWF0LTUwMC1zaWRlLXZpZXcuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMDI0LCJoZWlnaHQiOm51bGwsImZpdCI6ImNvdmVyIn19fQ==",
    ],
    year: 2023,
    mileage: "15,000 km",
    fuel: "Essence",
    transmission: "Automatique",
    seats: 4,
    power: "95 ch",
    consumption: "5.0L/100km",
    co2: "115 g/km",
    features: [
      "Climatisation automatique",
      "GPS intégré",
      "Bluetooth",
      "Régulateur de vitesse",
      'Jantes alliage 15"',
      "Phares LED",
      "Caméra de recul",
      "Aide au stationnement",
      "Écran tactile 7 pouces",
      "Toit ouvrant",
    ],
    description: "Citadine iconique au design rétro moderne. Compacte, agile et parfaite pour la ville avec un style unique.",
    rating: 4.5,
    reviews: 38,
    availability: "Disponible",
    dealer: {
      name: "CityCar Levallois",
      address: "123 Rue de la République, 92300 Levallois-Perret",
      phone: "01 23 45 67 92",
    },
  },
}

export default function VehicleDetailPage() {
  const params = useParams()
  const vehicleId = params.id as string
  const vehicle = vehiclesData[vehicleId as keyof typeof vehiclesData]

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactType, setContactType] = useState<"essai" | "devis" | "info">("info")
  const [contactFormData, setContactFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    message: "",
  })
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)
  const [isContactSuccess, setIsContactSuccess] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false)

  useEffect(() => {
    // Scroll automatique en haut au chargement de la page
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!vehicle) {
      // Redirect to vehicles page if vehicle not found
      window.location.href = "/vehicules"
    }
  }, [vehicle])

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Véhicule non trouvé</h1>
          <Link href="/vehicules">
            <Button>Retour aux véhicules</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleOpenContactModal = (type: "essai" | "devis" | "info") => {
    setContactType(type)
    setShowContactModal(true)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isRecaptchaVerified) {
      alert("Veuillez vérifier que vous n'êtes pas un robot")
      return
    }

    setIsSubmittingContact(true)

    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...contactFormData,
          subject: `${contactType === "essai" ? "Demande d'essai" : contactType === "devis" ? "Demande de devis" : "Demande d'information"} - ${vehicle.name}`,
          type: contactType,
          vehicleId: vehicle.id,
        }),
      })

      if (response.ok) {
        setIsContactSuccess(true)
        setTimeout(() => {
          setShowContactModal(false)
          setIsContactSuccess(false)
          setContactFormData({
            nom: "",
            prenom: "",
            email: "",
            telephone: "",
            message: "",
          })
          setIsRecaptchaVerified(false)
        }, 2000)
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error)
    } finally {
      setIsSubmittingContact(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const getContactModalTitle = () => {
    switch (contactType) {
      case "essai":
        return "Demander un essai"
      case "devis":
        return "Obtenir un devis"
      default:
        return "Demande d'information"
    }
  }

  const getDefaultMessage = () => {
    switch (contactType) {
      case "essai":
        return `Bonjour, je souhaiterais programmer un essai pour le véhicule ${vehicle.name}. Merci de me recontacter pour convenir d'un rendez-vous.`
      case "devis":
        return `Bonjour, je suis intéressé(e) par le véhicule ${vehicle.name} et souhaiterais recevoir un devis détaillé. Merci de me recontacter.`
      default:
        return `Bonjour, je souhaiterais obtenir plus d'informations sur le véhicule ${vehicle.name}. Merci de me recontacter.`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderSimple />

      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/bmw-hero-real.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Notre sélection de véhicules</h1>
          <p className="text-lg">
            <span>Accueil</span> / Véhicules
          </p>
        </div>
      </section>

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/vehicules">
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                <span>Retour aux véhicules</span>
              </Button>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Favoris
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={vehicle.images[selectedImageIndex] || "/placeholder.svg"}
                  alt={vehicle.name}
                  className="w-full h-96 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-green-500">{vehicle.availability}</Badge>
              </div>
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {vehicle.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImageIndex === index ? "border-blue-500" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${vehicle.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Vehicle Details */}
            <Card>
              <CardHeader>
                <CardTitle>Caractéristiques techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Année</p>
                        <p className="text-gray-600">{vehicle.year}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Gauge className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Kilométrage</p>
                        <p className="text-gray-600">{vehicle.mileage}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Fuel className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Carburant</p>
                        <p className="text-gray-600">{vehicle.fuel}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Car className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Transmission</p>
                        <p className="text-gray-600">{vehicle.transmission}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Places</p>
                        <p className="text-gray-600">{vehicle.seats} places</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Puissance</p>
                        <p className="text-gray-600">{vehicle.power}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Fuel className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Consommation</p>
                        <p className="text-gray-600">{vehicle.consumption}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">CO₂</span>
                      </div>
                      <div>
                        <p className="font-medium">Émissions CO₂</p>
                        <p className="text-gray-600">{vehicle.co2}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Equipment */}
            <Card>
              <CardHeader>
                <CardTitle>Équipements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-2">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Price and Actions */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{vehicle.name}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{vehicle.rating}</span>
                    <span className="text-sm text-gray-500">({vehicle.reviews})</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-blue-600">{vehicle.price}</div>
                  <div className="text-lg text-gray-600">ou {vehicle.monthlyPrice}</div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button className="w-full" size="lg" onClick={() => handleOpenContactModal("essai")}>
                    Demander un essai
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="lg"
                    onClick={() => handleOpenContactModal("devis")}
                  >
                    Obtenir un devis
                  </Button>
                </div>

                <Separator />

                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-2">Financement disponible :</p>
                  <ul className="space-y-1">
                    <li>• Crédit auto</li>
                    <li>• Leasing (LOA/LLD)</li>
                    <li>• Rent to Buy</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Dealer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Concessionnaire</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold">{vehicle.dealer.name}</p>
                  <p className="text-gray-600 text-sm">{vehicle.dealer.address}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{vehicle.dealer.phone}</span>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <MapPin className="h-4 w-4 mr-2" />
                  Voir sur la carte
                </Button>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact rapide</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full mb-3 bg-transparent"
                  onClick={() => handleOpenContactModal("info")}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Poser une question
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler maintenant
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Generic Contact Modal */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>{getContactModalTitle()}</span>
            </DialogTitle>
          </DialogHeader>

          {isContactSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Message envoyé !</h3>
              <p className="text-gray-600">Nous vous recontacterons dans les plus brefs délais.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-nom">Nom *</Label>
                  <Input
                    id="contact-nom"
                    value={contactFormData.nom}
                    onChange={(e) => setContactFormData({ ...contactFormData, nom: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contact-prenom">Prénom *</Label>
                  <Input
                    id="contact-prenom"
                    value={contactFormData.prenom}
                    onChange={(e) => setContactFormData({ ...contactFormData, prenom: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contact-email">Email *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={contactFormData.email}
                  onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contact-telephone">Téléphone *</Label>
                <Input
                  id="contact-telephone"
                  type="tel"
                  value={contactFormData.telephone}
                  onChange={(e) => setContactFormData({ ...contactFormData, telephone: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  value={contactFormData.message}
                  onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
                  placeholder={getDefaultMessage()}
                  rows={4}
                />
              </div>

              <div>
                <Label>Documents (optionnel)</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Cliquez pour ajouter des documents</p>
                      <p className="text-xs text-gray-500">PDF, Images, Word</p>
                    </div>
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{file.name}</span>
                        </div>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <RecaptchaCheckbox onVerificationChange={setIsRecaptchaVerified} className="py-4" />

              <div className="flex space-x-3">
                <Button type="button" variant="outline" onClick={() => setShowContactModal(false)} className="flex-1">
                  Annuler
                </Button>
                <Button type="submit" disabled={isSubmittingContact || !isRecaptchaVerified} className="flex-1">
                  {isSubmittingContact ? "Envoi..." : "Envoyer"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
