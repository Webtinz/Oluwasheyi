/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useEffect, useState, useContext } from "react";
import "../index.css"; // Fichier CSS pour les styles
import chatbotIcon from "../../assets/chatbot.png";
import whatsappIcon from "../../assets/whatsapp.png";
import { addSuscriber, getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';
import { format } from "date-fns";
import { Link } from "react-router-dom";


const Footer = () => {
  const { selectedLanguage } = useContext(LanguageContext);
  const [contents, setContents] = useState();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!email) {
      setMessage("Please enter an email address.");
      return;
    }

    try {

      const result = await addSuscriber({ email: email });

      if (result) {
        setMessage("Subscription successful! 🎉");
        setEmail("");
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage(error.message || "Something went wrong.");
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    }
  };
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
    <footer className="container-fluid mt-4 mb-4">
      <div className="container">
        <div className="row text-md-start p-4 foo">
          {/* Section Abonnement Email */}
          <div className="foo2 col-md-4 mb-4 mb-md-0 px-0 px-lg-4">
            <h5 className="footer-title" style={{ fontWeight: '700' }}>
              {selectedLanguage === 'fr' ? contents?.footer_suscribe_col_title.content_fr : contents?.footer_suscribe_col_title.content_en}
            </h5>
            <p className="footer-text mt-3">
              {selectedLanguage === 'fr' ? contents?.footer_suscribe_col_desc.content_fr : contents?.footer_suscribe_col_desc.content_en}
            </p>
            <div className="me-2 position-relative mt-3">
              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="form-control py-2 position-relative"
                  placeholder="Email Address"
                  style={{ border: "1px solid #17416F" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="text-decoration-none text-dark position-absolute poss">
                  <i className="bi bi-chevron-right ppo" style={{ background: "#13AB9C", color: "white" }}></i>
                </button>
              </form>
                {showSuccessMessage && <p className={message.includes('successful') ? 'text-success' : 'text-danger'} >{message}</p>}
            </div>
            <div className="d-flex mt-3">
              <a href={contents?.footer_social_1_link.content_fr} ><i className={'bi bi-' + contents?.footer_social_1.content_fr + ' social-icon'}></i></a>
              <a href={contents?.footer_social_2_link.content_fr} ><i className={'bi bi-' + contents?.footer_social_2.content_fr + ' social-icon'}></i></a>
              <a href={contents?.footer_social_3_link.content_fr} ><i className={'bi bi-' + contents?.footer_social_3.content_fr + ' social-icon'}></i></a>
              <a href={contents?.footer_social_4_link.content_fr} ><i className={'bi bi-' + contents?.footer_social_4.content_fr + ' social-icon'}></i></a>
            </div>
          </div>

          {/* Section Contact */}
          <div className="foo2 col-md-3 mb-4 mb-md-0 px-0 px-lg-4">
            <h5 className="footer-title" style={{ fontWeight: '700' }}>
              {selectedLanguage === 'fr' ? contents?.footer_contact_col_title.content_fr : contents?.footer_contact_col_title.content_en}
            </h5>
            <p className="footer-text mt-3 d-flex">
              <i className="bi bi-telephone me-2 ocn"></i>
              {selectedLanguage === 'fr' ? contents?.footer_contact_col_number.content_fr : contents?.footer_contact_col_number.content_en}
            </p>
            <p className="footer-text mt-3">
              <i className="bi bi-geo-alt-fill me-2" style={{ fontSize: '28px' }}></i>
              {selectedLanguage === 'fr' ? contents?.footer_contact_col_address.content_fr : contents?.footer_contact_col_address.content_en}
            </p>
          </div>

          {/* Section Horaires */}
          <div className="foo2 col-md-2 mb-4 mb-md-0 px-0 px-lg-4">
            <h5 className="footer-title" style={{ fontWeight: '700' }}>
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
          <div className="foo2 col-md-3 mb-4 mb-md-0 px-0 px-lg-4">
            <h5 className="footer-title" style={{ fontWeight: '700' }}>
              {selectedLanguage === 'fr' ? contents?.footer_about_col_title.content_fr : contents?.footer_about_col_title.content_en}
            </h5>
            <ul className="list-unstyled mt-3">
              <li className="footer-text">
                <Link to="/about">{selectedLanguage === 'fr' ? contents?.home_page_banner_link1.content_fr : contents?.home_page_banner_link1.content_en}
                </Link>
              </li>
              <li className="footer-text">
                <Link to="/community">{selectedLanguage === 'fr' ? contents?.home_page_banner_link2.content_fr : contents?.home_page_banner_link2.content_en}
                </Link>
              </li>
              <li className="footer-text">
                <Link to="/service">
                  {selectedLanguage === 'fr' ? contents?.home_page_banner_link3.content_fr : contents?.home_page_banner_link3.content_en}
                </Link>
              </li>
              {/* <li className="footer-text">
              <Link to="/index">
                {selectedLanguage === 'fr' ? contents?.home_page_banner_link4.content_fr : contents?.home_page_banner_link4.content_en}
                </Link>
              </li> */}
              <li className="footer-text">
                <Link to="/testimonial">
                  {selectedLanguage === 'fr' ? contents?.home_page_banner_link5.content_fr : contents?.home_page_banner_link5.content_en}
                </Link>
              </li>

            </ul>
          </div>
        </div>

        {/* Séparateur et Chatbot */}
        <div className="position-relative">
          <span className="d-block my-4 separator"></span>
          <div className="d-flex flex-column ppos">
            <a href="#"><img src={chatbotIcon} alt="Chatbot" className="chat-icon" /></a>
            <a href={"https://wa.me/"+contents?.footer_whatsapp_number.content_fr}><img src={whatsappIcon} alt="WhatsApp" className="chat-icon mt-2" /></a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="copyright-text">©{format(new Date(), "yyyy")} {selectedLanguage === 'fr' ? contents?.footer_foot.content_fr : contents?.footer_foot.content_en}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
