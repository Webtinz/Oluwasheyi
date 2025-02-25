import React, { useState } from 'react';
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


const Home = () => {
    const cardData = [
        {
            backgroundColor: '#EE2C28',
            logo: Logo,
            title: 'Emergency Care Assistance',
        },
        {
            backgroundColor: '#17416F',
            logo: Logo,
            title: 'Pediatric Care Support',
        },
        {
            backgroundColor: '#047F1B',
            logo: Logo,
            title: 'Surgical Aid Program',
        },
        {
            backgroundColor: '#AF215D',
            logo: Logo,
            title: 'Cancer Treatment Support',
        },
        {
            backgroundColor: '#3030BB',
            logo: Logo,
            title: 'Maternal and Newborn Health',
        },
        {
            backgroundColor: '#005D9A',
            logo: Logo,
            title: 'Medical Equipment Fund',
        },
        {
            backgroundColor: '#0A3E82',
            logo: Logo,
            title: 'Elderly Care Assistance',
        },
        {
            backgroundColor: '#B25F14',
            logo: Logo,
            title: 'Community Health Outreach',
        },
        {
            backgroundColor: '#13AB9C',
            logo: Logo,
            title: 'Others',
        }
    ];

    const steps = [
        {
          number: '01',
          text: 'Select the medical program you wish to support'
        },
        {
          number: '02',
          text: 'Enter your donation amount'
        },
        {
          number: '03',
          text: 'Click the "Donate Now" button'
        },
        {
          number: '04',
          text: 'Complete the secure payment process'
        },
        {
          number: '05',
          text: 'Receive a confirmation message and thank you note'
        }
      ];
  return (
    <div className="container-fluid">
        <div><Navbar/></div>
        <section className="mt-4 position-relative" style={{ backgroundColor: '#17416F', padding: '100px 0' }}>
            <h1 className="text-center text-white" style={{ textTransform: 'uppercase',fontWeight:'700',fontSize:'40px' }}>Donate</h1>
            <div className="position-absolute bottom-0 start-0">
                <img src={Group1} alt="" />
            </div>
            <div className="position-absolute top-0 end-0">
                <img src={Mask1} alt="" />
            </div>
        </section>
        <br/>
        <section className="container mt-4">
            <div className="row">
                <div className="col-md-5 mx-auto mb-3">
                    <div>
                        <img src={Img} alt="" className="img-fluid" style={{ width: '100%', borderTopRightRadius:'30px', height:'80vh', objectFit:'cover' }} />
                    </div>
                </div>
                <div className="col-md-6 mx-auto">
                    <div className='p-4'>
                        <div><img src={Img1} /></div>
                        <h2 className='mt-4' style={{textTransform:'uppercase',color:'#17416F',fontWeight:'700', fontSize:'30px'}}>Support Medical Care for the Less Privileged</h2>
                        <p className='mt-3' style={{color:'#17416F'}}>
                        Every day, countless individuals struggle to access essential medical care due to financial constraints. 
                        <br/> <br/>
                        Your donation can provide life-saving treatments, critical medications, and support programs for those in need.
                        <br/><br/>
                        Together, we can make healthcare accessible for all—
                        one contribution at a time.
                        </p>
                        <Link to="/donate" className='btn btn-pri mt-4 text-white px-4' style={{background:'#13AB9C'}}>Donate Now</Link>
                    </div>
                </div>
            </div>

            <span className='d-block my-4' style={{borderBottom:'1px solid #17416F'}}></span>
        </section>
        <br/><br/>
        <section className='container mt-4'>
            <h2 className='text-center' style={{textTransform:'uppercase',color:'#17416F',fontWeight:'700', fontSize:'36px'}}>medical aid <br/>
            programs andbeneficiaries</h2>
            <br/><br/>
            <div className='row mt-3'>
                {cardData.map((card, index) => (
                    <div key={index} className='col-12 col-md-6 col-lg-4 mb-4'>
                        <div className='p-3' style={{ background: card.backgroundColor, borderTopRightRadius: '30px' }}>
                            <div className='p-3 bg-white d-flex justify-content-center' style={{ borderTopRightRadius: '30px' }}>
                                <img src={card.logo} alt='Logo' />
                            </div>
                            <h3 className='text-white my-4' style={{ fontSize: '24px', fontWeight: '700' }}>
                                {card.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        <br/><br/>
        <section className='container-fluid py-4' style={{background:'#17416F'}}>
            <div className='container py-4'>
                <h2 className='text-center text-white' style={{fontWeight:'700', fontSize:'30px', textTransform:'uppercase'}}>Easy-to-Donate Steps</h2>
                <br/><br/>
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
                            <p className="text-white text-center small" style={{fontWeight:'700',fontSize:'16px'}}>{step.text}</p>
                        </div>
                        ))}
                    </div>

                    {/* Donate Now Button */}
                    <div className="d-flex justify-content-center mt-4">
                        <button className="btn btn-primary px-4 py-2">Donate Now</button>
                    </div>
                </div>

            </div>
        </section>
        <br /><br /><br />
        <section className='container mt-4'>
            <div className='d-flex justify-content-center'>    
                <div className='row' style={{background:'#F2F2F2',borderTopRightRadius:'30px', width:'80%'}}>
                    <div className='col-md-5 mb-3 mb-md-0 mx-auto' style={{padding:'0px'}}>
                        <div className='position-relative'>
                            <img src={Image} className='img-fluid w-100' style={{height:'100vh',objectFit:'cover'}}/>
                            <div className='contpos'>
                                <img src={Mask1} alt="Wellness Programs" className="img-fluid" style={{width:'70%'}} />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-7 mb-3 mb-md-0 mx-auto align-self-center'>
                        <Subscription />
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
