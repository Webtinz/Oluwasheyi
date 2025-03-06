import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import './about.css';
import Navbar from "./Components/navbar";
import Feedback from "./Components/Feedback";
import Subscription from "./Components/subscription";
import Footer from "./Components/footer";
import Group1 from '../assets/Group1.png';
import Image from '../assets/M1.png';
import Img from '../assets/c4.png';
import Img1 from '../assets/donate.png';
import Logo from '../assets/heart-health.png';
import Mask1 from '../assets/Fr.png';
import Mask2 from '../assets/Fr1.png';
import { getAllContents, getPrograms } from '../services/content.service';
import LanguageContext from '../context/LanguageContext';


const Home = () => {

    const { selectedLanguage } = useContext(LanguageContext);
    const [contents, setContents] = useState();
    const [programs, setPrograms] = useState([]);

    const steps = contents ? [
        {
            number: '01',
            text: selectedLanguage === 'fr' ? contents.donation_step_1.content_fr : contents.donation_step_1.content_en
        },
        {
            number: '02',
            text: selectedLanguage === 'fr' ? contents.donation_step_2.content_fr : contents.donation_step_2.content_en
        },
        {
            number: '03',
            text: selectedLanguage === 'fr' ? contents.donation_step_3.content_fr : contents.donation_step_3.content_en
        },
        {
            number: '04',
            text: selectedLanguage === 'fr' ? contents.donation_step_4.content_fr : contents.donation_step_4.content_en
        },
        {
            number: '05',
            text: selectedLanguage === 'fr' ? contents.donation_step_5.content_fr : contents.donation_step_5.content_en
        }
    ] : [];

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const savedContents = localStorage.getItem("contents");
                if (savedContents) {
                    setContents(JSON.parse(savedContents));
                } else {
                    const response = await getAllContents();
                    setContents(response.data);
                    localStorage.setItem("contents", JSON.stringify(response.data));
                }
                setPrograms(await getPrograms());
            } catch (error) {
                console.error('Failed to fetch contents:', error.message || error);
            }
        };
        fetchContents();
    }, []);

    const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return (
        <div className="container-fluid">
            <div><Navbar /></div>
            <section className="mt-4 position-relative" style={{ backgroundColor: '#17416F', padding: '100px 0' }}>
                <h1 className="text-center text-white" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: '40px' }}>{selectedLanguage === 'fr' ? contents?.donate_page_title.content_fr : contents?.donate_page_title.content_en}</h1>
                <div className="position-absolute bottom-0 start-0">
                    <img src={Group1} alt="" />
                </div>
                <div className="position-absolute top-0 end-0">
                    <img src={Mask2} alt="" />
                </div>
            </section>
            <br />
            <section className="container mt-4">
                <div className="row">
                    <div className="col-md-5 mx-auto mb-3">
                        <div>
                            <img src={contents?.donate_page_support_img.image} alt="" className="img-fluid main-img1 w-100" style={{ width: '100%', borderTopRightRadius: '30px', objectFit: 'cover' }} />
                        </div>
                    </div>
                    <div className="col-md-6 mx-auto">
                        <div className='p-4'>
                            <div><img src={Img1} /></div>
                            <h2 className='mt-4' style={{ textTransform: 'uppercase', color: '#17416F', fontWeight: '700', fontSize: '30px' }}> {selectedLanguage === 'fr' ? contents?.donate_page_support_title.content_fr : contents?.donate_page_support_title.content_en}</h2>
                            <p className='mt-3' style={{ color: '#17416F' }}>
                                {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                    __html: contents?.donate_page_support_descp.content_fr
                                }} />) : (<div dangerouslySetInnerHTML={{
                                    __html: contents?.donate_page_support_descp.content_en
                                }} />)}
                            </p>
                            <Link to="/donate" className='btn btn-pri mt-4 text-white px-4' style={{ background: '#13AB9C' }}>{selectedLanguage === 'fr' ? contents?.donate_page_steps_button.content_fr : contents?.donate_page_steps_button.content_en}</Link>
                        </div>
                    </div>
                </div>

                <span className='d-block my-4' style={{ borderBottom: '1px solid #17416F' }}></span>
            </section>
            <br /><br />
            <section className='container mt-4'>
                <h2 className='text-center' style={{ textTransform: 'uppercase', color: '#17416F', fontWeight: '700', fontSize: '36px' }}>
                    {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                        __html: contents?.donate_page_medical_title.content_fr
                    }} />) : (<div dangerouslySetInnerHTML={{
                        __html: contents?.donate_page_medical_title.content_en
                    }} />)}</h2>
                <br /><br />
                <div className='row mt-3'>
                    {programs?.map((card, index) => {
                        const randomColor = getRandomColor(); 
                        return (
                            <div key={index} className='col-12 col-md-6 col-lg-4 mb-4'>
                                <div className='p-3' style={{ background: randomColor, borderTopRightRadius: '30px', height: '250px' }}>
                                    <div className='p-3 bg-white d-flex justify-content-center' style={{ borderTopRightRadius: '30px' }}>
                                        <img src={Logo} alt='Logo' />
                                    </div>
                                    <h3 className='text-white my-4' style={{ fontSize: '24px', fontWeight: '700' }}>
                                        {selectedLanguage === 'fr' ? card.nom : card.name}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            <br /><br />
            <section className='container-fluid py-4' style={{ background: '#17416F' }}>
                <div className='container py-4'>
                    <h2 className='text-center text-white' style={{ fontWeight: '700', fontSize: '30px', textTransform: 'uppercase' }}>
                        {selectedLanguage === 'fr' ? contents?.donate_page_steps_title.content_fr : contents?.donate_page_steps_title.content_en}
                    </h2>
                    <br /><br />
                    <div className="position-relative pt-5">
                        {/* Steps Container */}
                        <div className="d-flex justify-content-between align-items-start position-relative steps-container">
                            {/* Horizontal Line */}
                            <div className="step-line"></div>

                            {steps.map((step, index) => (
                                <div key={index} className="d-flex flex-column align-items-center position-relative step-item">
                                    {/* Circle with Number */}
                                    <div className="step-circle">{step.number}</div>

                                    {/* Text */}
                                    <p className="text-white text-center small" style={{ fontWeight: '700', fontSize: '16px' }}>{step.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Donate Now Button */}
                        <div className="d-flex justify-content-center mt-4">
                            <button className="btn btn-primary px-4 py-2">
                                {selectedLanguage === 'fr' ? contents?.donation_step_button.content_fr : contents?.donation_step_button.content_en}
                            </button>
                        </div>
                    </div>

                </div>
            </section>
            <br /><br /><br />
            <section className='container mt-4'>
                <div className='d-flex justify-content-center'>
                    <div className='row' style={{ background: '#F2F2F2', borderTopRightRadius: '30px', width: '80%' }}>
                        <div className='col-md-5 mb-3 mb-md-0 mx-auto' style={{ padding: '0px' }}>
                            <div className='position-relative'>
                                <img src={contents?.donate_page_support_img.image} className='img-fluid w-100' style={{ height: '80vh', objectFit: 'cover' }} />
                                {/* <div className='contpos'>
                                    <img src={Mask1} alt="Wellness Programs" className="img-fluid" style={{ width: '70%' }} />
                                </div> */}
                            </div>
                        </div>
                        <div className='col-md-7 mb-3 mb-md-0 mx-auto align-self-center'>
                            <Subscription programs={programs}/>
                        </div>
                    </div>
                </div>
            </section>
            <br/><br/>
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
