import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { Link } from "react-router-dom";
import './index.css';
import './about.css';
import Navbar from "./Components/navbar";
import Feedback from "./Components/Feedback";
import Footer from "./Components/footer";
import Logo from "./Components/logo";
import Carousel from "./Components/upcomingcarousel";
import Group1 from '../assets/Group1.png';
// import Img from '../assets/6.png';
// import Img1 from '../assets/7.png';
// import Img2 from '../assets/8.png';
// import Img3 from '../assets/cardiology.png';
// import Img4 from '../assets/mri.png';
// import Img5 from '../assets/pediatrics.png';
import Img6 from '../assets/phone.png';
import Img7 from '../assets/mail.png';
import Mask1 from '../assets/Fr1.png';
import { getAllContents, getCertificates, getEvents, getServices } from '../services/content.service';
import LanguageContext from '../context/LanguageContext';

const Home = () => {
    const { selectedLanguage } = useContext(LanguageContext);
    const [contents, setContents] = useState();
    const [services, setServices] = useState([]);
    const [events, setEvents] = useState([]);
    const [certificates, setCerificates] = useState([]);
    const location = useLocation();
    // Ajoutez ce useEffect pour gérer le défilement vers l'ancre
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location, services]);

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
                setEvents(await getEvents());
                setCerificates(await getCertificates());

                setServices(await getServices());
                setEvents(await getEvents());
                setCerificates(await getCertificates());
            } catch (error) {
                console.error('Failed to fetch contents:', error.message || error);
            }
        };
        fetchContents();
    }, []);

    const [activeSection, setActiveSection] = useState(null);

    const toggleContent = (index) => {
        if (activeSection === index) {
            setActiveSection(null); // Fermer la section si elle est déjà ouverte
        } else {
            setActiveSection(index); // Ouvrir la nouvelle section
        }
    };

    return (
        <div className="container-fluid" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <div><Navbar /></div>
            <section className="mt-4 position-relative" style={{ backgroundColor: '#17416F', padding: '100px 0' }}>
                <h1 className="text-center text-white" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: '40px' }}>{selectedLanguage === 'fr' ? contents?.support_page_title1.content_fr : contents?.support_page_title1.content_en}</h1>
                <div className="position-absolute bottom-0 start-0">
                    <img src={Group1} alt="" />
                </div>
                <div className="position-absolute top-0 end-0">
                    <img src={Mask1} alt="" />
                </div>
            </section>
            <br />
            <section className="container mt-4">
                <div className="row">
                    <div className="col-md-2 mx-auto mb-3">
                        <h2 className='text-center' style={{ color: '#17416F', textTransform: 'uppercase', fontWeight: 700, fontSize: 'clamp(20px, 6vw, 30px)' }}>
                            {selectedLanguage === 'fr' ? contents?.support_page_title1.content_fr : contents?.support_page_title1.content_en}
                        </h2>
                    </div>
                    <div className="col-md-8 mx-auto">
                        <div style={{ color: '#17416F' }}>
                            {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                __html: contents?.service_descp.content_fr
                            }} />) : (<div dangerouslySetInnerHTML={{
                                __html: contents?.service_descp.content_en
                            }} />)}
                        </div>
                    </div>
                </div>
            </section>
            <br />
            <section className="container my-4">
                <span className="d-block" style={{ borderBottom: '1px solid #17416F' }}></span>
                {services?.map((section, index) => {
                    const photos = section.photos ? JSON.parse(section.photos) : [];
                    return (
                        <div id={section.id} key={index} className="row cpt" style={{ padding: '50px 0', margin: 0 }}>
                            <div className="col-12 col-md-5 mx-auto mb-3 mb-md-0">
                                <img src={photos?.[0]} alt="" className="image-fluid w-100 main-img1" style={{ objectFit: 'cover', borderTopRightRadius: '30px' }} />
                            </div>
                            <div className="col-12 col-md-6 mx-auto mb-3 mb-md-0 align-self-center">
                                <div className="row">
                                    <div className="col-2 mx-auto">
                                        <img src={photos?.[1]} alt="" className="image-fluid w-100" />
                                    </div>
                                    <div className="col-10 mx-auto">
                                        <h2 className="mt-3" style={{ color: '#17416F', fontSize: '30px', fontWeight: '700' }}>
                                            {selectedLanguage === 'fr' ? section.nom : section.nom_en}</h2>
                                        <div className="mt-3" style={{ color: '#17416F' }}>
                                            {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                                __html: section.description
                                            }} />) : (<div dangerouslySetInnerHTML={{
                                                __html: section.description_en
                                            }} />)}
                                            {/* {selectedLanguage === 'fr' ? section.description : section.description_en} */}
                                        </div>

                                        {activeSection === index && (
                                            <div className="extra-content" style={{ display: 'block', marginTop: '2rem' }}>
                                                <span className="d-block mb-3" style={{ borderBottom: '2px solid #17416F' }}></span>
                                                <div className="d-flex">
                                                    <div><img src={Img6} alt="" /></div>
                                                    <div className="ms-2">
                                                        <p style={{ color: '#17416F' }}>{selectedLanguage === 'fr' ? contents?.call_now.content_fr : contents?.call_now.content_en}</p>
                                                        <br />
                                                        <p style={{ color: '#17416F', fontSize: '20px', marginTop: '-1rem' }}><strong>{section.phone}</strong></p>
                                                    </div>
                                                </div>
                                                <br />
                                                <span className="d-block mb-3" style={{ borderBottom: '2px solid #17416F' }}></span>
                                                <div className="d-flex">
                                                    <div><img src={Img7} alt="" /></div>
                                                    <div className="ms-2">
                                                        <p style={{ color: '#17416F' }}>Email</p> <br />
                                                        <p style={{ color: '#17416F', fontSize: '20px', marginTop: '-1rem' }}><strong>{section.email}</strong></p>
                                                    </div>
                                                </div>
                                                <br />
                                            </div>
                                        )}

                                        <div className="mt-3">
                                            <button
                                                className="btn btn-w px-4 toggle-button"
                                                style={{ backgroundColor: activeSection === index ? '#13AB9C' : '#13AB9C', color: activeSection === index ? 'white' : 'white' }}
                                                onClick={() => toggleContent(index)}
                                            >
                                                {activeSection === index
                                                    ? (selectedLanguage === 'fr' ? contents?.button_read_less.content_fr : contents?.button_read_less.content_en)
                                                    : (selectedLanguage === 'fr' ? contents?.button_learn_more.content_fr : contents?.button_learn_more.content_en)}
                                                <i className={`bi ${activeSection === index ? 'bi-chevron-up' : 'bi-chevron-down'} ms-1`}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <span className="d-block" style={{ borderBottom: '1px solid #17416F' }}></span>
            </section>
            <br /><br />
            <div>
                <Carousel events={events} />
            </div>
            <br /><br /><br />
            <div>
                <Logo logos={certificates} />
            </div>
            <br /><br />
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
