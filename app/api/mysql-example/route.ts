import { NextRequest, NextResponse } from "next/server"
import mysql from "mysql2/promise"

// Configuration de la connexion MySQL

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "city_car_db",
  port: parseInt(process.env.DB_PORT || "3306"),
}

export async function GET() {
  let connection

  try {
    // Créer une connexion à MySQL
    connection = await mysql.createConnection(dbConfig)

    // Exemple de requête : récupérer toutes les inscriptions Bolt Car
    const [rows] = await connection.execute(
      "SELECT id, email, firstName, lastName, created_at FROM bolt_car_registrations ORDER BY created_at DESC"
    )

    // Fermer la connexion
    await connection.end()

    return NextResponse.json({
      success: true,
      data: rows,
      message: "Données récupérées depuis MySQL avec succès",
    })
  } catch (error) {
    console.error("Erreur MySQL:", error)

    // Fermer la connexion en cas d'erreur
    if (connection) {
      await connection.end()
    }

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la connexion à MySQL",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  let connection

  try {
    const body = await request.json()
    const { email, firstName, lastName } = body

    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { success: false, message: "Email, prénom et nom requis" },
        { status: 400 }
      )
    }

    // Créer une connexion
    connection = await mysql.createConnection(dbConfig)

    // Insérer une nouvelle inscription
    const [result] = await connection.execute(
      "INSERT INTO bolt_car_registrations (email, firstName, lastName, created_at) VALUES (?, ?, ?, NOW())",
      [email, firstName, lastName]
    )

    // Fermer la connexion
    await connection.end()

    return NextResponse.json({
      success: true,
      message: "Inscription ajoutée avec succès",
      insertId: (result as any).insertId,
    })
  } catch (error) {
    console.error("Erreur MySQL:", error)

    if (connection) {
      await connection.end()
    }

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'ajout à MySQL",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    )
  }
}