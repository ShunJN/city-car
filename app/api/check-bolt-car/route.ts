import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

// Chemin vers le fichier de base de données
const dbPath = path.join(process.cwd(), "data", "bolt-car-registrations.json")

// Fonction pour charger les inscriptions depuis le fichier
async function loadRegistrations() {
  try {
    const dataDir = path.dirname(dbPath)
    await fs.mkdir(dataDir, { recursive: true })

    const fileContent = await fs.readFile(dbPath, "utf-8")
    const registrations = JSON.parse(fileContent)
    
    return Array.isArray(registrations) ? registrations : []
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return []
    }
    console.error("Erreur lors du chargement des inscriptions Bolt Car:", error)
    return []
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email requis",
        },
        { status: 400 },
      )
    }

    const registrations = await loadRegistrations()
    const emailLower = email.toLowerCase()
    
    // Vérifier si l'email existe dans les inscriptions
    const registration = registrations.find(
      (reg: any) => reg.email?.toLowerCase() === emailLower
    )

    return NextResponse.json({
      success: true,
      isRegistered: !!registration,
      registration: registration || null,
    })
  } catch (error) {
    console.error("Erreur check-bolt-car:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 },
    )
  }
}




