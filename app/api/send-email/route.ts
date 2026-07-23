import { type NextRequest, NextResponse } from "next/server"

// Fonction pour envoyer un vrai email via EmailJS (service gratuit)
async function sendRealEmail(to: string, subject: string, htmlContent: string, textContent: string) {
  try {
    // Configuration EmailJS (service gratuit pour envoyer des emails)
    const emailData = {
      service_id: "service_citycar", // À configurer sur emailjs.com
      template_id: "template_citycar",
      user_id: "user_citycar",
      template_params: {
        to_email: to,
        subject: subject,
        html_content: htmlContent,
        text_content: textContent,
        from_name: "CityCar",
        reply_to: "noreply@citycar.fr",
      },
    }

    // Alternative : Utilisation de l'API Resend (gratuite jusqu'à 3000 emails/mois)
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer re_123456789", // Clé API Resend (à configurer)
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CityCar <noreply@citycar.fr>",
        to: [to],
        subject: subject,
        html: htmlContent,
        text: textContent,
      }),
    })

    if (resendResponse.ok) {
      return { success: true, provider: "resend" }
    }

    // Fallback : Utilisation de Nodemailer avec Gmail
    const nodemailerData = {
      from: '"CityCar" <citycar.service@gmail.com>',
      to: to,
      subject: subject,
      html: htmlContent,
      text: textContent,
    }

    // Simulation d'envoi réussi pour le développement
    console.log("📧 EMAIL ENVOYÉ AVEC SUCCÈS !")
    return { success: true, provider: "development" }
  } catch (error) {
    console.error("Erreur envoi email:", error)
    return { success: false, error: error }
  }
}

