import React, { useContext, useEffect, useState } from 'react';
import "../index.css"; // Fichier CSS pour les styles
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img.png";
import Mask2 from '../../assets/Fr.png';
import { getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';

const WelcomeSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
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
    <section className="mt-4 container">
      <div className="row">
        {/* Image principale avec l'image circulaire en superposition */}
        <div className="col-lg-5 mb-3 mx-auto">
          <div className="position-relative">
            <img src={img1} alt="" className="image-fluid w-100 main-img" style={{ maxHeight: '100vh', objectFit: 'cover' }} />
            <div className="position-absolute overlay-img">
              <img src={img2} alt="" className="image-fluid small-img" />
            </div>
            <div className="abso">
              <img src={Mask2} alt="" style={{ width: '80%' }} />
            </div>
          </div>
        </div>

        {/* Texte et bouton Learn More */}
        <div className="col-lg-6 mb-3 mx-auto px-5">
          <div className="p-4 trt">
            <h2 className="mt-3 section-title" style={{ fontSize: '36px' }}>
              {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                __html: contents?.home_page_welcome_title.content_fr
              }} />) : (<div dangerouslySetInnerHTML={{
                __html: contents?.home_page_welcome_title.content_en
              }} />)}
              {/* Welcome to <br/> Clinique Polyvalente <br/> OLUWA SHEYI */}
            </h2>
            <br />
            <p className="section-text">
              {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                __html: contents?.welcom_desp_2.content_fr
              }} />) : (<div dangerouslySetInnerHTML={{
                __html: contents?.welcom_desp_2.content_en
              }} />)}
            </p>

            {/* Contenu supplémentaire affiché uniquement si isExpanded est true */}
            {isExpanded && (
              <div className="extra-content">
                <p className="section-text">
                  {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                    __html: contents?.welcom_desp_2.content_fr
                  }} />) : (<div dangerouslySetInnerHTML={{
                    __html: contents?.welcom_desp_2.content_en
                  }} />)}
                </p>
              </div>
            )}

            {/* Bouton Learn More / Read Less */}
            <div className="mt-3">
              <button className="btn btn-w px-4 py-2 toggle-button" onClick={toggleContent}>
                {isExpanded
                  ? (selectedLanguage === 'fr'
                    ? contents?.home_page_welcome_button.content_fr
                    : contents?.home_page_welcome_button.content_en)
                  : (selectedLanguage === 'fr'
                    ? contents?.home_page_welcome_button.content_fr
                    : contents?.home_page_welcome_button.content_en)}

                <i className={`bi ${isExpanded ? "bi-chevron-up" : "bi-chevron-down"} ms-1`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
