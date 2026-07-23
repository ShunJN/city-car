"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Mail, User, Building, Car } from "lucide-react"

interface Inscription {
  id: string
  date: string
  candidat: string
  telephone: string
  email: string
  vtc: string
  societe: string
  status: string
}

export default function InscriptionsPage() {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInscriptions()
    // Actualiser toutes les 10 secondes
    const interval = setInterval(fetchInscriptions, 10000)
    return () => clearInterval(interval)
  }, [])

  const fetchInscriptions = async () => {
    try {
      const response = await fetch("/api/send-bolt-car-inscription")
      const data = await response.json()
      if (data.success) {
        setInscriptions(data.inscriptions || [])
      }
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCall = (telephone: string) => {
    window.open(`tel:${telephone}`)
  }

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des inscriptions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                🚗 <span className="ml-2">CityCar - Inscriptions Bolt Car</span>
              </h1>
              <p className="text-gray-600 mt-2">Gestion des inscriptions en temps réel</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{inscriptions.length}</div>
              <div className="text-sm text-gray-500">Inscriptions totales</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <User className="h-8 w-8 text-blue-500" />
                <div className="ml-3">
                  <div className="text-2xl font-bold">{inscriptions.length}</div>
                  <div className="text-sm text-gray-500">Total</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Car className="h-8 w-8 text-green-500" />
                <div className="ml-3">
                  <div className="text-2xl font-bold">{inscriptions.filter((i) => i.vtc === "oui").length}</div>
                  <div className="text-sm text-gray-500">Avec VTC</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-purple-500" />
                <div className="ml-3">
                  <div className="text-2xl font-bold">{inscriptions.filter((i) => i.societe === "oui").length}</div>
                  <div className="text-sm text-gray-500">Sociétés</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Phone className="h-8 w-8 text-red-500" />
                <div className="ml-3">
                  <div className="text-2xl font-bold">{inscriptions.filter((i) => i.status === "NOUVEAU").length}</div>
                  <div className="text-sm text-gray-500">À contacter</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des inscriptions */}
        {inscriptions.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 text-lg">Aucune inscription pour le moment</div>
              <p className="text-gray-500 mt-2">Les nouvelles inscriptions apparaîtront ici automatiquement</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {inscriptions.map((inscription) => (
              <Card key={inscription.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      {inscription.candidat}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{inscription.date}</Badge>
                      <Badge variant="destructive">NOUVEAU</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-green-600" />
                        <span className="font-medium">{inscription.telephone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-blue-600" />
                        <span>{inscription.email}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Car className="h-4 w-4 mr-2 text-purple-600" />
                        <span>VTC: {inscription.vtc === "oui" ? "✅ OUI" : "❌ NON"}</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-orange-600" />
                        <span>Société: {inscription.societe === "oui" ? "✅ OUI" : "❌ NON"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button
                      onClick={() => handleCall(inscription.telephone)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler
                    </Button>
                    <Button variant="outline" onClick={() => handleEmail(inscription.email)}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
