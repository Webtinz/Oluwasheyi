const { MedicalProgram } = require('../models');
const { generateSignedUrl } = require("../../config/AWSConfig")

exports.addProgram = async (req, res) => {
  try {
    const { nom, name, contact, description, description_en, beneficiaries } = req.body;
    const photo = req.file ? req.file.key : null;

    const signedUrl = await generateSignedUrl(photo);

    const program = await MedicalProgram.create({
      nom,
      name,
      contact,
      description,
      description_en,
      beneficiaries,
      photo,
    });

    res.status(201).json({
      message: 'Programme ajouté avec succès',
      program,
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du programme:', error);
    res.status(500).json({
      message: 'Erreur lors de l\'ajout du programme',
    });
  }
};

exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await MedicalProgram.findAll();
    res.status(200).json(programs);
  } catch (error) {
    console.error('Erreur lors de la récupération des programmes:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération des programmes',
    });
  }
};

exports.getProgram = async (req, res) => {
  try {
    const program = await MedicalProgram.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Programme non trouvé' });
    }
    res.status(200).json(program);
  } catch (error) {
    console.error('Erreur lors de la récupération du programme:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération du programme',
    });
  }
};

exports.updateProgram = async (req, res) => {
  try {
    const { nom, name, contact, description, description_en, beneficiaries } = req.body;
    const photo = req.file ? req.file.key : null;

    const signedUrl = await generateSignedUrl(photo);

    const program = await MedicalProgram.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Programme non trouvé' });
    }

    await program.update({
      nom,
      name,
      contact,
      description,
      description_en,
      beneficiaries,
      photo: signedUrl || program.photo,
    });

    res.status(200).json({
      message: 'Programme mis à jour avec succès',
      program,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du programme:', error);
    res.status(500).json({
      message: 'Erreur lors de la mise à jour du programme',
    });
  }
};

exports.deleteProgram = async (req, res) => {
  try {
    const program = await MedicalProgram.findByPk(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Programme non trouvé' });
    }

    await program.destroy();
    res.status(200).json({ message: 'Programme supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du programme:', error);
    res.status(500).json({
      message: 'Erreur lors de la suppression du programme',
    });
  }
};
