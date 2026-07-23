import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const expectedType = formData.get("expectedType") as string

    if (!file) {
      return NextResponse.json({ success: false, message: "Aucun fichier fourni" }, { status: 400 })
    }

    // Validation rapide de la taille
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: `Fichier trop volumineux. Taille maximum: 10MB`,
          fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        },
        { status: 400 },
      )
    }

    // Analyse rapide du nom du fichier
    const fileName = file.name.toLowerCase()
    const fileType = file.type

    // Validation optimisée basée sur le nom du fichier
    const documentValidation = {
      cni: {
        keywords: ["cni", "carte", "identite", "identity", "id"],
        allowedTypes: ["image/jpeg", "image/jpg", "image/png", "application/pdf"],
        description: "Carte Nationale d'Identité",
      },
      passeport: {
        keywords: ["passeport", "passport"],
        allowedTypes: ["image/jpeg", "image/jpg", "image/png", "application/pdf"],
        description: "Passeport",
      },
      permis: {
        keywords: ["permis", "conduire", "driving", "license"],
        allowedTypes: ["image/jpeg", "image/jpg", "image/png", "application/pdf"],
        description: "Permis de conduire",
      },
      rib: {
        keywords: ["rib", "bank", "banque", "compte", "iban"],
        allowedTypes: ["image/jpeg", "image/jpg", "image/png", "application/pdf"],
        description: "RIB (Relevé d'Identité Bancaire)",
      },
      justificatif: {
        keywords: ["justificatif", "domicile", "edf", "gdf", "orange", "free", "sfr", "facture"],
        allowedTypes: ["image/jpeg", "image/jpg", "image/png", "application/pdf"],
        description: "Justificatif de domicile",
      },
      bulletins: {
        keywords: ["bulletin", "salaire", "paie", "salary"],
        allowedTypes: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
        description: "Bulletin de salaire",
      },
      avis: {
        keywords: ["avis", "imposition", "impot", "tax"],
        allowedTypes: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
        description: "Avis d'imposition",
      },
      kbis: {
        keywords: ["kbis", "k-bis", "extrait", "registre"],
        allowedTypes: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
        description: "Extrait K-bis",
      },
      bilan: {
        keywords: ["bilan", "comptable", "liasse"],
        allowedTypes: ["application/pdf"],
        description: "Bilan comptable",
      },
      "carte-vtc": {
        keywords: ["vtc", "carte", "chauffeur"],
        allowedTypes: ["image/jpeg", "image/jpg", "image/png", "application/pdf"],
        description: "Carte VTC",
      },
    }

    const expectedConfig = documentValidation[expectedType as keyof typeof documentValidation]

    // Validation rapide du type de fichier
    if (expectedConfig && !expectedConfig.allowedTypes.includes(fileType)) {
      return NextResponse.json(
        {
          success: false,
          message: `Type de fichier non autorisé`,
          isValid: false,
        },
        { status: 400 },
      )
    }

    // Détection rapide du type de document
    const detectDocumentType = () => {
      for (const [type, config] of Object.entries(documentValidation)) {
        const hasKeyword = config.keywords.some((keyword) => fileName.includes(keyword))
        if (hasKeyword) {
          return { type, config }
        }
      }
      return null
    }

    const detectedDoc = detectDocumentType()
    const isValid = detectedDoc?.type === expectedType || !detectedDoc

    // Conversion rapide pour stockage (seulement si valide)
    let dataUrl = ""
    if (isValid) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = buffer.toString("base64")
      dataUrl = `data:${fileType};base64,${base64}`
    }

    const fileInfo = {
      id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: fileType,
      size: file.size,
      uploadDate: new Date().toISOString(),
      url: dataUrl,
      isValid,
      expectedType: expectedConfig?.description || expectedType,
      detectedType: detectedDoc?.config.description || null,
    }

    // Log simplifié
    console.log(`📄 ${isValid ? "✅ VALIDÉ" : "❌ INVALIDE"} - ${file.name} (${expectedType})`)

    return NextResponse.json({
      success: true,
      file: fileInfo,
      isValid,
    })
  } catch (error) {
    console.error("Erreur validation document:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la validation du document.",
        isValid: false,
      },
      { status: 500 },
    )
  }
}
