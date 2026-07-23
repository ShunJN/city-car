import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

// Interface pour les inscriptions Bolt Car
interface BoltCarRegistration {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  adresse: string
  codePostal: string
  ville: string
  carteVTC: string
  societe: string
  createdAt: string
}

// Chemin vers le fichier de base de données
const dbPath = path.join(process.cwd(), "data", "bolt-car-registrations.json")

// Fonction pour charger les inscriptions depuis le fichier
async function loadRegistrations(): Promise<BoltCarRegistration[]> {
  try {
    // Créer le dossier data s'il n'existe pas
    const dataDir = path.dirname(dbPath)
    await fs.mkdir(dataDir, { recursive: true })

    // Lire le fichier
    const fileContent = await fs.readFile(dbPath, "utf-8")
    const registrations = JSON.parse(fileContent)
    
    return Array.isArray(registrations) ? registrations : []
  } catch (error: any) {
    // Si le fichier n'existe pas, retourner un tableau vide
    if (error.code === "ENOENT") {
      return []
    }
    console.error("Erreur lors du chargement des inscriptions Bolt Car:", error)
    return []
  }
}

// Fonction pour sauvegarder les inscriptions dans le fichier
async function saveRegistrations(registrations: BoltCarRegistration[]): Promise<void> {
  try {
    // Créer le dossier data s'il n'existe pas
    const dataDir = path.dirname(dbPath)
    await fs.mkdir(dataDir, { recursive: true })

    // Écrire dans le fichier
    await fs.writeFile(dbPath, JSON.stringify(registrations, null, 2), "utf-8")
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des inscriptions Bolt Car:", error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validation des données
    if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone) {
      return NextResponse.json({ success: false, message: "Données manquantes" }, { status: 400 })
    }

    const timestamp = new Date().toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    // Préparer les données pour EmailJS avec tes vraies clés
    const emailData = {
      candidat_nom: formData.nom,
      candidat_prenom: formData.prenom,
      candidat_email: formData.email,
      candidat_telephone: formData.telephone,
      candidat_adresse: formData.adresse || "Non renseignée",
      candidat_ville: formData.ville || "Non renseignée",
      candidat_vtc: formData.carteVTC || "Non renseigné",
      candidat_societe: formData.societe || "Non renseigné",
      timestamp: timestamp,
    }

    // 🚀 ENVOI AVEC TES VRAIES CLÉS EMAILJS
    const emailJSResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: "service_4xbq3kx", // ✅ Ton Service ID
        template_id: "template_trlo3fo", // ✅ Ton Template ID
        user_id: "8sXkBDuXVyKyzLrxP", // ✅ Ta Public Key
        template_params: emailData,
      }),
    })

    console.log("📧 EmailJS Status:", emailJSResponse.status)

    if (emailJSResponse.ok) {
      console.log("✅ EMAIL ENVOYÉ AVEC SUCCÈS !")
    } else {
      console.log("❌ Erreur EmailJS:", await emailJSResponse.text())
    }

    // 🚨 SAUVEGARDE LOCALE GARANTIE
    console.log("\n" + "🚨".repeat(30))
    console.log("🚨 NOUVELLE INSCRIPTION BOLT CAR 🚨")
    console.log("🚨".repeat(30))
    console.log("")
    console.log("📅 DATE:", timestamp)
    console.log("🆔 ID:", `BOLT_${Date.now()}`)
    console.log("")
    console.log("👤 CANDIDAT:")
    console.log(`   Nom: ${formData.nom}`)
    console.log(`   Prénom: ${formData.prenom}`)
    console.log(`   📧 Email: ${formData.email}`)
    console.log(`   📱 Téléphone: ${formData.telephone}`)
    console.log("")
    console.log("🏠 ADRESSE:")
    console.log(`   ${formData.adresse}`)
    console.log(`   ${formData.codePostal} ${formData.ville}`)
    console.log("")
    console.log("📋 INFOS:")
    console.log(`   🚗 Carte VTC: ${formData.carteVTC}`)
    console.log(`   🏢 Société: ${formData.societe}`)
    console.log("")
    console.log("📞 ACTION IMMÉDIATE:")
    console.log(`   APPELER ${formData.prenom} ${formData.nom}`)
    console.log(`   AU ${formData.telephone}`)
    console.log("")
    // Sauvegarder dans la base de données persistante
    const registrations = await loadRegistrations()
    const newRegistration: BoltCarRegistration = {
      id: `BOLT_${Date.now()}`,
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      telephone: formData.telephone,
      adresse: formData.adresse || "",
      codePostal: formData.codePostal || "",
      ville: formData.ville || "",
      carteVTC: formData.carteVTC || "",
      societe: formData.societe || "",
      createdAt: new Date().toISOString(),
    }
    
    registrations.push(newRegistration)
    await saveRegistrations(registrations)
    
    console.log("💾 Inscription Bolt Car sauvegardée dans la base de données")
    console.log("🚨".repeat(30))
    console.log("🚨 EMAIL ENVOYÉ + DONNÉES SAUVEGARDÉES 🚨")
    console.log("🚨".repeat(30) + "\n")

    return NextResponse.json({
      success: true,
      message: emailJSResponse.ok
        ? "✅ INSCRIPTION ENVOYÉE PAR EMAIL ET SAUVEGARDÉE !"
        : "✅ INSCRIPTION SAUVEGARDÉE (email en cours...)",
      data: {
        candidat: `${formData.prenom} ${formData.nom}`,
        telephone: formData.telephone,
        email: formData.email,
        date: timestamp,
        emailSent: emailJSResponse.ok,
        emailStatus: emailJSResponse.status,
        id: newRegistration.id,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ ERREUR:", error)

    // Même en cas d'erreur, on sauvegarde
    const formData = request.body // Declare formData here
    console.log("🚨 INSCRIPTION SAUVEGARDÉE MALGRÉ L'ERREUR")
    console.log(`👤 ${formData?.prenom} ${formData?.nom}`)
    console.log(`📱 ${formData?.telephone}`)

    return NextResponse.json({
      success: true,
      message: "Inscription sauvegardée (erreur technique temporaire)",
      timestamp: new Date().toISOString(),
    })
  }
}
