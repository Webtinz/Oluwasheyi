import { React, useEffect, useState } from "react";
import "../index.css"; // Fichier CSS pour les styles
import chatbotIcon from "../../assets/chatbot.png";
import whatsappIcon from "../../assets/whatsapp.png";
import { getAllContents } from '../../services/content.service';

const Footer = () => {
  const savedLanguage = localStorage.getItem("selectedLanguage") || "fr";
  const [selectedLanguage, setSelectedLanguage] = useState(savedLanguage);
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
    <footer className="container-fluid py-4 mt-4">
      <div className="container">
        <div className="row text-center text-md-start p-4">
          {/* Section Abonnement Email */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="footer-title" style={{ fontWeight: '700', fontSize: '25px' }}>
              {selectedLanguage === 'fr' ? contents?.footer_suscribe_col_title.content_fr : contents?.footer_suscribe_col_title.content_en}
            </h5>
            <p className="footer-text mt-3">
              {selectedLanguage === 'fr' ? contents?.footer_suscribe_col_desc.content_fr : contents?.footer_suscribe_col_desc.content_en}
            </p>
            <div className="me-2 position-relative mt-3">
              <input type="search" className="form-control py-2" placeholder="Email Address" style={{ border: '1px solid #17416F' }} />
              <a href="#" className="text-decoration-none text-dark position-absolute poss">
                <i className="bi bi-chevron-right ppo" style={{ background: '#13AB9C', color: 'white' }}></i>
              </a>
            </div>
            <div className="d-flex mt-3">
              <i className="bi bi-facebook social-icon"></i>
              <i className="bi bi-instagram social-icon"></i>
              <i className="bi bi-youtube social-icon"></i>
              <i className="bi bi-linkedin social-icon"></i>
            </div>
          </div>

          {/* Section Contact */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="footer-title" style={{ fontWeight: '700', fontSize: '25px' }}>
              {selectedLanguage === 'fr' ? contents?.footer_contact_col_title.content_fr : contents?.footer_contact_col_title.content_en}
            </h5>
            <p className="footer-text mt-3">
              <i className="bi bi-whatsapp me-2"></i>
              {selectedLanguage === 'fr' ? contents?.footer_contact_col_number.content_fr : contents?.footer_contact_col_number.content_en}
            </p>
            <p className="footer-text mt-3">
              <i className="bi bi-geo-alt-fill me-2"></i>
              {selectedLanguage === 'fr' ? contents?.footer_contact_col_address.content_fr : contents?.footer_contact_col_address.content_en}
            </p>
          </div>

          {/* Section Horaires */}
          <div className="col-md-2 mb-4 mb-md-0">
            <h5 className="footer-title" style={{ fontWeight: '700', fontSize: '25px' }}>
              {selectedLanguage === 'fr' ? contents?.footer_hours_col_title.content_fr : contents?.footer_hours_col_title.content_en}
            </h5>
            <p className="footer-text mt-3">
              {selectedLanguage === 'fr' ? contents?.footer_hours_col_open_hours.content_fr : contents?.footer_hours_col_open_hours.content_en}
            </p>
            {/* <p className="footer-text">Sun : Closed</p> */}
            <p className="footer-text mt-3">
              {selectedLanguage === 'fr' ? contents?.footer_hours_col_emergency.content_fr : contents?.footer_hours_col_emergency.content_en}
            </p>
          </div>

          {/* Section À propos */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="footer-title" style={{ fontWeight: '700', fontSize: '25px' }}>
              {selectedLanguage === 'fr' ? contents?.footer_about_col_title.content_fr : contents?.footer_about_col_title.content}
            </h5>
            <ul className="list-unstyled mt-3">
              <li className="footer-text">
                {selectedLanguage === 'fr' ? contents?.home_page_banner_link1.content_fr : contents?.home_page_banner_link1.content_en}
              </li>
              <li className="footer-text">
                {selectedLanguage === 'fr' ? contents?.home_page_banner_link2.content_fr : contents?.home_page_banner_link2.content_en}
              </li>
              <li className="footer-text">
                {selectedLanguage === 'fr' ? contents?.home_page_banner_link3.content_fr : contents?.home_page_banner_link3.content_en}
              </li>
              <li className="footer-text">
                {selectedLanguage === 'fr' ? contents?.home_page_banner_link4.content_fr : contents?.home_page_banner_link4.content_en}
              </li>
              <li className="footer-text">
                {selectedLanguage === 'fr' ? contents?.home_page_banner_link5.content_fr : contents?.home_page_banner_link5.content_en}
              </li>
              <li className="footer-text">
                {selectedLanguage === 'fr' ? contents?.home_page_banner_link6.content_fr : contents?.home_page_banner_link6.content_en}
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur et Chatbot */}
        <div className="position-relative">
          <span className="d-block my-4 separator"></span>
          <div className="d-flex flex-column ppos">
            <a href="#"><img src={chatbotIcon} alt="Chatbot" className="chat-icon" /></a>
            <a href="#"><img src={whatsappIcon} alt="WhatsApp" className="chat-icon mt-2" /></a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="copyright-text">©2025 Clinique Polyvalente OLUWA SHEYI</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
