const {Donation, MedicalProgram} = require("../models");

exports.getDonations = async (req, res) => {
    try {
        const donations = await Donation.findAll({
            include: {
                model: MedicalProgram,
                as: "medicalProgram",
                attributes: ["name"],
            },
        });

        res.status(200).json({ donations });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Erreur lors de la récupération des donations : "+ error });
    }

};

exports.getDonation = async (req, res) => {
    const { id } = req.params;

    try {
        const donation = await Donation.findByPk(id, {
            include: {
                model: MedicalProgram,
                as: "medicalProgram",
                attributes: ["name"],
            },
        });

        if (!donation) {
            return res.status(404).json({ message: "Donation non trouvée" });
        }

        res.status(200).json({ donation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération de la donation" });
    }
}

exports.addDonation = async (req, res) => {
    const { type, amount, medicalProgramId } = req.body;

    try {
        const medicalProgram = await MedicalProgram.findByPk(medicalProgramId);
        if (!medicalProgram) {
            return res.status(404).json({ message: "Programme médical non trouvé" });
        }

        const donation = await Donation.create({
            type,
            amount,
            medicalProgramId,
        });

        res.status(201).json({
            message: "Donation créée avec succès!",
            donation,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de la donation" });
    }
}