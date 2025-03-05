// src/controllers/teamMemberController.js
const { TeamMember } = require('../models');
const { generateSignedUrl } = require("../../config/AWSConfig")


// addteamMember
exports.addTeamMember = async (req, res) => {
  try {
    // Récupérer les données du formulaire et le fichier téléchargé
    const { nom, prenom, titre, description } = req.body;
    const photo = req.file ? req.file.key : null;

    let signedUrl = null;
    if (photo) {
      signedUrl = await generateSignedUrl(photo);
    }

    // Création d'un nouveau membre dans la base de données
    const newTeamMember = await TeamMember.create({
      nom,
      prenom,
      titre,
      description,
      photo: signedUrl,
    });

    // Réponse JSON avec succès
    res.status(201).json({
      message: 'membre ajouté avec succès!',
      teamMember: newTeamMember
    });
  } catch (error) {
    console.error('Erreur côté backend:', error);
    res.status(500).json({ message: 'Erreur lors de la création du membre' });
  }
};

// API pour modifier un membre
exports.updateTeamMember = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, titre, description } = req.body;
  const photo = req.file ? req.file.key : null;

  try {
    const teamMember = await TeamMember.findByPk(id);
    if (!teamMember) {
      return res.status(404).json({ message: 'membre non trouvé' });
    }

    // Mise à jour des informations du membre
    teamMember.nom = nom || teamMember.nom;
    teamMember.prenom = prenom || teamMember.prenom;
    teamMember.titre = titre || teamMember.titre;
    teamMember.description = description || teamMember.description;
    if (photo) {
      let signedUrl = await generateSignedUrl(photo);
      teamMember.photo = signedUrl || teamMember.photo;
    }

    await teamMember.save();

    res.status(200).json({
      message: 'membre modifié avec succès!',
      teamMember
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du membre' });
  }
};

// API pour supprimer un membre
exports.deleteTeamMember = async (req, res) => {
  const { id } = req.params;

  try {
    const teamMember = await TeamMember.findByPk(id);
    if (!teamMember) {
      return res.status(404).json({ message: 'membre non trouvé' });
    }

    await teamMember.destroy();

    res.status(200).json({
      message: 'membre supprimé avec succès!'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du membre' });
  }
};

// API pour récupérer tous les membres
exports.getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.findAll();
    console.log('Requête reçue pour récupérer les membres');
    console.log('membres:', teamMembers);
    res.status(200).json(teamMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des membres' });
  }
};

// API pour récupérer un membre par ID
exports.getTeamMember = async (req, res) => {
  const { id } = req.params;
  try {
    const teamMember = await TeamMember.findByPk(id);
    if (!teamMember) {
      return res.status(404).json({ message: 'membre non trouvé' });
    }
    res.status(200).json(teamMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du membre' });
  }
};

