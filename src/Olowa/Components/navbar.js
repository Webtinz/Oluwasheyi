import React, { useState, useEffect, useRef, useContext } from 'react';
import './navbar.css'; // Importez le CSS pour votre navbar
// import Img from '../../assets/image 1.svg';
import Img1 from '../../assets/hamburger-menu.svg';
import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.min.css';
import { Link } from "react-router-dom";
import { getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';

// Composant pour le sélecteur de langue stylisé
const StyledLanguageSelect = ({ selectedLanguage, handleLanguageChange }) => {
  // Drapeaux SVG pour chaque langue
  const flagComponents = {
    en: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        style={{
          position: "absolute",
          left: "0.3rem", // équivalent à left-2
          top: "50%", // équivalent à top-1/2
          transform: "translateY(-50%)", // équivalent à -translate-y-1/2
          borderRadius: '50%'
        }}
      >
        <circle cx="12" cy="12" r="12" fill="#FFFFFF" />
        <clipPath id="flagClip">
          <circle cx="12" cy="12" r="11" />
        </clipPath>
        <g clipPath="url(#flagClip)">
          {/* Union Jack */}
          <rect x="0" y="0" width="24" height="24" fill="#012169" />
          <path d="M0,0 L24,24 M24,0 L0,24" stroke="#FFFFFF" strokeWidth="4" />
          <path d="M12,0 L12,24 M0,12 L24,12" stroke="#FFFFFF" strokeWidth="6" />
          <path d="M12,0 L12,24 M0,12 L24,12" stroke="#C8102E" strokeWidth="4" />
          <path d="M0,0 L24,24 M24,0 L0,24" stroke="#C8102E" strokeWidth="2" />
        </g>
      </svg>
    ),
    fr: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        style={{
          position: "absolute",
          left: "0.3rem", // équivalent à left-2
          top: "50%", // équivalent à top-1/2
          transform: "translateY(-50%)", // équivalent à -translate-y-1/2
          borderRadius: '50%'
        }}
      >
        <circle cx="12" cy="12" r="12" fill="#FFFFFF" />
        <clipPath id="flagClipFr">
          <circle cx="12" cy="12" r="11" />
        </clipPath>
        <g clipPath="url(#flagClipFr)">
          <rect x="0" y="0" width="8" height="24" fill="#0055A4" />
          <rect x="8" y="0" width="8" height="24" fill="#FFFFFF" />
          <rect x="16" y="0" width="8" height="24" fill="#EF4135" />
        </g>
      </svg>
    )
  };

  const containerStyle = {
    position: 'relative',
    display: 'inline-block'
  };

  const selectStyle = {
    paddingLeft: '32px',
    paddingRight: '24px',
    border: 'none',
    cursor: 'pointer',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none'
  };

  const arrowStyle = {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none'
  };

  return (
    <div style={containerStyle}>
      {/* Affiche le drapeau de la langue sélectionnée */}
      <div style={{ position: 'absolute', left: '5px', top: '50%', transform: 'translateY(-50%)', zIndex: 1, pointerEvents: 'none' }}>
        {flagComponents[selectedLanguage]}
      </div>

      {/* Flèche personnalisée */}
      <div style={arrowStyle}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Le select original avec style modifié */}
      <select
        className="form-control"
        id="languageSelect"
        onChange={(e) => handleLanguageChange(e.target.value)}
        value={selectedLanguage}
        style={selectStyle}
        aria-label="Small select example"
      >
        <option value="en">En</option>
        <option value="fr">Fr</option>
      </select>
    </div>
  );
};

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const languageSelectRef = useRef(null);
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
  const [contents, setContents] = useState();

  // Handle language change and store the selected language in localStorage
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
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


  useEffect(() => {
    if (languageSelectRef.current) {
      $(languageSelectRef.current).select2({
        templateResult: function (state) {
          if (!state.id) {
            return state.text;
          }
          return $(
            `<span><img src="image/${state.element.value}.png" className="img-flag" style="width: 20px; height: 15px; margin-right: 10px;" /> ${state.text}</span>`
          );
        },
        templateSelection: function (state) {
          return state.text;
        }
      });
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <section className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container">
          {/* Logo Section */}
          <div className='d-flex'>
            <div className='align-self-center'>
              <span onClick={toggleMenu} className='d-flex' style={{ cursor: 'pointer' }}>
                <img src={Img1} alt="" className="menu-icon ms-2" /> <span className='mt-3'>Menu</span>
              </span>
            </div>
            <div>
              <Link to="/index">
                <img src={contents?.home_page_header_logo.image} alt="" />
              </Link >
            </div>
          </div>

          {/* Menu Section */}
          <div className={`menu ${isMenuActive ? 'active' : ''}`} id="menu">
            <ul className='list-unstyled' style={{ lineHeight: '45px' }}>
              <li>
                <Link to="/index" className="text-white" style={{ fontWeight: '700', fontSize: '24px', textTransform: 'uppercase' }}>{selectedLanguage === 'fr' ? contents?.home_page_home.content_fr : contents?.home_page_home.content_en}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white" style={{ fontWeight: '700', fontSize: '24px', textTransform: 'uppercase' }}>{selectedLanguage === 'fr' ? contents?.home_page_banner_link1.content_fr : contents?.home_page_banner_link1.content_en}</Link>
              </li>
              <li>
                <Link to="/about" className="text-white" style={{ fontWeight: '700', fontSize: '24px', textTransform: 'uppercase' }}>{selectedLanguage === 'fr' ? contents?.home_page_banner_link1.content_fr : contents?.home_page_banner_link1.content_en}</Link>
              </li>
              <li>
                <Link to="/community" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: '24px', }}>{selectedLanguage === 'fr' ? contents?.home_page_menu_community.content_fr : contents?.home_page_menu_community.content_en}</Link>
              </li>
              <li>
                <Link to="/meet" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: '24px', }}>{selectedLanguage === 'fr' ? contents?.home_page_menu_meet.content_fr : contents?.home_page_menu_meet.content_en}</Link>
              </li>
              <li>
                <Link to="/department" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: '24px', }}>{selectedLanguage === 'fr' ? contents?.home_page_menu_departments.content_fr : contents?.home_page_menu_departments.content_en}</Link>
              </li>
              <li>
                <Link to="/testimonial" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: '24px', }}>{selectedLanguage === 'fr' ? contents?.home_page_menu_Testimonials.content_fr : contents?.home_page_menu_Testimonials.content_en}</Link>
              </li>
              <li>
                <Link to="/service" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: '24px', }}>{selectedLanguage === 'fr' ? contents?.home_page_menu_Service.content_fr : contents?.home_page_menu_Service.content_en}</Link>
              </li>
              {/* <li>
                <Link to="/sugery" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: '24px', }}>{selectedLanguage === 'fr' ? contents?.home_page_menu_Sugery.content_fr : contents?.home_page_menu_Sugery.content_en}</Link>
              </li> */}
              <li className='d-lg-none'>
                <Link to="/donate"
                  className="btn btn-white px-5"
                  style={{ backgroundColor: '#13AB9C', color: 'white', fontWeight: 700, fontSize: '22px' }}
                >
                  {selectedLanguage === 'fr' ? contents?.home_page_header_donate.content_fr : contents?.home_page_header_donate.content_en}
                </Link>
              </li>
              <li className='d-lg-none'>
                <StyledLanguageSelect
                  selectedLanguage={selectedLanguage}
                  handleLanguageChange={handleLanguageChange}
                />
              </li>
            </ul>

            {/* <div className="d-lg-none">
              <div className="d-flex flex-column">
                <div className="d-flex mt-4">
                  <div>
                    <Link to="/donate"
                      className="btn btn-white px-5"
                      style={{ backgroundColor: '#13AB9C', color: 'white', fontWeight: 700, fontSize: '22px' }}
                    >
                      {selectedLanguage === 'fr' ? contents?.home_page_header_donate.content_fr : contents?.home_page_header_donate.content_en}
                    </Link>
                  </div>
                  <div className="ms-2">
                    <StyledLanguageSelect
                      selectedLanguage={selectedLanguage}
                      handleLanguageChange={handleLanguageChange}
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>


          {/* Desktop View */}
          <div className="d-none d-lg-block">
            <div className="d-flex">
              <div className="d-flex">
                <div>
                  <Link to="/donate"
                    className="btn btn-white px-4"
                    style={{ backgroundColor: '#13AB9C', color: 'white', fontWeight: 600 }}
                  >
                    {selectedLanguage === 'fr' ? contents?.home_page_header_donate.content_fr : contents?.home_page_header_donate.content_en}
                  </Link>
                </div>
                {/* Sélecteur de langue stylisé pour la version desktop */}
                <div className="ms-2">
                  <StyledLanguageSelect
                    selectedLanguage={selectedLanguage}
                    handleLanguageChange={handleLanguageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;