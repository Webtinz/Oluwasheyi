const {Patientappointment} = require('../models');


// Route pour enregistrer un patient
exports.registerNewpatient = async (req, res) => {
  const { lastName, firstName, birthDate, phoneNumber } = req.body;

  try {
    // Crée un nouvel enregistrement dans la base de données
    const newpatient = await Patientappointment.create({
      lastName,
      firstName,
      birthDate,
      phoneNumber
    });

    // Renvoie une réponse au client
    res.status(201).json({
      message: 'Patient enregistré avec succès',
      newpatient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erreur lors de l\'enregistrement du patient',
      error,
    });
  }
};

exports.getnewAllPatients = async (req, res) => {
    try {
      const patients = await Patientappointment.findAll(); // Récupère tous les enregistrements
      res.status(200).json(patients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération des patients", error });
    }
  };
  