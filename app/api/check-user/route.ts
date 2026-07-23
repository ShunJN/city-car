import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import crypto from "crypto"

// Interface pour les utilisateurs
interface User {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  postalCode: string
  city: string
  password: string // Hash du mot de passe
  createdAt: string
  profileImage?: string
}

// Chemin vers le fichier de base de données
const dbPath = path.join(process.cwd(), "data", "users.json")

// Fonction pour charger les utilisateurs depuis le fichier
async function loadUsers(): Promise<Map<string, User>> {
  try {
    // Créer le dossier data s'il n'existe pas
    const dataDir = path.dirname(dbPath)
    await fs.mkdir(dataDir, { recursive: true })

    // Lire le fichier
    const fileContent = await fs.readFile(dbPath, "utf-8")
    const usersArray = JSON.parse(fileContent)
    
    // Convertir en Map
    const usersMap = new Map<string, User>()
    if (Array.isArray(usersArray)) {
      usersArray.forEach((user: User) => {
        usersMap.set(user.email.toLowerCase(), user)
      })
    }
    
    return usersMap
  } catch (error: any) {
    // Si le fichier n'existe pas, retourner une Map vide
    if (error.code === "ENOENT") {
      return new Map<string, User>()
    }
    console.error("Erreur lors du chargement des utilisateurs:", error)
    return new Map<string, User>()
  }
}

// Fonction pour sauvegarder les utilisateurs dans le fichier
async function saveUsers(users: Map<string, User>): Promise<void> {
  try {
    // Créer le dossier data s'il n'existe pas
    const dataDir = path.dirname(dbPath)
    await fs.mkdir(dataDir, { recursive: true })

    // Convertir la Map en tableau
    const usersArray = Array.from(users.values())
    
    // Écrire dans le fichier
    await fs.writeFile(dbPath, JSON.stringify(usersArray, null, 2), "utf-8")
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des utilisateurs:", error)
    throw error
  }
}

// Fonction pour hasher un mot de passe
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

// Fonction pour vérifier un mot de passe
function verifyPassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, email, userData, password } = body

    // Charger les utilisateurs depuis le fichier
    const users = await loadUsers()

    switch (action) {
      case "check-exists":
        const userExists = users.has(email.toLowerCase())

        console.log(`🔍 Vérification utilisateur: ${email} - ${userExists ? "EXISTE" : "NOUVEAU"}`)

        return NextResponse.json({
          success: true,
          exists: userExists,
          user: userExists ? users.get(email.toLowerCase()) : null,
        })

      case "register":
        const emailLower = email.toLowerCase()

        if (users.has(emailLower)) {
          return NextResponse.json(
            {
              success: false,
              message: "Ce compte existe déjà. Utilisez la connexion ou la récupération de mot de passe.",
              exists: true,
            },
            { status: 400 },
          )
        }

        // Hasher le mot de passe avant de l'enregistrer
        const hashedPassword = hashPassword(userData.password)

        // Enregistrement du nouvel utilisateur
        const newUser: User = {
          ...userData,
          email: emailLower,
          password: hashedPassword,
          createdAt: new Date().toISOString(),
        }

        users.set(emailLower, newUser)
        await saveUsers(users)

        console.log(`✅ Nouvel utilisateur enregistré: ${email}`)

        // Retourner l'utilisateur sans le mot de passe
        const { password: _pwd, ...userWithoutPassword } = newUser

        return NextResponse.json({
          success: true,
          message: "Utilisateur enregistré avec succès",
          user: userWithoutPassword,
        })

      case "login":
        const loginEmail = email.toLowerCase()
        const user = users.get(loginEmail)

        if (!user) {
          return NextResponse.json(
            {
              success: false,
              message: "Aucun compte trouvé avec cet email",
            },
            { status: 404 },
          )
        }

        // Vérifier le mot de passe
        if (!password || !verifyPassword(password, user.password)) {
          return NextResponse.json(
            {
              success: false,
              message: "Mot de passe incorrect",
            },
            { status: 401 },
          )
        }

        console.log(`🔐 Connexion utilisateur: ${email}`)

        // Retourner l'utilisateur sans le mot de passe
        const { password: _pwd2, ...userWithoutPasswordLogin } = user

        return NextResponse.json({
          success: true,
          message: "Connexion réussie",
          user: userWithoutPasswordLogin,
        })

      default:
        return NextResponse.json(
          {
            success: false,
            message: "Action non reconnue",
          },
          { status: 400 },
        )
    }
  } catch (error) {
    console.error("Erreur check-user:", error)
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
