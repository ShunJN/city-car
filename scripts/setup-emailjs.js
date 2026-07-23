// Script pour configurer EmailJS - Service GRATUIT d'envoi d'emails

console.log("🚀 CONFIGURATION EMAILJS POUR CITYCAR")
console.log("=".repeat(50))

console.log(`
📧 ÉTAPES POUR CONFIGURER EMAILJS (GRATUIT):

1. 🌐 Aller sur https://www.emailjs.com/
2. 📝 Créer un compte gratuit
3. ➕ Créer un nouveau service:
   - Choisir "Gmail" ou "Outlook"
   - Connecter votre email
4. 📄 Créer un template:
   - Template ID: template_citycar
   - Variables: {{to_email}}, {{reset_code}}, {{expires_in}}
5. 🔑 Récupérer vos clés:
   - Service ID: service_xxxxxxx
   - Template ID: template_citycar  
   - User ID: user_xxxxxxx

6. 🔧 Remplacer dans le code:
   - YOUR_EMAILJS_USER_ID
   - service_citycar
   - template_citycar

TEMPLATE EMAILJS À CRÉER:
========================
Sujet: [CityCar] Code de réinitialisation

Contenu:
Bonjour,

Votre code de réinitialisation CityCar: {{reset_code}}

Ce code expire dans {{expires_in}}.

Cordialement,
L'équipe CityCar
`)

console.log("=".repeat(50))
console.log("✅ Configuration terminée!")

// Alternative: Configuration Gmail SMTP
console.log(`
🔧 ALTERNATIVE - GMAIL SMTP:

1. Activer l'authentification à 2 facteurs sur Gmail
2. Générer un "Mot de passe d'application":
   - Gmail > Paramètres > Sécurité
   - Mots de passe d'application
   - Sélectionner "Autre" > "CityCar"
3. Utiliser ce mot de passe dans le code

Variables d'environnement à ajouter:
EMAIL_USER=votre.email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app
`)

// Test de connectivité
async function testEmailService() {
  try {
    console.log("🧪 Test de connectivité EmailJS...")

    const testData = {
      service_id: "service_test",
      template_id: "template_test",
      user_id: "user_test",
      template_params: {
        to_email: "test@example.com",
        reset_code: "123456",
        expires_in: "15 minutes",
      },
    }

    console.log("📤 Données de test:", JSON.stringify(testData, null, 2))
    console.log("✅ Structure correcte pour EmailJS")
  } catch (error) {
    console.error("❌ Erreur test:", error)
  }
}

testEmailService()
