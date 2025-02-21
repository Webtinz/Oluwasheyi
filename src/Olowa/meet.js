import React, { useState } from 'react';
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

const doctors = [
    { id: 1, image: Doc, name: "Docteurs Name", specialty: "Gynecologist" },
    { id: 2, image: Doc1, name: "Docteurs Name", specialty: "Gynecologist" },
    { id: 3, image: Doc2, name: "Docteurs Name", specialty: "Gynecologist" },
    { id: 4, image: Doc3, name: "Docteurs Name", specialty: "Gynecologist" },
    { id: 5, image: Doc, name: "Docteurs Name", specialty: "Gynecologist" },
    { id: 6, image: Doc1, name: "Docteurs Name", specialty: "Gynecologist" },
    { id: 7, image: Doc2, name: "Docteurs Name", specialty: "Gynecologist" },
    { id: 8, image: Doc3, name: "Docteurs Name", specialty: "Gynecologist" },
  ];
const Home = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const directors = [
        { id: 1, image: Img, name: "Docteurs Name" },
        { id: 2, image: Img1, name: "Docteurs Name" },
      ];
      
  return (
    <div className="container-fluid">
        <div><Navbar/></div>
        <section className="mt-4 position-relative" style={{ backgroundColor: '#17416F', padding: '100px 0' }}>
            <h1 className="text-center text-white" style={{ textTransform: 'uppercase',fontWeight:'700',fontSize:'40px' }}>Meet the team</h1>
            <div className="position-absolute bottom-0 start-0">
                <img src={Group1} alt="" />
            </div>
        </section>
        <br/><br/><br/>
        <section className="container mt-4">
            <div className="row">
                <div className="col-md-2 mx-auto mb-3">
                    <h2 className='text-center' style={{ color: '#17416F', textTransform: 'uppercase', fontWeight: 700, fontSize:'30px' }}>
                        Our Team
                    </h2>
                </div>
                <div className="col-md-8 mx-auto">
                <p style={{ color: '#17416F' }}>
                    Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio. Proin sed nunc quis ex faucibus volutpat.
                    <br /><br />
                    Quisque faucibus in quam quis lobortis. Donec metus neque, euismod a volutpat eget, porta sed ligulalus consequat risu.
                </p>
                </div>
            </div>
        </section>
        <br /><br/><br/>
        <section className="container my-4" style={{ backgroundColor: "#13AB9C", padding: "80px 0px" }}>
            <h2 className="text-center" style={{ color: "white", fontWeight: 700, textTransform: "uppercase", fontSize:'25px' }}>
                Directors
            </h2>
            <br />
            <div className="row justify-content-center">
                <div className="col-lg-2"></div>
                {directors.map((director) => (
                <div key={director.id} className="col-lg-4 mx-auto mb-md-0 mb-3">
                    <div className="p-3">
                    <img src={director.image} alt={director.name} className="img-fluid w-100" style={{maxHeight:'80vh', objectFit:'cover'}}/>
                    <h4 className="text-center mt-4" style={{ color: "white", fontWeight: 700, textTransform: "uppercase" }}>
                        {director.name}
                    </h4>
                    <p className="text-white text-center mt-3">Directors</p>
                    <span className="d-block mt-4" style={{ borderBottom: "1px solid white" }}></span>
                    </div>
                </div>
                ))}
                <div className="col-lg-2"></div>
            </div>
        </section>
        <br /><br/><br/>
        <section className="container">
            <h2 className="text-center" style={{ color: "#17416F", textTransform: "uppercase", fontWeight: 700, fontSize:'36px' }}>
                Our Doctors
            </h2>
            <br />
            <div className="row mt-4">
                {doctors.map((doctor) => (
                <div key={doctor.id} className="col-12 col-md-6 col-lg-3 mx-auto mb-4">
                    <a href="#" onClick={(e) => { e.preventDefault(); setSelectedDoctor(doctor); }}>
                    <img src={doctor.image} alt={doctor.name} className="img-fluid w-100" style={{ borderTopRightRadius: "30px" }} />
                    </a>
                    <h3 className="text-center mt-3" style={{ color: "#17416F", fontWeight: 700, textTransform: "uppercase" }}>
                    {doctor.name}
                    </h3>
                    <p className="text-center" style={{ color: "#13AB9C" }}>{doctor.specialty}</p>
                    
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
                            <div className='color'>
                                <div className="row">
                                    <div className="col-12 col-lg-4 mx-auto mb-4">
                                        <div className="position-relative">
                                        <img src={selectedDoctor.image} alt={selectedDoctor.name} className="img-fluid w-100" style={{ borderTopRightRadius: "30px" }} />
                                        <div className="poop">
                                            <a href="#"><img src={LinkedIn} alt="LinkedIn" /></a>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-8 mx-auto mb-4">
                                        <h2 style={{ fontSize: "25px", color: "#17416F", fontWeight: 800 }}>{selectedDoctor.name}</h2>
                                        <p style={{ color: "#13AB9C", fontWeight:'600' }}>Cardiologist, MD, 10+ years experience.</p>
                                        <span className="my-4 d-block" style={{ borderBottom: "1px solid #17416F33" }}></span>
                                        <p style={{ color: "#17416F" }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus pellentesque ultrices.
                                            Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio.
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus pellentesque ultrices.
                                            Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio.
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus pellentesque ultrices.
                                            Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio.
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus pellentesque ultrices.
                                            Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio.
                                        </p>
                                        <div className="mt-3">
                                        <button className="btn btn-cont px-4 py-2" style={{ color: "white", backgroundColor: "#13AB9C" }}>
                                            Contact Me
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col1">
                            <button onClick={() => setSelectedDoctor(null)} className="btn-close text-white fs-4 fw-bold bg-white"></button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            )}
            {selectedDoctor && <div className="modal-backdrop fade show" onClick={() => setSelectedDoctor(null)}></div>}
        </section>
        <br /><br/><br/>
        <section className="container">
            <div className="row">
                <div className="col-12 col-md-6 mx-auto mb-3 mb-md-0">
                <img src={Mask} alt="Staff Members" className="img-fluid w-100" style={{maxHeight:'70vh', objectFit:'cover', borderTopRightRadius:'30px'}}/>
                </div>
                <div className="col-12 col-md-6 mx-auto mb-3 mb-md-0 p-5 align-self-center">
                <h2 style={{ textTransform: "uppercase", color: "#17416F",fontWeight:'700', fontSize:'30px' }}>Staff Members</h2>
                <p className="mt-3" style={{ color: "#17416F", fontSize: "14px" }}>
                    Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio. Proin sed nunc quis ex faucibus volutpat.
                    <br /><br />
                    Nam molestie erat at ex volutpat tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed vitae leo massa. Mauris lobortis dui tellus, sed vestibulum ex tristique id. Duis condimentum eget velit at congue. Donec ut pulvinar lacus. Suspendisse pretium tellus a diam varius feugiat. Proin finibus viverra maximus. Nunc varius erat lectus, id vestibulum libero viverra non.
                    Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio. Proin sed nunc quis ex faucibus volutpat.
                    <br /><br />
                    Nam molestie erat at ex volutpat tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed vitae leo massa. Mauris lobortis dui tellus, sed vestibulum ex tristique id. Duis condimentum eget velit at congue. Donec ut pulvinar lacus. Suspendisse pretium tellus a diam varius feugiat. Proin finibus viverra maximus. Nunc varius erat lectus, id vestibulum libero viverra non.
                </p>
                <div className="mt-3">
                    <button className="btn btn-cont text-white px-4" style={{ backgroundColor: "#13AB9C" }}>
                    Contact Us
                    </button>
                </div>
                </div>
            </div>
        </section>
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
