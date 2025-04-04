const multer = require('multer');
// const path = require('path'); 
const multerS3 = require("multer-s3");
const { s3 } = require('../../config/AWSConfig')

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
const uploadTemoigne = multer({ storage: s3Storage("testimonials") });
const uploadMedicalProgram = multer({ storage: s3Storage("medical-programs") });
const uploadCertification = multer({ storage: s3Storage("certifications") });
const uploadMember = multer({ storage: s3Storage("members") });
const uploadAdvice = multer({ storage: s3Storage("advices") });
const uploadDepartment = multer({ storage: s3Storage("departments") });
const uploadGallery = multer({ storage: s3Storage("galleries") });
const uploadHistory = multer({ storage: s3Storage("histories") });

module.exports = {
  uploadService,
  uploadTemoigne,
  uploadMedicalProgram,
  uploadCertification,
  uploadContent,
  uploadEvent,
  uploadMember,
  uploadAdvice,
  uploadDepartment,
  uploadGallery,
  uploadHistory
};


