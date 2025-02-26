import { React, useContext, useEffect, useState } from 'react';
import '../index.css'
import Mask1Image from '../../assets/Mask1.png';
import { Link } from "react-router-dom";
import { getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';

const About = () => {
    const {selectedLanguage} = useContext(LanguageContext);
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
                                                <div className="text-start" style={{ width: '70%', marginLeft: '8rem' }}>
                                                    <h2 style={{ fontWeight: 700, fontSize: '40px' }}>{selectedLanguage === 'fr' ? contents?.home_page_banner_title.content_fr : contents?.home_page_banner_title.content_en}</h2>
                                                    <br />
                                                    <p>{selectedLanguage === 'fr' ? contents?.home_page_banner_desc_1.content_fr : contents?.home_page_banner_desc_1.content_en}</p>
                                                    <br />
                                                    <div>
                                                        <Link to="/about" className="btn btn-cus text-white me-2" style={{ backgroundColor: '#13AB9C', padding: '10px 15px' }}>
                                                            {selectedLanguage === 'fr' ? contents?.home_page_banner_about_us.content_fr : contents?.home_page_banner_about_us.content_en}
                                                        </Link>
                                                        <Link to="/" className="btn btn-outline-light" style={{ padding: '10px 15px' }}>
                                                            {selectedLanguage === 'fr' ? contents?.home_page_banner_book_appointment.content_fr : contents?.home_page_banner_book_appointment.content_en}
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
                                                    <li><Link to="/about" className="text-white d-block" style={{ fontWeight: '700', fontSize: '20px', textTransform: 'uppercase', fontSize: '30px' }}>
                                                        {selectedLanguage === 'fr' ? contents?.home_page_banner_link1.content_fr : contents?.home_page_banner_link1.content_en}</Link></li>
                                                    <li><Link to="/community" className="text-white d-block" style={{ fontWeight: '700', fontSize: '20px', textTransform: 'uppercase', fontSize: '30px' }}>
                                                        {selectedLanguage === 'fr' ? contents?.home_page_banner_link2.content_fr : contents?.home_page_banner_link2.content_en}</Link></li>
                                                    <li><Link to="/service" className="text-white d-block" style={{ fontWeight: '700', fontSize: '20px', textTransform: 'uppercase', fontSize: '30px' }}>
                                                        {selectedLanguage === 'fr' ? contents?.home_page_banner_link3.content_fr : contents?.home_page_banner_link3.content_en}</Link></li>
                                                    <li><Link to="/" className="text-white d-block" style={{ fontWeight: '700', fontSize: '20px', textTransform: 'uppercase', fontSize: '30px' }}>
                                                        {selectedLanguage === 'fr' ? contents?.home_page_banner_link4.content_fr : contents?.home_page_banner_link4.content_en}</Link></li>
                                                    <li><Link to="/" className="text-white d-block" style={{ fontWeight: '700', fontSize: '20px', textTransform: 'uppercase', fontSize: '30px' }}>
                                                        {selectedLanguage === 'fr' ? contents?.home_page_banner_link5.content_fr : contents?.home_page_banner_link5.content_en}</Link></li>
                                                    <li><Link to="/" className="text-white d-block" style={{ fontWeight: '700', fontSize: '20px', textTransform: 'uppercase', fontSize: '30px' }}>
                                                        {selectedLanguage === 'fr' ? contents?.home_page_banner_link6.content_fr : contents?.home_page_banner_link6.content_en}</Link></li>
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
