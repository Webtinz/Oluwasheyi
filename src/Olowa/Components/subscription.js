import React, { useState } from 'react';
import '../about.css';
import Paypal from '../../assets/paypal.png';
import MTN from '../../assets/MTN.png';
import { ChevronDown } from "lucide-react";

const DonationForm = () => {
  const [donationType, setDonationType] = useState('once');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedProgram, setSelectedProgram] = useState("");

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
    const value = e.target.value.replace(/^0+/, '');
    setCustomAmount(value);
    setAmount('');
  };

  const handlePaymentMethod = (method) => {
    setSelectedMethod(method);
    console.log(`Processing payment with ${method}`);
    console.log('Amount:', customAmount || amount);
    console.log('Type:', donationType);
    console.log('Medical Program:', selectedProgram);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4 text-2xl" style={{color:'#17416F'}}>
        HELP FUND <br /> FREE HEALTHCARE
      </h1>
      
      <div className="grid grid-cols-2 gap-2 mb-6">
        {['once', 'monthly'].map((type) => (
          <button
            key={type}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.25rem",
              borderWidth: "1px",
              transition: "background-color 0.3s, color 0.3s",
              backgroundColor: donationType === type ? "#17416F" : "#FFFFFF",
              color: donationType === type ? "#FFFFFF" : "#17416F",
              borderColor: donationType === type ? "transparent" : "#17416F",
            }}
            onClick={() => handleDonationTypeChange(type)}
          >
            {type === 'once' ? 'Give Once' : 'Monthly'}
          </button>
        ))}
      </div>

      <div className="relative mb-3">
        <select
          style={{
            width: "100%",
            padding: "0.5rem 1rem 0.5rem 1rem",
            paddingRight: "2.5rem",
            color: "#17416F",
            borderWidth: "1px",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            appearance: "none",
            outline: "none",
            transition: "box-shadow 0.3s, border-color 0.3s",
            focus: {
              outline: "none",
              ring: "2px solid #17416F"
            }
          }}
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
        >
          <option value="">Select Medical Program</option>
          <option value="program1">Medical Program 1</option>
          <option value="program2">Medical Program 2</option>
          <option value="program3">Medical Program 3</option>
        </select>
        <ChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {amounts[donationType].map((item) => (
          <button
            key={item.value}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.25rem",
              borderWidth: "1px",
              transition: "background-color 0.3s, color 0.3s",
              backgroundColor: amount === item.value ? "#17416F" : "#FFFFFF",
              color: amount === item.value ? "#FFFFFF" : "#17416F",
              borderColor: amount === item.value ? "transparent" : "#D1D5DB",
            }}
            onClick={() => handleAmountSelect(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <input
        type="number"
        min="1"
        placeholder={donationType === 'monthly' ? "Other Monthly Amount" : "Other Amount"}
        value={customAmount}
        onChange={handleCustomAmountChange}
        className="w-full p-2 border rounded mt-4"
      />

      <div className="space-y-3 mt-6">
        {[{ method: 'paypal', img: Paypal }, { method: 'momo', img: MTN }].map(({ method, img }) => (
          <div
            key={method}
            onClick={() => handlePaymentMethod(method)}
            className={`relative flex items-center justify-center p-4 rounded-lg cursor-pointer bg-yellow-400 transition`}
          >
            <input
              type="radio"
              name="paymentMethod"
              checked={selectedMethod === method}
              onChange={() => handlePaymentMethod(method)}
              className="absolute left-4 w-4 h-4 cursor-pointer"
            />
            <div className="flex items-center justify-center">
              <img src={img} alt={method} className="h-8" />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-sm mt-4 text-blue-800">
        <i className="bi bi-lock"></i> Secure Payment
      </div>
    </div>
  );
};

export default DonationForm;
