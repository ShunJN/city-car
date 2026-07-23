import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Base de données temporaire pour les codes (en production, utilise une vraie DB)
const resetCodes = new Map<
  string,
  {
    code: string
    email: string
    expiresAt: Date
    attempts: number
  }
>()

// Configuration du transporteur email - CORRIGÉ !
function createEmailTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER || "your-email@gmail.com",
      pass: process.env.GMAIL_PASS || "your-app-password",
    },
  })
}

// Template HTML professionnel pour l'email
function createResetEmailHTML(resetCode: string, email: string) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CityCar - Réinitialisation du mot de passe</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 40px 20px; text-align: center;">
            <div style="background: rgba(255,255,255,0.1); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 36px;">🚗</span>
            </div>
            <h1 style="color: white; font-size: 36px; font-weight: bold; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                City<span style="color: #dcfce7;">Car</span>
            </h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
                Réinitialisation du mot de passe
            </p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 10px 0;">
                    Bonjour !
                </h2>
                <p style="color: #6b7280; font-size: 16px; margin: 0;">
                    Vous avez demandé la réinitialisation de votre mot de passe CityCar
                </p>
            </div>
            
            <!-- Code Box -->
            <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 3px solid #22c55e; border-radius: 16px; padding: 30px; text-align: center; margin: 30px 0;">
                <div style="color: #15803d; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                    Votre code de réinitialisation
                </div>
                <div style="font-size: 48px; font-weight: bold; color: #22c55e; font-family: 'Courier New', monospace; letter-spacing: 8px; margin: 15px 0;">
                    ${resetCode}
                </div>
                <div style="color: #16a34a; font-size: 12px; margin-top: 10px;">
                    Saisissez ce code dans l'application CityCar
                </div>
            </div>
            
            <!-- Instructions -->
            <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #374151; font-size: 16px; margin: 0 0 10px 0;">📋 Comment procéder :</h3>
                <ol style="color: #6b7280; font-size: 14px; margin: 0; padding-left: 20px;">
                    <li style="margin-bottom: 5px;">Retournez sur l'application CityCar</li>
                    <li style="margin-bottom: 5px;">Saisissez le code ci-dessus</li>
                    <li style="margin-bottom: 5px;">Définissez votre nouveau mot de passe</li>
                    <li>Connectez-vous avec vos nouveaux identifiants</li>
                </ol>
            </div>
            
            <!-- Warning -->
            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <div style="display: flex; align-items: flex-start;">
                    <div style="color: #f59e0b; font-size: 20px; margin-right: 12px; line-height: 1;">⚠️</div>
                    <div>
                        <div style="color: #92400e; font-weight: 600; margin-bottom: 5px;">Important</div>
                        <div style="color: #92400e; font-size: 14px; line-height: 1.5;">
                            Ce code expire dans <strong>15 minutes</strong> pour votre sécurité.<br>
                            Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="#" style="display: inline-block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 14px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                    Retourner à CityCar
                </a>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f1f5f9; padding: 30px 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <div style="color: #64748b; font-size: 14px; margin-bottom: 10px;">
                <strong>CityCar</strong> - Votre partenaire mobilité de confiance
            </div>
            <div style="color: #94a3b8; font-size: 12px; line-height: 1.5;">
                Cet email a été envoyé automatiquement le ${new Date().toLocaleDateString("fr-FR")} à ${new Date().toLocaleTimeString("fr-FR")}<br>
                Pour toute question, contactez notre support client.
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <div style="color: #94a3b8; font-size: 11px;">
                    © 2024 CityCar. Tous droits réservés.
                </div>
            </div>
        </div>
    </div>
</body>
</html>
  `
}

// Vérification si l'email existe (simulation - remplace par ta logique)
function emailExists(email: string): boolean {
  // En production, vérifie dans ta base de données
  const validEmails = ["shun.mampuya@gmail.com", "shun.mampuya93@gmail.com", "test@example.com"]
  return validEmails.includes(email.toLowerCase())
}

// Génération d'un code sécurisé
function generateResetCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Email requis" }, { status: 400 })
    }

    console.log(`🔐 DEMANDE DE RÉINITIALISATION pour: ${email}`)

    // 1. Vérifier si l'email existe
    if (!emailExists(email)) {
      // Pour la sécurité, on ne révèle pas si l'email existe ou non
      return NextResponse.json({
        success: true,
        message: "Si cet email existe, vous recevrez un code de réinitialisation",
      })
    }

    // 2. Générer le code de réinitialisation
    const resetCode = generateResetCode()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    // 3. Stocker le code
    resetCodes.set(email.toLowerCase(), {
      code: resetCode,
      email: email.toLowerCase(),
      expiresAt,
      attempts: 0,
    })

    console.log(`📧 Code généré: ${resetCode} (expire à ${expiresAt.toLocaleString("fr-FR")})`)

    // 4. Vérifier la configuration Gmail
    const gmailUser = process.env.GMAIL_USER
    const gmailPass = process.env.GMAIL_PASS

    if (!gmailUser || !gmailPass) {
      console.log("⚠️ Gmail non configuré - Mode DEBUG")
      console.log(`🎯 CODE DE DEBUG: ${resetCode}`)
      console.log(`📧 Destinataire: ${email}`)
      console.log(`⏰ Expire à: ${expiresAt.toLocaleString("fr-FR")}`)

      return NextResponse.json({
        success: true,
        message: `Code de réinitialisation généré pour ${email}`,
        debug: {
          code: resetCode,
          expiresAt: expiresAt.toISOString(),
          note: "Gmail non configuré - Utilisez le code ci-dessus pour tester",
        },
      })
    }

    // 5. Envoyer l'email avec Gmail configuré
    try {
      const transporter = createEmailTransporter()
      const htmlContent = createResetEmailHTML(resetCode, email)

      const mailOptions = {
        from: `"CityCar" <${gmailUser}>`,
        to: email,
        subject: "🚗 CityCar - Code de réinitialisation de mot de passe",
        html: htmlContent,
      }

      const result = await transporter.sendMail(mailOptions)

      console.log("✅ EMAIL ENVOYÉ AVEC SUCCÈS!")
      console.log(`📬 Message ID: ${result.messageId}`)
      console.log(`📧 Destinataire: ${email}`)
      console.log(`🔢 Code: ${resetCode}`)

      return NextResponse.json({
        success: true,
        message: `Code de réinitialisation envoyé à ${email}`,
        debug: {
          messageId: result.messageId,
          code: resetCode, // À retirer en production
          expiresAt: expiresAt.toISOString(),
        },
      })
    } catch (emailError) {
      console.error("❌ ERREUR ENVOI EMAIL:", emailError)

      // En cas d'erreur d'email, on garde le code pour debug
      return NextResponse.json({
        success: true, // On dit que c'est un succès pour ne pas bloquer l'utilisateur
        message: `Code de réinitialisation généré pour ${email}`,
        debug: {
          code: resetCode,
          error: emailError instanceof Error ? emailError.message : "Erreur inconnue",
          suggestion: "Vérifiez la configuration Gmail ou utilisez le code ci-dessus",
        },
      })
    }
  } catch (error) {
    console.error("❌ ERREUR SERVEUR:", error)
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

// Export des fonctions utilitaires pour les autres routes
export { resetCodes, generateResetCode }
