import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import './about.css';
import Navbar from "./Components/navbar";
import Feedback from "./Components/Feedback";
import Footer from "./Components/footer";
import Group1 from '../assets/Group1.png';
import Img from '../assets/Mask group1.png';
import Img1 from '../assets/Mask group2.png';
import Doc from '../assets/1.png';
import Doc1 from '../assets/2.png';
import Doc2 from '../assets/3.png';
import Doc3 from '../assets/4.png';
import LinkedIn from '../assets/linkedin.png';
import Mask from '../assets/Mask group.png';
import Mask1 from '../assets/Fr1.png';
import Mask2 from '../assets/Fr.png';
import { getAllContents, getTeamMembers } from '../services/content.service';
import LanguageContext from '../context/LanguageContext';

// const doctors = [
//     { id: 1, image: Doc, name: "Docteurs Name", specialty: "Gynecologist" },
//     { id: 2, image: Doc1, name: "Docteurs Name", specialty: "Gynecologist" },
//     { id: 3, image: Doc2, name: "Docteurs Name", specialty: "Gynecologist" },
//     { id: 4, image: Doc3, name: "Docteurs Name", specialty: "Gynecologist" },
//     { id: 5, image: Doc, name: "Docteurs Name", specialty: "Gynecologist" },
//     { id: 6, image: Doc1, name: "Docteurs Name", specialty: "Gynecologist" },
//     { id: 7, image: Doc2, name: "Docteurs Name", specialty: "Gynecologist" },
//     { id: 8, image: Doc3, name: "Docteurs Name", specialty: "Gynecologist" },
// ];
const Home = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const { selectedLanguage } = useContext(LanguageContext);
    const [contents, setContents] = useState();

    const directors = [
        { id: 1, image: contents?.doct_img_1.image , name: "Docteurs Name" },
        { id: 2, image: contents?.doct_img_2.image , name: "Docteurs Name" },
    ];

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
                setDoctors(await getTeamMembers())
            } catch (error) {
                console.error('Failed to fetch contents:', error.message || error);
            }
        };
        fetchContents();
    }, []);

    return (
        <div className="container-fluid">
            <div><Navbar /></div>
            <section className="mt-4 position-relative" style={{ backgroundColor: '#17416F', padding: '100px 0' }}>
                <h1 className="text-center text-white" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: '40px' }}>
                    {selectedLanguage === 'fr' ? contents?.team_page_title.content_fr : contents?.team_page_title.content_en}
                </h1>
                <div className="position-absolute bottom-0 start-0">
                    <img src={Group1} alt="" />
                </div>
                <div className="position-absolute top-0 end-0">
                    <img src={Mask1} alt="" />
                </div>
            </section>
            <br /><br /><br />
            <section className="container mt-4">
                <div className="row">
                    <div className="col-md-2 mx-auto mb-3">
                        <h2 className='text-center' style={{ color: '#17416F', textTransform: 'uppercase', fontWeight: 700, fontSize: '30px' }}>
                            {selectedLanguage === 'fr' ? contents?.team_page_team_title.content_fr : contents?.team_page_team_title.content_en}
                        </h2>
                    </div>
                    <div className="col-md-8 mx-auto">
                        <p style={{ color: '#17416F' }}>
                            {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                __html: contents?.team_descp.content_fr
                            }} />) : (<div dangerouslySetInnerHTML={{
                                __html: contents?.team_descp.content_en
                            }} />)}
                        </p>
                    </div>
                </div>
            </section>
            <br /><br /><br />
            <section className="container my-4" style={{ backgroundColor: "#13AB9C", padding: "80px 0px" }}>
                <h2 className="text-center" style={{ color: "white", fontWeight: 700, textTransform: "uppercase", fontSize: 'clamp(25px, 8vw, 36px)' }}>
                    {selectedLanguage === 'fr' ? contents?.team_page_directors.content_fr : contents?.team_page_directors.content_en}
                </h2>
                <br />
                <div className="row justify-content-center">
                    <div className="col-lg-2"></div>
                    {directors.map((director) => (
                        <div key={director.id} className="col-lg-4 mx-auto mb-md-0 mb-3">
                            <div className="p-3">
                                <img src={director.image} alt={director.name} className="img-fluid w-100" style={{ maxHeight: '80vh', objectFit: 'cover' }} />
                                <h4 className="text-center mt-4" style={{ color: "white", fontWeight: 700, textTransform: "uppercase", fontSize: 'clamp(18px, 8vw, 24px)' }}>
                                    {director.name}
                                </h4>
                                <p className="text-white text-center mt-3" style={{ fontSize: 'clamp(16px, 8vw, 20px)' }}>Directors</p>
                                <span className="d-block mt-4" style={{ borderBottom: ".3px solid white" }}></span>
                            </div>
                        </div>
                    ))}
                    <div className="col-lg-2"></div>
                </div>
            </section>
            <br /><br /><br />
            <section className="container">
                <h2 className="text-center" style={{ color: "#17416F", textTransform: "uppercase", fontWeight: 700, fontSize: '36px' }}>
                    {selectedLanguage === 'fr' ? contents?.team_page_doctors_title.content_fr : contents?.team_page_doctors_title.content_en}
                </h2>
                <br />
                <div className="row mt-4">
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="col-12 col-md-6 col-lg-3 mx-auto mb-4">
                            <a href="#" onClick={(e) => { e.preventDefault(); setSelectedDoctor(doctor); }}>
                                <img src={Doc} alt={doctor.nom} className="img-fluid w-100" style={{ borderTopRightRadius: "30px", height:'60vh' }} />
                            </a>
                            <h3 className="text-center mt-3" style={{ color: "#17416F", fontWeight: 700, textTransform: "uppercase", fontSize: 'clamp(18px, 8vw, 25px)' }}>
                                {doctor.nom} {doctor.prenom}
                            </h3>
                            <p className="text-center mt-3" style={{ color: "#13AB9C", fontSize: 'clamp(16px, 8vw, 20px)' }}>{doctor.titre}</p>

                            <span className="d-block mt-3" style={{ borderBottom: "1px solid #17416F33" }}></span>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {selectedDoctor && (
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body position-relative">
                                    <div className='d-flex'>
                                        <div className='color1'>
                                            <div className="row">
                                                <div className="col-12 col-lg-5 mx-auto mb-4">
                                                    <div className="position-relative">
                                                        <img src={selectedDoctor.image} alt={selectedDoctor.name} className="img-fluid w-100" style={{ borderTopRightRadius: "30px" }} />
                                                        <div className="poop">
                                                            <a href="#"><img src={LinkedIn} alt="LinkedIn" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-7 mx-auto mb-4">
                                                    <h2 style={{ fontSize: "25px", color: "#17416F", fontWeight: 800 }}>{selectedDoctor.name}</h2>
                                                    <p style={{ color: "#13AB9C", fontWeight: '600' }}>{selectedLanguage === 'fr' ? contents?.modal_title.content_fr : contents?.modal_title.content_en}</p>
                                                    <span className="my-4 d-block" style={{ borderBottom: "1px solid #17416F33" }}></span>
                                                    <p style={{ color: "#17416F" }}>
                                                        {selectedLanguage === 'fr' ? contents?.modal_descp.content_fr : contents?.modal_descp.content_en}
                                                    </p>
                                                    <div className="mt-3">
                                                        <button className="btn btn-cont px-4 py-2" style={{ color: "white", backgroundColor: "#13AB9C" }}>
                                                            {selectedLanguage === 'fr' ? contents?.modal_button.content_fr : contents?.modal_button.content_en}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <button onClick={() => setSelectedDoctor(null)} className="btn-close text-white fs-4 fw-bold bg-white"></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {selectedDoctor && <div className="modal-backdrop fade show" onClick={() => setSelectedDoctor(null)}></div>}
            </section>
            <br /><br /><br />
            <section className="container">
                <div className="row">
                    <div className="col-12 col-md-5 mx-auto mb-3 mb-md-0">
                        <div className='position-relative'>
                            <img src={contents?.community_section_img.image}  alt="Staff Members" className="img-fluid w-100 main-img1" style={{ objectFit: 'cover', borderTopRightRadius: '30px' }} />
                            <div className='contpos'>
                                <img src={Mask2} alt="Staff Members" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mx-auto mb-3 mb-md-0 p-5 align-self-center">
                        <h2 style={{ textTransform: "uppercase", color: "#17416F", fontWeight: '700', fontSize: 'clamp(25px, 8vw, 36px)' }}> {selectedLanguage === 'fr' ? contents?.team_page_staff_title.content_fr : contents?.team_page_staff_title.content_en}</h2>
                        <p className="mt-3" style={{ color: "#17416F" }}>
                            {selectedLanguage === 'fr' ? contents?.team_page_staff_desc.content_fr : contents?.team_page_staff_desc.content_en}
                        </p>
                        <div className="mt-3">
                            <button className="btn btn-cont text-white px-4" style={{ backgroundColor: "#13AB9C" }}>
                                {selectedLanguage === 'fr' ? contents?.team_page_staff_button.content_fr : contents?.team_page_staff_button.content_en}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
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
