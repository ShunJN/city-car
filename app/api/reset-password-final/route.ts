import { type NextRequest, NextResponse } from "next/server"
import { resetCodes } from "../forgot-password/route"

export async function POST(request: NextRequest) {
  try {
    const { email, code, newPassword } = await request.json()

    if (!email || !code || !newPassword) {
      return NextResponse.json({ success: false, message: "Tous les champs sont requis" }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "Le mot de passe doit contenir au moins 6 caractères" },
        { status: 400 },
      )
    }

    console.log(`🔑 RÉINITIALISATION MOT DE PASSE pour: ${email}`)

    const storedData = resetCodes.get(email.toLowerCase())

    if (!storedData || storedData.code !== code) {
      return NextResponse.json({ success: false, message: "Code invalide ou expiré" }, { status: 400 })
    }

    // Supprimer le code utilisé
    resetCodes.delete(email.toLowerCase())

    // En production, mettre à jour le mot de passe dans la base de données
    console.log(`✅ Mot de passe mis à jour pour: ${email}`)
    console.log(`🔐 Nouveau mot de passe: ${newPassword}`)

    return NextResponse.json({
      success: true,
      message: "Mot de passe mis à jour avec succès",
    })
  } catch (error) {
    console.error("❌ Erreur réinitialisation:", error)
    return NextResponse.json({ success: false, message: "Erreur serveur" }, { status: 500 })
  }
}
