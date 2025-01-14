import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // URL de votre backend
  headers: {
    'Content-Type': 'application/json',
  },
});
 
// Ajouter un intercepteur pour gérer le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Ajouter un intercepteur de réponse pour gérer les erreurs 401
api.interceptors.response.use(
  (response) => response, // Renvoie la réponse si tout va bien
  (error) => {
    if (error.response && error.response.status === 401) {
      // Effacer le token expiré ou invalide
      localStorage.removeItem('access_token');

      // Rediriger vers la page de connexion
      window.location.href = '/api/login'; // Assurez-vous que '/login' est la bonne route

      // Optionnel : Afficher un message d'alerte
      alert('Votre session a expiré. Veuillez vous reconnecter.');
    }
    return Promise.reject(error);
  }
);

export default api;
