// src/controllers/PaymentController.js
const { Donation, MedicalProgram } = require('../models');
const PayPalService = require('../services/paypal.service');
const MtnMomoPayment = require('../services/payement.service');

// Initialize PayPal service
const paypalService = new PayPalService({
    clientId: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_SECRET,
    environment: process.env.PAYPAL_MODE === 'production' ? 'live' : 'sandbox'
});

// Initialize MTN MoMo service
const mtnMomoService = (req) => new MtnMomoPayment({
    primaryKey: process.env.MOMO_PRIMARY_KEY,
    callbackUrl: process.env.MOMO_CALLBACK_URL,
    environment: 'sandbox'
});

// Create a donation record
exports.addDonation = async (req, res) => {
    const {
        type,
        amount,
        medicalProgramId,
        paymentMethod,
        paypalOrderId,
        referenceId,
        phoneNumber,
        status = 'pending' // Default status
    } = req.body;

    try {
        // Validate required fields
        if (!type || !amount || !medicalProgramId || !paymentMethod) {
            return res.status(400).json({
                message: "Missing required fields (type, amount, medicalProgramId, paymentMethod)"
            });
        }

        // Check if medical program exists
        const medicalProgram = await MedicalProgram.findByPk(medicalProgramId);
        if (!medicalProgram) {
            return res.status(404).json({ message: "Medical program not found" });
        }

        // Create donation record
        const donation = await Donation.create({
            type,
            amount,
            medicalProgramId,
            paymentMethod,
            paymentStatus: status,
            paypalOrderId: paypalOrderId || null,
            referenceId: referenceId || null,
            phoneNumber: phoneNumber || null,
            paymentDate: status === 'completed' ? new Date() : null,
        });

        res.status(201).json({
            message: "Donation created successfully!",
            donation,
        });
    } catch (error) {
        console.error("Error creating donation:", error);
        res.status(500).json({ message: "Error creating donation" });
    }
};

// PayPal payment handling

// Create PayPal order for a donation
exports.createPaypalOrder = async (req, res) => {
    const { amount, currency = 'USD', donationType, medicalProgramId } = req.body;

    try {
        if (!amount) {
            return res.status(400).json({ error: 'Amount is required' });
        }

        // Create order in PayPal
        const order = await paypalService.createOrder(amount, currency);

        // Store the pending donation with PayPal order ID
        if (medicalProgramId) {
            await Donation.create({
                type: donationType || 'once',
                amount,
                medicalProgramId,
                paymentMethod: 'paypal',
                paymentStatus: 'pending',
                paypalOrderId: order.id
            });
        }

        res.json(order);
    } catch (error) {
        console.error('Error creating PayPal order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

// Capture payment for an approved PayPal order
exports.capturePaypalOrder = async (req, res) => {
    const { orderId } = req.body;

    try {
        if (!orderId) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        // Capture the payment in PayPal
        const captureData = await paypalService.captureOrder(orderId);

        // Update the donation record with completed status
        if (captureData.status === 'COMPLETED') {
            const donation = await Donation.findOne({
                where: { paypalOrderId: orderId }
            });

            if (donation) {
                await donation.update({
                    paymentStatus: 'completed',
                    paymentDate: new Date(),
                    // You can store additional transaction details if needed
                    transactionId: captureData.purchase_units[0]?.payments?.captures[0]?.id || null
                });
            }
        }

        res.json(captureData);
    } catch (error) {
        console.error('Error capturing PayPal payment:', error);
        res.status(500).json({ error: 'Failed to capture payment' });
    }
};

// MTN MoMo payment handling

// Initiate MTN MoMo payment
exports.initiateMomoPayment = async (req, res) => {
    try {
        const { amount, phoneNumber, payerMessage, donationType, medicalProgramId } = req.body;

        // Validate required fields
        if (!amount || !phoneNumber || !medicalProgramId) {
            return res.status(400).json({
                error: 'Missing required fields (amount, phoneNumber, medicalProgramId)'
            });
        }

        const momoClient = mtnMomoService(req);

        // Initiate payment with MTN MoMo
        const paymentResponse = await momoClient.requestToPay({
            amount: amount,
            phoneNumber: phoneNumber,
            payerMessage: payerMessage || 'Donation Payment',
        });

        // Create donation record
        const donation = await Donation.create({
            type: donationType || 'once',
            amount,
            medicalProgramId,
            paymentMethod: 'momo',
            paymentStatus: 'pending',
            referenceId: paymentResponse.referenceId,
            externalId: paymentResponse.externalId,
            payerMessage: payerMessage || 'Donation Payment',
            phoneNumber
        });

        res.status(200).json({
            response: paymentResponse,
            transaction: donation,
        });
    } catch (error) {
        console.error('Error initiating MTN MoMo payment:', error);
        res.status(500).json({ error: error.message });
    }
};

// Check MTN MoMo payment status
exports.checkMomoStatus = async (req, res) => {
    try {
        const { referenceId } = req.params;

        if (!referenceId) {
            return res.status(400).json({ error: 'Reference ID is required' });
        }

        const momoClient = mtnMomoService(req);
        const status = await momoClient.checkTransactionStatus(referenceId);

        // Update donation status
        if (status && status.status) {
            const donation = await Donation.findOne({
                where: { referenceId }
            });

            if (donation) {
                const paymentStatus = status.status === 'SUCCESSFUL' ? 'completed' :
                    (status.status === 'FAILED' ? 'failed' : 'pending');

                await donation.update({
                    paymentStatus,
                    paymentDate: paymentStatus === 'completed' ? new Date() : null
                });
            }
        }

        res.status(200).json({
            status
        });
    } catch (error) {
        console.error('Error checking MTN MoMo payment status:', error);
        res.status(500).json({ error: error.message });
    }
};


// Get all donations
exports.getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.findAll({
            include: [
                {
                    model: MedicalProgram,
                    as: "medicalProgram",
                    attributes: ['id', 'name', 'nom']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(donations);
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ message: 'Error fetching donations' });
    }
};

// Get donation by ID
exports.getDonationById = async (req, res) => {
    const { id } = req.params;

    try {
        const donation = await Donation.findByPk(id, {
            include: [
                {
                    model: MedicalProgram,
                    as: "medicalProgram",
                    attributes: ['id', 'name', 'nom']
                }
            ]
        });

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        res.json(donation);
    } catch (error) {
        console.error('Error fetching donation:', error);
        res.status(500).json({ message: 'Error fetching donation' });
    }
};