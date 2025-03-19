import React, { useContext, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import './index.css';
import './about.css';
import Navbar from "./Components/navbar";
import Feedback from "./Components/Feedback";
import Footer from "./Components/footer";
import Logo from "./Components/logo";
import Carousel from "./Components/upcomingcarousel";
import Group1 from '../assets/Group1.png';
// import Mask from '../assets/Mask group.png';
import Mask1 from '../assets/Fr.png';
import Mask2 from '../assets/Fr1.png';
import { getAllContents, getCertificates, getEvents } from '../services/content.service';
import LanguageContext from '../context/LanguageContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
    const [activeTab, setActiveTab] = useState("cont1");
    const { selectedLanguage } = useContext(LanguageContext);
    const [contents, setContents] = useState();
    const [events, setEvents] = useState([]);
    const [certificates, setCerificates] = useState([]);



    useEffect(() => {
        // Vérifier si une ancre est présente dans l'URL
        const hash = window.location.hash;
        if (hash) {
            // Extraire l'ID de l'ancre (ex: #section1 → section1)
            const sectionId = hash.replace('#', '');

            // Trouver l'onglet correspondant à cette section
            const tabMapping = {
                "section1": "cont1",
                "section2": "cont2",
                "section3": "cont3",
                "section4": "cont4",
                "section5": "cont5"
            };

            // Activer l'onglet correspondant
            if (tabMapping[sectionId]) {
                setActiveTab(tabMapping[sectionId]);

                // Faire défiler jusqu'à la section après un court délai
                setTimeout(() => {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 300);
            }
        }
    }, []);


    // Récupération des contenus
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
                setEvents(await getEvents());
                setCerificates(await getCertificates());

            } catch (error) {
                console.error('Failed to fetch contents:', error.message || error);
            }
        };
        fetchContents();
        AOS.init();

    }, []);

    // Vérification pour éviter une erreur si contents est undefined
    const tabs = contents ? [
        {
            id: "cont1", label: selectedLanguage === 'fr'
                ? contents?.communoty_page_menu_1_title?.content_fr
                : contents?.communoty_page_menu_1_title?.content_en
        },
        {
            id: "cont2", label: selectedLanguage === 'fr'
                ? contents?.communoty_page_menu_2_title?.content_fr
                : contents?.communoty_page_menu_2_title?.content_en
        },
        {
            id: "cont3", label: selectedLanguage === 'fr'
                ? contents?.communoty_page_menu_3_title?.content_fr
                : contents?.communoty_page_menu_3_title?.content_en
        },
        {
            id: "cont4", label: selectedLanguage === 'fr'
                ? contents?.communoty_page_menu_4_title?.content_fr
                : contents?.communoty_page_menu_4_title?.content_en
        },
        {
            id: "cont5", label: selectedLanguage === 'fr'
                ? contents?.communoty_page_menu_5_title?.content_fr
                : contents?.communoty_page_menu_5_title?.content_en
        },
        { id: "cont6", label: "" },
    ] : [];

    return (
        <div className="container-fluid" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <div><Navbar /></div>
            <section className="mt-4 position-relative" style={{ backgroundColor: '#17416F', padding: '100px 0' }}>
                <h1 className="text-center text-white tit" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: '40px' }}>{selectedLanguage === 'fr' ? contents?.communoty_page_title.content_fr : contents?.communoty_page_title.content_en}</h1>
                <div className="position-absolute bottom-0 start-0">
                    <img src={Group1} alt="" />
                </div>
                <div className="position-absolute top-0 end-0">
                    <img src={Mask2} alt="" />
                </div>
            </section>
            <br />
            <section className="container">
                <section className="search-section">
                    {/* Onglets de navigation */}
                    <ul className="nav search-tabs">
                        {tabs.map((tab) => (
                            <li className="search-item" key={tab.id}>
                                <button
                                    className={`search-link px-4 ${activeTab === tab.id ? "active" : ""}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Contenu dynamique */}
                    <div className="search-content-container">
                        {activeTab === "cont1" && (
                            <div className="search-content" id="section1">
                                <div className="row">
                                    <div className="col-12 col-md-5 mx-auto mb-3 mb-md-0">
                                        <div className='position-relative'>
                                            <img src={contents?.communoty_page_menu_1_img.image} alt="Wellness Programs" className="img-fluid w-100 main-img1" data-aos="zoom-in" style={{ borderTopRightRadius: '30px' }} />
                                            <div className='contpos'>
                                                <img src={Mask1} alt="Wellness Programs" className="img-fluid"  style={{ width: '70%' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mx-auto mb-3 mb-md-0 p-4 align-self-center">
                                        <h2 style={{ textTransform: "uppercase", color: "#17416F", fontSize: '30px', fontWeight: '700' }}>{selectedLanguage === 'fr' ? contents?.communoty_page_menu_1_title.content_fr : contents?.communoty_page_menu_1_title.content_en}</h2>
                                        <div className="mt-3" style={{ color: "#17416F", display: "-webkit-box", WebkitLineClamp: 10, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                            {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                                __html: contents?.communoty_page_menu_1_desc.content_fr
                                            }} />) : (<div dangerouslySetInnerHTML={{
                                                __html: contents?.communoty_page_menu_1_desc.content_en
                                            }} />)}
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-cont text-white px-4" style={{ backgroundColor: "#13AB9C" }} onClick={() => {
                                                document.getElementById("feedback-section")?.scrollIntoView({ behavior: "smooth" });
                                            }}>
                                                {selectedLanguage === 'fr' ? contents?.communoty_page_menu_button.content_fr : contents?.communoty_page_menu_button.content_en}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "cont2" && (
                            <div className="search-content" id="section2">
                                <div className="row">
                                    <div className="col-12 col-md-5 mx-auto mb-3 mb-md-0">
                                        <div className='position-relative'>
                                            <img src={contents?.communoty_page_menu_2_img.image} alt="Wellness Programs" className="img-fluid w-100 main-img1" data-aos="zoom-in" style={{ borderTopRightRadius: '30px' }} />
                                            <div className='contpos'>
                                                <img src={Mask1} alt="Wellness Programs" className="img-fluid" style={{ width: '70%' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mx-auto mb-3 mb-md-0 p-4 align-self-center">
                                        <h2 style={{ textTransform: "uppercase", color: "#17416F", fontSize: '30px', fontWeight: '700' }}>
                                            {selectedLanguage === 'fr' ? contents?.communoty_page_menu_2_title.content_fr : contents?.communoty_page_menu_2_title.content_en}
                                        </h2>
                                        <div className="mt-3" style={{ color: "#17416F" }}>
                                            {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                                __html: contents?.communoty_page_menu_2_desc.content_fr
                                            }} />) : (<div dangerouslySetInnerHTML={{
                                                __html: contents?.communoty_page_menu_2_desc.content_en
                                            }} />)}
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-cont text-white px-4" style={{ backgroundColor: "#13AB9C" }} onClick={() => {
                                                document.getElementById("feedback-section")?.scrollIntoView({ behavior: "smooth" });
                                            }}>
                                                {selectedLanguage === 'fr' ? contents?.communoty_page_menu_button.content_fr : contents?.communoty_page_menu_button.content_en}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "cont3" && (
                            <div className="search-content" id="section3">
                                <div className="row">
                                    <div className="col-12 col-md-5 mx-auto mb-3 mb-md-0">
                                        <div className='position-relative'>
                                            <img src={contents?.communoty_page_menu_3_img.image} alt="Wellness Programs" data-aos="zoom-in" className="img-fluid w-100 main-img1" style={{ borderTopRightRadius: '30px' }} />
                                            <div className='contpos'>
                                                <img src={Mask1} alt="Wellness Programs" className="img-fluid" style={{ width: '70%' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mx-auto mb-3 mb-md-0 p-4 align-self-center">
                                        <h2 style={{ textTransform: "uppercase", color: "#17416F", fontSize: '30px', fontWeight: '700' }}>
                                            {selectedLanguage === 'fr' ? contents?.communoty_page_menu_3_title.content_fr : contents?.communoty_page_menu_3_title.content_en}
                                        </h2>
                                        <div className="mt-3" style={{ color: "#17416F" }}>
                                            {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                                __html: contents?.communoty_page_menu_3_desc.content_fr
                                            }} />) : (<div dangerouslySetInnerHTML={{
                                                __html: contents?.communoty_page_menu_3_desc.content_en
                                            }} />)}
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-cont text-white px-4" style={{ backgroundColor: "#13AB9C" }} onClick={() => {
                                                document.getElementById("feedback-section")?.scrollIntoView({ behavior: "smooth" });
                                            }}>
                                                {selectedLanguage === 'fr' ? contents?.communoty_page_menu_button.content_fr : contents?.communoty_page_menu_button.content_en}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "cont4" && (
                            <div className="search-content" id="section4">
                                <div className="row">
                                    <div className="col-12 col-md-5 mx-auto mb-3 mb-md-0">
                                        <div className='position-relative'>
                                            <img src={contents?.communoty_page_menu_4_img.image} alt="Wellness Programs" data-aos="zoom-in" className="img-fluid w-100 main-img1" style={{ borderTopRightRadius: '30px' }} />
                                            <div className='contpos'>
                                                <img src={Mask1} alt="Wellness Programs" className="img-fluid" style={{ width: '70%' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mx-auto mb-3 mb-md-0 p-4 align-self-center">
                                        <h2 style={{ textTransform: "uppercase", color: "#17416F", fontSize: '30px', fontWeight: '700' }}>
                                            {selectedLanguage === 'fr' ? contents?.communoty_page_menu_4_title.content_fr : contents?.communoty_page_menu_4_title.content_en}
                                        </h2>
                                        <div className="mt-3" style={{ color: "#17416F" }}>
                                            {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                                __html: contents?.communoty_page_menu_4_desc.content_fr
                                            }} />) : (<div dangerouslySetInnerHTML={{
                                                __html: contents?.communoty_page_menu_4_desc.content_en
                                            }} />)}
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-cont text-white px-4" style={{ backgroundColor: "#13AB9C" }} onClick={() => {
                                                document.getElementById("feedback-section")?.scrollIntoView({ behavior: "smooth" });
                                            }}>
                                                {selectedLanguage === 'fr' ? contents?.communoty_page_menu_button.content_fr : contents?.communoty_page_menu_button.content_en}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "cont5" && (
                            <div className="search-content" id="section5">
                                <div className="row">
                                    <div className="col-12 col-md-5 mx-auto mb-3 mb-md-0">
                                        <div className='position-relative'>
                                            <img src={contents?.communoty_page_menu_5_img.image} alt="Wellness Programs" data-aos="zoom-in" className="img-fluid w-100 main-img1" style={{ borderTopRightRadius: '30px' }} />
                                            <div className='contpos'>
                                                <img src={Mask1} alt="Wellness Programs" className="img-fluid" style={{ width: '70%' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 mx-auto mb-3 mb-md-0 p-4 align-self-center">
                                        <h2 style={{ textTransform: "uppercase", color: "#17416F", fontSize: '30px', fontWeight: '700' }}>
                                            {selectedLanguage === 'fr' ? contents?.communoty_page_menu_5_title.content_fr : contents?.communoty_page_menu_5_title.content_en}
                                        </h2>
                                        <div className="mt-3" style={{ color: "#17416F" }}>
                                            {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                                __html: contents?.communoty_page_menu_5_desc.content_fr
                                            }} />) : (<div dangerouslySetInnerHTML={{
                                                __html: contents?.communoty_page_menu_5_desc.content_en
                                            }} />)}
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-cont text-white px-4" style={{ backgroundColor: "#13AB9C" }} onClick={() => {
                                                document.getElementById("feedback-section")?.scrollIntoView({ behavior: "smooth" });
                                            }}>
                                                {selectedLanguage === 'fr' ? contents?.communoty_page_menu_button.content_fr : contents?.communoty_page_menu_button.content_en}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </section>
            <br /><br />
            <div>
                <Carousel events={events} />
            </div>
            <br /><br />
            <div>
                <Logo logos={certificates} />
            </div>
            <br /><br />
            <div id="feedback-section">
                <Feedback />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
