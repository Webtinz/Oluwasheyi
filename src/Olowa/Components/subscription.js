import React, { useContext, useEffect, useState } from 'react';
import '../about.css';
import Paypal from '../../assets/paypal.png';
import MTN from '../../assets/MTN.png';
import { ChevronDown } from "lucide-react";
import { addDonation, getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';
// import { error } from 'jquery';

const DonationForm = ({ programs }) => {
  const [donationType, setDonationType] = useState('once');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedProgram, setSelectedProgram] = useState("");
  const { selectedLanguage } = useContext(LanguageContext);
  const [contents, setContents] = useState();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  // Get contents on component mount
  useEffect(() => {
    const fetchContents = async () => {
      try {
        // const savedContents = localStorage.getItem("contents");
        // if (savedContents) {
        //   setContents(JSON.parse(savedContents));
        // } else {
          // Fetch contents if not in localStorage
          const response = await getAllContents();
          setContents(response.data);
        //   localStorage.setItem("contents", JSON.stringify(response.data));
        // }
      } catch (error) {
        console.error('Failed to fetch contents:', error.message || error);
      }
    };
    fetchContents();
  }, []);

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

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let submissionData = {
      type: donationType,
      amount: customAmount || amount,
      paymentMethod: selectedMethod,
      medicalProgramId: selectedProgram,
    };
    try {
      console.log("Form Submitted with data: ", submissionData);
      await addDonation(submissionData);
      setDonationType('once');
      setAmount('');
      setCustomAmount('');
      setSelectedMethod('');
      setSelectedProgram('');
      setShowSuccessMessage(true);

      // Masquer la notification après 5 secondes
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to submit donation:', error.message || error);
      submissionData = {};
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
        {showSuccessMessage && (
          <div className="alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3" role="alert">
            {selectedLanguage === 'fr' ? 'Don effectue avec succes' : "Donation completed successfully"}
          </div>
        )}
      <h1 className="text-2xl font-bold text-center mb-4 text-2xl" style={{ color: '#17416F' }}>
        {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
          __html: contents?.donate_subscription_title.content_fr
        }} />) : (<div dangerouslySetInnerHTML={{
          __html: contents?.donate_subscription_title.content_en
        }} />)}
      </h1>
      <form>
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
              type='button'
              onClick={(e) => {
                e.preventDefault();
                handleDonationTypeChange(type)
              }}
            >
              {type === 'once'
                ? (selectedLanguage === 'fr'
                  ? contents?.donate_page_payment_button_1?.content_fr
                  : contents?.donate_page_payment_button_1?.content_en)
                : (selectedLanguage === 'fr'
                  ? contents?.donate_page_payment_button_2?.content_fr
                  : contents?.donate_page_payment_button_2?.content_en)
              }
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
            }}
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
          >
            <option value="">
              {selectedLanguage === 'fr' ? contents?.donate_page_payment_input.content_fr : contents?.donate_page_payment_input.content_en}
            </option>
            {programs?.map((program) => (
              <option key={program.id} value={program.id}>
                {selectedLanguage === 'fr' ? program.nom : program.name}
              </option>
            ))}
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
              type='button'
              onClick={(e) => {
                e.preventDefault();
                handleAmountSelect(item.value)
              }}
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
                onChange={(e) => {
                  e.preventDefault();
                  handlePaymentMethod(method)
                }}
                className="absolute left-4 w-4 h-4 cursor-pointer"
              />
              <div className="flex items-center justify-center">
                <img src={img} alt={method} className="h-8" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button type="submit" onClick={handleSubmit} className='text-sm mt-4 text-blue-800 btn btn-t'>
            <i className="bi bi-lock"></i> {selectedLanguage === 'fr' ? contents?.subs_button.content_fr : contents?.subs_button.content_en}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonationForm;