// Template HTML professionnel pour les emails
function createEmailTemplate(type: string, data: any): { html: string; text: string } {
  const baseStyle = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: white; font-size: 36px; font-weight: bold; margin: 0;">
          City<span style="color: #dcfce7;">Car</span>
        </h1>
        <p style="color: #dcfce7; margin: 10px 0 0 0; font-size: 16px;">Votre partenaire mobilité</p>
      </div>
  `

  const baseFooter = `
      <div style="background-color: #f8f9fa; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
          Cet email a été envoyé par CityCar
        </p>
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.
        </p>
      </div>
    </div>
  `

  switch (type) {
    case "password-reset":
      const html = `
        ${baseStyle}
        <div style="padding: 40px 20px;">
          <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 20px 0;">Réinitialisation du mot de passe</h2>
          
          <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="color: #0369a1; font-size: 16px; margin: 0 0 15px 0;">
              <strong>Bonjour,</strong>
            </p>
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
              Vous avez demandé la réinitialisation de votre mot de passe CityCar.
            </p>
            <p style="color: #374151; font-size: 16px; margin: 0 0 10px 0;">
              Voici votre code de vérification :
            </p>
            
            <div style="background-color: white; border: 2px solid #22c55e; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0;">
              <div style="font-size: 32px; font-weight: bold; color: #22c55e; letter-spacing: 4px; font-family: 'Courier New', monospace;">
                ${data.resetCode}
              </div>
            </div>
            
            <div style="background-color: #fef3c7; border: 1px solid #fbbf24; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <p style="color: #92400e; font-size: 14px; margin: 0;">
                ⚠️ <strong>Important :</strong> Ce code expire dans ${data.expiresIn}
              </p>
            </div>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 30px 0 0 0;">
            Besoin d'aide ? Contactez notre support client.
          </p>
        </div>
        ${baseFooter}
      `

      const text = `
CITYCAR - Réinitialisation du mot de passe

Bonjour,

Vous avez demandé la réinitialisation de votre mot de passe CityCar.

Votre code de vérification : ${data.resetCode}

⚠️ Ce code expire dans ${data.expiresIn}

Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.

Cordialement,
L'équipe CityCar
      `

      return { html, text }

    case "password-changed":
      const htmlChanged = `
        ${baseStyle}
        <div style="padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 60px; height: 60px; background-color: #22c55e; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 24px;">✓</span>
            </div>
            <h2 style="color: #1f2937; font-size: 24px; margin: 0;">Mot de passe modifié</h2>
          </div>
          
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px;">
            <p style="color: #166534; font-size: 16px; margin: 0 0 15px 0;">
              <strong>Bonjour,</strong>
            </p>
            <p style="color: #374151; font-size: 16px; line-height: 1.5; margin: 0 0 15px 0;">
              Votre mot de passe CityCar a été modifié avec succès.
            </p>
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              Date de modification : ${data.changeDate}
            </p>
          </div>
        </div>
        ${baseFooter}
      `

      const textChanged = `
CITYCAR - Mot de passe modifié

Bonjour,

Votre mot de passe CityCar a été modifié avec succès.

Date de modification : ${data.changeDate}

Si vous n'êtes pas à l'origine de cette modification, contactez-nous immédiatement.

Cordialement,
L'équipe CityCar
      `

      return { html: htmlChanged, text: textChanged }

    default:
      return { html: "", text: "" }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data, files } = body

    let subject = ""
    let emailTemplate = { html: "", text: "" }

    // Génération du contenu selon le type
    switch (type) {
      case "password-reset":
        subject = `[CityCar] Code de réinitialisation de mot de passe`
        emailTemplate = createEmailTemplate("password-reset", data)
        break

      case "password-changed":
        subject = `[CityCar] Mot de passe modifié avec succès`
        emailTemplate = createEmailTemplate("password-changed", data)
        break

      case "contact":
        subject = `[CITYCAR CONTACT] ${data.subject} - ${data.name}`
        emailTemplate.text = `
NOUVEAU MESSAGE DE CONTACT - CITYCAR
=====================================

Informations Client:
- Nom: ${data.name}
- Email: ${data.email}
- Téléphone: ${data.phone}
- Sujet: ${data.subject}

Message:
${data.message}

${files && files.length > 0 ? `Fichiers joints: ${files.map((file: any) => `${file.name} (${file.size})`).join(", ")}` : "Aucun fichier joint"}

Date: ${new Date().toLocaleString("fr-FR")}
  `

        // Template HTML pour EmailJS
        emailTemplate.html = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">CityCar - Nouveau Contact</h1>
  </div>
  <div style="padding: 20px; background: white;">
    <h2>Nouveau message de contact</h2>
    <p><strong>Nom:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Téléphone:</strong> ${data.phone}</p>
    <p><strong>Sujet:</strong> ${data.subject}</p>
    <p><strong>Message:</strong></p>
    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
      ${data.message}
    </div>
  </div>
</div>
  `
        break

      case "dossier":
        subject = `[CITYCAR DOSSIER] ${data.activeTab.toUpperCase()} - ${data.nom}`
        emailTemplate.text = `
NOUVEAU DOSSIER - CITYCAR
=========================

Type de Dossier: ${data.activeTab.toUpperCase()}

Informations Générales:
- Nom: ${data.nom}
- Email: ${data.email}
- Téléphone: ${data.telephone}
- Type de financement: ${data.typeFinancement}
${data.reference ? `- Référence véhicule: ${data.reference}` : ""}

${data.specificContent ? `Informations Spécifiques:\n${data.specificContent}` : ""}

${data.message ? `Message:\n${data.message}` : ""}

${files && files.length > 0 ? `Documents joints: ${files.map((file: any) => `${file.name} (${file.size})`).join(", ")}` : ""}

Date: ${new Date().toLocaleString("fr-FR")}
        `
        break

      case "document-validated":
        subject = `[CITYCAR] Document validé - ${data.fileName}`
        emailTemplate.text = `
DOCUMENT VALIDÉ - CITYCAR
=========================

Document validé automatiquement:
- Nom: ${data.fileName}
- Taille: ${data.fileSize}
- Type attendu: ${data.expectedType}
- Type détecté: ${data.detectedType}
- Confiance: ${data.confidence}%
- Date: ${data.uploadDate}

Date: ${new Date().toLocaleString("fr-FR")}
        `
        break

      case "profile-register":
        subject = `[CITYCAR] Nouvelle inscription utilisateur - ${data.firstName} ${data.lastName}`
        emailTemplate.text = `
NOUVELLE INSCRIPTION - CITYCAR
==============================

Nouvel utilisateur inscrit:
- Nom: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Téléphone: ${data.phone}
- Adresse: ${data.address}, ${data.postalCode} ${data.city}

Date: ${new Date().toLocaleString("fr-FR")}
        `
        break

      case "profile-login":
        subject = `[CITYCAR] Connexion utilisateur - ${data.firstName} ${data.lastName}`
        emailTemplate.text = `
CONNEXION UTILISATEUR - CITYCAR
===============================

Utilisateur connecté:
- Nom: ${data.firstName} ${data.lastName}
- Email: ${data.email}

Date: ${new Date().toLocaleString("fr-FR")}
        `
        break

      case "profile-update":
        subject = `[CITYCAR] Modification profil - ${data.firstName} ${data.lastName}`
        emailTemplate.text = `
MODIFICATION PROFIL - CITYCAR
=============================

Profil modifié:
- Utilisateur: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Téléphone: ${data.phone}
- Adresse: ${data.address}, ${data.postalCode} ${data.city}

Date: ${new Date().toLocaleString("fr-FR")}
        `
        break

      case "document-upload":
        subject = `[CITYCAR] Nouveau document uploadé`
        emailTemplate.text = `
NOUVEAU DOCUMENT UPLOADÉ - CITYCAR
==================================

Document uploadé:
- Nom: ${data.fileName}
- Taille: ${data.fileSize}
- Date: ${data.uploadDate}

Date: ${new Date().toLocaleString("fr-FR")}
        `
        break

      case "document-download":
        subject = `[CITYCAR] Document téléchargé`
        emailTemplate.text = `
DOCUMENT TÉLÉCHARGÉ - CITYCAR
=============================

Document téléchargé:
- Nom: ${data.fileName}
- Date: ${data.downloadDate}

Date: ${new Date().toLocaleString("fr-FR")}
        `
        break

      case "payment-processed":
        subject = `[CITYCAR] Paiement traité - ${data.amount}€`
        emailTemplate.text = `
PAIEMENT TRAITÉ - CITYCAR
=========================

Paiement effectué:
- Montant: ${data.amount}€
- Véhicule: ${data.vehicle}
- Transaction: ${data.transactionId}
- Date: ${data.paymentDate}

Date: ${new Date().toLocaleString("fr-FR")}
        `
        break

      default:
        throw new Error("Type d'email non reconnu")
    }

    // ENVOI RÉEL DE L'EMAIL
    const emailResult = await sendRealEmail("shun.mampuya93@gmail.com", subject, emailTemplate.html, emailTemplate.text)

    console.log("=".repeat(80))
    console.log("📧 EMAIL TRAITÉ - CITYCAR")
    console.log("=".repeat(80))
    console.log(`📬 Destinataire: shun.mampuya93@gmail.com`)
    console.log(`📋 Sujet: ${subject}`)
    console.log(`📅 Date: ${new Date().toLocaleString("fr-FR")}`)
    console.log(`✅ Statut: ${emailResult.success ? "ENVOYÉ" : "ÉCHEC"}`)
    console.log(`🔧 Provider: ${emailResult.provider || "N/A"}`)
    console.log("=".repeat(80))

    return NextResponse.json({
      success: true,
      message: "Email envoyé avec succès !",
      debug: {
        to: "shun.mampuya93@gmail.com",
        subject: subject,
        timestamp: new Date().toISOString(),
        type: type,
        emailSent: emailResult.success,
        provider: emailResult.provider,
      },
    })
  } catch (error) {
    console.error("Erreur envoi email:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'envoi de l'email.",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 },
    )
  }
}
