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
import im360 from "../assets/image 35.png";
import { getAdvices, getAllContents, getCertificates, getEvents, getServices, getTeamMembers, getTestimonials } from '../services/content.service';
import LanguageContext from '../context/LanguageContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
    const { selectedLanguage } = useContext(LanguageContext);
    const [contents, setContents] = useState();
    const [events, setEvents] = useState([]);
    const [services, setServices] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [certificates, setCerificates] = useState([]);
    const [advices, setAdvices] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const openVirtualTour = () => {
        setIsOpen(true);
    };

    const closeVirtualTour = () => {
        setIsOpen(false);
    };


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
        AOS.init();
    }, []);

    return (
        <div className="container-fluid" style={{ margin: "0px", padding: "0px" }}>
            <div><Navbar /></div>
            <div><Banner /></div>
            <br /><br />
            <div><OwlCarousel services={services} /></div>
            {/* <br /><br /> */}
            <div><HealthCarousel healthAdvices={advices} /></div>
            <br /><br />
            <div><Community /></div>
            <br /><br />

            {/* <div className="container  virtualtoursect">
                <h1
                    className="text-center"
                    style={{ color: '#17416F', textTransform: 'uppercase', fontWeight: '700', fontSize: '36px', marginBottom: '2%' }}
                >
                    {selectedLanguage === 'fr' ? contents?.home_page_virtual_tour_title.content_fr : contents?.home_page_virtual_tour_title.content_en}
                </h1>
                <br />
                <br />
                <div className="row rass">
                    <div className="col-md-5 order-2 order-md-1" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <div className="carousel-content carousel-content1 d-flex justify-content-center align-items-center" style={{
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

            </div> */}

            <section className="relative w-full loo container">

                <h1
                    className="text-center"
                    style={{ color: '#17416F', textTransform: 'uppercase', fontWeight: '700', fontSize: '36px', marginBottom: '4%' }}
                >
                    {selectedLanguage === 'fr' ? contents?.home_page_virtual_tour_title.content_fr : contents?.home_page_virtual_tour_title.content_en}
                </h1>
                {/* Main content */}
                <div className="flex flex-col bbc md:flex-row rounded-lg overflow-hidden shadow-lg" style={{ borderRadius: "0px", height: "55vh" }}>
                    {/* Left side - Blue box with text */}
                    <div className="bbl text-white p-8 md:p-12 flex items-center justify-center md:w-2/5" style={{ width: "50%", borderTopRightRadius: "15px", zIndex: "2", backgroundColor: "#00426f" }} >
                        <h3 data-aos="flip-left" className="text-2xl md:text-3xl lg:text-4xl font-bold">
                            {selectedLanguage === 'fr' ? contents?.home_page_virtual_tour_title.content_fr : contents?.home_page_virtual_tour_title.content_en}
                            {/* TAKE A VIRTUAL TOUR OF OUR FACILITIES */}
                        </h3>
                        <svg className='designsvg2' width="153" height="141" viewBox="0 0 153 141" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.5" cy="150.5" r="150.5" fill="white" fill-opacity="0.05" />
                            <circle cx="2" cy="151" r="117.5" stroke="white" stroke-opacity="0.1" />
                        </svg>
                    </div>

                    {/* Right side - Image with 360 button */}
                    <div className="bbr relative md:w-3/5" style={{ width: "100%", marginLeft: "-50px" }}>
                        <img
                            src={im360}
                            alt="Facility Reception"
                            className="w-full h-full object-cover"
                        />


                        {/* 360 Button */}
                        <button
                            onClick={openVirtualTour}
                            className="absolute sticker transform shadow -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-white rounded-full p-1 transition-transform hover:scale-110 focus:outline-none"
                            aria-label="Open 360 Virtual Tour"
                        >
                            <div className="bg-teal-500 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(19, 171, 156)" className="w-15 h-15 rotating-svg">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                </svg>
                                <span className="absolute font-bold text-white text-center text-sm">360</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Virtual Tour Modal */}
                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg w-full max-w-4xl h-3/4 relative">
                            <button
                                onClick={closeVirtualTour}
                                className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                                aria-label="Close virtual tour"
                            >
                                ✕
                            </button>

                            {/* Here you can embed your 360 tour or video */}
                            {/* <iframe
                                src="https://www.youtube.com/watch?v=wiJA4_jdX9E&t=6s"
                                title="360 Virtual Tour"
                                className="w-full h-full rounded-lg"
                                allowFullScreen
                            ></iframe> */}
                            {/* <iframe width="560" height="315" src="https://bitmovin.com/demos/vr-360/" frameborder="0" allowfullscreen></iframe> */}
                            <iframe id="360images_iframe" width="100%" height="100%" src="http://www.360images.fr/360/iframe.html?pano=paris/lafayette.xml" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" framespacing="0" allowfullscreen> </iframe>

                        </div>
                    </div>
                )}
            </section>


            <div className="mt-5">
                <Testimonial testimonials={testimonials} />
            </div>
            <br /><br />
            <div>
                <Logo logos={certificates} />
            </div>
            <br /><br /><br /><br />
            <section data-aos="zoom-in-right" className="container-fluid mt-4 position-relative" style={{ backgroundColor: "#17416F" }}>
                <div className="container pt-4">
                    <div className="row">
                        <div className="col-lg-7 mx-auto order-2 order-lg-1">
                            <div>
                                <img src={contents?.home_page_patient_portal_bg_img.image} alt="" className="img-fluid w-100" />
                            </div>
                        </div>
                        <div className="col-lg-4 mb-3 mx-auto align-self-center order-1 order-lg-2" style={{ padding: "0px" }}>
                            <div className="p-3" style={{ fontWeight: "600" }}>
                                <h1 className="text-white text-uppercase fw-bold text-center text-md-start" style={{ fontSize: '35px', margin: "20px 0" }}>{selectedLanguage === 'fr' ? contents?.home_page_banner_link4.content_fr : contents?.home_page_banner_link4.content_en}</h1>
                                <div className="mt-3 text-white text-uppercase  text-center text-md-start">
                                    {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                        __html: contents?.home_page_patient_portal_desc.content_fr
                                    }} />) : (<div dangerouslySetInnerHTML={{
                                        __html: contents?.home_page_patient_portal_desc.content_en
                                    }} />)}
                                </div>
                                <div className=" d-flex justify-content-start justify-content-lg-start" style={{ margin: "20px 0" }}>
                                    <button
                                        className="btn btn-t text-white"
                                        style={{ backgroundColor: "#13AB9C", padding: "10px 25px", fontWeight: "600" }}
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
                <h2 className="text-center mb-4"
                    style={{ textTransform: 'uppercase', color: '#17416F', fontWeight: '700', fontSize: '36px' }}>
                    {selectedLanguage === 'fr' ? contents?.home_page_equipment_title.content_fr : contents?.home_page_equipment_title.content_en}
                </h2>
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
            <div>
                <Event events={events} />
            </div>
            <br />
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
