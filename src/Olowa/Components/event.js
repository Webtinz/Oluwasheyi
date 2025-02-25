import React from "react";
import "../index.css"; // Ajoute un fichier CSS pour le style
import im1 from "../../assets/im1.png";
import im2 from "../../assets/im2.png";
import im3 from "../../assets/im3.png";
import Mask2 from '../../assets/Fr1.png';

const events = [
  { id: 1, image: im1, day: "10", date: "FEB.25", title: "Cras eleifend gravi mi, eu placerat urn vulputate" },
  { id: 2, image: im2, day: "13", date: "FEB.25", title: "Cras eleifend gravi mi, eu placerat urn vulputate" },
  { id: 3, image: im3, day: "15", date: "FEB.25", title: "Cras eleifend gravi mi, eu placerat urn vulputate" },
];

const FeaturedEvents = () => {
  return (
    <section className="mt-4 container-fluid p-5 position-relative" style={{ backgroundColor: "#17416F", paddingLeft:'0px', paddingRight:'0px' }}>
      <div className="container p-5">
        <h2 className="text-white text-uppercase ms-3" style={{ fontWeight: 700, fontSize:'36px' }}>Featured Events</h2>
        <br/>
        <div className="row mt-2">
          {events.map((event) => (
            <div key={event.id} className="col-12 col-md-6 col-lg-4 mb-3 mb-md-0 mx-auto p-4">
              <div className="p-3 bg-white event-card">
                <div className="row">
                  <div className="col-lg-12 mb-4 mx-auto">
                    <div className="position-relative">
                      <img src={event.image} alt="" className="image-fluid w-100" />
                      <div className="ppo1">
                        <span className="event-day">{event.day}</span>
                        <span className="event-date">{event.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mx-auto px-4 py-3">
                    <div className="row">
                      <div className="col-md-4"></div>
                      <div className="col-md-8">
                        <p className="event-title">{event.title}</p>
                      </div>
                    </div>
                    <span className="event-divider"></span>
                    <div className="d-flex justify-content-end">
                      <a href="#" className="event-read-more">Read More</a>
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
