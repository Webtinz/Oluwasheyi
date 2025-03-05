import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import './about.css';
import Navbar from "./Components/navbar";
import Feedback from "./Components/Feedback";
import Footer from "./Components/footer";
import OwlCarousel from "./Components/owlcarousel";
import Logo from "./Components/logo";
import Group1 from '../assets/Group1.png';
import Img from '../assets/beta.png';
import Mask1 from '../assets/Fr1.png';
import Mask2 from '../assets/Fr.png';
import { getAllContents, getCertificates } from '../services/content.service';
import LanguageContext from '../context/LanguageContext';


const Home = () => {
    const { selectedLanguage } = useContext(LanguageContext);
    const [contents, setContents] = useState();
    const [certificates, setCerificates] = useState([]);

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
                setCerificates(await getCertificates());

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
                <h1 className="text-center text-white" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: '40px' }}> {selectedLanguage === 'fr' ? contents?.surgery_page_title.content_fr : contents?.surgery_page_title.content_en}</h1>
                <div className="position-absolute bottom-0 start-0">
                    <img src={Group1} alt="" />
                </div>
                <div className="position-absolute top-0 end-0">
                    <img src={Mask1} alt="" />
                </div>
            </section>
            <br />
            <section className="container mt-4">
                <div className="row">
                    <div className="col-md-5 mx-auto mb-3 mb-md-0">
                        <div className='position-relative'>
                            <img src={contents?.beta_img.image} alt="" className="img-fluid" style={{ borderTopRightRadius: '30px', objectFit: 'cover', height: '80vh' }} />
                            <div className='contpos'>
                                <img src={Mask2} alt="Staff Members" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mx-auto mb-3 mb-md-0">
                        <div className='px-4'>
                            <h2 style={{ textTransform: 'uppercase', color: '#17416F', fontWeight: '700', fontSize: '30px' }}>{selectedLanguage === 'fr' ? contents?.surgery_page_title.content_fr : contents?.surgery_page_title.content_en}</h2>
                            <p className='mt-3 ms-2' style={{ color: '#17416F', fontWeight: '600' }}>
                                {selectedLanguage === 'fr' ? contents?.surgery_page_surgery_title_descp.content_fr : contents?.surgery_page_surgery_title_descp.content_en}
                            </p>
                            <p className='ms-2 mt-2' style={{ color: '#17416F' }}>
                                {selectedLanguage === 'fr' ?
                                    (<div dangerouslySetInnerHTML={{
                                        __html: contents?.surgery_page_surgery_descp.content_fr
                                    }} />) :
                                    (<div dangerouslySetInnerHTML={{
                                        __html: contents?.surgery_page_surgery_descp.content_en
                                    }} />)
                                }

                            </p>
                            <br />
                            <Link to="/contact" className="btn btn-pri px-4 text-white" style={{ background: '#13AB9C' }}>{selectedLanguage === 'fr' ? contents?.	surgery_page_surgery_button.content_fr : contents?.	surgery_page_surgery_button.content_en}</Link>
                        </div>
                    </div>
                </div>
                <span className='d-flex my-4' style={{ borderBottom: '1px solid #17416F' }}></span>
            </section>
            <br /><br />
            <div><OwlCarousel /></div>
            <br /><br /><br /><br />
            <div>
                <Logo logos={certificates}/>
            </div>
            <br /><br /><br /><br />
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
