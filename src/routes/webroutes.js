const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const TestimonialController = require('../controllers/TestimonialController');
const TeamMemberController = require('../controllers/TeamMemberController');
const FeedbackController = require('../controllers/FeedbackController');
const AdviceController = require('../controllers/AdviceController');
const contentController = require('../controllers/ContentController');
const MedicalProgramController = require('../controllers/MedicalProgramController');
const CertificationController = require('../controllers/CertificationController');
const { uploadService, uploadTemoigne, uploadMedicalProgram, uploadCertification, uploadContent, uploadEvent, uploadMember, uploadAdvice } = require('../middleware/fileupload');
const ServiceController = require('../controllers/ServiceController');
const EventController = require('../controllers/EventController');
const { getDonations, addDonation, getDonation } = require('../controllers/DonationController');


// Authentification
router.post('/login', userController.login);

// Testimonials
router.post('/addtestimonial', uploadTemoigne.single('photo'), TestimonialController.addtestimonial); // Middleware upload utilisé ici
router.put('/updatetestimonial/:id', uploadTemoigne.single('photo'), TestimonialController.updatetestimonials);
router.get('/getalltestimonials', TestimonialController.getalltestimonials);
router.delete('/deletetestimonial/:id', TestimonialController.deletetestimonials);
router.get('/gettestimonial/:id', TestimonialController.gettestimonial);

// Feedback
router.post('/addfeedback',  FeedbackController.createFeedback); // Middleware upload utilisé ici
router.put('/updatefeedback/:id', FeedbackController.updateFeedback);
router.get('/getallfeedbacks', FeedbackController.getAllFeedbacks);
router.delete('/deletefeedback/:id', FeedbackController.deleteFeedback);
router.get('/getfeedback/:id', FeedbackController.getFeedbackById);

// TeamMembers
router.post('/addteamMember', uploadMember.single('photo'), TeamMemberController.addTeamMember); // Middleware upload utilisé ici
router.put('/updateteamMember/:id', uploadMember.single('photo'), TeamMemberController.updateTeamMember);
router.get('/getallteamMembers', TeamMemberController.getAllTeamMembers);
router.delete('/deleteteamMember/:id', TeamMemberController.deleteTeamMember);
router.get('/getteamMember/:id', TeamMemberController.getTeamMember);

// Advices
router.post('/addadvice', uploadAdvice.single('photo'), AdviceController.addAdvice); // Middleware upload utilisé ici
router.put('/updateadvice/:id', uploadAdvice.single('photo'), AdviceController.updateAdvice);
router.get('/getalladvices', AdviceController.getAllAdvices);
router.delete('/deleteadvice/:id', AdviceController.deleteAdvice);
router.get('/getadvice/:id', AdviceController.getAdvice);

// Content
router.post('/addcontent', uploadContent.single('image'), contentController.addcontent); // Middleware upload utilisé ici
router.put('/updatecontent/:id', uploadContent.single('image'), contentController.updatecontent);
router.get('/getallcontents', contentController.getallcontents);
router.delete('/deletecontent/:id', contentController.deletecontents);
router.get('/getcontent/:id', contentController.getcontent);
router.get('/getcontentbytitle', contentController.getcontentbytitle);

// Service
router.post('/addservice', uploadService.single('photo'), ServiceController.addservice); // Middleware upload utilisé ici
router.put('/updateservice/:id', uploadService.single('photo'), ServiceController.updateservice);
router.get('/getallservices', ServiceController.getallservices);
router.delete('/deleteservice/:id', ServiceController.deleteservice);
router.get('/getservice/:id', ServiceController.getservice);

// Event
router.post('/addevent', uploadEvent.single('photo'), EventController.createEvent);
router.put('/updateevent/:id', uploadEvent.single('photo'), EventController.updateEvent);
router.get('/getallevents', EventController.getAllEvents);
router.delete('/deleteevent/:id', EventController.deleteEvent);
router.get('/getevent/:id', EventController.getEventById);

// medical programms
router.post('/addprogram', uploadMedicalProgram.single('photo'), MedicalProgramController.addProgram);
router.get('/getallprograms', MedicalProgramController.getAllPrograms);
router.get('/getalldonations', getDonations);
router.get('/getdonation/:id', getDonation);
router.get('/adddonnation', addDonation);
router.get('/getprogram/:id', MedicalProgramController.getProgram);
router.put('/updateprogram/:id', uploadMedicalProgram.single('photo'), MedicalProgramController.updateProgram);
router.delete('/deleteprogram/:id', MedicalProgramController.deleteProgram);

// certifications
router.post('/addcertification', uploadCertification.single('photo'), CertificationController.addCertification);
router.get('/getallcertifications', CertificationController.getAllCertifications);
router.get('/getcertification/:id', CertificationController.getCertification);
router.put('/updatecertification/:id', uploadCertification.single('photo'), CertificationController.updateCertification);
router.delete('/deletecertification/:id', CertificationController.deleteCertification);

module.exports = router;
