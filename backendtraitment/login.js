import api from '../src/services/caller';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Empêcher le rechargement de la page
  
        const email = document.querySelector('input[type="email"]').value;
        const password = document.querySelector('input[type="password"]').value;
  
        // Envoi des données vers le backend
        try {
            const response = await api.post('/api/login', { email, password }); // Utiliser directement le body comme un objet
            const data = await response.json();
  
            if (response.ok) {
                // Si l'authentification est réussie
                alert('Connexion réussie');
                localStorage.setItem('auth_token', data.token); // Stocker le token JWT
                window.location.href = '/dashboard'; // Rediriger vers le tableau de bord ou une autre page
            } else {
                // Si l'authentification échoue
                alert(data.message || 'Erreur lors de la connexion');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            alert('Erreur réseau, veuillez réessayer plus tard');
        }
    });
});
