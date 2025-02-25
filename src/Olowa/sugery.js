import React, { useState } from 'react';
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


const Home = () => {
   
  return (
    <div className="container-fluid">
        <div><Navbar/></div>
        <section className="mt-4 position-relative" style={{ backgroundColor: '#17416F', padding: '100px 0' }}>
            <h1 className="text-center text-white" style={{ textTransform: 'uppercase',fontWeight:'700',fontSize:'40px' }}>Surgery</h1>
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
                <div className="col-md-5 mx-auto mb-3 mb-md-0">
                    <div className='position-relative'>
                        <img src={Img} alt="" className="img-fluid" style={{borderTopRightRadius:'30px', objectFit:'cover', height:'80vh'}}/>
                        <div className='contpos'>
                            <img src={Mask2} alt="Staff Members" className="img-fluid"/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mx-auto mb-3 mb-md-0 p-5">
                    <div className='px-4'>
                        <h2 style={{textTransform:'uppercase',color:'#17416F',fontWeight:'700',fontSize:'30px'}}>Surgery</h2>
                        <p className='mt-3 ms-2' style={{color:'#17416F',fontWeight:'600'}}>
                            We provide minimally invasive procedures for faster recovery
                        </p>
                        <p className='ms-2 mt-2' style={{color:'#17416F'}}>
                            Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio. Proin sed nunc quis ex faucibus volutpat. 
                            <br /><br />
                            Quisque faucibus in quam quis lobortis. Donec metus neque, euismod a volutpat eget, porta sed ligulalus consequat risu. 
                            <br /><br />
                            Duis dapibus quam erat, nec gravida erat sodales quis. Proin iaculis felis libero, vel dignissim velit volutpat eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut ut odio elementum, ultricies lorem at, accumsan mauris. Vestibulum ac orci vitae velit sodales convallis vitae nec justo. 
                        </p>
                        <br />
                        <Link to="/contact" className="btn btn-pri px-4 text-white" style={{background:'#13AB9C'}}>Contact Us</Link>
                    </div>
                </div>
            </div>
            <span className='d-flex my-4' style={{borderBottom:'1px solid #17416F'}}></span>
        </section>
        <br/><br/>
        <div><OwlCarousel/></div>
        <br/><br/><br/><br/>
        <div>
            <Logo/>
        </div>
        <br/><br/><br/><br/>
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
