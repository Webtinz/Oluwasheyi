const { Gallery } = require('../models');
const path = require('path');

exports.addGallery = async (req, res) => {
  try {
    const { name, description  } = req.body;
    const photo = req.file ? req.file.location : null;

    // let signedUrl = null;
    // if (photo) {
    //   signedUrl = await generateSignedUrl(photo);
    // }

    const gallery = await Gallery.create({
      name,
      description,
      photo
    });

    res.status(201).json({
      message: 'Gallery ajoutée avec succès',
      gallery,
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la gallery:', error);
    res.status(500).json({
      message: 'Erreur lors de l\'ajout de la gallery',
    });
  }
};

exports.getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.findAll();
    res.status(200).json(galleries);
  } catch (error) {
    console.error('Erreur lors de la récupération des galleries:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération des galleries',
    });
  }
};

exports.getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery non trouvée' });
    }
    res.status(200).json(gallery);
  } catch (error) {
    console.error('Erreur lors de la récupération de la gallery:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération de la gallery',
    });
  }
};

exports.updateGallery = async (req, res) => {
  try {
    const { name, description,  } = req.body;
    const photo = req.file ? req.file.location : null;

    const gallery = await Gallery.findByPk(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery non trouvée' });
    }

    await gallery.update({
      name,
      description,
      photo: photo || gallery.photo,
    });

    res.status(200).json({
      message: 'Gallery mise à jour avec succès',
      gallery,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la gallery:', error);
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de la gallery',
    });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery non trouvée' });
    }

    await gallery.destroy();
    res.status(200).json({ message: 'Gallery supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la gallery:', error);
    res.status(500).json({
      message: 'Erreur lors de la suppression de la gallery',
    });
  }
};
