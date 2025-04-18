const { Community } = require('../models');

exports.addCommunity = async (req, res) => {
  try {
    const { title, title_en, description, description_en } = req.body;
    const photo = req.file ? req.file.location : null;

    const community = await Community.create({
      title,
      title_en,
      description,
      description_en,
      photo
    });

    res.status(201).json({
      message: 'Community ajoutée avec succès',
      community,
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la community:', error);
    res.status(500).json({
      message: 'Erreur lors de l\'ajout de la community',
    });
  }
};

exports.getAllCommunities = async (req, res) => {
  try {
    const communites = await Community.findAll();
    res.status(200).json(communites);
  } catch (error) {
    console.error('Erreur lors de la récupération des communites:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération des communites',
    });
  }
};

exports.getCommunity = async (req, res) => {
  try {
    const community = await Community.findByPk(req.params.id);
    if (!community) {
      return res.status(404).json({ message: 'Community non trouvée' });
    }
    res.status(200).json(community);
  } catch (error) {
    console.error('Erreur lors de la récupération de la community:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération de la community',
    });
  }
};

exports.updateCommunity = async (req, res) => {
  try {
    const { title, title_en, description, description_en } = req.body;
    const photo = req.file ? req.file.location : null;

    // let signedUrl = null;
    // if (photo) {
    //   signedUrl = await generateSignedUrl(photo);
    // }
    const community = await Community.findByPk(req.params.id);
    if (!community) {
      return res.status(404).json({ message: 'Community non trouvée' });
    }

    await community.update({
      title,
      title_en,
      description,
      description_en,
      photo: photo || community.photo,
    });

    res.status(200).json({
      message: 'Community mise à jour avec succès',
      community,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la community:', error);
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de la community',
    });
  }
};

exports.deleteCommunity = async (req, res) => {
  try {
    const community = await Community.findByPk(req.params.id);
    if (!community) {
      return res.status(404).json({ message: 'Community non trouvée' });
    }

    await community.destroy();
    res.status(200).json({ message: 'Community supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la community:', error);
    res.status(500).json({
      message: 'Erreur lors de la suppression de la community',
    });
  }
};
