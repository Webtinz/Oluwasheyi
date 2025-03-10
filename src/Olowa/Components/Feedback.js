/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import "../index.css"; // Fichier CSS pour les styles
import nurseImage from "../../assets/male-nurse-working-clinic-b 1.png"; // Importation de l'image
// import { Star } from "lucide-react";
// import Select from './select';
import { addFeedback, getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';

const FeedbackSection = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: 5,
    yoursuggestions: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await addFeedback(formData);
      console.log('Form submitted:', formData);

      // Fermer le modal
      setSelectedDoctor(null);

      // Afficher la notification de succès
      setShowSuccessMessage(true);

      // Masquer la notification après 5 secondes
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const { selectedLanguage } = useContext(LanguageContext);
  const [contents, setContents] = useState();

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

  return (
    <section className="container-fluid py-5 Big" style={{ backgroundColor: "#13AB9C" }}>
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="row" style={{ width: '80%' }}>
            <div className="col-lg-7 align-self-center">
              <h2 className="text-white home-title" style={{textTransform:'uppercase'}}>
                {selectedLanguage === 'fr' ? contents?.home_page_feedback_title.content_fr : contents?.home_page_feedback_title.content_en}
              </h2>
              <br />
              <a
                href="#"
                className="btn btn-wht text-white btn-custom"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedDoctor({
                    name: "Dr. John Doe",
                    image: nurseImage,
                    specialty: "Cardiologist, MD, 10+ years experience.",
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo.",
                  });
                }}
              >
                {selectedLanguage === 'fr' ? contents?.home_page_feedback_button.content_fr : contents?.home_page_feedback_button.content_en}
              </a>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <div className="position-relative nurse-container">
                <img src={contents?.feedback_img.image}  alt="Male Nurse" className="man" />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Modal */}
      {selectedDoctor && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body position-relative">
                <div className="d-flex justify-content-center">
                  <div className="col">
                    <div className="color">
                      <div className="mb-6">
                        <h1 className="text-2xl font-bold text-blue-900 text-center">
                          {selectedLanguage === 'fr' ? contents?.feedback_title.content_fr : contents?.feedback_title.content_en}
                        </h1>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <label className="block text-blue-900">
                            {selectedLanguage === 'fr' ? contents?.feedback_label_1.content_fr : contents?.feedback_label_1.content_en} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Name"
                            className="form-control"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-blue-900">
                            {selectedLanguage === 'fr' ? contents?.feedback_label_2.content_fr : contents?.feedback_label_2.content_en} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Email Address"
                            className="form-control"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-blue-900">{selectedLanguage === 'fr' ? contents?.feedback_label_3.content_fr : contents?.feedback_label_3.content_en}</label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, experience: rating }))}
                                className={`bi bi-star-fill fs-3 ${rating <= formData.experience
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                                  }`}
                              ></button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-blue-900">{selectedLanguage === 'fr' ? contents?.feedback_label_4.content_fr : contents?.feedback_label_4.content_en}</label>
                          <textarea
                            name="yoursuggestions"
                            value={formData.yoursuggestions}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="form-control"
                          />
                        </div>

                        <div className="d-flex justify-content-center">
                          <button type="submit" className="btn btn-primary">
                            {selectedLanguage === 'fr' ? contents?.feedback_button.content_fr : contents?.feedback_button.content_en}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col">
                    <button
                      onClick={() => setSelectedDoctor(null)}
                      className="btn-close"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedDoctor && <div className="modal-backdrop fade show" onClick={() => setSelectedDoctor(null)}></div>}

      {/* Notification de succès */}
      {showSuccessMessage && (
        <div className="alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3" role="alert">
          {selectedLanguage === 'fr' ? contents?.feedback_notif.content_fr : contents?.feedback_notif.content_en}
        </div>
      )}
    </section>
  );
};

export default FeedbackSection;
