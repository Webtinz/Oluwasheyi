// src/controllers/ContentController.js
const { Content } = require('../models');  // Importation des modèles
const { generateSignedUrl } = require("../../config/AWSConfig")

// addcontent
exports.addcontent = async (req, res) => {
  try {
    // Récupérer les données du formulaire et le fichier téléchargé
    const { content_en, content_fr, title } = req.body;
    const image = req.file ? req.file.location : null;  // Le nom du fichier si image téléchargée

    // // ✅ Generate signed URL
    // let signedUrl = null;
    // if (image) {
    //   signedUrl = await generateSignedUrl(image);
    // }

    // Création d'un nouveau contenu dans la base de données
    const newContent = await Content.create({
      title,
      content_en,
      content_fr,
      image
    });

    // Réponse JSON avec succès
    res.status(201).json({
      message: 'Contenu ajouté avec succès!',
      content: newContent
    });
  } catch (error) {
    console.error('Erreur côté backend:', error);
    res.status(500).json({ message: 'Erreur lors de la création du contenu' });
  }
};

// API pour modifier un contenu
exports.updatecontent = async (req, res) => {
  const { id } = req.params;
  const { content_en, content_fr, title } = req.body;

  const image = req.file ? req.file.location : null;

  try {
    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({ message: 'Contenu non trouvé' });
    }


    // Mise à jour des informations du contenu
    content.content_en = content_en || content.content_en;
    content.content_fr = content_fr || content.content_fr;
    content.title = title || content.title;
    content.image = image || content.image;
    // if (image) {
    //   let signedUrl = await generateSignedUrl(image);
    // }

    await content.save();

    res.status(200).json({
      message: 'Contenu modifié avec succès!',
      content
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du contenu' + error });
  }
};

// API pour supprimer un contenu
exports.deletecontents = async (req, res) => {
  const { id } = req.params;

  try {
    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({ message: 'Contenu non trouvé' });
    }

    await content.destroy();

    res.status(200).json({
      message: 'Contenu supprimé avec succès!'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du contenu' });
  }
};

// API pour récupérer tous les contenus
exports.getallcontents = async (req, res) => {
  try {
    const contents = await Content.findAll();
    // console.log('Requête reçue pour récupérer les contenus');
    // console.log('Contenus:', contents);
    res.status(200).json(contents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des contenus' });
  }
};

// API pour récupérer un contenu par ID
exports.getcontent = async (req, res) => {
  const { id } = req.params;
  try {
    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({ message: 'Contenu non trouvé' });
    }
    res.status(200).json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du contenu' });
  }
};

// Get contents by title
exports.getcontentbytitle = async (req, res) => {
  try {

    const contents = await Content.findAll();

    // Transform the array into an object keyed by title
    const contentsByTitle = contents.reduce((acc, content) => {
      acc[content.title] = content; // Use the title as the key
      return acc;
    }, {});

    // console.log(contentsByTitle);

    res.status(200).json({
      status: 'success',
      data: contentsByTitle,
    });
  } catch (error) {
    console.error('Error fetching contents:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching contents.',
      details: error.message,
    });
  }
};