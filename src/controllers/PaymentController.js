const {Transaction} = require("../models");
const MtnMomoPayment = require("../services/payement.service");

// Initiate Payment
exports.initiatePayment = async (req, res) => {
    try {
        const momoClient = new MtnMomoPayment({
            primaryKey: process.env.MOMO_PRIMARY_KEY,
            callbackUrl: process.env.MOMO_CALLBACK_URL,
            environment: 'sandbox'
        });

        const paymentResponse = await momoClient.requestToPay({
            amount: req.body.amount,
            phoneNumber: req.body.phoneNumber,
            payerMessage: req.body.payerMessage || 'Payment',
        });

        // Save transaction to database
        const transaction = await Transaction.create({
            referenceId: paymentResponse.referenceId,
            amount: req.body.amount,
            phoneNumber: req.body.phoneNumber,
            externalId: paymentResponse.externalId,
            payerMessage: req.body.payerMessage || 'Payment',
            status: 'SUCCESSFUL'
        });

        res.status(200).json({
            paymentResponse,
            transaction: transaction,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.checkStatus = async (req, res) => {
    try {
        const momoClient = new MtnMomoPayment({
            primaryKey: process.env.MOMO_PRIMARY_KEY,
            callbackUrl: process.env.MOMO_CALLBACK_URL,
            environment: 'sandbox'
        });


        const status = await momoClient.checkTransactionStatus(req.params.referenceId);

        const updatedTransaction = await Transaction.updateTransactionStatus(
            req.params.referenceId,
            status.status
        );

        res.status(200).json({
            status,
            transaction: updatedTransaction
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

