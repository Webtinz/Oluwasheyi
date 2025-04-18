import React, { useContext, useEffect, useState } from 'react';
import './index.css';
import './about.css';
import Navbar from "./Components/navbar";
import Feedback from "./Components/Feedback";
import Footer from "./Components/footer";
import Logo from "./Components/logo";
import Carousel from "./Components/upcomingcarousel";
import Group1 from '../assets/Group1.png';
import Mask1 from '../assets/Fr.png';
import Mask2 from '../assets/Fr1.png';
import LanguageContext from '../context/LanguageContext';
import 'aos/dist/aos.css';
import { useLoader } from '../context/LoaderContext';

const Community = () => {
    const [activeTab, setActiveTab] = useState("cont1");
    const { selectedLanguage } = useContext(LanguageContext);

    const { appData } = useLoader();
    const { contents, events, certificates, communities } = appData;

    useEffect(() => {
        // Vérifier si une ancre est présente dans l'URL
        const hash = window.location.hash;
        if (hash) {
            // Extraire l'ID de l'ancre (ex: #section1 → section1)
            const sectionId = hash.replace('#', '');

            // Générer dynamiquement le mapping des sections aux onglets
            const tabMapping = {};
            communities?.forEach((_, index) => {
                tabMapping[`section${index + 1}`] = `cont${index + 1}`;
            });

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
    }, [communities]);

    // Générer dynamiquement les onglets à partir des données des communautés
    const tabs = communities?.map((community, index) => ({
        id: `cont${index + 1}`,
        label: selectedLanguage === 'fr' ? community.title : community.title_en
    })) || [];

    // Ajouter un onglet vide à la fin (comme dans l'original)
    if (tabs.length > 0) {
        tabs.push({ id: `cont${tabs.length + 1}`, label: "" });
    }

    return (
        <div className="container-fluid" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <div><Navbar /></div>
            <section className="mt-4 position-relative" style={{ backgroundColor: '#17416F', padding: '100px 0' }}>
                <h1 className="text-center text-white tit" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: '40px' }}>
                    {selectedLanguage === 'fr' ? contents?.data.communoty_page_title.content_fr : contents?.data.communoty_page_title.content_en}
                </h1>
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

                    {/* Contenu dynamique généré à partir des données de communities */}
                    <div className="search-content-container">
                        {communities?.map((community, index) => {
                            const tabId = `cont${index + 1}`;
                            const sectionId = `section${index + 1}`;
                            
                            return activeTab === tabId && (
                                <div className="search-content" id={sectionId} key={sectionId}>
                                    <div className="row">
                                        <div className="col-12 col-md-5 mx-auto mb-3 mb-md-0">
                                            <div className='position-relative'>
                                                <img 
                                                    src={community.photo} 
                                                    alt={selectedLanguage === 'fr' ? community.title : community.title_en}
                                                    className="img-fluid w-100 main-img1" 
                                                    data-aos="zoom-in" 
                                                    style={{ borderTopRightRadius: '30px' }} 
                                                />
                                                <div className='contpos'>
                                                    <img src={Mask1} alt="Wellness Programs" className="img-fluid" style={{ width: '70%' }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 mx-auto mb-3 mb-md-0 p-4 align-self-center">
                                            <h2 style={{ textTransform: "uppercase", color: "#17416F", fontSize: '30px', fontWeight: '700' }}>
                                                {selectedLanguage === 'fr' ? community.title : community.title_en}
                                            </h2>
                                            <div className="mt-3" style={{ color: "#17416F" }}>
                                                {selectedLanguage === 'fr' ? (
                                                    <div dangerouslySetInnerHTML={{ __html: community.description }} />
                                                ) : (
                                                    <div dangerouslySetInnerHTML={{ __html: community.description_en }} />
                                                )}
                                            </div>
                                            <div className="mt-3">
                                                <button 
                                                    className="btn btn-cont text-white px-4" 
                                                    style={{ backgroundColor: "#13AB9C" }} 
                                                    onClick={() => {
                                                        document.getElementById("feedback-section")?.scrollIntoView({ behavior: "smooth" });
                                                    }}
                                                >
                                                    {selectedLanguage === 'fr' 
                                                        ? contents?.data.communoty_page_menu_button.content_fr 
                                                        : contents?.data.communoty_page_menu_button.content_en
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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

export default Community;