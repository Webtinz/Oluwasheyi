const multer = require('multer');
// const path = require('path'); 
const multerS3 = require("multer-s3");
const {s3} = require('../../config/AWSConfig')

// Function to set up multer-S3 storage
const s3Storage = (folder) => multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET_NAME, 
  contentType: multerS3.AUTO_CONTENT_TYPE, 
  key: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, `${folder}/${fileName}`); 
  },
});

// Create different storage handlers for different entities
const uploadService = multer({ storage: s3Storage("services") });
const uploadEvent = multer({ storage: s3Storage("events") });
const uploadContent = multer({ storage: s3Storage("content") });
const uploadTemoigne = multer({ storage: s3Storage("temoigne") });
const uploadMedicalProgram = multer({ storage: s3Storage("medical-programs") });
const uploadCertification = multer({ storage: s3Storage("certifications") });
const uploadMember = multer({ storage: s3Storage("members") });
const uploadAdvice = multer({ storage: s3Storage("advices") });

module.exports = {
  uploadService,
  uploadTemoigne,
  uploadMedicalProgram,
  uploadCertification,
  uploadContent,
  uploadEvent,
  uploadMember,
  uploadAdvice
};

// // Dossier pour les services
// const serviceStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../../uploads/services'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Dossier pour les events
// const eventStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../../uploads/events'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Dossier pour les témoignages
// const temoigneStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../../uploads/temoigne'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Dossier pour les members
// const membersStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../../uploads/members'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Dossier pour les contenues
// const contentStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../../uploads/content'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // for medical programs
// const medicalProgramStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../../uploads/MedicalProgram'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // for medical programs
// const certificationStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../../uploads/certifications'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // for medical advices
// const adviceStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../../uploads/advices'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const uploadService = multer({ storage: serviceStorage });
// const uploadEvent = multer({ storage: eventStorage });
// const uploadContent = multer({ storage: contentStorage });
// const uploadTemoigne = multer({ storage: temoigneStorage });
// const uploadMedicalProgram = multer({ storage: medicalProgramStorage });
// const uploadCertification = multer({ storage: certificationStorage });
// const uploadMember = multer({ storage: membersStorage });
// const uploadAdvice = multer({ storage: adviceStorage });



