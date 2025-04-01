import React, { useContext, useEffect } from 'react';
// import { Link } from "react-router-dom";
import './index.css';
import './about.css';
import Navbar from "./Components/navbar";
import Feedback from "./Components/Feedback";
import Footer from "./Components/footer";
import Group1 from '../assets/Group1.png';
// import Testi from '../assets/testi.png';
import Mask1 from '../assets/Fr1.png';
// import { getAllContents, getTestimonials } from '../services/content.service';
import LanguageContext from '../context/LanguageContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLoader } from '../context/LoaderContext';

const Home = () => {

    const { selectedLanguage } = useContext(LanguageContext);
    // const [contents, setContents] = useState();
    // const [testimonials, setTestimonials] = useState([]);
    const { appData } = useLoader();
    const { contents, testimonials } = appData;

    // Get contents on component mount
    useEffect(() => {
        // const fetchContents = async () => {
        //     try {
        //         // const savedContents = localStorage.getItem("contents");
        //         // if (savedContents) {
        //         //     setContents(JSON.parse(savedContents));
        //         // } else {
        //         // Fetch contents if not in localStorage
        //         const response = await getAllContents();
        //         setContents(response.data);
        //         //     localStorage.setItem("contents", JSON.stringify(response.data));
        //         // }
        //         setTestimonials(await getTestimonials())

        //     } catch (error) {
        //         console.error('Failed to fetch contents:', error.message || error);
        //     }
        // };
        // fetchContents();
        AOS.init();

    }, []);

    return (
        <div className="container-fluid" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <div><Navbar /></div>
            <section className="mt-4 position-relative" style={{ backgroundColor: '#17416F', padding: '100px 0' }}>
                <h1 className="text-center text-white" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: '40px' }}>{selectedLanguage === 'fr' ? contents?.data.testimonials_page_title.content_fr : contents?.data.testimonials_page_title.content_en}</h1>
                <div className="position-absolute bottom-0 start-0">
                    <img src={Group1} alt="" />
                </div>
                <div className="position-absolute top-0 end-0">
                    <img src={Mask1} alt="" />
                </div>
            </section>
            <br /><br /><br />
            <section className="container">
                <h2 className='text-center' style={{ fontSize: '36px', color: '#17416F', fontWeight: '700' }}>{selectedLanguage === 'fr' ? contents?.data.testimonials_page_testimonial_title.content_fr : contents?.data.testimonials_page_testimonial_title.content_en}</h2>
                <br /><br /><br />
                <div className="row g-4">
                    {testimonials?.map((testimonial, index) => (
                        <div

                            key={index}
                            className={[
                                "col-12 col-md-6 col-lg-4 ",
                                index === 0 ? "first-column" : "",
                                index === 1 ? "second-column" : "",
                                index === 2 ? "first-column" : "",
                                index === 3 ? "three-column" : "",
                                index === 4 ? "fifth-column" : "",
                                index === 5 ? "three-column" : "",
                            ].filter(Boolean).join(" ")}
                        >
                            <div data-aos="zoom-in" className="p-3 scur" style={{ border: '1px solid #17416F', borderTopRightRadius: '30px' }}>
                                <div><strong style={{ color: '#13AB9C', fontSize: '120px' }}>"</strong></div>
                                <h2 className="ms-2" style={{ color: '#17416F', fontWeight: '700', marginTop: '-4rem', fontSize: '27px' }}>{testimonial.titre}</h2>
                                <br />
                                <p className="ms-2" style={{ fontWeight: '100', color: '#17416F' }}>
                                    {testimonial.description}
                                </p>
                                <span className="my-4 d-flex" style={{ borderBottom: '1px solid #B5B5B580' }}></span>
                                <div className="d-flex mb-3">
                                    <div>
                                        <img src={testimonial.photo} className="img-fluid" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: "cover" }} alt={testimonial.name} />
                                    </div>
                                    <div className="align-self-center ms-2">
                                        <strong style={{ color: '#17416F' }}>{testimonial.nom} {testimonial.prenom}</strong><br />
                                        <small style={{ color: '#17416F' }}>{testimonial.address}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CSS avec focus uniquement sur la cinquième colonne */}
                {/* <style jsx>{`
                .fifth-column .scur {
                    margin-top: -4.5rem;
                }
            `}</style> */}
            </section>
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
