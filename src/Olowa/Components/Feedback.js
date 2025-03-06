/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import "../index.css"; // Fichier CSS pour les styles
import nurseImage from "../../assets/male-nurse-working-clinic-b 1.png"; // Importation de l'image
import { Star } from "lucide-react";
import Select from './select';
import { addFeedback, getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';

const FeedbackSection = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: 5,
    yoursuggestions: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const response = await addFeedback(formData)
    console.log('Form submitted:', formData);
    // Add your submission logic here
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
        const savedContents = localStorage.getItem("contents");
        if (savedContents) {
          setContents(JSON.parse(savedContents));
        } else {
          // Fetch contents if not in localStorage
          const response = await getAllContents();
          setContents(response.data);
          localStorage.setItem("contents", JSON.stringify(response.data));
        }
      } catch (error) {
        console.error('Failed to fetch contents:', error.message || error);
      }
    };
    fetchContents();
  }, []);


  return (
    <section className="container-fluid py-5 Big" style={{ backgroundColor: "#13AB9C" }}>
      <div className="container">
        <div className="row" style={{ marginLeft: '20%' }}>
          <div className="col-lg-7 align-item-center">
            <h2 className="text-white" style={{ fontSize: 'clamp(25px, 8vw, 35px)', fontWeight: '700' }}>{selectedLanguage === 'fr' ? contents?.home_page_feedback_title.content_fr : contents?.home_page_feedback_title.content_en}</h2>
            <br />
            <a
              href="#"
              className="btn btn-wht text-white"
              style={{ border: '1px solid white' }}
              onClick={(e) => {
                e.preventDefault();
                setSelectedDoctor({
                  name: "Dr. John Doe",
                  image: nurseImage, // Remplace cette image par celle du médecin si nécessaire
                  specialty: "Cardiologist, MD, 10+ years experience.",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo.",
                });
              }}
            >
              {selectedLanguage === 'fr' ? contents?.home_page_feedback_button.content_fr : contents?.home_page_feedback_button.content_en}
            </a>
          </div>
          <div className="col-lg-5 position-relative d-none d-lg-block">
            <img src={nurseImage} alt="Male Nurse" className="man" />
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
                      <div className="">
                        <div className="mb-6">
                          <h1 className="text-2xl font-bold text-blue-900 text-center">
                            FEEDBACK & SUGGESTIONS
                          </h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="space-y-2">
                            <label className="block text-blue-900">
                              Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              style={{
                                border: '1px solid #17416F',
                                borderRadius: '0.25rem',  // équivalent à `rounded`
                                padding: '0.5rem',        // équivalent à `p-2`
                                width: '100%',            // équivalent à `w-full`
                                outline: 'none',
                                transition: 'box-shadow 0.2s ease-in-out',
                              }}
                              onFocus={(e) => {
                                e.target.style.boxShadow = '0 0 0 2px #17416F';
                              }}
                              onBlur={(e) => {
                                e.target.style.boxShadow = 'none';
                              }}
                              onChange={handleChange}
                              required
                              placeholder="Name"
                            />

                          </div>

                          <div className="space-y-2">
                            <label className="block text-blue-900">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              style={{
                                border: '1px solid #17416F',
                                borderRadius: '0.25rem',  // équivalent à `rounded`
                                padding: '0.5rem',        // équivalent à `p-2`
                                width: '100%',            // équivalent à `w-full`
                                outline: 'none',
                                transition: 'box-shadow 0.2s ease-in-out',
                              }}
                              onFocus={(e) => {
                                e.target.style.boxShadow = '0 0 0 2px #17416F';
                              }}
                              onBlur={(e) => {
                                e.target.style.boxShadow = 'none';
                              }}
                              onChange={handleChange}
                              required
                              placeholder="Email Address"
                            />

                          </div>

                          <div className="space-y-2">
                            <label className="block text-blue-900">How was your experience</label>
                            {/* <Select /> */}
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                  key={rating}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, yourexperience: rating }))}
                                  className="focus:outline-none"
                                >
                                  <i className={`bi bi-star-fill fs-3 ${
                                      rating <= formData.yourexperience
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}></i>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-blue-900">Your Suggestions</label>
                            <textarea
                              name="yoursuggestions"
                              value={formData.yoursuggestions}
                              style={{
                                border: '1px solid #17416F',
                                borderRadius: '0.25rem',  // équivalent à `rounded`
                                padding: '0.5rem',        // équivalent à `p-2`
                                width: '100%',            // équivalent à `w-full`
                                height: '8rem',           // équivalent à `h-32`
                                resize: 'none',           // équivalent à `resize-none`
                                outline: 'none',
                                transition: 'box-shadow 0.2s ease-in-out',
                              }}
                              onFocus={(e) => {
                                e.target.style.boxShadow = '0 0 0 2px #17416F';
                              }}
                              onBlur={(e) => {
                                e.target.style.boxShadow = 'none';
                              }}
                              onChange={handleChange}
                              placeholder="Type here"
                            />

                          </div>

                          <div className="d-flex justify-content-center">
                            <button
                              type="submit"
                              className="px-5 text-white btn btn-w"
                              
                              style={{ background: '#13AB9C' }}
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <button
                      onClick={() => setSelectedDoctor(null)}
                      className="btn-close text-white fs-4 fw-bold bg-white"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedDoctor && <div className="modal-backdrop fade show" onClick={() => setSelectedDoctor(null)}></div>}
    </section>
  );
};

export default FeedbackSection;
