const { Event } = require('../models');
const fs = require('fs');
const path = require('path');
const { generateSignedUrl } = require("../../config/AWSConfig")

// Ajouter un event
exports.createEvent = async (req, res) => {
    try {
        const { nom, name, dateevent, location, description, description_en } = req.body;
        const photo = req.file ? req.file.location : null;

        // let signedUrl = null;
        // if (photo) {
        //     signedUrl = await generateSignedUrl(photo);
        // }

        const newEvent = await Event.create({
            nom, name, dateevent, location, description, description_en,
            photo,
        });

        res.status(201).json({
            message: 'Event ajouté avec succès!',
            event: newEvent,
        });
    } catch (error) {
        console.error('Erreur côté backend:', error);
        res.status(500).json({ message: 'Erreur lors de la création du event' });
    }
};

// Modifier un event
exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { nom, name, dateevent, location, description, description_en } = req.body;
    const photo = req.file ? req.file.location : null;


    try {
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: 'Event non trouvé' });
        }

        // // Supprimer l'ancienne photo si une nouvelle est téléchargée
        // if (photo && event.photo) {
        //     const oldPhotoPath = path.join(__dirname, '../../uploads/events', event.photo);
        //     if (fs.existsSync(oldPhotoPath)) {
        //         fs.unlinkSync(oldPhotoPath);
        //     }
        // }

        // Mise à jour des informations
        event.nom = nom || event.nom;
        event.name = name || event.name;
        event.location = location || event.location;
        event.dateevent = dateevent || event.dateevent;
        event.description = description || event.description;
        event.description_en = description_en || event.description_en;
        event.photo = photo || event.photo;
        // if (photo) {
        //     let signedUrl = await generateSignedUrl(photo);
        // }

        await event.save();

        res.status(200).json({
            message: 'Event modifié avec succès!',
            event,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du event' });
    }
};

// Supprimer un event
exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: 'Event non trouvé' });
        }

        // Supprimer le fichier image du dossier
        if (event.photo) {
            const photoPath = path.join(__dirname, '../../uploads/events', event.photo);
            if (fs.existsSync(photoPath)) {
                fs.unlinkSync(photoPath);
            }
        }

        await event.destroy();

        res.status(200).json({
            message: 'Event supprimé avec succès!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du event' });
    }
};

// Récupérer tous les events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des events' });
    }
};

// Récupérer un event par ID
exports.getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: 'Event non trouvé' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du event' });
    }
};
