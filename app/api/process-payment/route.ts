import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentId, amount, vehicle, method = "card" } = body

    if (!paymentId || !amount || !vehicle) {
      return NextResponse.json({ success: false, message: "Données de paiement manquantes" }, { status: 400 })
    }

    // Simulation du traitement du paiement
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Génération d'un ID de transaction
    const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Log du paiement
    console.log("💳 PAIEMENT TRAITÉ - CITYCAR")
    console.log("=".repeat(50))
    console.log(`💰 Montant: ${amount}€`)
    console.log(`🚗 Véhicule: ${vehicle}`)
    console.log(`🆔 Transaction: ${transactionId}`)
    console.log(`📅 Date: ${new Date().toLocaleString("fr-FR")}`)
    console.log("=".repeat(50))

    // Notification par email du paiement
    await fetch(`${request.nextUrl.origin}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "payment-processed",
        data: {
          amount: amount,
          vehicle: vehicle,
          transactionId: transactionId,
          paymentDate: new Date().toLocaleString("fr-FR"),
        },
      }),
    })

    return NextResponse.json({
      success: true,
      message: "Paiement traité avec succès !",
      transaction: {
        id: transactionId,
        amount: amount,
        vehicle: vehicle,
        date: new Date().toISOString(),
        status: "completed",
      },
    })
  } catch (error) {
    console.error("Erreur paiement:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors du traitement du paiement.",
      },
      { status: 500 },
    )
  }
}
