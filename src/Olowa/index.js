import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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
import Img from '../assets/Mask1.png';
import G3Image from "../assets/G3.png"; // Assure-toi d’avoir les images dans le bon dossier
import Group1Image from "../assets/Group1.png";
import { getAllContents } from '../services/content.service';


const Home = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "en");
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
            <div><Navbar onLanguageChange={setSelectedLanguage} /></div>
            <div><Banner /></div>
            <br /><br />
            <div><OwlCarousel /></div>
            <br /><br />
            <div><HealthCarousel /></div>
            <br /><br />
            <div><Community /></div>
            <br /><br />
            <div className="container">
                <h2
                    className="text-center"
                    style={{ color: '#17416F', textTransform: 'uppercase', fontWeight: '700', fontSize: '36px' }}
                >
                    360 Virtual tour
                </h2>
                <br />
                <br />
                <div className="row">
                    <div className="col-md-5 order-2 order-md-1" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <div className="carousel-content d-flex justify-content-center align-items-center" style={{ background: '#17416F' }}>
                            <div className="wm" style={{ textAlign: 'start' }}>
                                <h2 className="text-white" style={{ fontWeight: 700, fontSize: '36px' }}>
                                    Take a Virtual Tour of Our Facilities
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 image-container order-1 order-md-2" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <div>
                            <img src={Img} alt="Image de la clinique" className="image-fluid w-100" />
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
            <div>
                <Testimonial />
            </div>
            <br /><br /><br />
            <div>
                <Logo />
            </div>
            <br /><br />
            <section className="container-fluid mt-4 position-relative" style={{ backgroundColor: "#17416F" }}>
                <div className="container pt-4">
                    <div className="row">
                        <div className="col-lg-7 mx-auto order-2 order-lg-1">
                            <div>
                                <img src={G3Image} alt="" className="img-fluid w-100" />
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3 mx-auto align-self-center order-1 order-lg-2" style={{ padding: "0px" }}>
                            <div className="p-3">
                                <h2 className="text-white text-uppercase fw-bold" style={{ fontSize: '30px' }}>patient portal</h2>
                                <p className="mt-3 text-white text-uppercase fw-light">
                                    Comprehensive care, cutting-edge technology, and a compassionate team
                                </p>
                                <div className="mt-3">
                                    <button
                                        className="btn btn-t text-white"
                                        style={{ backgroundColor: "#13AB9C", padding: "10px 25px" }}
                                        onClick={() => (window.location.href = "Meet.html")}
                                    >
                                        Login Patient Portal
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
                <Smeet />
            </div>
            <br /><br />
            <div>
                <h2 class="text-center"
                    style={{ textTransform: 'uppercase', color: '#17416F', fontWeight: '700', fontSize: '36px' }}>
                    equipment Gallery
                </h2>
                <Galery />
            </div>
            <br /><br />
            <div>
                <Event />
            </div>
            <br /><br />
            <div>
                <WelcomeSection />
            </div>
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
