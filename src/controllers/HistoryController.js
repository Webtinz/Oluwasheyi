const { History } = require('../models');
const path = require('path');

exports.addHistory = async (req, res) => {
  try {
    const { name, nom,  year, description_fr, description_en  } = req.body;
    const photo = req.file ? req.file.location : null;

    const history = await History.create({
      name,
      nom,
      year,
      description_fr,
      description_en,
      photo
    });

    res.status(201).json({
      message: 'History ajoutée avec succès',
      history,
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la history:', error);
    res.status(500).json({
      message: 'Erreur lors de l\'ajout de la history',
    });
  }
};

exports.getAllHistories = async (req, res) => {
  try {
    const histories = await History.findAll();
    res.status(200).json(histories);
  } catch (error) {
    console.error('Erreur lors de la récupération des histories:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération des histories',
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await History.findByPk(req.params.id);
    if (!history) {
      return res.status(404).json({ message: 'History non trouvée' });
    }
    res.status(200).json(history);
  } catch (error) {
    console.error('Erreur lors de la récupération de la history:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération de la history',
    });
  }
};

exports.updateHistory = async (req, res) => {
  try {
    const { name, nom,  year, description_fr, description_en  } = req.body;
    const photo = req.file ? req.file.location : null;

    const history = await History.findByPk(req.params.id);
    if (!history) {
      return res.status(404).json({ message: 'History non trouvée' });
    }

    await history.update({
      name: name || history.name,
      nom: nom || history.nom,
      year: year || history.year,
      description_fr: description_fr || history.description_fr,
      description_en: description_en || history.description_en,
      photo: photo || history.photo,
    });

    res.status(200).json({
      message: 'History mise à jour avec succès',
      history,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la history:', error);
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de la history',
    });
  }
};

exports.deleteHistory = async (req, res) => {
  try {
    const history = await History.findByPk(req.params.id);
    if (!history) {
      return res.status(404).json({ message: 'History non trouvée' });
    }

    await history.destroy();
    res.status(200).json({ message: 'History supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la history:', error);
    res.status(500).json({
      message: 'Erreur lors de la suppression de la history',
    });
  }
};
