import { type NextRequest, NextResponse } from "next/server"
import { resetCodes } from "../forgot-password/route"

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json({ success: false, message: "Email et code requis" }, { status: 400 })
    }

    console.log(`🔍 VÉRIFICATION CODE pour: ${email}`)

    const storedData = resetCodes.get(email.toLowerCase())

    if (!storedData) {
      return NextResponse.json({ success: false, message: "Aucun code de réinitialisation trouvé" }, { status: 404 })
    }

    // Vérifier l'expiration
    if (new Date() > storedData.expiresAt) {
      resetCodes.delete(email.toLowerCase())
      return NextResponse.json({ success: false, message: "Le code a expiré" }, { status: 400 })
    }

    // Vérifier le nombre de tentatives
    if (storedData.attempts >= 3) {
      resetCodes.delete(email.toLowerCase())
      return NextResponse.json(
        { success: false, message: "Trop de tentatives. Demandez un nouveau code." },
        { status: 400 },
      )
    }

    // Vérifier le code
    if (storedData.code !== code) {
      storedData.attempts++
      return NextResponse.json(
        {
          success: false,
          message: `Code incorrect. ${3 - storedData.attempts} tentatives restantes.`,
        },
        { status: 400 },
      )
    }

    console.log("✅ Code vérifié avec succès")

    return NextResponse.json({
      success: true,
      message: "Code vérifié avec succès",
    })
  } catch (error) {
    console.error("❌ Erreur vérification code:", error)
    return NextResponse.json({ success: false, message: "Erreur serveur" }, { status: 500 })
  }
}
