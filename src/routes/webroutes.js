const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const TestimonialController = require('../controllers/TestimonialController');
const TeamMemberController = require('../controllers/TeamMemberController');
const FeedbackController = require('../controllers/FeedbackController');
const AdviceController = require('../controllers/AdviceController');
const ContentController = require('../Controllers/ContentController');
const MedicalProgramController = require('../controllers/MedicalProgramController');
const CertificationController = require('../controllers/CertificationController');
const GalleryController = require('../controllers/GalleryController');
const HistoryController = require('../controllers/HistoryController');
const { uploadService, uploadCommunity, uploadGallery, uploadHistory, uploadDepartment, uploadTemoigne, uploadMedicalProgram, uploadCertification, uploadContent, uploadEvent, uploadMember, uploadAdvice } = require('../middleware/fileupload');
const ServiceController = require('../controllers/ServiceController');
const DepartmentController = require('../controllers/DepartmentController');
const EventController = require('../controllers/EventController');
const Patientappointment = require('../controllers/PatientappointmentController');
const { addDonation, getAllDonations, getDonationById, initiateMomoPayment, checkMomoStatus, createPaypalOrder, capturePaypalOrder } = require('../controllers/DonationController');
const { getSuscribers, getSuscriber, addSuscriber } = require('../controllers/SuscriberController');
const CommunityController = require('../controllers/CommunityController');


// Authentification
router.post('/login', userController.login);

// Testimonials
router.post('/addtestimonial', uploadTemoigne.single('photo'), TestimonialController.addtestimonial); // Middleware upload utilisé ici
router.put('/updatetestimonial/:id', uploadTemoigne.single('photo'), TestimonialController.updatetestimonials);
router.get('/getalltestimonials', TestimonialController.getalltestimonials);
router.delete('/deletetestimonial/:id', TestimonialController.deletetestimonials);
router.get('/gettestimonial/:id', TestimonialController.gettestimonial);

// Feedback
router.post('/addfeedback', FeedbackController.createFeedback); // Middleware upload utilisé ici
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

// Communities
router.post('/addcommunity', uploadCommunity.single('photo'), CommunityController.addCommunity); // Middleware upload utilisé ici
router.put('/updatecommunity/:id', uploadCommunity.single('photo'), CommunityController.updateCommunity);
router.get('/getallcommunities', CommunityController.getAllCommunities);
router.delete('/deletecommunity/:id', CommunityController.deleteCommunity);
router.get('/getcommunity/:id', CommunityController.getCommunity);

// Content
router.post('/addcontent', uploadContent.single('image'), ContentController.addcontent); // Middleware upload utilisé ici
router.put('/updatecontent/:id', uploadContent.single('image'), ContentController.updatecontent);
router.get('/getallcontents', ContentController.getallcontents);
router.delete('/deletecontent/:id', ContentController.deletecontents);
router.get('/getcontent/:id', ContentController.getcontent);
router.get('/getcontentbytitle', ContentController.getcontentbytitle);

// new patient appointment 
router.post('/registerpatient', Patientappointment.registerNewpatient);
router.get('/getnewpatientsapt', Patientappointment.getnewAllPatients);


// Service
router.post('/addservice', uploadService.fields([
    { name: 'smallPhoto', maxCount: 1 },
    { name: 'bigPhoto', maxCount: 1 }
]), ServiceController.addservice); // Middleware upload utilisé ici
router.put('/updateservice/:id', uploadService.fields([
    { name: 'smallPhoto', maxCount: 1 },
    { name: 'bigPhoto', maxCount: 1 }
]), ServiceController.updateservice);
router.get('/getallservices', ServiceController.getallservices);
router.delete('/deleteservice/:id', ServiceController.deleteservice);
router.get('/getservice/:id', ServiceController.getservice);

// Department
router.post('/adddepartment', uploadDepartment.fields([
    { name: 'smallPhoto', maxCount: 1 },
    { name: 'bigPhoto', maxCount: 1 }
]), DepartmentController.addDepartment);
router.put('/updatedepartment/:id', uploadDepartment.fields([
    { name: 'smallPhoto', maxCount: 1 },
    { name: 'bigPhoto', maxCount: 1 }
]), DepartmentController.updateDepartment);
router.get('/getalldepartments', DepartmentController.getAllDepartments);
router.delete('/deletedepartment/:id', DepartmentController.deleteDepartment);
router.get('/getdepartment/:id', DepartmentController.getDepartment);

// Event
router.post('/addevent', uploadEvent.single('photo'), EventController.createEvent);
router.put('/updateevent/:id', uploadEvent.single('photo'), EventController.updateEvent);
router.get('/getallevents', EventController.getAllEvents);
router.delete('/deleteevent/:id', EventController.deleteEvent);
router.get('/getevent/:id', EventController.getEventById);
router.post('/registerevent', EventController.subscribeToEvent);

// medical programms
router.post('/addprogram', uploadMedicalProgram.single('photo'), MedicalProgramController.addProgram);
router.get('/getallprograms', MedicalProgramController.getAllPrograms);
router.get('/getprogram/:id', MedicalProgramController.getProgram);
router.put('/updateprogram/:id', uploadMedicalProgram.single('photo'), MedicalProgramController.updateProgram);
router.delete('/deleteprogram/:id', MedicalProgramController.deleteProgram);

router.get('/getalldonations', getAllDonations);
router.get('/getdonation/:id', getDonationById);
router.post('/adddonation', addDonation);


//Suscriber
router.get('/getallsuscribers', getSuscribers);
router.get('/getsuscriber/:id', getSuscriber);
router.post('/addsuscriber', addSuscriber);

// certifications
router.post('/addcertification', uploadCertification.single('photo'), CertificationController.addCertification);
router.get('/getallcertifications', CertificationController.getAllCertifications);
router.get('/getcertification/:id', CertificationController.getCertification);
router.put('/updatecertification/:id', uploadCertification.single('photo'), CertificationController.updateCertification);
router.delete('/deletecertification/:id', CertificationController.deleteCertification);

// galleries
router.post('/addgallery', uploadGallery.single('photo'), GalleryController.addGallery);
router.get('/getallgalleries', GalleryController.getAllGalleries);
router.get('/getgallery/:id', GalleryController.getGallery);
router.put('/updategallery/:id', uploadGallery.single('photo'), GalleryController.updateGallery);
router.delete('/deletegallery/:id', GalleryController.deleteGallery);

// histories
router.post('/addhistory', uploadHistory.single('photo'), HistoryController.addHistory);
router.get('/getallhistories', HistoryController.getAllHistories);
router.get('/gethistory/:id', HistoryController.getHistory);
router.put('/updatehistory/:id', uploadHistory.single('photo'), HistoryController.updateHistory);
router.delete('/deletehistory/:id', HistoryController.deleteHistory);

//Paypal
router.post('/paypal/create-order', createPaypalOrder);
router.post('/paypal/capture-order', capturePaypalOrder);

//MTN momom
router.post('/momo/create-payment', initiateMomoPayment);
router.get('/momo/check-status/:referenceId', checkMomoStatus);

module.exports = router;

