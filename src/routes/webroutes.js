const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const testimonialController = require('../controllers/testimonialController');
const upload = require('../middleware/fileupload');  // Importation du middleware upload

// Authentification
router.post('/login', userController.login);

// Testimonials
router.post('/addtestimonial', upload.single('photo'), testimonialController.addtestimonial); // Middleware upload utilisé ici
router.put('/updatetestimonial/:id', testimonialController.updatetestimonials);
router.get('/getalltestimonials', testimonialController.getalltestimonials);
router.delete('/deletetestimonial/:id', testimonialController.deletetestimonials);
router.get('/gettestimonial/:id', testimonialController.gettestimonial);

module.exports = router;
