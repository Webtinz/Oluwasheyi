const express = require('express');
const router = express.Router();

// Route pour afficher la page de connexion
router.get('/login', (req, res) => {
  res.render('authentification/login', {
    title: 'Login Page',
    layout: false // Désactiver le layout pour cette vue
  });
});

// dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard', { title: 'Dashboard Page' });
});
// testimonial
router.get('/listtestimonials', (req, res) => {
  res.render('Testimonials/listtestimonial', { title: 'Listtestimonial Page' });
});
router.get('/addtestimonial', (req, res) => {
  res.render('Testimonials/addtestimonial', { title: 'Addtestimonial Page' });
});

// Services
router.get('/listservices', (req, res) => {
  res.render('services/listservice', { title: 'Listservice Page' });
});
router.get('/addservice', (req, res) => {
  res.render('services/addservice', { title: 'Addservice Page' });
});

// medical program
router.get('/listmedicalprogram', (req, res) => {
  res.render('donations/medicalaidprograms/listmedicalprogram', { title: 'medicalprogram Page' });
});
router.get('/addmedicalprogram', (req, res) => {
  res.render('donations/medicalaidprograms/addmedicalprogram', { title: 'medicalprogram Page' });
});

// certification
router.get('/listcertifications', (req, res) => {
  res.render('certifications/listcertification', { title: 'certifications Page' });
});
router.get('/addcertification', (req, res) => {
  res.render('certifications/addcertification', { title: 'certifications Page' });
});

module.exports = router;
