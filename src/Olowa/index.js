/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
// import { Link } from "react-router-dom";
import './index.css'
import Navbar from "./Components/navbar";
import Banner from "./Components/banner";
import OwlCarousel from "./Components/owlcarousel";
import Community from "./Components/community";
import Testimonial from "./Components/testimonial";
import Smeet from "./Components/Smeet";
import Galery from "./Components/Galery";
import Event from "./Components/event";
import WelcomeSection from "./Components/WelcomS";
import Feedback from "./Components/Feedback";
import Footer from "./Components/footer";
import Logo from "./Components/logo";
import HealthCarousel from "./Components/healthCarousel";
// import Img from '../assets/Mask1.png';
// import G3Image from "../assets/G3.png"; // Assure-toi d’avoir les images dans le bon dossier
import Group1Image from "../assets/Group1.png";
import { getAdvices, getAllContents, getCertificates, getEvents, getServices, getTeamMembers, getTestimonials } from '../services/content.service';
import LanguageContext from '../context/LanguageContext';


const Home = () => {
    const { selectedLanguage } = useContext(LanguageContext);
    const [contents, setContents] = useState();
    const [events, setEvents] = useState([]);
    const [services, setServices] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [certificates, setCerificates] = useState([]);
    const [advices, setAdvices] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);


    // Get contents on component mount
    useEffect(() => {
        const fetchContents = async () => {
            try {
                // const savedContents = localStorage.getItem("contents");
                // if (savedContents) {
                //     setContents(JSON.parse(savedContents));
                // } else {
                // Fetch contents if not in localStorage
                const response = await getAllContents();
                setContents(response.data);
                //     localStorage.setItem("contents", JSON.stringify(response.data));
                // }
                // Fetch others data
                setServices(await getServices());
                setEvents(await getEvents());
                setCerificates(await getCertificates());
                setAdvices(await getAdvices());
                setTeamMembers(await getTeamMembers())
                setTestimonials(await getTestimonials())
            } catch (error) {
                console.error('Failed to fetch contents:', error.message || error);
            }
        };
        fetchContents();
    }, []);

    return (
        <div className="container-fluid" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <div><Navbar /></div>
            <div><Banner /></div>
            <br /><br />
            <div><OwlCarousel services={services} /></div>
            <br /><br />
            <div><HealthCarousel healthAdvices={advices} /></div>
            <br /><br />
            <div><Community /></div>
            <br /><br />
            <div className="container virtualtoursect">
                {/* <span className="mb-4 d-block w-100" style={{ borderBottom: "1px solid #17416F", padding: '0rem 0rem' }}></span> */}
                <h2
                    className="text-center"
                    style={{ color: '#17416F', textTransform: 'uppercase', fontWeight: '700', fontSize: '36px', marginBottom: '2%' }}
                >
                    {selectedLanguage === 'fr' ? contents?.home_page_virtual_tour_title.content_fr : contents?.home_page_virtual_tour_title.content_en}
                </h2>
                <br />
                <br />
                <div className="row">
                    <div className="col-md-5 order-2 order-md-1" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <div className="carousel-content d-flex justify-content-center align-items-center" style={{
                            background: '#17416F',
                            borderTopRightRadius: '50px',
                            position: 'relative'
                        }}>
                            <div className="wm" style={{ textAlign: 'start' }}>
                                <h2 className="text-white">
                                    {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                        __html: contents?.home_page_virtual_tour_desc.content_fr
                                    }} />) : (<div dangerouslySetInnerHTML={{
                                        __html: contents?.home_page_virtual_tour_desc.content_en
                                    }} />)}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7 order-1 order-md-2" style={{
                        // paddingLeft: 0,
                        paddingRight: 0,
                        backgroundImage: `url(${contents?.home_page_virtual_tour_img.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        marginLeft: '-50px', // Pour couvrir l'espace créé par le radius
                        paddingLeft: '50px'  // Pour compenser le margin négatif
                    }}>
                        <div style={{ Height: '100px' }}></div>
                    </div>
                </div>

            </div>
            <br /><br /><br /><br />
            <div>
                <Testimonial testimonials={testimonials} />
            </div>
            <br /><br /><br />
            <div>
                <Logo logos={certificates} />
            </div>
            <br /><br /><br /><br />
            <section className="container-fluid mt-4 position-relative" style={{ backgroundColor: "#17416F" }}>
                <div className="container pt-4">
                    <div className="row">
                        <div className="col-lg-7 mx-auto order-2 order-lg-1">
                            <div>
                                <img src={contents?.home_page_patient_portal_bg_img.image} alt="" className="img-fluid w-100" />
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3 mx-auto align-self-center order-1 order-lg-2" style={{ padding: "0px" }}>
                            <div className="p-3">
                                <h2 className="text-white text-uppercase fw-bold text-center text-md-start" style={{ fontSize: '30px' }}>{selectedLanguage === 'fr' ? contents?.home_page_banner_link4.content_fr : contents?.home_page_banner_link4.content_en}</h2>
                                <div className="mt-3 text-white text-uppercase fw-light text-center text-md-start">
                                    {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                        __html: contents?.home_page_patient_portal_desc.content_fr
                                    }} />) : (<div dangerouslySetInnerHTML={{
                                        __html: contents?.home_page_patient_portal_desc.content_en
                                    }} />)}
                                </div>
                                <div className="mt-3 d-flex justify-content-center justify-content-lg-start">
                                    <button
                                        className="btn btn-t text-white"
                                        style={{ backgroundColor: "#13AB9C", padding: "10px 25px" }}
                                    // onClick={() => (window.location.href = "Meet.html")}
                                    >
                                        {selectedLanguage === 'fr' ? contents?.home_page_patient_portal_button.content_fr : contents?.home_page_patient_portal_button.content_en}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-1"></div>
                    </div>
                </div>
                <div className="pott">
                    <img src={Group1Image} alt="" />
                </div>
            </section>
            <br /><br />
            <div>
                <Smeet doctors={teamMembers} />
            </div>
            <br /><br /><br /><br />
            <div>
                <h2 className="text-center"
                    style={{ textTransform: 'uppercase', color: '#17416F', fontWeight: '700', fontSize: '36px' }}>
                    {selectedLanguage === 'fr' ? contents?.home_page_equipment_title.content_fr : contents?.home_page_equipment_title.content_en}
                </h2>
                <Galery />
            </div>
            <br /><br /><br /><br />
            <div>
                <Event />
            </div>
            <br /><br /><br />
            <div>
                <WelcomeSection />
            </div>
            <br /><br /><br />
            <div>
                <Feedback />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
