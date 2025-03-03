import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import './about.css';
import Navbar from "./Components/navbar";
import Feedback from "./Components/Feedback";
import Footer from "./Components/footer";
import Group1 from '../assets/Group1.png';
import Testi from '../assets/testi.png';
import Mask1 from '../assets/Fr1.png';
import { getAllContents } from '../services/content.service';
import LanguageContext from '../context/LanguageContext';


const Home = () => {
    const testimonials = [
        {
            quote: "Highly Recommended!!",
            text: "Lorem ipsum dolor sit amet nulls const consectetur. A lectus urna sit ut smest pretium placerat faucibus faucibus faucibus. Sit quis consequat eget nulla fusce dignissim. Nulla accumsan convallis augue ut tempor.",
            name: "Jane Cooper",
            location: "Cotonou",
            imageSrc: Testi, // Assurez-vous que 'Testi' est bien importé
        },
        {
            quote: "Amazing",
            text: "The doctors were amazing! 10/10 service!",
            name: "John Doe",
            location: "Lagos",
            imageSrc: Testi, // Remplacez si vous avez différentes images
        },
        {
            quote: "Highly Recommended!!",
            text: "Lorem ipsum dolor sit amet nulls const consectetur. A lectus urna sit ut smest pretium placerat faucibus faucibus faucibus. Sit quis consequat eget nulla fusce dignissim. Nulla accumsan convallis augue ut tempor.",
            name: "Jane Cooper",
            location: "Cotonou",
            imageSrc: Testi, // Assurez-vous que 'Testi' est bien importé
        },
        {
            quote: "Great Hospital ",
            text: "Lorem ipsum dolor sit amet nulls const consectetur. A lectus urna sit ut smest pretium placerat faucibus.",
            name: "Jane Cooper",
            location: "Cotonou",
            imageSrc: Testi, // Assurez-vous que 'Testi' est bien importé
        },
        {
            quote: "Highly Recommended!!",
            text: "Lorem ipsum dolor sit amet nulls const consectetur. A lectus urna sit ut smest pretium placerat faucibus faucibus faucibus. Sit quis consequat eget nulla fusce dignissim. A lectus urna sit ut smest pretium placerat faucibus faucibus faucibus.",
            name: "Jane Cooper",
            location: "Cotonou",
            imageSrc: Testi, // Assurez-vous que 'Testi' est bien importé
        },
        {
            quote: "Great Hospital ",
            text: "Lorem ipsum dolor sit amet nulls const consectetur. A lectus urna sit ut smest pretium placerat faucibus.",
            name: "Jane Cooper",
            location: "Cotonou",
            imageSrc: Testi, // Assurez-vous que 'Testi' est bien importé
        },
    ];

    const {selectedLanguage} = useContext(LanguageContext);
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
        <div><Navbar/></div>
        <section className="mt-4 position-relative" style={{ backgroundColor: '#17416F', padding: '100px 0' }}>
            <h1 className="text-center text-white" style={{ textTransform: 'uppercase',fontWeight:'700',fontSize:'40px' }}>{selectedLanguage === 'fr' ? contents?.testimonials_page_title.content_fr : contents?.testimonials_page_title.content_en}</h1>
            <div className="position-absolute bottom-0 start-0">
                <img src={Group1} alt="" />
            </div>
            <div className="position-absolute top-0 end-0">
                <img src={Mask1} alt="" />
            </div>
        </section>
        <br /><br /><br />
        <section className="container">
            <h2 className='text-center' style={{fontSize:'36px', color:'#17416F', fontWeight:'700'}}>{selectedLanguage === 'fr' ? contents?.	testimonials_page_testimonial_title.content_fr : contents?.	testimonials_page_testimonial_title.content_en}</h2>
            <br /><br /><br />
            <div className="row g-4">
                {testimonials.map((testimonial, index) => (
                    <div 
                        key={index} 
                        className={`col-12 col-md-6 col-lg-4 ${
                            // On cible uniquement la cinquième colonne (index 4)
                            index === 4 ? 'fifth-column' : ''
                        }`}
                    >
                        <div className="p-3 scur" style={{border: '1px solid #17416F', borderTopRightRadius: '30px'}}>
                            <div><strong style={{color: '#13AB9C', fontSize: '120px'}}>"</strong></div>
                            <h2 className="ms-2" style={{color: '#17416F', fontWeight: '700', marginTop: '-4rem',fontSize:'27px'}}>{testimonial.quote}</h2>
                            <br/>
                            <p className="ms-2" style={{fontWeight: '100', color: '#17416F'}}>
                                {testimonial.text}
                            </p>
                            <span className="my-4 d-flex" style={{borderBottom: '1px solid #B5B5B580'}}></span>
                            <div className="d-flex mb-3">
                                <div>
                                    <img src={testimonial.imageSrc} className="img-fluid" style={{width: '80px', height: '80px', borderRadius: '50%'}} alt={testimonial.name} />
                                </div>
                                <div className="align-self-center ms-2">
                                    <strong style={{color: '#17416F'}}>{testimonial.name}</strong><br />
                                    <small style={{color: '#17416F'}}>{testimonial.location}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CSS avec focus uniquement sur la cinquième colonne */}
            <style jsx>{`
                .fifth-column .scur {
                    margin-top: -4.5rem;
                }
            `}</style>
        </section>
        <br /><br /><br />
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
