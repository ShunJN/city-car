import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subject, name, email, phone, message, files } = body

    // Log for debug
    console.log("=".repeat(50))
    console.log("📧 NOUVEAU CONTACT REÇU")
    console.log("=".repeat(50))
    console.log(`👤 Nom: ${name}`)
    console.log(`📧 Email: ${email}`)
    console.log(`📱 Téléphone: ${phone}`)
    console.log(`📋 Sujet: ${subject}`)
    console.log(`💬 Message: ${message}`)
    console.log(`📎 Fichiers: ${files?.length || 0}`)
    console.log("=".repeat(50))

    // Configure Nodemailer transporter
    // IMPORTANT: Replace with your actual SMTP settings and environment variables
    // For example, if using Gmail, you might need to enable "Less secure app access" or use App Passwords.
    // For production, consider a dedicated email service like SendGrid, Mailgun, Resend, etc.
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // e.g., 'smtp.gmail.com' or 'smtp.resend.com'
      port: Number(process.env.EMAIL_PORT), // e.g., 587 for TLS, 465 for SSL
      secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER, // Sender address
      to: process.env.EMAIL_TO, // Recipient email address (your registered email)
      subject: `Nouveau message de contact: ${subject}`,
      html: `
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        ${files && files.length > 0 ? `<p><strong>Fichiers joints:</strong> ${files.join(", ")}</p>` : ""}
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: "Message de contact reçu et envoyé avec succès !",
    })
  } catch (error) {
    console.error("Erreur API contact:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors du traitement du message",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 },
    )
  }
}
