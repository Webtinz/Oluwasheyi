import React from 'react';
import '../index.css'
import Mask1Image from '../../assets/Mask1.png';
import { Link } from "react-router-dom";

const About = () => {

  return (
    <div className="container-fluid">
        <div className="row align-items-center">
            <div className="col-md-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {/* Slide 1 */}
                        <div className="carousel-item active">
                            <div className="row g-0 align-items-stretch">
                                {/* Colonne Texte */}
                                <div className="col-lg-6 col-md-12 d-flex">
                                    <div 
                                        className="carousel-content d-flex flex-column justify-content-center align-items-start p-4 w-100"
                                        style={{ background: '#17416F', color: 'white', height: '80vh' }}
                                    >
                                         <div className='d-flex justify-content-center'>
                                            <div className="text-start" style={{width:'70%', marginLeft:'8rem'}}>
                                                <h2 style={{ fontWeight: 700, fontSize:'40px' }}>Your Partner in Health and Healing</h2>
                                                <br/>
                                                <p>Comprehensive care, cutting-edge technology, and a compassionate team</p>
                                                <br/>
                                                <div>
                                                    <Link to="/about" className="btn btn-cus text-white me-2" style={{ backgroundColor: '#13AB9C', padding: '10px 15px' }}>
                                                        About us
                                                    </Link>
                                                    <Link to="/" className="btn btn-outline-light" style={{ padding: '10px 15px' }}>
                                                        Book Appointment
                                                    </Link>
                                                </div>
                                            </div>
                                         </div>
                                    </div>
                                </div>

                                {/* Colonne Image */}
                                <div className="col-lg-6 col-md-12">
                                    <img 
                                        src={Mask1Image} 
                                        alt="Image de la clinique" 
                                        className="img-fluid w-100 h-100" 
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Slide 1 */}
                        <div className="carousel-item">
                            <div className="row g-0 align-items-stretch">
                                {/* Colonne Texte */}
                                <div className="col-lg-6 col-md-12 d-flex">
                                    <div 
                                        className="carousel-content d-flex justify-content-center align-items-center w-100 p-4"
                                        style={{ background: '#13AB9C', color: 'white', height: '80vh' }}
                                    >
                                        <div className="wm text-start">
                                            <ul className="list-unstyled m-0 p-0">
                                                <li><Link to="/about" className="text-white d-block" style={{ fontWeight: '700', fontSize: '20px', textTransform: 'uppercase', fontSize:'30px' }}>About us</Link></li>
                                                <li><Link to="/community" className="text-white d-block" style={{ fontWeight: '700', fontSize: '20px', textTransform: 'uppercase', fontSize:'30px' }}>Community engagement</Link></li>
                                                <li><Link to="/service" className="text-white d-block" style={{ fontWeight: '700', fontSize: '20px', textTransform: 'uppercase', fontSize:'30px' }}>Our services</Link></li>
                                                <li><Link to="/" className="text-white d-block" style={{ fontWeight: '700', fontSize: '20px', textTransform: 'uppercase', fontSize:'30px' }}>Patient portal</Link></li>
                                                <li><Link to="/" className="text-white d-block" style={{ fontWeight: '700', fontSize: '20px', textTransform: 'uppercase', fontSize:'30px' }}>Health advice</Link></li>
                                                <li><Link to="/" className="text-white d-block" style={{ fontWeight: '700', fontSize: '20px', textTransform: 'uppercase', fontSize:'30px'}}>Contact</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Colonne Image */}
                                <div className="col-lg-6 col-md-12">
                                    <img 
                                        src={Mask1Image} 
                                        alt="Image de la clinique" 
                                        className="img-fluid w-100 h-100" 
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>

                        
                    </div>

                    {/* Boutons de navigation */}
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
        </div>

    </div>
  );
};

export default About;
