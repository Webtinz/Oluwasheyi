const multer = require('multer');
const path = require('path');

// Définir un stockage pour multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Assure-toi que le dossier 'uploads' existe
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nomme le fichier avec un timestamp
  }
});

// Middleware d'upload
const upload = multer({ storage: storage });

module.exports = upload;
