const axios = require("axios");

async function predictDiseaseAndTreatment(symptoms) {
  try {
    // Appel à l'API de prédiction
    const response = await axios.post("https://api.ton-moteur-ia.com/predict", { symptoms });

    // Vérifier la réponse de l'API
    if (response.data && response.data.disease) {
      return {
        disease: response.data.disease,
        treatment: response.data.treatment || "Traitement inconnu",
      };
    }else if (response.data && response.data.disease) {
      return {
        disease: response.data.disease,
        treatment: response.data.treatment || "Traitement inconnu",
      };
    }  else {
      throw new Error("Réponse invalide du moteur IA");
    }
  } catch (error) {
    console.error("Erreur lors de l'appel au moteur IA :", error);
    return {
      disease: "Inconnue",
      treatment: "Consultez un médecin.",
    };
  }
}

module.exports = { predictDiseaseAndTreatment };
