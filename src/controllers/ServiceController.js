const { Service } = require('../models');
const fs = require('fs');
const path = require('path');
const { generateSignedUrl } = require("../../config/AWSConfig")

// Ajouter un service
exports.addservice = async (req, res) => {
  try {
    const { nom, nom_en, phone, email, description, description_en } = req.body;

    // ✅ Ensure files are uploaded
    // if (!req.files || req.files.length === 0) {
    //   return res.status(400).json({ message: "No files uploaded" });
    // }

    const smallPhoto = req.files.smallPhoto[0]?.location || null;
    const bigPhoto = req.files.bigPhoto[0]?.location || null;

    // ✅ Generate signed URLs for all uploaded files
    // const imageUrls = await Promise.all(
    //   req.files.map(async (file) => {
    //     return file.location;
    //   })
    // );

    const newService = await Service.create({
      nom,
      nom_en,
      phone,
      email,
      description,
      description_en,
      smallPhoto: smallPhoto,
      bigPhoto: bigPhoto,
    });

    res.status(201).json({
      message: 'Service ajouté avec succès!',
      service: newService,
    });
  } catch (error) {
    console.error('Erreur côté backend:', error);
    res.status(500).json({ message: 'Erreur lors de la création du service' });
  }
};

// Modifier un service
exports.updateservice = async (req, res) => {
  const { id } = req.params;
  const { nom, nom_en, phone, email, description, description_en } = req.body;

  const smallPhoto = req.files.smallPhoto[0]?.location || null;
  const bigPhoto = req.files.bigPhoto[0]?.location || null;

  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service non trouvé' });
    }

    // console.log(imageUrls);

    // Mise à jour des informations
    service.nom = nom || service.nom;
    service.nom_en = nom_en || service.nom_en;
    service.phone = phone || service.phone;
    service.email = email || service.email;
    service.description = description || service.description;
    service.description_en = description_en || service.description_en;
    service.smallPhoto = smallPhoto || service.smallPhoto;
    service.bigPhoto = bigPhoto || service.bigPhoto;
    await service.save();

    res.status(200).json({
      message: 'Service modifié avec succès!',
      service,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du service' });
  }
};

// Supprimer un service
exports.deleteservice = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service non trouvé' });
    }

    // // Supprimer le fichier image du dossier
    // if (service.photo) {
    //   const photoPath = path.join(__dirname, '../../uploads/services', service.photo);
    //   if (fs.existsSync(photoPath)) {
    //     fs.unlinkSync(photoPath);
    //   }
    // }

    await service.destroy();

    res.status(200).json({
      message: 'Service supprimé avec succès!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du service' });
  }
};

// Récupérer tous les services
exports.getallservices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des services' });
  }
};

// Récupérer un service par ID
exports.getservice = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service non trouvé' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du service' });
  }
};
