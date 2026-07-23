console.log("🔧 GUIDE CONFIGURATION GMAIL SMTP")
console.log("=".repeat(50))

console.log("\n📧 ÉTAPES POUR RECEVOIR DE VRAIS EMAILS :")

console.log("\n1️⃣ ACTIVER L'AUTHENTIFICATION 2FA SUR GMAIL :")
console.log("   • Va sur myaccount.google.com")
console.log("   • Sécurité → Validation en 2 étapes")
console.log("   • Active la 2FA")

console.log("\n2️⃣ GÉNÉRER UN MOT DE PASSE D'APPLICATION :")
console.log("   • Toujours dans Sécurité")
console.log("   • Mots de passe des applications")
console.log("   • Sélectionne 'Autre' → Tape 'CityCar'")
console.log("   • COPIE le mot de passe généré (16 caractères)")

console.log("\n3️⃣ CONFIGURER LES VARIABLES D'ENVIRONNEMENT :")
console.log("   GMAIL_USER=ton.email@gmail.com")
console.log("   GMAIL_PASS=le_mot_de_passe_16_caracteres")

console.log("\n4️⃣ REDÉMARRER L'APPLICATION")
console.log("   • Relance le serveur")
console.log("   • Teste 'Mot de passe oublié'")
console.log("   • Tu recevras l'email en 5 secondes ! ✨")

console.log("\n" + "=".repeat(50))
console.log("💡 ALTERNATIVE : EmailJS (plus simple)")
console.log("   • Va sur emailjs.com")
console.log("   • Crée un compte gratuit")
console.log("   • Connecte ton Gmail")
console.log("   • 200 emails/mois gratuits")

console.log("\n🎯 RÉSULTAT ATTENDU :")
console.log("   📧 Email HTML magnifique")
console.log("   🔢 Code en gros dans encadré vert")
console.log("   ⚡ Livraison en 2-5 secondes")
console.log("   🎨 Design professionnel comme McDonald's")

console.log("\n⚡ MODE ACTUEL:")
if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
  console.log("   ✅ Gmail configuré - Emails réels activés!")
} else {
  console.log("   🔧 Mode debug - Code affiché dans l'interface")
  console.log("   📝 Configure Gmail pour recevoir de vrais emails")
}

console.log("\n🎯 AVANTAGES DU MODE DEBUG:")
console.log("   • Fonctionne immédiatement")
console.log("   • Code visible dans l'interface")
console.log("   • Pas de configuration requise")
console.log("   • Parfait pour les tests")

console.log("\n" + "=".repeat(50))
console.log("🚗 CityCar - Système d'email intelligent!")
