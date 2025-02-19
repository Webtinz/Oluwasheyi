// src/utils/api.js
import axios from 'axios';

// Crée une instance d'axios avec la baseURL et les en-têtes par défaut
const api = axios.create({
  baseURL: 'http://localhost:8000', // URL de votre backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur pour gérer le token d'authentification
api.interceptors.request.use(
  (config) => {
    // Récupérer le token depuis le localStorage (ou une autre méthode selon votre gestion)
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajouter le token aux headers de la requête
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Rejeter la requête si erreur
  }
);

// Ajouter un intercepteur de réponse pour gérer les erreurs spécifiques
api.interceptors.response.use(
  (response) => response, // Si la réponse est ok, la renvoyer telle quelle
  (error) => {
    if (error.response && error.response.status === 419) {  // Code pour une session expirée
      // Effacer le token expiré ou invalide
      localStorage.removeItem('access_token');

      // Rediriger l'utilisateur vers la page de connexion
      window.location.href = '/login'; // Remplacez '/login' par la route appropriée

      // Afficher un message d'alerte
      alert('Votre session a expiré. Veuillez vous reconnecter.');
    }
    return Promise.reject(error); // Rejeter l'erreur si elle ne correspond pas à l'ID 419
  }
);

export default api;
