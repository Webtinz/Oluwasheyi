import React, { useState } from 'react';
import '../about.css';
import Paypal from '../../assets/paypal.png';
import MTN from '../../assets/MTN.png';

const DonationForm = () => {
  const [donationType, setDonationType] = useState('once');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  const amounts = {
    once: [
      { value: '500000', label: 'FCFA 500000' },
      { value: '1000000', label: 'FCFA 1000000' },
      { value: '1500000', label: 'FCFA 1500000' },
      { value: '2500000', label: 'FCFA 2500000' },
    ],
    monthly: [
      { value: '50000', label: 'FCFA 50000/mois' },
      { value: '100000', label: 'FCFA 100000/mois' },
      { value: '150000', label: 'FCFA 150000/mois' },
      { value: '250000', label: 'FCFA 250000/mois' },
    ]
  };

  const handleDonationTypeChange = (type) => {
    setDonationType(type);
    setAmount('');
    setCustomAmount('');
  };

  const handleAmountSelect = (value) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount('');
  };

  const handlePaymentMethod = (method) => {
    setSelectedMethod(method);
    console.log(`Processing payment with ${method}`);
    console.log('Amount:', customAmount || amount);
    console.log('Type:', donationType);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4" style={{color:'#17416F',fontSize:'30px'}}>
        HELP FUND <br /> FREE HEALTHCARE
      </h1>
      
      <div className="grid grid-cols-2 gap-2 mb-6">
        <button
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            backgroundColor: donationType === 'once' ? '#17416F' : 'white',
            border: donationType === 'once' ? 'none' : '1px solid #17416F',
            color: donationType === 'once' ? 'white' : '#17416F',
          }}
          onClick={() => handleDonationTypeChange('once')}
        >
          Give Once
        </button>

        <button
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            backgroundColor: donationType === 'monthly' ? '#17416F' : 'white',
            border: donationType === 'monthly' ? 'none' : '1px solid #17416F',
            color: donationType === 'monthly' ? 'white' : '#17416F',
          }}
          onClick={() => handleDonationTypeChange('monthly')}
        >
          Monthly
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {amounts[donationType].map((item) => (
          <button
            key={item.value}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              backgroundColor: amount === item.value ? '#17416F' : 'white',
              border: amount === item.value ? 'none' : '1px solid #C5C5C5',
              color: amount === item.value ? 'white' : '#17416F',
            }}
            onClick={() => handleAmountSelect(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <input
        type="number"
        placeholder={donationType === 'monthly' ? "Other Monthly Amount" : "Other Amount"}
        value={customAmount}
        onChange={handleCustomAmountChange}
        className="w-full p-2 border rounded mt-4 copp"
      />

      {/* Boutons de paiement mis à jour */}
      <div className="space-y-3 mt-6">
        <div
          onClick={() => handlePaymentMethod('paypal')}
          style={{
            backgroundColor: selectedMethod === 'paypal' ? '#FFD700' : '#FFD700',
            // border: '1px solid #FFD700',
            transition: 'background-color 0.3s ease'
          }}
          className="relative flex items-center justify-center p-4 rounded-lg cursor-pointer"
        >
          <input
            type="radio"
            name="paymentMethod"
            checked={selectedMethod === 'paypal'}
            onChange={() => handlePaymentMethod('paypal')}
            className="absolute left-4 w-4 h-4 cursor-pointer"
          />
          <div className="flex items-center justify-center">
            <img 
              src={Paypal}
              alt="PayPal"
              className="h-8"
            />
          </div>
        </div>

        <div
          onClick={() => handlePaymentMethod('momo')}
          style={{
            backgroundColor: selectedMethod === 'momo' ? '#FFD700' : '#FFD700',
            // border: '1px solid #FFD700',
            transition: 'background-color 0.3s ease'
          }}
          className="relative flex items-center justify-center p-4 rounded-lg cursor-pointer"
        >
          <input
            type="radio"
            name="paymentMethod"
            checked={selectedMethod === 'momo'}
            onChange={() => handlePaymentMethod('momo')}
            className="absolute left-4 w-4 h-4 cursor-pointer"
          />
          <div className="flex items-center justify-center gap-2">
            <img 
              src={MTN}
              alt="MTN MoMo"
              className="h-8"
            />
            {/* <span className="font-medium">MTN MoMo</span> */}
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-4" style={{color:'#17416F',fontSize:'16px'}}>
      <i class="bi bi-lock"></i> Secure Payment
      </div>
    </div>
  );
};

export default DonationForm;