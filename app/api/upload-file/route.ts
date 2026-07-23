import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = formData.get("type") as string

    if (!file) {
      return NextResponse.json({ success: false, message: "Aucun fichier fourni" }, { status: 400 })
    }

    // Validation du type de fichier
    const allowedTypes = {
      profile: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
      document: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
    }

    const currentAllowedTypes = allowedTypes[type as keyof typeof allowedTypes] || allowedTypes.document

    if (!currentAllowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: `Type de fichier non autorisé. Types acceptés: ${currentAllowedTypes.join(", ")}`,
        },
        { status: 400 },
      )
    }

    // Validation de la taille (5MB max pour les images de profil, 10MB pour les documents)
    const maxSize = type === "profile" ? 5 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: `Fichier trop volumineux. Taille maximum: ${maxSize / (1024 * 1024)}MB`,
        },
        { status: 400 },
      )
    }

    // Conversion du fichier en base64 pour simulation
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString("base64")
    const dataUrl = `data:${file.type};base64,${base64}`

    // Simulation de sauvegarde (en production, sauvegarder sur un service de stockage)
    const fileInfo = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date().toISOString(),
      url: dataUrl, // En production, ce serait l'URL du service de stockage
    }

    // Notification par email pour les documents importants
    if (type === "document") {
      await fetch(`${request.nextUrl.origin}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "document-upload",
          data: {
            fileName: file.name,
            fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            uploadDate: new Date().toLocaleString("fr-FR"),
          },
        }),
      })
    }

    console.log("📁 FICHIER UPLOADÉ - CITYCAR")
    console.log("=".repeat(50))
    console.log(`📄 Nom: ${file.name}`)
    console.log(`📊 Taille: ${(file.size / 1024 / 1024).toFixed(2)} MB`)
    console.log(`🏷️ Type: ${file.type}`)
    console.log(`📅 Date: ${new Date().toLocaleString("fr-FR")}`)
    console.log("=".repeat(50))

    return NextResponse.json({
      success: true,
      message: "Fichier uploadé avec succès !",
      file: fileInfo,
    })
  } catch (error) {
    console.error("Erreur upload fichier:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'upload du fichier.",
      },
      { status: 500 },
    )
  }
}
