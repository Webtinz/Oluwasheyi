import React from "react";
import "../index.css"; // Fichier CSS pour les styles
import chatbotIcon from "../../assets/chatbot.png";
import whatsappIcon from "../../assets/whatsapp.png";

const Footer = () => {
  return (
    <footer className="container-fluid py-4 mt-4">
      <div className="container">
        <div className="row text-center text-md-start p-4">
          {/* Section Abonnement Email */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="footer-title" style={{fontWeight:'700'}}>Subscribe Email</h5>
            <p className="footer-text mt-3">Stay Updated on Health Tips and Hospital News</p>
            <div className="me-2 position-relative mt-3">
              <input type="search" className="form-control ppoo" placeholder="Email Address" />
              <a href="#" className="text-decoration-none text-dark position-absolute poss">
                <i className="bi bi-chevron-right ppo"></i>
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
            <h5 className="footer-title" style={{fontWeight:'700'}}>Contact Us</h5>
            <p className="footer-text mt-3">
              <i className="bi bi-whatsapp me-2"></i> +229 554 29999
            </p>
            <p className="footer-text mt-3">
              <i className="bi bi-geo-alt-fill me-2"></i> Gbegamey 06 BP 2102, Cotonou, Benin
            </p>
          </div>

          {/* Section Horaires */}
          <div className="col-md-2 mb-4 mb-md-0">
            <h5 className="footer-title" style={{fontWeight:'700'}}>Hours</h5>
            <p className="footer-text mt-3">Mon - Sat : 9AM - 5PM</p>
            <p className="footer-text">Sun : Closed</p>
            <p className="footer-text mt-3">Emergency 24X7 Open</p>
          </div>

          {/* Section À propos */}
          <div className="col-md-2 mb-4 mb-md-0">
            <h5 className="footer-title" style={{fontWeight:'700'}}>About</h5>
            <ul className="list-unstyled mt-3">
              <li className="footer-text">About us</li>
              <li className="footer-text">Community engagement</li>
              <li className="footer-text">Our services</li>
              <li className="footer-text">Patient portal</li>
              <li className="footer-text">Health advice</li>
              <li className="footer-text">Contact</li>
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
