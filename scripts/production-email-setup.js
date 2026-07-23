// Script pour configurer l'envoi d'email en production
// Exécutez ce script pour installer les dépendances nécessaires

console.log("📧 Configuration de l'envoi d'email pour CityCar")
console.log("=".repeat(50))

console.log("\n1. Installation de Nodemailer:")
console.log("npm install nodemailer")
console.log("npm install @types/nodemailer --save-dev")

console.log("\n2. Configuration des variables d'environnement:")
console.log("Créez un fichier .env.local avec:")
console.log("EMAIL_USER=votre-email@gmail.com")
console.log("EMAIL_PASS=votre-mot-de-passe-application")

console.log("\n3. Configuration Gmail:")
console.log("- Activez l'authentification à 2 facteurs")
console.log("- Générez un mot de passe d'application")
console.log("- Utilisez ce mot de passe dans EMAIL_PASS")

console.log("\n4. Code de production pour app/api/send-email/route.ts:")
console.log(`
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data, files } = body

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // ... (reste du code de génération de contenu)

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "shun.mampuya93@gmail.com",
      subject: subject,
      html: htmlContent,
      text: textContent,
    })

    return NextResponse.json({
      success: true,
      message: "Email envoyé avec succès !",
    })
  } catch (error) {
    console.error("Erreur envoi email:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de l'envoi de l'email." },
      { status: 500 }
    )
  }
}
`)

console.log("\n✅ Configuration terminée !")
console.log("Les emails seront maintenant envoyés réellement à shun.mampuya93@gmail.com")
