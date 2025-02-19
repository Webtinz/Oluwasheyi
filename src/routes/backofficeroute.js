const express = require('express');
const router = express.Router();

// Route pour afficher la page de connexion
router.get('/login', (req, res) => {
  res.render('authentification/login', { title: 'Login Page' });
});
// dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard', { title: 'Dashboard Page' });
});
// testimonial
router.get('/listtestimonials', (req, res) => {
  res.render('Testimonials/listtestimonial', { title: 'Listtestimonial Page'});
});
router.get('/addtestimonial', (req, res) => {
  res.render('Testimonials/addtestimonial', { title: 'Addtestimonial Page'});
});

module.exports = router;
