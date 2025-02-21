const multer = require('multer');
const path = require('path');

// Dossier pour les services
const serviceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/services'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Dossier pour les témoignages
const temoigneStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/temoigne'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


// Dossier pour les contenues
const contentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/content'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// for medical programs
const medicalProgramStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/MedicalProgram'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// for medical programs
const certificationStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/certifications'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadService = multer({ storage: serviceStorage });
const uploadContent = multer({ storage: contentStorage });
const uploadTemoigne = multer({ storage: temoigneStorage });
const uploadMedicalProgram = multer({ storage: medicalProgramStorage });
const uploadCertification = multer({ storage: certificationStorage });



module.exports = { uploadService, uploadTemoigne, uploadMedicalProgram , uploadCertification, uploadContent};
