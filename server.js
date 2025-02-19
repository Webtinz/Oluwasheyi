const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const path = require('path');
require('dotenv').config();
const sequelize = require('./src/config/database');
const errorHandler = require('./src/errors/errorHandler');
// Importer les routes
const backofficeRoutes = require('./src/routes/backofficeroute');
const backofficeapiRoutes = require('./src/routes/webroutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurer le moteur de vue EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir les fichiers statiques pour AdminLTE
app.use(express.static(path.join(__dirname, 'public')));

// Set Templating Engine
app.use(expressLayouts)
app.set('layout', 'layouts/layout');

// Middleware JSON
app.use(express.json());

// Utiliser les routes 
app.use('/backoffice', backofficeRoutes); // Toutes les routes de '/login', '/register' viennent ici
app.use('/api',backofficeapiRoutes);

// Middleware de gestion des erreurs
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

sequelize.sync()  // Retirer 'force: true' pour éviter la suppression des données
  .then(() => {
    console.log('La base de données a été synchronisée');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation:', error);
  });
