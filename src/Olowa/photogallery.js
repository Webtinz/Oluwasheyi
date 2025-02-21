import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import './about.css';
import Navbar from "./Components/navbar";
import Feedback from "./Components/Feedback";
import Footer from "./Components/footer";
import Logo from "./Components/logo";
import Carousel from "./Components/upcomingcarousel";
import Galerry from "./Components/Galery";
import Group1 from '../assets/Group1.png';


const Home = () => {
    const [activeTab, setActiveTab] = useState("cont1");

    const tabs = [
      { id: "cont1", label: "Wellness Programs" },
      { id: "cont2", label: "Awareness Campaigns" },
      { id: "cont3", label: "Patient Stories" },
      { id: "cont4", label: "Blood Donation" },
      { id: "cont5", label: "Charity" },
    ];

  return (
    <div className="container-fluid">
        <div><Navbar/></div>
        <section className="mt-4 position-relative" style={{ backgroundColor: '#17416F', padding: '100px 0' }}>
            <h1 className="text-center text-white" style={{ textTransform: 'uppercase',fontWeight:'700',fontSize:'40px' }}>Photo gallery</h1>
            <div className="position-absolute bottom-0 start-0">
                <img src={Group1} alt="" />
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
                        className={`search-link ${activeTab === tab.id ? "active" : ""}`}
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
                        <div><Galerry /></div>
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
            <Feedback/>
        </div>
        <div>
            <Footer/>
        </div>
    </div>
  );
};

export default Home;
