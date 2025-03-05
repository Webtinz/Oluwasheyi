const { Certification } = require('../models');
const { generateSignedUrl } = require("../../config/AWSConfig")
const path = require('path');

exports.addCertification = async (req, res) => {
  try {
    const { name, description, date_obtention } = req.body;
    const photo = req.file ? req.file.key : null;

    let signedUrl = null;
    if (photo) {
      signedUrl = await generateSignedUrl(photo);
    }

    const certification = await Certification.create({
      name,
      description,
      date_obtention,
      photo: signedUrl
    });

    res.status(201).json({
      message: 'Certification ajoutée avec succès',
      certification,
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la certification:', error);
    res.status(500).json({
      message: 'Erreur lors de l\'ajout de la certification',
    });
  }
};

exports.getAllCertifications = async (req, res) => {
  try {
    const certifications = await Certification.findAll();
    res.status(200).json(certifications);
  } catch (error) {
    console.error('Erreur lors de la récupération des certifications:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération des certifications',
    });
  }
};

exports.getCertification = async (req, res) => {
  try {
    const certification = await Certification.findByPk(req.params.id);
    if (!certification) {
      return res.status(404).json({ message: 'Certification non trouvée' });
    }
    res.status(200).json(certification);
  } catch (error) {
    console.error('Erreur lors de la récupération de la certification:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération de la certification',
    });
  }
};

exports.updateCertification = async (req, res) => {
  try {
    const { name, description, date_obtention } = req.body;
    const photo = req.file ? req.file.key : null;

    let signedUrl = null;
    if (photo) {
      signedUrl = await generateSignedUrl(photo);
    }

    const certification = await Certification.findByPk(req.params.id);
    if (!certification) {
      return res.status(404).json({ message: 'Certification non trouvée' });
    }

    await certification.update({
      name,
      description,
      date_obtention,
      photo: signedUrl || certification.photo,
    });

    res.status(200).json({
      message: 'Certification mise à jour avec succès',
      certification,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la certification:', error);
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de la certification',
    });
  }
};

exports.deleteCertification = async (req, res) => {
  try {
    const certification = await Certification.findByPk(req.params.id);
    if (!certification) {
      return res.status(404).json({ message: 'Certification non trouvée' });
    }

    await certification.destroy();
    res.status(200).json({ message: 'Certification supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la certification:', error);
    res.status(500).json({
      message: 'Erreur lors de la suppression de la certification',
    });
  }
};
