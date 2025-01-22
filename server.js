const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

// Importer la logique pour appeler le moteur IA
const { predictDiseaseAndTreatment } = require("./services/iaEngine");

const app = express();
const server = http.createServer(app);

// Middleware pour gérer CORS
app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["GET", "POST"],
}));

// WebSocket Server
const wss = new WebSocket.Server({ server });

// Gestion des connexions WebSocket
wss.on("connection", (ws) => {
    
  // Réception de messages depuis le client
  ws.on("message", async (message) => {
    console.log("Symptômes reçus :", message);

    try {
      // Appel au service IA pour traiter les symptômes
      const response = await predictDiseaseAndTreatment(message);

      // Envoyer la réponse au client
      ws.send(JSON.stringify(response));
    } catch (error) {
      console.error("Erreur lors du traitement :", error);

      // Envoyer une réponse d'erreur au client
      ws.send(JSON.stringify({
        error: "Erreur lors du traitement des données. Veuillez réessayer.",
      }));
    }
  });

  // Gestion de la déconnexion du client
  ws.on("close", () => {
    console.log("Connexion WebSocket fermée");
  });
});


// Démarrer le serveur
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Serveur backend en écoute sur le port ${PORT}`);
});
