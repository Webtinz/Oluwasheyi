const { Advice } = require('../models');
const { generateSignedUrl } = require("../../config/AWSConfig")
const path = require('path');

exports.addAdvice = async (req, res) => {
  try {
    const { topic, advice_text } = req.body;
    const photo = req.file ? req.file.key : null;

    const signedUrl = await generateSignedUrl(photo);
    const advice = await Advice.create({
      topic,
      advice_text,
      photo: signedUrl,
    });

    res.status(201).json({
      message: 'Advice ajoutée avec succès',
      advice,
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la advice:', error);
    res.status(500).json({
      message: 'Erreur lors de l\'ajout de la advice',
    });
  }
};

exports.getAllAdvices = async (req, res) => {
  try {
    const advices = await Advice.findAll();
    res.status(200).json(advices);
  } catch (error) {
    console.error('Erreur lors de la récupération des advices:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération des advices',
    });
  }
};

exports.getAdvice = async (req, res) => {
  try {
    const advice = await Advice.findByPk(req.params.id);
    if (!advice) {
      return res.status(404).json({ message: 'Advice non trouvée' });
    }
    res.status(200).json(advice);
  } catch (error) {
    console.error('Erreur lors de la récupération de la advice:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération de la advice',
    });
  }
};

exports.updateAdvice = async (req, res) => {
  try {
    const { topic, advice_text } = req.body;
    const photo = req.file ? req.file.key : null;

    const signedUrl = await generateSignedUrl(photo);
    
    const advice = await Advice.findByPk(req.params.id);
    if (!advice) {
      return res.status(404).json({ message: 'Advice non trouvée' });
    }

    await advice.update({
      topic,
      advice_text,
      photo: signedUrl || advice.photo,
    });

    res.status(200).json({
      message: 'Advice mise à jour avec succès',
      advice,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la advice:', error);
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de la advice',
    });
  }
};

exports.deleteAdvice = async (req, res) => {
  try {
    const advice = await Advice.findByPk(req.params.id);
    if (!advice) {
      return res.status(404).json({ message: 'Advice non trouvée' });
    }

    await advice.destroy();
    res.status(200).json({ message: 'Advice supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la advice:', error);
    res.status(500).json({
      message: 'Erreur lors de la suppression de la advice',
    });
  }
};
