import React, { useContext, useEffect, useMemo, useState } from 'react';
// import { Link } from "react-router-dom";
import './index.css';
import './about.css';
import Navbar from "./Components/navbar";
import Feedback from "./Components/Feedback";
import Subscription from "./Components/subscription";
import Footer from "./Components/footer";
import Group1 from '../assets/Group1.png';
import Img1 from '../assets/donate.png';
import Mask2 from '../assets/Fr1.png';
import { getAllContents, getPrograms } from '../services/content.service';
import LanguageContext from '../context/LanguageContext';
import { useLocation } from 'react-router-dom';

const Donate = () => {
    // Context and state
    const { selectedLanguage } = useContext(LanguageContext);
    const [contents, setContents] = useState(null);
    const [programs, setPrograms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [showCarousel, setShowCarousel] = useState(true);

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const response = await getAllContents();
                console.log("Contents fetched:", response.data);
                setContents(response.data);
                setPrograms(await getPrograms());
            } catch (error) {
                console.error('Failed to fetch contents:', error.message || error);
            }
        };
        fetchContents();
    }, []);

    const location = useLocation();
    useEffect(() => {
        console.log("Donate page mounted or updated", location.pathname);
    }, [location.pathname]);

    // const steps = contents ? [
    //     {
    //         number: '01',
    //         text: selectedLanguage === 'fr' ? contents.donation_step_1.content_fr : contents.donation_step_1.content_en
    //     },
    //     {
    //         number: '02',
    //         text: selectedLanguage === 'fr' ? contents.donation_step_2.content_fr : contents.donation_step_2.content_en
    //     },
    //     {
    //         number: '03',
    //         text: selectedLanguage === 'fr' ? contents.donation_step_3.content_fr : contents.donation_step_3.content_en
    //     },
    //     {
    //         number: '04',
    //         text: selectedLanguage === 'fr' ? contents.donation_step_4.content_fr : contents.donation_step_4.content_en
    //     },
    //     {
    //         number: '05',
    //         text: selectedLanguage === 'fr' ? contents.donation_step_5.content_fr : contents.donation_step_5.content_en
    //     }
    // ] : [];

    const steps = useMemo(() => contents ? [
        { number: '01', text: selectedLanguage === 'fr' ? contents.donation_step_1.content_fr : contents.donation_step_1.content_en },
        { number: '02', text: selectedLanguage === 'fr' ? contents.donation_step_2.content_fr : contents.donation_step_2.content_en },
        { number: '03', text: selectedLanguage === 'fr' ? contents.donation_step_3.content_fr : contents.donation_step_3.content_en },
        { number: '04', text: selectedLanguage === 'fr' ? contents.donation_step_4.content_fr : contents.donation_step_4.content_en },
        { number: '05', text: selectedLanguage === 'fr' ? contents.donation_step_5.content_fr : contents.donation_step_5.content_en }
    ] : [], [contents, selectedLanguage]);

    const [visibleSteps, setVisibleSteps] = useState(steps);

    useEffect(() => {
        const updateVisibleSteps = () => {
            if (window.innerWidth < 639) {
                setVisibleSteps(steps.slice(0, 3));
            } else {
                setVisibleSteps(steps);
            }
        };

        updateVisibleSteps();
        window.addEventListener('resize', updateVisibleSteps);
        return () => window.removeEventListener('resize', updateVisibleSteps);
    }, [steps]);


    // Helper functions
    // const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const colors = ["#EE2C28", "#13AB9C", "#17416F", "#F4A261", "#E76F51", "#264653"]; // List of colors


    const handleOpenModal = (program) => {
        setSelectedProgram(program);
        setShowModal(true);
    };
    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);

        // On peut toujours faire défiler vers la section cible
        setTimeout(() => {
            const targetSection = document.getElementById('targetSection');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    // Content display helpers
    const renderContent = (content) => {
        if (!content) return null;

        const text = selectedLanguage === 'fr' ? content.content_fr : content.content_en;
        return <div dangerouslySetInnerHTML={{ __html: text }} />;
    };

    // Effect for disabling the scroll when modal is open
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';  // Disable scroll
        } else {
            document.body.style.overflow = 'auto';  // Enable scroll
        }
    }, [showModal]);

    return (
        <div key={location.pathname} className="container-fluid" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <div><Navbar /></div>

            <section className="mt-4 position-relative" style={{ backgroundColor: '#17416F', padding: '100px 0' }}>
                <h1 className="text-center text-white" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: '40px' }}>
                    {selectedLanguage === 'fr' ? contents?.donate_page_title.content_fr : contents?.donate_page_title.content_en}
                </h1>
                <div className="position-absolute bottom-0 start-0">
                    <img src={Group1} alt="" />
                </div>
                <div className="position-absolute top-0 end-0" >
                    <img src={Mask2} alt="" />
                </div>
            </section>
            <br />

            {/* Support Section */}
            <section className="container mt-4" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                <div className="row">
                    <div className="col-md-5 mx-auto mb-3">
                        <div>
                            <img
                                src={contents?.donate_page_support_img.image}
                                alt=""
                                className="img-fluid main-img1 w-100"
                                style={{ width: '100%', borderTopRightRadius: '30px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mx-auto">
                        <div className='p-4'>
                            <div><img src={Img1} /></div>
                            <h2 className='mt-4' style={{ textTransform: 'uppercase', color: '#17416F', fontWeight: '700', fontSize: '30px' }}> {selectedLanguage === 'fr' ? contents?.donate_page_support_title.content_fr : contents?.donate_page_support_title.content_en}</h2>
                            <div className='mt-3' style={{ color: '#17416F' }}>
                                {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                    __html: contents?.donate_page_support_descp.content_fr
                                }} />) : (<div dangerouslySetInnerHTML={{
                                    __html: contents?.donate_page_support_descp.content_en
                                }} />)}
                            </div>
                            <button className='btn btn-pri mt-4 text-white px-4' style={{ background: '#13AB9C' }}>{selectedLanguage === 'fr' ? contents?.donate_page_steps_button.content_fr : contents?.donate_page_steps_button.content_en}</button>
                        </div>
                    </div>
                </div>
                <span className='d-block my-4' style={{ borderBottom: '1px solid #17416F' }}></span>
            </section>
            <br /><br />
            <section className='container-fluid py-4' style={{ background: '#17416F' }}>
                <div className='container py-4'>
                    <h2 className='text-center text-white' style={{ fontWeight: '700', fontSize: '30px', textTransform: 'uppercase' }}>
                        {selectedLanguage === 'fr' ? contents?.donate_page_steps_title.content_fr : contents?.donate_page_steps_title.content_en}
                    </h2>
                    <br /><br />
                    <div className="position-relative pt-5">
                        <div className="d-flex justify-content-between align-items-start position-relative steps-container">
                            <div className="step-line"></div>
                            {visibleSteps.map((step, index) => (
                                <div key={index} className="d-flex flex-column align-items-center position-relative step-item">
                                    <div className="step-circle">{step.number}</div>
                                    <p className="text-white text-center small" style={{ fontWeight: '700', fontSize: '16px' }}>{step.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <button className="btn btn-primary px-4 py-2" onClick={handleCloseModal}>
                                {selectedLanguage === 'fr' ? contents?.donation_step_button.content_fr : contents?.donation_step_button.content_en}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <br /><br />
            {/* Programs Section - toujours affiché car showCarousel est toujours true */}
            {showCarousel && (
                <section className='container mt-4'>
                    <h2 className='text-center' style={{ textTransform: 'uppercase', color: '#17416F', fontWeight: '700', fontSize: '36px' }}>
                        {renderContent(contents?.donate_page_medical_title)}
                    </h2>
                    <br /><br />
                    <div className='row mt-3'>
                        {programs?.map((card, index) => {
                            const randomColor = colors[index % colors.length];
                            // const randomColor = getRandomColor();
                            return (
                                <div key={index} className='col-12 col-md-6 col-lg-4 mb-4'>
                                    <div className='p-3' style={{ background: randomColor, borderTopRightRadius: '30px', height: '250px' }}>
                                        <div
                                            className='p-3 bg-white d-flex justify-content-center'
                                            style={{ borderTopRightRadius: '30px', cursor: 'pointer' }}
                                            onClick={() => handleOpenModal(card)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#programModal"
                                        >
                                            <img
                                                src={card.photo}
                                                alt={selectedLanguage === 'fr' ? card.nom : card.name}
                                                className="img-fluid"
                                                style={{ maxHeight: '150px', objectFit: 'contain' }}
                                            />
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
            )}

            {/* Modal */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} id="programModal" tabIndex="-1" aria-labelledby="programModalLabel" aria-hidden={!showModal} style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg bg-white">
                    <div className="modal-content">
                        <div className="modal-header" style={{ background: '#fff' }}>
                            <h3 className="modal-title text-dark" id="programModalLabel">
                                {selectedProgram && (selectedLanguage === 'fr' ? selectedProgram.nom : selectedProgram.name)}
                            </h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}></button>
                        </div>
                        <div className="modal-body">
                            {selectedProgram && (
                                <div className='donn'>
                                    <div className="text-center mb-4">
                                        <img
                                            src={selectedProgram.photo}
                                            alt={selectedLanguage === 'fr' ? selectedProgram.nom : selectedProgram.name}
                                            className="img-fluid"
                                            style={{ maxHeight: '150px', objectFit: 'contain' }}
                                        />
                                    </div>

                                    <div>
                                        <h4>{selectedLanguage === 'fr' ? 'Description' : 'Description'}</h4>
                                        {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                                            __html: selectedProgram.description
                                        }} />) : (<div dangerouslySetInnerHTML={{
                                            __html: selectedProgram.description_en
                                        }} />)}
                                    </div>

                                    {selectedProgram.beneficiaries && (
                                        <div className="">
                                            <h4><b>{selectedLanguage === 'fr' ? 'Bénéficiaires' : 'Beneficiaries'}</b></h4>
                                            <p>{selectedProgram.beneficiaries}</p>
                                        </div>
                                    )}

                                    {selectedProgram.contact && (
                                        <div className="">
                                            <h4><b>{selectedLanguage === 'fr' ? 'Contact' : 'Contact'}</b></h4>
                                            <p>{selectedProgram.contact}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            {selectedProgram && selectedProgram.link && (
                                <a href={selectedProgram.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                    {selectedLanguage === 'fr' ? 'Plus d\'informations' : 'More Information'}
                                </a>
                            )}
                            <button type="button" className="btn btn-light text-white" onClick={() => {
                                handleCloseModal();
                                setSelectedProgram(selectedProgram);
                                // console.log("Selected Program:", selectedProgram);
                            }

                            } style={{ backgroundColor: "rgb(19, 171, 156)" }}>
                                {selectedLanguage === 'fr' ? 'Donation' : 'Donate'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-backdrop fade show" onClick={handleCloseModal}></div>
            )}

            {/* Steps Section */}
            <br /><br />


            {/* Target Section for Scrolling */}
            <section id="targetSection" className='container mt-lg-5 mt-0' style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                <div className='d-flex justify-content-center'>
                    <div className='row pxc' style={{ background: '#F2F2F2', borderTopRightRadius: '30px' }}>
                        <div className='col-md-5 mb-3 mb-md-0 mx-auto' style={{ padding: '0px' }}>
                            <div className='position-relative'>
                                <img
                                    // data-aos="flip-left" data-aos-duration="500"
                                    src={contents?.donate_page_payment_img.image}
                                    className='img-fluid w-100'
                                    style={{ height: '60vh', objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                        <div className='col-md-7 mb-3 mb-md-0 mx-auto align-self-center'>
                            <Subscription programs={programs} preselectedProgram={selectedProgram} />
                        </div>
                    </div>
                </div>
            </section>
            <br /><br />

            {/* Footer Components */}
            <div>
                <Feedback />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Donate;