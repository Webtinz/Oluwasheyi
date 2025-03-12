/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useEffect, useState } from 'react';
import '../index.css'
// import Mask1Image from '../../assets/Mask1.png';
import { Link } from "react-router-dom";
import { getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';
import Bookpatientappointment from '../Components/Patientsappointmnets';

const About = () => {
    const { selectedLanguage } = useContext(LanguageContext);
    const [contents, setContents] = useState();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [BookAppointmentmodal, setBookAppointmentmodal] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        experience: 5,
        yoursuggestions: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    useEffect(() => {
        const fetchContents = async () => {
            try {
                // const savedContents = localStorage.getItem("contents");
                // if (savedContents) {
                //     setContents(JSON.parse(savedContents));
                // } else {
                const response = await getAllContents();
                setContents(response.data);
                //     localStorage.setItem("contents", JSON.stringify(response.data));
                // }
            } catch (error) {
                console.error('Failed to fetch contents:', error.message || error);
            }
        };
        fetchContents();
    }, []);

    return (
        <div className="mybanner">
            <div className="row align-items-center">
                <div className="col-md-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="row g-0 align-items-stretch mybannercontent">
                                    <div className="col-lg-6 col-md-12 textbannercontent">
                                        <div className="carousel-content">
                                            <div className='d-flex justify-content-center carrousseltextcont'>
                                                <div className="text-start px-2 ttk">
                                                    <h2>{selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                                        __html: contents?.home_page_banner_title.content_fr
                                                    }} />) : (<div dangerouslySetInnerHTML={{
                                                        __html: contents?.home_page_banner_title.content_en
                                                    }} />)}</h2>
                                                    <br />
                                                    <div>{selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                                        __html: contents?.home_page_banner_desc_1.content_fr
                                                    }} />) : (<div dangerouslySetInnerHTML={{
                                                        __html: contents?.home_page_banner_desc_1.content_en
                                                    }} />)}</div>
                                                    <br />
                                                    <div className='mnt d-flex flex-wrap'>
                                                        <Link to="/about" className="btn btn-cus text-white me-2 mb-3 mb-lg-0" style={{ backgroundColor: '#13AB9C', padding: '10px 15px' }}>
                                                            {selectedLanguage === 'fr' ? contents?.home_page_banner_about_us.content_fr : contents?.home_page_banner_about_us.content_en}
                                                        </Link>

                                                        {/* <a href="#" onClick={(e) => { e.preventDefault(); setBookAppointmentmodal(); }} className="btn btn-outline-light" style={{ padding: '10px 15px' }}>
                                                            {selectedLanguage === 'fr' ? contents?.home_page_banner_book_appointment.content_fr : contents?.home_page_banner_book_appointment.content_en}
                                                        </a> */}
                                                        < Bookpatientappointment/>   
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                        <img
                                            src={contents?.home_page_banner_img.image}
                                            alt="Image de la clinique"
                                            className="img-fluid w-100 h-100 ibb"
                                            style={{ objectFit: 'cover', marginLeft: '-10px' }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row g-0 align-items-stretch mybannercontent">
                                    <div className="col-lg-6 col-md-12 ">
                                        <div className="carousel-content carrousseltwo">
                                            <div className="wm text-start">
                                                <ul className="list-unstyled m-0 p-0">
                                                    <li><Link to="/about" className="text-white d-block">{selectedLanguage === 'fr' ? contents?.home_page_banner_link1.content_fr : contents?.home_page_banner_link1.content_en}</Link></li>
                                                    <li><Link to="/community" className="text-white d-block"> {selectedLanguage === 'fr' ? contents?.home_page_banner_link2.content_fr : contents?.home_page_banner_link2.content_en}</Link></li>
                                                    <li><Link to="/service" className="text-white d-block">{selectedLanguage === 'fr' ? contents?.home_page_banner_link3.content_fr : contents?.home_page_banner_link3.content_en}</Link></li>
                                                    <li><Link to="/" className="text-white d-block">{selectedLanguage === 'fr' ? contents?.home_page_banner_link4.content_fr : contents?.home_page_banner_link4.content_en}</Link></li>
                                                    <li><Link to="/" className="text-white d-block">{selectedLanguage === 'fr' ? contents?.home_page_banner_link5.content_fr : contents?.home_page_banner_link5.content_en}</Link></li>
                                                    <li><Link to="/" className="text-white d-block">{selectedLanguage === 'fr' ? contents?.home_page_banner_link6.content_fr : contents?.home_page_banner_link6.content_en}</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                        <img
                                            src={contents?.home_page_banner_img.image}
                                            alt="Image de la clinique"
                                            className="img-fluid w-100 h-100 ibb"
                                            style={{ objectFit: 'cover', marginLeft: '-10px' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}


        </div>
    );
};

export default About;
