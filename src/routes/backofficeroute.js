const express = require('express');
const router = express.Router();
const { isAuthenticated, redirectToDashboard } = require('../middleware/auth');

// Route pour afficher la page de connexion
router.get('/login', redirectToDashboard, (req, res) => {
  res.render('authentification/login', {
    title: 'Login Page',
    layout: false // Désactiver le layout pour cette vue
  });
});



// dashboard
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { title: 'Dashboard Page' });
});

// testimonial
router.get('/listtestimonials', isAuthenticated, (req, res) => {
  res.render('Testimonials/listtestimonial', { title: 'Listtestimonial Page' });
});
router.get('/addtestimonial', isAuthenticated, (req, res) => {
  res.render('Testimonials/addtestimonial', { title: 'Addtestimonial Page' });
});

// teamMember
router.get('/listteamMembers', isAuthenticated, (req, res) => {
  res.render('teamMembers/listteamMember', { title: 'ListteamMember Page' });
});
router.get('/addteamMember', isAuthenticated, (req, res) => {
  res.render('teamMembers/addteamMember', { title: 'AddteamMember Page' });
});

// Advice
router.get('/listadvices', isAuthenticated, (req, res) => {
  res.render('advices/listadvice', { title: 'Listadvice Page' });
});
router.get('/addadvice', isAuthenticated, (req, res) => {
  res.render('advices/addadvice', { title: 'Addadvice Page' });
});

// Community
router.get('/listcommunities', isAuthenticated, (req, res) => {
  res.render('communities/listcommunity', { title: 'Listcommunity Page' });
});
router.get('/addcommunity', isAuthenticated, (req, res) => {
  res.render('communities/addcommunity', { title: 'Addcommunity Page' });
});

// content
router.get('/listcontents', isAuthenticated, (req, res) => {
  res.render('contents/listcontent', { title: 'Listcontent Page' });
});
router.get('/addcontent', isAuthenticated, (req, res) => {
  res.render('contents/addcontent', { title: 'Addcontent Page' });
});

// Services
router.get('/listservices', isAuthenticated, (req, res) => {
  res.render('services/listservice', { title: 'Listservice Page' });
});
router.get('/addservice', isAuthenticated, (req, res) => {
  res.render('services/addservice', { title: 'Addservice Page' });
});

// Departments
router.get('/listdepartments', isAuthenticated, (req, res) => {
  res.render('departments/listdepartment', { title: 'Listdepartment Page' });
});
router.get('/adddepartment', isAuthenticated, (req, res) => {
  res.render('departments/adddepartment', { title: 'Adddepartment Page' });
});

// Events
router.get('/listevents', isAuthenticated, (req, res) => {
  res.render('events/listevent', { title: 'Listevent Page' });
});
router.get('/addevent', isAuthenticated, (req, res) => {
  res.render('events/addevent', { title: 'Addevent Page' });
});

// medical program
router.get('/listmedicalprogram', isAuthenticated, (req, res) => {
  res.render('donations/medicalaidprograms/listmedicalprogram', { title: 'medicalprogram Page' });
});
router.get('/addmedicalprogram', isAuthenticated, (req, res) => {
  res.render('donations/medicalaidprograms/addmedicalprogram', { title: 'medicalprogram Page' });
});
router.get('/listdonation', isAuthenticated, (req, res) => {
  res.render('donations/donationlist', { title: 'Donations Page' });
});

// Suscriber
router.get('/listsuscribers', isAuthenticated, (req, res) => {
  res.render('suscribers/suscriberlist', { title: 'Suscriber Page' });
});

// certification
router.get('/listcertifications', isAuthenticated, (req, res) => {
  res.render('certifications/listcertification', { title: 'certifications Page' });
});
router.get('/addcertification', isAuthenticated, (req, res) => {
  res.render('certifications/addcertification', { title: 'certifications Page' });
});

// gallery
router.get('/listgalleries', isAuthenticated, (req, res) => {
  res.render('galleries/listgallery', { title: 'galleries Page' });
});
router.get('/addgallery', isAuthenticated, (req, res) => {
  res.render('galleries/addgallery', { title: 'galleries Page' });
});

// history
router.get('/listhistories', isAuthenticated, (req, res) => {
  res.render('histories/listhistory', { title: 'histories Page' });
});
router.get('/addhistory', isAuthenticated, (req, res) => {
  res.render('histories/addhistory', { title: 'histories Page' });
});

// Feedbacks
router.get('/feedbacks', isAuthenticated, (req, res) => {
  res.render('feedback', { title: 'Feedback Page' });
});

// newpatients
router.get('/newaptpatients', isAuthenticated, (req, res) => {
  res.render('Patientbookappointment/newPatientappointment', { title: 'New patient Page' });
});

module.exports = router;
