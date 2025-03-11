/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import "../index.css"; // Ajoute un fichier CSS pour le style
// import im1 from "../../assets/im1.png";
// import im2 from "../../assets/im2.png";
// import im3 from "../../assets/im3.png";
import Mask2 from '../../assets/Fr1.png';
import { getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';
// import { format } from 'date-fns';


const FeaturedEvents = () => {
  const { selectedLanguage } = useContext(LanguageContext);
  const [contents, setContents] = useState();

  const events = [
    { id: 1, image: contents?.event_img1.image, day: "10", date: "FEB.25", title: selectedLanguage === 'fr' ? contents?.event_descp1.content_fr : contents?.event_descp1.content_en },
    { id: 2, image: contents?.event_img2.image, day: "13", date: "FEB.25", title: selectedLanguage === 'fr' ? contents?.event_descp2.content_fr : contents?.event_descp2.content_en },
    { id: 3, image: contents?.event_img3.image, day: "15", date: "FEB.25", title: selectedLanguage === 'fr' ? contents?.event_descp3.content_fr : contents?.event_descp3.content_en },
  ];
  // Get contents on component mount
  useEffect(() => {
    const fetchContents = async () => {
      try {
        // const savedContents = localStorage.getItem("contents");
        // if (savedContents) {
        //   setContents(JSON.parse(savedContents));
        // } else {
        // Fetch contents if not in localStorage
        const response = await getAllContents();
        setContents(response.data);
        //   localStorage.setItem("contents", JSON.stringify(response.data));
        // }
      } catch (error) {
        console.error('Failed to fetch contents:', error.message || error);
      }
    };
    fetchContents();
  }, []);


  return (
    <section className="mt-4 container-fluid p-lg-5 p-0 py-5 position-relative" style={{ backgroundColor: "#17416F", paddingLeft: '0px', paddingRight: '0px' }}>
      <div className="container p-lg-5 p-0">
        <h2 className="text-white text-uppercase ms-3" style={{ fontWeight: 700, fontSize: '36px' }}> {selectedLanguage === 'fr' ? contents?.home_page_event_title.content_fr : contents?.home_page_event_title.content_en}</h2>
        <br />
        <div className="row mt-2">
          {events?.map((event) => (
            <div key={event.id} className="col-12 col-md-6 col-lg-4 mb-3 mb-md-0 p-3">
              <div className="p-3 bg-white event-card">
                <div className="row">
                  <div className="col-lg-12 mb-4">
                    <div className="position-relative">
                      <img src={event.image} alt="" className="image-fluid w-100" />
                      <div className="ppo1">
                        <span className="event-day">{event.day}</span>
                        <span className="event-date upper">{event.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 px-4 py-3 mt-4 mt-lg-0">
                    <div className="row">
                      <div className="col-md-4"></div>
                      <div className="col-md-8">
                        <p className="event-title">{event.title}</p>
                      </div>
                    </div>
                    <span className="event-divider"></span>
                    <div className="d-flex justify-content-end">
                      <a href="#" className="event-read-more">
                        {selectedLanguage === 'fr' ? "Voir Plus" : "Learn More"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="position-absolute bottom-0 end-0">
        <img src={Mask2} alt="" />
      </div>
    </section>
  );
};

export default FeaturedEvents;
