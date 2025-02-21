const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const testimonialController = require('../controllers/testimonialController');
const contentController = require('../controllers/contentController');
const MedicalProgramController = require('../controllers/MedicalProgramController');
const CertificationController = require('../controllers/CertificationController');
const { uploadService, uploadTemoigne, uploadMedicalProgram, uploadCertification, uploadContent } = require('../middleware/fileupload');
const ServiceController = require('../controllers/ServiceController');


// Authentification
router.post('/login', userController.login);

// Testimonials
router.post('/addtestimonial', uploadTemoigne.single('photo'), testimonialController.addtestimonial); // Middleware upload utilisé ici
router.put('/updatetestimonial/:id', uploadTemoigne.single('photo'), testimonialController.updatetestimonials);
router.get('/getalltestimonials', testimonialController.getalltestimonials);
router.delete('/deletetestimonial/:id', testimonialController.deletetestimonials);
router.get('/gettestimonial/:id', testimonialController.gettestimonial);

// Content
router.post('/addcontent', uploadContent.single('image'), contentController.addcontent); // Middleware upload utilisé ici
router.put('/updatecontent/:id', uploadContent.single('image'), contentController.updatecontent);
router.get('/getallcontents', contentController.getallcontents);
router.delete('/deletecontent/:id', contentController.deletecontents);
router.get('/getcontent/:id', contentController.getcontent);

// Service
router.post('/addservice', uploadService.single('photo'), ServiceController.addservice); // Middleware upload utilisé ici
router.put('/updateservice/:id', uploadService.single('photo'), ServiceController.updateservice);
router.get('/getallservices', ServiceController.getallservices);
router.delete('/deleteservice/:id', ServiceController.deleteservice);
router.get('/getservice/:id', ServiceController.getservice);

// medical programms
router.post('/addprogram', uploadMedicalProgram.single('photo'), MedicalProgramController.addProgram);
router.get('/getallprograms', MedicalProgramController.getAllPrograms);
router.get('/getprogram/:id', MedicalProgramController.getProgram);
router.put('/updateprogram/:id', uploadMedicalProgram.single('photo'), MedicalProgramController.updateProgram);
router.delete('/deleteprogram/:id', MedicalProgramController.deleteProgram);

// certifications
router.post('/addcertification', uploadCertification.single('photo'), CertificationController.addCertification);
router.get('/getallcertifications', CertificationController.getAllCertifications);
router.get('getcertification/:id', CertificationController.getCertification);
router.put('updatecertification/:id', uploadCertification.single('photo'), CertificationController.updateCertification);
router.delete('deletecertification/:id', CertificationController.deleteCertification);

module.exports = router;
