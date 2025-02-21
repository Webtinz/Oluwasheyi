import React, { useState, useEffect, useRef } from 'react';
import './navbar.css'; // Importez le CSS pour votre navbar
import Img from '../../assets/image 1.svg';
import Img1 from '../../assets/hamburger-menu.svg';
import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.min.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const languageSelectRef = useRef(null);

  useEffect(() => {
    if (languageSelectRef.current) {
      $(languageSelectRef.current).select2({
        templateResult: function(state) {
          if (!state.id) {
            return state.text;
          }
          return $(
            `<span><img src="image/${state.element.value}.png" class="img-flag" style="width: 20px; height: 15px; margin-right: 10px;" /> ${state.text}</span>`
          );
        },
        templateSelection: function(state) {
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
              <span onClick={toggleMenu} className='d-flex'>
                <img src={Img1} alt="" className="menu-icon ms-2" /> <span className='mt-3'>Menu</span>
              </span>
            </div>
            <div>
              <Link to="/index">
                <img src={Img} alt="" />
              </Link >
            </div>
          </div>

          {/* Menu Section */}
          <div className={`menu ${isMenuActive ? 'active' : ''}`} id="menu">
            <ul className='list-unstyled' style={{lineHeight:'45px'}}>
              <li>
                  <Link to="/about" className="text-white" style={{fontWeight:'700', fontSize:'24px', textTransform:'uppercase'}}>About us</Link>
              </li>
              <li>
                <Link to="/community" style={{ textTransform: 'uppercase',fontWeight:'700', fontSize:'24px', }}>Community</Link>
              </li>
              <li>
                <Link to="/meet" style={{ textTransform: 'uppercase',fontWeight:'700', fontSize:'24px', }}>Meet</Link>
              </li>
              <li>
                <Link to="/department" style={{ textTransform: 'uppercase',fontWeight:'700', fontSize:'24px', }}>Departements</Link>
              </li>
              <li>
                <Link to="/testimonial" style={{ textTransform: 'uppercase',fontWeight:'700', fontSize:'24px', }}>Testimonials</Link>
              </li>
              <li>
                <Link to="/service" style={{ textTransform: 'uppercase',fontWeight:'700', fontSize:'24px', }}>Service</Link>
              </li>
              <li>
                <Link to="/sugery" style={{ textTransform: 'uppercase',fontWeight:'700', fontSize:'24px', }}>Service Sugery</Link>
              </li>
            </ul>

            <div className="d-lg-none">
              <div className="d-flex flex-column">
                {/* <div className="me-2 position-relative">
                  <input
                    type="search"
                    className="form-control ppoo"
                    placeholder="Search"
                    style={{ border: 'none', borderBottom: '1px solid #0000001A', borderRadius: 0 }}
                  />
                  <a href="" className="text-decoration-none text-dark position-absolute ppo-container">
                    <i className="bi bi-search ppo"></i>
                  </a>
                </div> */}
                <div className="d-flex mt-4">
                  <div>
                    <Link to="/donate"
                      className="btn btn-white px-5"
                      style={{ backgroundColor: '#13AB9C', color: 'white', fontWeight: 700, fontSize:'22px' }}
                    >
                      Donate
                    </Link>
                  </div>
                  {/* <div className="ms-2">
                    <select className="form-select" id="languageSelect" ref={languageSelectRef} aria-label="Small select example">
                      <option value="en" selected>
                         EN
                      </option>
                      <option value="fr">
                         Fr
                      </option>
                    </select>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          
          {/* Desktop View */}
          <div className="d-none d-lg-block">
            <div className="d-flex">
              <div className="me-2 position-relative">
                <input
                  type="search"
                  className="form-control ppoo"
                  placeholder="Search"
                  style={{ border: 'none', borderBottom: '1px solid #0000001A', borderRadius: 0 }}
                />
                <a href="" className="text-decoration-none text-dark position-absolute ppo-container">
                  <i className="bi bi-search ppo"></i>
                </a>
              </div>
              <div className="d-flex">
                <div>
                  <Link to="/donate"
                    className="btn btn-white px-4"
                    style={{ backgroundColor: '#13AB9C', color: 'white', fontWeight: 600 }}
                  >
                    Donate
                  </Link>
                </div>
                <div className="ms-2">
                  <select className="form-select" id="languageSelect" aria-label="Small select example">
                    <option value="en" selected>
                       EN
                    </option>
                    <option value="fr">
                       Fr
                    </option>
                  </select>
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
