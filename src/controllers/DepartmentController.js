const { Department } = require('../models');
const fs = require('fs');
const path = require('path');
const { generateSignedUrl } = require("../../config/AWSConfig")

// Ajouter un department
exports.addDepartment = async (req, res) => {
  try {
    const { nom, nom_en, phone, email, description, description_en } = req.body;
    const photo = req.file ? req.file.key : null;

    let signedUrl = null;
    if (photo) {
      signedUrl = await generateSignedUrl(photo);
    }

    const newDepartment = await Department.create({
      nom,
      nom_en,
      phone,
      email,
      description,
      description_en,
      photo: signedUrl,
    });

    res.status(201).json({
      message: 'Department ajouté avec succès!',
      department: newDepartment,
    });
  } catch (error) {
    console.error('Erreur côté backend:', error);
    res.status(500).json({ message: 'Erreur lors de la création du department' });
  }
};

// Modifier un department
exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { nom, nom_en, phone, email, description, description_en } = req.body;
  const photo = req.file ? req.file.key : null;


  try {
    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ message: 'Department non trouvé' });
    }

    // Supprimer l'ancienne photo si une nouvelle est téléchargée
    if (photo && department.photo) {
      const oldPhotoPath = path.join(__dirname, '../../uploads/departments', department.photo);
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      }
    }

    // Mise à jour des informations
    department.nom = nom || department.nom;
    department.nom_en = nom_en || department.nom_en;
    department.phone = phone || department.phone;
    department.email = email || department.email;
    department.description = description || department.description;
    department.description_en = description_en || department.description_en;
    if (photo) {
      let signedUrl = await generateSignedUrl(photo);
      department.photo = signedUrl || department.photo;
    }

    await department.save();

    res.status(200).json({
      message: 'Department modifié avec succès!',
      department,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du department' });
  }
};

// Supprimer un department
exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ message: 'Department non trouvé' });
    }

    // Supprimer le fichier image du dossier
    if (department.photo) {
      const photoPath = path.join(__dirname, '../../uploads/departments', department.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    await department.destroy();

    res.status(200).json({
      message: 'Department supprimé avec succès!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du department' });
  }
};

// Récupérer tous les departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.status(200).json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des departments' });
  }
};

// Récupérer un department par ID
exports.getDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ message: 'Department non trouvé' });
    }
    res.status(200).json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du department' });
  }
};
