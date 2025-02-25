import React, { useState } from "react";
import "../index.css"; // Fichier CSS pour les styles
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img.png";
import Mask2 from '../../assets/Fr.png';

const WelcomeSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="mt-4 container">
      <div className="row">
        {/* Image principale avec l'image circulaire en superposition */}
        <div className="col-lg-5 mb-3 mx-auto">
          <div className="position-relative">
            <img src={img1} alt="" className="image-fluid w-100 main-img" style={{maxHeight:'70vh', objectFit:'cover'}} />
            <div className="position-absolute overlay-img">
              <img src={img2} alt="" className="image-fluid small-img" />
            </div>
            <div className="abso">
                <img src={Mask2} alt="" style={{width:'80%'}} />
            </div>
          </div>
        </div>

        {/* Texte et bouton Learn More */}
        <div className="col-lg-6 mb-3 mx-auto px-5">
          <div className="p-4 trt">
            <h2 className="mt-3 section-title" style={{fontSize:'36px'}}>
              Welcome to <br/> Clinique Polyvalente <br/> OLUWA SHEYI
            </h2>
            <br/>
            <p className="section-text">
              Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio. Proin sed nunc quis ex faucibus volutpat.
              <br />
              <br />
              Quisque faucibus in quam quis lobortis. Donec metus neque, euismod a volutpat eget, porta sed ligula. Phasellus consequat risus sit amet mi dapibus vehicula.
              Nullam maximus pellentesque ultrices. 
            </p>

            {/* Contenu supplémentaire affiché uniquement si isExpanded est true */}
            {isExpanded && (
              <div className="extra-content">
                <p className="section-text">
                  Nullam maximus pellentesque ultrices. Morbi rutrum accumsan mauris ut commodo. Sed nisi ligula, pulvinar non nibh vitae, blandit vulputate odio. Proin sed nunc quis ex faucibus volutpat.
                  <br />
                  <br />
                  Quisque faucibus in quam quis lobortis. Donec metus neque, euismod a volutpat eget, porta sed ligula. Phasellus consequat risus sit amet mi dapibus vehicula.
                </p>
              </div>
            )}

            {/* Bouton Learn More / Read Less */}
            <div className="mt-3">
              <button className="btn btn-w px-4 py-2 toggle-button" onClick={toggleContent}>
                {isExpanded ? "Read Less " : "Learn More "}
                <i className={`bi ${isExpanded ? "bi-chevron-up" : "bi-chevron-down"} ms-1`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
