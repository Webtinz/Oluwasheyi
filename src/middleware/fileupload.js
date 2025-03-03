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

// Dossier pour les events
const eventStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/events'));
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

// Dossier pour les members
const membersStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/members'));
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

// for medical advices
const adviceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/advices'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadService = multer({ storage: serviceStorage });
const uploadEvent = multer({ storage: eventStorage });
const uploadContent = multer({ storage: contentStorage });
const uploadTemoigne = multer({ storage: temoigneStorage });
const uploadMedicalProgram = multer({ storage: medicalProgramStorage });
const uploadCertification = multer({ storage: certificationStorage });
const uploadMember = multer({ storage: membersStorage });
const uploadAdvice = multer({ storage: adviceStorage });



module.exports = { uploadService, uploadTemoigne, uploadMedicalProgram, uploadCertification, uploadContent, uploadEvent, uploadMember, uploadAdvice };
