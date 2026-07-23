import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fileId = searchParams.get("id")
    const fileName = searchParams.get("name")

    if (!fileId || !fileName) {
      return NextResponse.json({ success: false, message: "Paramètres manquants" }, { status: 400 })
    }

    // Simulation de récupération du fichier (en production, récupérer depuis le service de stockage)
    const mockFileContent = `Contenu simulé du document: ${fileName}
    
=== DOCUMENT CITYCAR ===
ID: ${fileId}
Nom: ${fileName}
Date de génération: ${new Date().toLocaleString("fr-FR")}

Ce document serait normalement récupéré depuis votre système de stockage.
En production, vous pourriez utiliser:
- AWS S3
- Google Cloud Storage  
- Azure Blob Storage
- Ou tout autre service de stockage

=== FIN DU DOCUMENT ===`

    // Log du téléchargement
    console.log("⬇️ TÉLÉCHARGEMENT DOCUMENT - CITYCAR")
    console.log("=".repeat(50))
    console.log(`📄 Document: ${fileName}`)
    console.log(`🆔 ID: ${fileId}`)
    console.log(`📅 Date: ${new Date().toLocaleString("fr-FR")}`)
    console.log("=".repeat(50))

    // Notification par email du téléchargement
    await fetch(`${request.nextUrl.origin}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "document-download",
        data: {
          fileName: fileName,
          downloadDate: new Date().toLocaleString("fr-FR"),
        },
      }),
    })

    // Retourner le fichier
    return new NextResponse(mockFileContent, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    })
  } catch (error) {
    console.error("Erreur téléchargement:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors du téléchargement.",
      },
      { status: 500 },
    )
  }
}
