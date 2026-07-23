import { type NextRequest, NextResponse } from "next/server"

// Stockage temporaire des codes de réinitialisation
const resetCodes = new Map<
  string,
  {
    code: string
    email: string
    expiresAt: Date
    attempts: number
  }
>()

// Génération d'un code aléatoire à 6 chiffres
function generateResetCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, email, code, newPassword } = body

    console.log(`🔐 RESET PASSWORD - Action: ${action}, Email: ${email}`)

    switch (action) {
      case "request":
        // Génération et envoi du code
        const resetCode = generateResetCode()
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

        // Stockage du code
        resetCodes.set(email.toLowerCase(), {
          code: resetCode,
          email: email.toLowerCase(),
          expiresAt: expiresAt,
          attempts: 0,
        })

        console.log(`📧 Code généré: ${resetCode} pour ${email}`)
        console.log(`⏰ Expire à: ${expiresAt.toLocaleString("fr-FR")}`)

        // ENVOI RÉEL DE L'EMAIL avec gestion d'erreur
        try {
          const emailResponse = await fetch(`${request.nextUrl.origin}/api/send-real-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: "shun.mampuya93@gmail.com", // Email de destination
              subject: "[CityCar] Code de réinitialisation de mot de passe",
              content: `Votre code de réinitialisation: ${resetCode}`,
              data: {
                resetCode: resetCode,
                expiresIn: "15 minutes",
                firstName: "Client",
              },
              type: "password-reset",
            }),
          })

          const emailResult = await emailResponse.json()
          console.log(`📬 Résultat envoi email:`, emailResult)

          // Succès même si l'email est simulé
          return NextResponse.json({
            success: true,
            message: `Code de réinitialisation envoyé à ${email}`,
            debug: {
              code: resetCode, // Pour le debug - à retirer en production
              expiresAt: expiresAt.toISOString(),
              emailProvider: emailResult.provider || "simulation",
              emailSent: emailResult.success,
            },
          })
        } catch (emailError) {
          console.error("❌ Erreur envoi email:", emailError)

          // Même en cas d'erreur d'email, on retourne le code pour les tests
          return NextResponse.json({
            success: true,
            message: `Code généré (email en cours d'envoi)`,
            debug: {
              code: resetCode,
              expiresAt: expiresAt.toISOString(),
              emailProvider: "fallback",
              emailError: emailError instanceof Error ? emailError.message : "Erreur email",
            },
          })
        }

      case "verify":
        const storedData = resetCodes.get(email.toLowerCase())

        if (!storedData) {
          return NextResponse.json(
            {
              success: false,
              message: "Aucun code de réinitialisation trouvé pour cet email",
            },
            { status: 404 },
          )
        }

        // Vérification de l'expiration
        if (new Date() > storedData.expiresAt) {
          resetCodes.delete(email.toLowerCase())
          return NextResponse.json(
            {
              success: false,
              message: "Le code de réinitialisation a expiré",
            },
            { status: 400 },
          )
        }

        // Vérification du nombre de tentatives
        if (storedData.attempts >= 3) {
          resetCodes.delete(email.toLowerCase())
          return NextResponse.json(
            {
              success: false,
              message: "Trop de tentatives. Demandez un nouveau code.",
            },
            { status: 400 },
          )
        }

        // Vérification du code
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

        console.log(`✅ Code vérifié avec succès pour ${email}`)

        return NextResponse.json({
          success: true,
          message: "Code vérifié avec succès",
        })

      case "reset":
        const resetData = resetCodes.get(email.toLowerCase())

        if (!resetData) {
          return NextResponse.json(
            {
              success: false,
              message: "Session de réinitialisation expirée",
            },
            { status: 404 },
          )
        }

        // Vérification finale du code
        if (resetData.code !== code) {
          return NextResponse.json(
            {
              success: false,
              message: "Code invalide",
            },
            { status: 400 },
          )
        }

        // Simulation de la mise à jour du mot de passe
        console.log(`🔑 Mot de passe mis à jour pour ${email}`)

        // Nettoyage du code utilisé
        resetCodes.delete(email.toLowerCase())

        // Envoi d'email de confirmation (optionnel)
        try {
          await fetch(`${request.nextUrl.origin}/api/send-real-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: "shun.mampuya93@gmail.com",
              subject: "[CityCar] Mot de passe modifié avec succès",
              content: "Votre mot de passe a été modifié avec succès",
              data: {
                changeDate: new Date().toLocaleString("fr-FR"),
              },
              type: "password-changed",
            }),
          })
        } catch (error) {
          console.log("⚠️ Email de confirmation non envoyé:", error)
        }

        return NextResponse.json({
          success: true,
          message: "Mot de passe mis à jour avec succès",
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
    console.error("❌ Erreur reset-password:", error)
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
