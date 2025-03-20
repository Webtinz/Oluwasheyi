const paypal = require('@paypal/checkout-server-sdk');

class PayPalService {
    constructor(config) {
        this.config = {
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            environment: config.environment || 'sandbox'
        };

        // Initialize the PayPal client
        this.client = this.initializeClient();
    }

    // Initialize PayPal HTTP client
    initializeClient() {
        let environment;

        if (this.config.environment === 'sandbox') {
            environment = new paypal.core.SandboxEnvironment(
                this.config.clientId,
                this.config.clientSecret
            );
        } else {
            environment = new paypal.core.LiveEnvironment(
                this.config.clientId,
                this.config.clientSecret
            );
        }

        return new paypal.core.PayPalHttpClient(environment);
    }

    // Create a PayPal order
    async createOrder(amount, currency = 'USD') {
        try {
            const request = new paypal.orders.OrdersCreateRequest();
            request.prefer("return=representation");

            request.requestBody({
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: currency,
                        value: amount
                    }
                }]
            });

            const response = await this.client.execute(request);
            return { id: response.result.id, status: response.result.status };
        } catch (error) {
            console.error('PayPal Order Creation Error:', error.message);
            throw new Error(`Failed to create PayPal order: ${error.message}`);
        }
    }

    // Capture payment for an approved PayPal order
    async captureOrder(orderId) {
        try {
            const request = new paypal.orders.OrdersCaptureRequest(orderId);
            request.prefer("return=representation");

            const response = await this.client.execute(request);
            return response.result;
        } catch (error) {
            console.error('PayPal Capture Error:', error.message);
            throw new Error(`Failed to capture PayPal payment: ${error.message}`);
        }
    }
}

module.exports = PayPalService;