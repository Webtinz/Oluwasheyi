import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import './about.css';
import Navbar from "./Components/navbar";
import Feedback from "./Components/Feedback";
import Footer from "./Components/footer";
import Logo from "./Components/logo";
import Carousel from "./Components/upcomingcarousel";
import Group1 from '../assets/Group1.png';
import Mask from '../assets/Mask group.png';
import Mask1 from '../assets/Fr.png';
import Mask2 from '../assets/Fr1.png';
import { getAllContents } from '../services/content.service';
import LanguageContext from '../context/LanguageContext';


const Home = () => {
    const [activeTab, setActiveTab] = useState("cont1");

    const tabs = [
      {
        id: "cont1",
        label: selectedLanguage === 'fr' 
          ? contents?.communoty_page_menu_1_title?.content_fr 
          : contents?.communoty_page_menu_1_title?.content_en
      },
      { id: "cont2", label: selectedLanguage === 'fr' 
        ? contents?.communoty_page_menu_2_title?.content_fr 
        : contents?.communoty_page_menu_2_title?.content_en },
      { id: "cont3", label: selectedLanguage === 'fr' 
        ? contents?.communoty_page_menu_3_title?.content_fr 
        : contents?.communoty_page_menu_3_title?.content_en },
      { id: "cont4", label: selectedLanguage === 'fr' 
        ? contents?.communoty_page_menu_4_title?.content_fr 
        : contents?.communoty_page_menu_4_title?.content_en  },
      { id: "cont5", label: selectedLanguage === 'fr' 
        ? contents?.communoty_page_menu_5_title?.content_fr 
        : contents?.communoty_page_menu_5_title?.content_en  },
      { id: "cont6", label: "" },
    ];

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
        <div><Navbar/></div>
        <section className="mt-4 position-relative" style={{ backgroundColor: '#17416F', padding: '100px 0' }}>
            <h1 className="text-center text-white" style={{ textTransform: 'uppercase',fontWeight:'700',fontSize:'40px' }}>Community & engagement</h1>
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
                    <div className="search-content">
                    <div className="row">
                        <div className="col-12 col-md-5 mx-auto mb-3 mb-md-0">
                            <div className='position-relative'>
                                <img src={Mask} alt="Wellness Programs" className="img-fluid w-100" style={{borderTopRightRadius:'30px'}} />
                                <div className='contpos'>
                                    <img src={Mask1} alt="Wellness Programs" className="img-fluid" style={{width:'70%'}} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 mx-auto mb-3 mb-md-0 p-4 align-self-center">
                        <h2 style={{ textTransform: "uppercase", color: "#17416F",fontSize:'30px',fontWeight:'700' }}>Wellness Programs</h2>
                        <p className="mt-3" style={{ color: "#17416F" }}>
                            Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio. Proin sed nunc quis ex faucibus volutpat.
                            <br /><br />
                            Quisque faucibus in quam quis lobortis. Donec metus neque, euismod a volutpat eget, porta sed ligula.
                            <br /><br />
                            Duis dapibus quam erat, nec gravida erat sodales quis. Proin iaculis felis libero, vel dignissim velit volutpat eget.
                            Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio. Proin sed nunc quis ex faucibus volutpat.
                            <br /><br />
                            Quisque faucibus in quam quis lobortis. Donec metus neque, euismod a volutpat eget, porta sed ligula.
                            <br /><br />
                            Duis dapibus quam erat, nec gravida erat sodales quis. Proin iaculis felis libero, vel dignissim velit volutpat eget.
                        </p>
                        <div className="mt-3">
                            <button className="btn btn-cont text-white px-4" style={{ backgroundColor: "#13AB9C" }}>
                            Contact Us
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                )}

                {activeTab === "cont2" && (
                    <div className="search-content">
                    <h3>Search for Business Trip</h3>
                    <div className="search-form">
                        <p>Business-specific search form content...</p>
                    </div>
                    </div>
                )}

                {activeTab === "cont3" && (
                    <div className="search-content">
                    <h3>Featured Locations</h3>
                    <div className="search-form">
                        <p>Featured-specific content...</p>
                    </div>
                    </div>
                )}

                {activeTab === "cont4" && (
                    <div className="search-content">
                    <h3>Search for Business Trip</h3>
                    <div className="search-form">
                        <p>Business-specific search form content...</p>
                    </div>
                    </div>
                )}

                {activeTab === "cont5" && (
                    <div className="search-content">
                    <h3>Featured Locations</h3>
                    <div className="search-form">
                        <p>Featured-specific content...</p>
                    </div>
                    </div>
                )}
                </div>
            </section>
        </section>
        <br/><br/>
        <div>
            <Carousel/>
        </div>
        <br/><br/>
        <div>
            <Logo/>
        </div>
        <br/><br/>
        <div>
            <Feedback/>
        </div>
        <div>
            <Footer/>
        </div>
    </div>
  );
};

export default Home;
