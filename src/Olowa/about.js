import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import './about.css';
import Navbar from "./Components/navbar";
import Feedback from "./Components/Feedback";
import Footer from "./Components/footer";
import Group1 from '../assets/Group1.png';
import Image33 from '../assets/image 33.png';
import Mask1 from '../assets/Fr.png';
import Mask2 from '../assets/G122.png';
import Mask3 from '../assets/Fr1.png';
import { getAllContents } from '../services/content.service';
import LanguageContext from '../context/LanguageContext';


const Home = () => {
    const { selectedLanguage } = useContext(LanguageContext);
    const [contents, setContents] = useState();

    const values = [
        {
            title: selectedLanguage === 'fr' ? contents?.about_table_title_1.content_fr : contents?.about_table_title_1.content_en,
            description: selectedLanguage === 'fr' ? contents?.about_table_descp_1.content_fr : contents?.about_table_descp_1.content_en
        },
        {
            title: selectedLanguage === 'fr' ? contents?.about_table_title_2.content_fr : contents?.about_table_title_2.content_en,
            description: selectedLanguage === 'fr' ? contents?.about_table_descp_2.content_fr : contents?.about_table_descp_2.content_en
        },
        {
            title: selectedLanguage === 'fr' ? contents?.about_table_title_3.content_fr : contents?.about_table_title_3.content_en,
            description: selectedLanguage === 'fr' ? contents?.about_table_descp_3.content_fr : contents?.about_table_descp_3.content_en
        },
        {
            title: selectedLanguage === 'fr' ? contents?.about_table_title_4.content_fr : contents?.about_table_title_4.content_en,
            description: selectedLanguage === 'fr' ? contents?.about_table_descp_4.content_fr : contents?.about_table_descp_4.content_en
        },
        {
            title: selectedLanguage === 'fr' ? contents?.about_table_title_5.content_fr : contents?.about_table_title_5.content_en,
            description: selectedLanguage === 'fr' ? contents?.about_table_descp_5.content_fr : contents?.about_table_descp_5.content_en
        },
        {
            title: selectedLanguage === 'fr' ? contents?.about_table_title_6.content_fr : contents?.about_table_title_6.content_en,
            description: selectedLanguage === 'fr' ? contents?.about_table_descp_6.content_fr : contents?.about_table_descp_6.content_en
        },
        {
            title: selectedLanguage === 'fr' ? contents?.about_table_title_7.content_fr : contents?.about_table_title_7.content_en,
            description: selectedLanguage === 'fr' ? contents?.about_table_descp_7.content_fr : contents?.about_table_descp_7.content_en
        },
        {
            title: selectedLanguage === 'fr' ? contents?.about_table_title_8.content_fr : contents?.about_table_title_8.content_en,
            description: selectedLanguage === 'fr' ? contents?.about_table_descp_8.content_fr : contents?.about_table_descp_8.content_en
        }
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
            } catch (error) {
                console.error('Failed to fetch contents:', error.message || error);
            }
        };
        fetchContents();
    }, []);


    const yearsData = {
        "2011": {
            imageUrl: contents?.about_year_img_1.image,
            title: selectedLanguage === 'fr' ? contents?.about_year_title_1.content_fr : contents?.about_year_title_1.content_en,
            description: selectedLanguage === 'fr' ? contents?.about_year_descp_1.content_fr : contents?.about_year_descp_1.content_en
        },
        "2015": {
            imageUrl: contents?.about_year_img_1.image,
            title: selectedLanguage === 'fr' ? contents?.about_year_title_1.content_fr : contents?.about_year_title_1.content_en,
            description: selectedLanguage === 'fr' ? contents?.about_year_descp_1.content_fr : contents?.about_year_descp_1.content_en
        },
        "2019": {
            imageUrl: contents?.about_year_img_1.image,
            title: selectedLanguage === 'fr' ? contents?.about_year_title_1.content_fr : contents?.about_year_title_1.content_en,
            description: selectedLanguage === 'fr' ? contents?.about_year_descp_1.content_fr : contents?.about_year_descp_1.content_en
        },
        "2022": {
            imageUrl: contents?.about_year_img_1.image,
            title: selectedLanguage === 'fr' ? contents?.about_year_title_1.content_fr : contents?.about_year_title_1.content_en,
            description: selectedLanguage === 'fr' ? contents?.about_year_descp_1.content_fr : contents?.about_year_descp_1.content_en
        },
        "2024": {
            imageUrl: contents?.about_year_img_1.image,
            title: selectedLanguage === 'fr' ? contents?.about_year_title_1.content_fr : contents?.about_year_title_1.content_en,
            description: selectedLanguage === 'fr' ? contents?.about_year_descp_1.content_fr : contents?.about_year_descp_1.content_en
        }
    };

    const years = Object.keys(yearsData);
    const [currentYear, setCurrentYear] = useState(years[0]);

    const changeYear = (year) => {
        setCurrentYear(year);
    };

    const navigate = (direction) => {
        const currentIndex = years.indexOf(currentYear);
        const newIndex = Math.max(0, Math.min(years.length - 1, currentIndex + direction));
        setCurrentYear(years[newIndex]);
    };

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
            <div><Navbar /></div>
            <section className="mt-4 position-relative" style={{ backgroundColor: '#17416F', padding: '100px 0' }}>
                <h1 className="text-center text-white" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: '40px' }}>{selectedLanguage === 'fr' ? contents?.about_page_title.content_fr : contents?.about_page_title.content_en}</h1>
                <div className="position-absolute bottom-0 start-0">
                    <img src={Group1} alt="" />
                </div>
                <div className="position-absolute top-0 end-0" >
                    <img src={Mask3} alt="" />
                </div>
            </section>
            <br />
            <section className="container mt-3">
                <div className="row">
                    <div className="col-md-5 col-12 mx-auto mb-3 p-4">
                        <div className='position-relative'>
                            <img src={contents?.about_section_img.image} alt="" className="img-fluid w-100 main-img1" style={{ borderTopRightRadius: '30px', objectFit: 'cover' }} />
                            <div className='contpos'>
                                <img src={Mask1} alt="Wellness Programs" className="img-fluid" style={{ width: '80%' }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12 mx-auto mb-3 align-self-center p-4">
                        <h2 style={{ color: '#17416F', textTransform: 'uppercase', fontWeight: 700, fontSize: '30px' }}>
                            {selectedLanguage === 'fr' ? contents?.about_page_mission_title.content_fr : contents?.about_page_mission_title.content_en}
                        </h2>
                        <br />
                        <p className="mt-2">
                            {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                __html: contents?.about_page_mission_desc.content_fr
                            }} />) : (<div dangerouslySetInnerHTML={{
                                __html: contents?.about_page_mission_desc.content_en
                            }} />)}
                        </p>
                        <br />
                        <ul className="list-unstyled">
                            {[
                                selectedLanguage === 'fr' ? contents?.about_list_descp_1.content_fr : contents?.about_list_descp_1.content_en,
                                selectedLanguage === 'fr' ? contents?.about_list_descp_2.content_fr : contents?.about_list_descp_2.content_en,
                                selectedLanguage === 'fr' ? contents?.about_list_descp_3.content_fr : contents?.about_list_descp_3.content_en,
                                selectedLanguage === 'fr' ? contents?.about_list_descp_4.content_fr : contents?.about_list_descp_4.content_en
                            ].map((text, index) => (
                                <li key={index}>
                                    <div className="d-flex">
                                        <div className="mt-2 me-3">
                                            <span className="d-block" style={{ width: '10px', height: '10px', backgroundColor: '#13AB9C', borderRadius: '50%' }}></span>
                                        </div>
                                        <div>
                                            <p style={{ color: '#17416F' }}>{text}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
            <br />
            <section className="container-fluid" style={{ padding: '0px' }}>
                <iframe
                    width="100%"
                    height="505"
                    src="https://www.youtube.com/embed/mH81Q9Dtodc"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube Video"
                ></iframe>
            </section>
            <br />
            <section className="container-fluid py-5" style={{ backgroundColor: '#17416F', marginTop: '-1.5rem' }}>
                <div className="text-white py-4">
                    <h2 className="text-center" style={{ fontSize: 'clamp(25px, 8vw, 36px)', fontWeight: '700' }}>{selectedLanguage === 'fr' ? contents?.about_page_vision_title.content_fr : contents?.about_page_vision_title.content_en}</h2>
                    <br />
                    <div className="d-flex justify-content-center">
                        <p className="text-center" style={{ width: '40%' }}>
                            {selectedLanguage === 'fr' ? contents?.about_page_vision_desc.content_fr : contents?.about_page_vision_desc.content_en}
                        </p>
                    </div>
                </div>
            </section>
            <br />
            <>
                {/* Our Values Section */}
                <section className="container mt-5">
                    <h2 style={{ color: '#17416F', fontSize: 'clamp(25px, 8vw, 36px)', fontWeight: '700',textTransform:'uppercase' }}>  {selectedLanguage === 'fr' ? contents?.about_page_value_title.content_fr : contents?.about_page_value_title.content_en} </h2>
                    <br />
                    <div className="row mt-4">
                        {values.map((value, index) => (
                            <div key={index} className="col-12 col-md-6 col-lg-3 mb-4 mx-auto">
                                <div className="p-3 text-white cvc position-relative" style={{ backgroundColor: '#13AB9C', borderTopRightRadius: '30px', height: '280px' }}>
                                    <p style={{ fontSize: 'clamp(18px, 8vw, 24px)' }}><strong>{value.title}</strong></p>
                                    <p className='mt-2' style={{ fontWeight: '400' }}>{value.description}</p>
                                    <div className='edn'>
                                        <p className="" style={{ fontWeight: '700', fontSize: '5rem', color: '#FFFFFF4D', marginBottom: '0px' }}>
                                            {index + 1}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </>
            <br />
            <section className="container mt-5">
                <h2 className="text-center" style={{ color: '#17416F', fontSize: '36px', fontWeight: '700', textTransform: 'uppercase' }}>
                    {selectedLanguage === 'fr' ? contents?.about_page_history_title.content_fr : contents?.about_page_history_title.content_en}
                </h2>
                <br />
                <div className="mt-4 hero">
                    <div className="p-5 flx" style={{ borderTopRightRadius: '30px', backgroundColor: '#17416F', width: '40vw', height: '60vh' }}>
                        <div className='position-relative'>
                            <p style={{ color: '#13AB9C', fontWeight: '700', fontSize: 'clamp(22px, 8vw, 28px)' }}>{currentYear}</p>
                            <p className="text-white" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: 'clamp(30px, 8vw, 40px)' }}>
                                {yearsData[currentYear].title}
                            </p>
                            <p style={{ fontWeight: '200', color: 'white', fontSize: 'clamp(18px, 8vw, 25px)' }}>{yearsData[currentYear].description}</p>
                            <div className='contpos1'>
                                <img src={Mask2} alt="Wellness Programs" className="img-fluid" style={{ width: '80%' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br />
                <div className="d-flex justify-content-center align-items-center timeline-container">
                    <div className="arrow" onClick={() => navigate(-1)}><i className="bi bi-chevron-left"></i></div>
                    <div className="timeline d-flex align-items-center">
                        <div className="line"></div>
                        {years.map((year) => (
                            <div
                                key={year}
                                className={`year ${currentYear === year ? 'active' : ''}`}
                                onClick={() => changeYear(year)}
                                data-year={year}
                            >
                                <span>{year}</span>
                            </div>
                        ))}
                    </div>
                    <div className="arrow" onClick={() => navigate(1)}><i className="bi bi-chevron-right"></i></div>
                </div>
            </section>
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
