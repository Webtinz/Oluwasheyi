const { Feedback } = require("../models");

// Ajouter un feedback
exports.createFeedback = async (req, res) => {
    try {
        const { name, email, yoursuggestions, experience } = req.body;
        const feedback = await Feedback.create({ name, email, yoursuggestions, experience });
        res.status(201).json({ message: "Feedback ajouté avec succès", feedback });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout du feedback", error: error.message });
    }
};

// Récupérer tous les feedbacks
exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des feedbacks", error: error.message });
    }
};

// Récupérer un feedback par ID
exports.getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id);
        if (!feedback) return res.status(404).json({ message: "Feedback non trouvé" });
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du feedback", error: error.message });
    }
};

// Mettre à jour un feedback
exports.updateFeedback = async (req, res) => {
    try {
        const { name, email, yoursuggestions, experience } = req.body;
        const feedback = await Feedback.findByPk(req.params.id);
        if (!feedback) return res.status(404).json({ message: "Feedback non trouvé" });

        await feedback.update({ name, email, yoursuggestions, experience });
        res.status(200).json({ message: "Feedback mis à jour avec succès", feedback });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
    }
};

// Supprimer un feedback
exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id);
        if (!feedback) return res.status(404).json({ message: "Feedback non trouvé" });

        await feedback.destroy();
        res.status(200).json({ message: "Feedback supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
    }
};
