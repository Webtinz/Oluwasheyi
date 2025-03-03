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
    const values = [
        { title: 'Ethics', description: 'Nullam maximus smetc son pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo.' },
        { title: 'Integrity', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.' },
        { title: 'Innovation', description: 'Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.' },
        { title: 'Excellence', description: 'Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.' },
        { title: 'Respect', description: 'Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.' },
        { title: 'Accountability', description: 'Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum.' },
        { title: 'Teamwork', description: 'Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi.' },
        { title: 'Sustainability', description: 'Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.' }
      ];

      const yearsData = {
        "2011": {
          imageUrl: "image/image 35.png",
          title: "Founded",
          description: "Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula"
        },
        "2015": {
          imageUrl: "image/image 35.png",
          title: "Expansion",
          description: "Phasellus ullamcorper cursus urna euismod feugiat. Cras euismod orci at volutpat."
        },
        "2019": {
          imageUrl: "image/image 35.png",
          title: "Global Recognition",
          description: "Vestibulum euismod sapien et dolor bibendum, non hendrerit erat fermentum."
        },
        "2022": {
          imageUrl: "image/image 35.png",
          title: "New Milestone",
          description: "Curabitur vestibulum, felis in vulputate mollis, odio lorem auctor urna."
        },
        "2024": {
          imageUrl: "image/image 35.png",
          title: "Innovation",
          description: "Aliquam erat volutpat. Integer posuere, ante ac consequat dictum, dui ante ultricies."
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
            <h1 className="text-center text-white" style={{ textTransform: 'uppercase',fontWeight:'700',fontSize:'40px' }}>{selectedLanguage === 'fr' ? contents?.about_page_title.content_fr : contents?.about_page_title.content_en}</h1>
            <div className="position-absolute bottom-0 start-0">
                <img src={Group1} alt="" />
            </div>
            <div className="position-absolute top-0 end-0">
                <img src={Mask3} alt="" />
            </div>
        </section>
        <br/>
        <section className="container mt-3">
            <div className="row">
                <div className="col-md-5 col-12 mx-auto mb-3 p-4">
                    <div className='position-relative'>
                        <img src={Image33} alt="" className="img-fluid w-100" style={{ borderTopRightRadius: '30px',objectFit:'cover' }} />
                        <div className='contpos'>
                            <img src={Mask1} alt="Wellness Programs" className="img-fluid" style={{width:'80%'}} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12 mx-auto mb-3 align-self-center p-4">
                <h2 style={{ color: '#17416F', textTransform: 'uppercase', fontWeight: 700, fontSize:'30px' }}>
                    {selectedLanguage === 'fr' ? contents?.about_page_mission_title.content_fr : contents?.about_page_mission_title.content_en}
                </h2>
                <br/>
                <p className="mt-2">
                    {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                    __html:contents?.	about_page_mission_desc.content_fr  }} />) : (<div dangerouslySetInnerHTML={{
                        __html:contents?.	about_page_mission_desc.content_en  }} />)}
                </p>
                <br/>
                <ul className="list-unstyled">
                    {[
                    "Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo.",
                    "Donec rhoncus, augue fermentum pharetra posuere.",
                    "Nullam gravida mauris convallis mattis vestibulum. Aenean ultricies erat elit, quis maximus lacus auctor egestas.",
                    "Sed molestie et turpis ut bibendum"
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
        <br/>
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
                <h2 className="text-center" style={{fontSize:'clamp(25px, 8vw, 36px)', fontWeight:'700'}}>{selectedLanguage === 'fr' ? contents?.about_page_vision_title.content_fr : contents?.about_page_vision_title.content_en}</h2>
                <br/>
                <div className="d-flex justify-content-center">
                <p className="text-center" style={{width:'40%'}}>
                    {selectedLanguage === 'fr' ? contents?.about_page_vision_desc.content_fr : contents?.about_page_vision_desc.content_en}
                </p>
                </div>
            </div>
        </section>
        <br />
        <>
            {/* Our Values Section */}
            <section className="container mt-5">
                <h2 style={{ color: '#17416F', fontSize: 'clamp(25px, 8vw, 36px)', fontWeight: '700' }}>  {selectedLanguage === 'fr' ? contents?.about_page_value_title.content_fr : contents?.about_page_value_title.content_en} </h2>
                <br/>
                <div className="row mt-4">
                {values.map((value, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-3 mb-4 mx-auto">
                        <div className="p-3 text-white cvc position-relative" style={{ backgroundColor: '#13AB9C', borderTopRightRadius: '30px', height:'280px' }}>
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
            <br/>
            <div className="mt-4 hero">
                <div className="p-5 flx" style={{ borderTopRightRadius: '30px', backgroundColor: '#17416F', width: '40vw', height:'50vh' }}>
                    <div className='position-relative'>
                        <p style={{ color: '#13AB9C', fontWeight: '700', fontSize:'clamp(22px, 8vw, 28px)' }}>{currentYear}</p>
                        <p className="text-white" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize:'clamp(30px, 8vw, 40px)' }}>
                            {yearsData[currentYear].title}
                        </p>
                        <p style={{ fontWeight: '200', color: 'white', fontSize:'clamp(18px, 8vw, 25px)' }}>{yearsData[currentYear].description}</p>
                        <div className='contpos1'>
                            <img src={Mask2} alt="Wellness Programs" className="img-fluid" style={{width:'80%'}} />
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/>
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
        <br/><br/>
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
