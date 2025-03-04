// src/controllers/testimonialController.js
const { Testimonial } = require('../models');  // Importation des modèles
const { generateSignedUrl } = require("../../config/AWSConfig")


// addtestimonial
exports.addtestimonial = async (req, res) => {
  try {
    // Récupérer les données du formulaire et le fichier téléchargé
    const { nom, prenom, titre, description, address } = req.body;
    const photo = req.file ? req.file.key : null;

const signedUrl = await generateSignedUrl(photo);  // Le nom du fichier si photo téléchargée

    // Création d'un nouveau témoignage dans la base de données
    const newTestimonial = await Testimonial.create({
      nom,
      prenom,
      titre,
      description,
      photo: signedUrl,
      address
    });

    // Réponse JSON avec succès
    res.status(201).json({
      message: 'Témoignage ajouté avec succès!',
      testimonial: newTestimonial
    });
  } catch (error) {
    console.error('Erreur côté backend:', error);
    res.status(500).json({ message: 'Erreur lors de la création du témoignage' });
  }
};

// API pour modifier un témoignage
exports.updatetestimonials = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, titre, description, address } = req.body;
  const photo = req.file ? req.file.key : null;

  try {
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Témoignage non trouvé' });
    }

    // Mise à jour des informations du témoignage
    testimonial.nom = nom || testimonial.nom;
    testimonial.prenom = prenom || testimonial.prenom;
    testimonial.titre = titre || testimonial.titre;
    testimonial.description = description || testimonial.description;
    testimonial.photo = photo || testimonial.photo;
    testimonial.address = address || testimonial.address;

    await testimonial.save();

    res.status(200).json({
      message: 'Témoignage modifié avec succès!',
      testimonial
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du témoignage' });
  }
};

// API pour supprimer un témoignage
exports.deletetestimonials = async (req, res) => {
  const { id } = req.params;

  try {
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Témoignage non trouvé' });
    }

    await testimonial.destroy();

    res.status(200).json({
      message: 'Témoignage supprimé avec succès!'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du témoignage' });
  }
};

// API pour récupérer tous les témoignages
exports.getalltestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    console.log('Requête reçue pour récupérer les témoignages');
    console.log('Témoignages:', testimonials);
    res.status(200).json(testimonials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des témoignages' });
  }
};

// API pour récupérer un témoignage par ID
exports.gettestimonial = async (req, res) => {
  const { id } = req.params;
  try {
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Témoignage non trouvé' });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du témoignage' });
  }
};

