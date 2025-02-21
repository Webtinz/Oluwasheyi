import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import './about.css';
import Navbar from "./Components/navbar";
import Feedback from "./Components/Feedback";
import Footer from "./Components/footer";
import Group1 from '../assets/Group1.png';
import Testi from '../assets/testi.png';


const Home = () => {
    const testimonials = [
        {
            quote: "Highly Recommended!!",
            text: "Lorem ipsum dolor sit amet nulls const consectetur. A lectus urna sit ut smest pretium placerat faucibus faucibus faucibus.",
            name: "Jane Cooper",
            location: "Cotonou",
            imageSrc: Testi, // Assurez-vous que 'Testi' est bien importé
        },
        {
            quote: "Amazing",
            text: "Lorem ipsum dolor sit amet nulls const consectetur. A lectus urna sit ut smest pretium placerat faucibus faucibus faucibus.",
            name: "John Doe",
            location: "Lagos",
            imageSrc: Testi, // Remplacez si vous avez différentes images
        },
        {
            quote: "Highly Recommended!!",
            text: "Lorem ipsum dolor sit amet nulls const consectetur. A lectus urna sit ut smest pretium placerat faucibus faucibus faucibus.",
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
            quote: "Great Hospital ",
            text: "Lorem ipsum dolor sit amet nulls const consectetur. A lectus urna sit ut smest pretium placerat faucibus.",
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

    
    
  return (
    <div className="container-fluid">
        <div><Navbar/></div>
        <section className="mt-4 position-relative" style={{ backgroundColor: '#17416F', padding: '100px 0' }}>
            <h1 className="text-center text-white" style={{ textTransform: 'uppercase',fontWeight:'700',fontSize:'40px' }}>Testimonials</h1>
            <div className="position-absolute bottom-0 start-0">
                <img src={Group1} alt="" />
            </div>
        </section>
        <br /><br /><br />
        <section className="container">
            <h2 className='text-center' style={{fontSize:'36px', color:'#17416F', fontWeight:'700'}}>20,000+ Satisfied patients</h2>
            <br /><br /><br />
            <div className="row g-4">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4">
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
