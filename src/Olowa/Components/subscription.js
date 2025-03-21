import React, { useContext, useEffect, useState, useRef } from 'react';
import '../about.css';
import Paypal from '../../assets/paypal.png';
import MTN from '../../assets/MTN.png';
import { ChevronDown, X } from "lucide-react";
import { addDonation, capturePaypalOrder, createPaypalOrder, getAllContents, initiatePayment } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';

const DonationForm = ({ programs, preselectedProgram }) => {
  const [donationType, setDonationType] = useState('once');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedProgram, setSelectedProgram] = useState("");
  const { selectedLanguage } = useContext(LanguageContext);
  const [contents, setContents] = useState();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaypalButtons, setShowPaypalButtons] = useState(false);
  const paypalButtonsRef = useRef(null);
  
  // New state for MTN MoMo modal
  const [showMomoModal, setShowMomoModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Get contents on component mount
  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await getAllContents();
        setContents(response.data);
      } catch (error) {
        console.error('Failed to fetch contents:', error.message || error);
      }
    };
    fetchContents();
    
    if (preselectedProgram?.id) {
      setSelectedProgram(preselectedProgram.id);
    }
  }, [preselectedProgram]);

  // Effect to initialize PayPal SDK
  useEffect(() => {
    // Only load PayPal buttons when the payment method is selected
    if (selectedMethod === 'paypal' && (customAmount || amount)) {
      const script = document.createElement('script');
      script.src = "https://www.paypal.com/sdk/js?client-id=AcZ0hdwQZs3r6Gfhfpd83eoA3XUXOPe5UOi3qkxMEFfQXkhMZPrXtz82zdzzy7FoHrddS0wq_VYlfIZj&currency=USD";
      script.async = true;
      script.onload = () => initializePayPalButtons();
      
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [selectedMethod, amount, customAmount]);

  const initializePayPalButtons = () => {
    if (window.paypal && paypalButtonsRef.current) {
      paypalButtonsRef.current.innerHTML = '';
      
      window.paypal.Buttons({
        createOrder: async () => {
          try {
            setIsProcessing(true);
            const response = await createPaypalOrder({
              amount: customAmount || amount,
              donationType: donationType,
              medicalProgramId: selectedProgram
            });
            const orderId = response.id;
            setOrderId(orderId);
            return orderId;
          } catch (error) {
            console.error('Error creating PayPal order:', error);
            setPaymentStatus('Error creating order');
            setIsProcessing(false);
            throw error;
          }
        },
        onApprove: async (data) => {
          try {
            setPaymentStatus('Processing payment...');
            const response = await capturePaypalOrder({
              orderId: data.orderID
            });

            const captureData = response;

            // Handle successful payment
            if (captureData.status === 'COMPLETED') {
              setPaymentStatus('Payment successful!');
              setShowSuccessMessage(true);
              resetForm();
              
              // Hide success message after 3 seconds
              setTimeout(() => {
                setShowSuccessMessage(false);
              }, 3000);
            } else {
              setPaymentStatus('Payment incomplete');
            }
          } catch (error) {
            console.error('Error capturing PayPal order:', error);
            setPaymentStatus('Payment failed');
          } finally {
            setIsProcessing(false);
          }
        },
        onCancel: () => {
          setPaymentStatus('Payment cancelled');
          setIsProcessing(false);
        },
        onError: (err) => {
          console.error('PayPal error:', err);
          setPaymentStatus('Payment error');
          setIsProcessing(false);
        },
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'pay'
        }
      }).render(paypalButtonsRef.current);
      
      setShowPaypalButtons(true);
    }
  };

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
    setShowPaypalButtons(false);
  };

  const handleAmountSelect = (value) => {
    setAmount(value);
    setCustomAmount('');
    // Hide PayPal buttons when amount changes
    setShowPaypalButtons(false);
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/^0+/, '');
    setCustomAmount(value);
    setAmount('');
    // Hide PayPal buttons when amount changes
    setShowPaypalButtons(false);
  };

  const handlePaymentMethod = (method) => {
    setSelectedMethod(method);
    console.log(`Processing payment with ${method}`);
    console.log('Amount:', customAmount || amount);
    console.log('Type:', donationType);
    console.log('Medical Program:', selectedProgram);
    
    // If PayPal is selected and we have an amount, show the buttons
    if (method === 'paypal' && (customAmount || amount)) {
      setShowPaypalButtons(true);
    } else {
      setShowPaypalButtons(false);
    }
  };

  const validateForm = () => {
    if (!selectedProgram) {
      alert(selectedLanguage === 'fr' ? 'Veuillez sélectionner un programme médical' : 'Please select a medical program');
      return false;
    }
    
    if (!amount && !customAmount) {
      alert(selectedLanguage === 'fr' ? 'Veuillez sélectionner ou saisir un montant' : 'Please select or enter an amount');
      return false;
    }
    
    if (!selectedMethod) {
      alert(selectedLanguage === 'fr' ? 'Veuillez sélectionner une méthode de paiement' : 'Please select a payment method');
      return false;
    }
    
    return true;
  };

  const validatePhoneNumber = (phone) => {
    // Basic validation for Cameroon phone numbers (example)
    const phoneRegex = /^(237|\+237)?[6-9][0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  const resetForm = () => {
    setDonationType('once');
    setAmount('');
    setCustomAmount('');
    setSelectedMethod('');
    setShowPaypalButtons(false);
    setPhoneNumber('');
    setPhoneError('');
  };

  // Function to handle form submission for Mobile Money (MTN)
  const handleMomoSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // For MTN Momo, open the modal to get phone number
    setShowMomoModal(true);
  };

  // Function to process MTN MoMo payment after phone number is provided
  const processMomoPayment = async () => {
    // Validate phone number
    if (!phoneNumber) {
      setPhoneError(selectedLanguage === 'fr' ? 'Numéro de téléphone requis' : 'Phone number is required');
      return;
    }
    
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError(selectedLanguage === 'fr' ? 'Numéro de téléphone invalide' : 'Invalid phone number');
      return;
    }
    
    try {
      setIsProcessing(true);
      
      const paymentData = {
        amount: customAmount || amount,
        phoneNumber: phoneNumber,
        payerMessage: `${donationType === 'monthly' ? 'Monthly' : 'One-time'} donation for medical program`,
        donationType: donationType,
        medicalProgramId: selectedProgram,
        paymentMethod: 'momo'
      };

      // Initiate the payment
      const response = await initiatePayment(paymentData);
      
      if (response.response && response.transaction) {
        setPaymentStatus(selectedLanguage === 'fr' ? 'Paiement initié avec succès' : 'Payment initiated successfully');
        setShowSuccessMessage(true);
        setShowMomoModal(false);
        resetForm();
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to process MTN MoMo payment:', error.message || error);
      setPaymentStatus(selectedLanguage === 'fr' ? 'Échec du paiement' : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  // Generic form submission handler that routes to the correct payment method
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (selectedMethod === 'momo') {
      await handleMomoSubmit(e);
    }
    // PayPal is handled by the PayPal buttons
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      {/* {showSuccessMessage && (
        <div className="alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3" role="alert">
          {selectedLanguage === 'fr' ? 'Don effectué avec succès' : "Donation completed successfully"}
        </div>
      )} */}
      
      {showSuccessMessage && (
        <div className={`alert ${paymentStatus.includes('success') ? 'alert-success' : 'alert-info'} mb-4`} role="alert">
          {paymentStatus}
        </div>
      )}
      
      <h1 className="text-2xl font-bold text-center mb-4" style={{ color: '#17416F' }}>
        {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
          __html: contents?.donate_subscription_title?.content_fr
        }} />) : (<div dangerouslySetInnerHTML={{
          __html: contents?.donate_subscription_title?.content_en
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
              disabled={isProcessing}
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
            disabled={isProcessing}
          >
            <option value="">
              {selectedLanguage === 'fr' ? 'Choisir un programme médical' : 'Select a medical program'}
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
              disabled={isProcessing}
            >
              {item.label}
            </button>
          ))}
        </div>

        <input
          type="number"
          min="1"
          placeholder={selectedLanguage === 'fr' ? 
            (donationType === 'monthly' ? "Autre montant mensuel" : "Autre montant") : 
            (donationType === 'monthly' ? "Other Monthly Amount" : "Other Amount")}
          value={customAmount}
          onChange={handleCustomAmountChange}
          className="w-full p-2 border rounded mt-4"
          disabled={isProcessing}
        />

        <div className="space-y-3 mt-6">
          {[{ method: 'paypal', img: Paypal }, { method: 'momo', img: MTN }].map(({ method, img }) => (
            <div
              key={method}
              onClick={() => !isProcessing && handlePaymentMethod(method)}
              className={`relative flex items-center justify-center p-4 rounded-lg cursor-pointer ${isProcessing ? 'opacity-50' : 'hover:bg-gray-100'} transition`}
              style={{ backgroundColor: method === 'paypal' ? '#FFC439' : '#FFCB05' }}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === method}
                onChange={(e) => {
                  e.preventDefault();
                  handlePaymentMethod(method);
                }}
                className="absolute left-4 w-4 h-4 cursor-pointer"
                disabled={isProcessing}
              />
              <div className="flex items-center justify-center">
                <img src={img} alt={method} className="h-8" />
              </div>
            </div>
          ))}
        </div>

        {/* PayPal Buttons Container */}
        {selectedMethod === 'paypal' && showPaypalButtons && (
          <div ref={paypalButtonsRef} className="mt-4" />
        )}

        {/* Submit button for Mobile Money */}
        {selectedMethod === 'momo' && (
          <div className="text-center">
            <button 
              type="submit" 
              onClick={handleSubmit} 
              className='text-sm mt-4 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 transition'
              disabled={isProcessing}
            >
              <i className="bi bi-lock"></i> {isProcessing ? 
                (selectedLanguage === 'fr' ? 'Traitement...' : 'Processing...') : 
                (selectedLanguage === 'fr' ? contents?.subs_button?.content_fr : contents?.subs_button?.content_en)}
            </button>
          </div>
        )}
      </form>
      
      {/* MTN MoMo Phone Number Modal */}
      {showMomoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedLanguage === 'fr' ? 'Entrez votre numéro de téléphone' : 'Enter your phone number'}
              </h3>
              <button 
                onClick={() => setShowMomoModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {selectedLanguage === 'fr' ? 'Numéro de téléphone' : 'Phone Number'}
              </label>
              <input
                type="tel"
                className={`w-full p-2 border rounded ${phoneError ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={selectedLanguage === 'fr' ? 'Ex: 6XXXXXXXX' : 'E.g., 6XXXXXXXX'}
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setPhoneError('');
                }}
              />
              {phoneError && (
                <p className="text-red-500 text-xs mt-1">{phoneError}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {selectedLanguage === 'fr' 
                  ? 'Entrez votre numéro MTN sans préfixe international (exemple: 679123456)' 
                  : 'Enter your MTN number without international prefix (example: 679123456)'}
              </p>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowMomoModal(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                disabled={isProcessing}
              >
                {selectedLanguage === 'fr' ? 'Annuler' : 'Cancel'}
              </button>
              <button
                onClick={processMomoPayment}
                className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700"
                disabled={isProcessing}
              >
                {isProcessing 
                  ? (selectedLanguage === 'fr' ? 'Traitement...' : 'Processing...') 
                  : (selectedLanguage === 'fr' ? 'Payer' : 'Pay')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationForm;