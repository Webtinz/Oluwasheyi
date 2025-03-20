const axios = require('axios');
const crypto = require('crypto');

class MtnMomoPayment {
  constructor(config) {
    this.baseUrl = config.environment === 'sandbox'
      ? 'https://sandbox.momodeveloper.mtn.com'
      : 'https://proxy.momoapi.mtn.com';

    this.config = {
      primaryKey: config.primaryKey,
      environment: config.environment || 'sandbox',
      callbackUrl: config.callbackUrl
    };

    // Credentials will be set only once
    this.credentials = null;
  }

  // Singleton method to create credentials
  async createCredentials() {
    // If credentials already exist, return them
    if (this.credentials) {
      return this.credentials;
    }

    try {
      // Generate Reference ID (UUID)
      const referenceId = crypto.randomUUID();

      // Create API User
      await axios.post(`${this.baseUrl}/v1_0/apiuser`,
        {
          providerCallbackHost: this.config.callbackUrl
        },
        {
          headers: {
            'X-Reference-Id': referenceId,
            'Ocp-Apim-Subscription-Key': this.config.primaryKey,
            'Content-Type': 'application/json'
          }
        }
      );

      // Get API Key
      const apiKeyResponse = await axios.post(
        `${this.baseUrl}/v1_0/apiuser/${referenceId}/apikey`,
        {},
        {
          headers: {
            'Ocp-Apim-Subscription-Key': this.config.primaryKey
          }
        }
      );

      // Generate Basic Token
      const basicToken = Buffer.from(`${referenceId}:${apiKeyResponse.data.apiKey}`).toString('base64');

      // Get Access Token
      const accessTokenResponse = await axios.post(
        `${this.baseUrl}/collection/token/`,
        {},
        {
          headers: {
            'Authorization': `Basic ${basicToken}`,
            'Ocp-Apim-Subscription-Key': this.config.primaryKey
          }
        }
      );

      // Store credentials as a singleton
      this.credentials = {
        referenceId: referenceId,
        apiUser: referenceId,
        apiKey: apiKeyResponse.data.apiKey,
        accessToken: accessTokenResponse.data.access_token,
        basicToken: basicToken
      };

      return this.credentials;
    } catch (error) {
      console.error('Credential Creation Error:', error.response ? error.response.data : error.message);
      throw new Error(`Credential Creation Failed: ${error.message}`);
    }
  }

  // Request to pay (collection)
  async requestToPay(payload) {
    // Ensure credentials are created
    if (!this.credentials) {
      await this.createCredentials();
    }
    // console.log(this.credentials);

    try {
      const response = await axios.post(`${this.baseUrl}/collection/v1_0/requesttopay`,
        {
          amount: payload.amount,
          currency: payload.currency || 'EUR',
          externalId: payload.externalId || crypto.randomUUID(),
          payer: {
            partyId: payload.phoneNumber,
            partyIdType: 'MSISDN'
          },
          payerMessage: payload.payerMessage || 'Payment',
          payeeNote: payload.payeeNote || 'Transaction'
        },
        {
          headers: {
            'X-Reference-Id': crypto.randomUUID(),
            'X-Target-Environment': this.config.environment,
            'Authorization': `Bearer ${this.credentials.accessToken}`,
            'Ocp-Apim-Subscription-Key': this.config.primaryKey,
            'Content-Type': 'application/json'
          }
        }
      );
      return { response: response.data, referenceId: this.credentials.referenceId };
    } catch (error) {
      throw new Error(`Request to Pay Failed: ${error.message}`);
    }
  }

  // Check transaction status
  async checkTransactionStatus(referenceId) {
    // Ensure credentials are created
    if (!this.credentials) {
      await this.createCredentials();
    }

    try {
      const response = await axios.get(`${this.baseUrl}/collection/v1_0/requesttopay/${referenceId}`,
        {
          headers: {
            'X-Target-Environment': this.config.environment,
            'Authorization': `Bearer ${this.credentials.accessToken}`,
            'Ocp-Apim-Subscription-Key': this.config.primaryKey
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Transaction Status Check Failed: ${error.message}`);
    }
  }
}


module.exports = MtnMomoPayment;