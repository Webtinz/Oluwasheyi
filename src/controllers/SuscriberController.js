const { Suscriber } = require("../models");

exports.getSuscribers = async (req, res) => {
    try {
        const suscribers = await Suscriber.findAll();

        res.status(200).json({ suscribers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des suscribers : " + error });
    }

};

exports.getSuscriber = async (req, res) => {
    const { id } = req.params;

    try {
        const suscriber = await Suscriber.findByPk(id);

        if (!suscriber) {
            return res.status(404).json({ message: "Suscriber non trouvée" });
        }

        res.status(200).json({ suscriber });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération de la suscriber" });
    }
}

exports.addSuscriber = async (req, res) => {
    const { email } = req.body;
    try {
        // Check if the email already exists
        const existingSuscriber = await Suscriber.findOne({ where: { email } });
        if (existingSuscriber) {
            return res.status(400).json({ message: "Cette adresse e-mail est déjà abonnée." });
        }

        const suscriber = await Suscriber.create({ email });

        res.status(201).json({
            message: "Suscriber créée avec succès!",
            suscriber,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de la suscriber" });
    }
}