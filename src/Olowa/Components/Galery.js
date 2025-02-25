import React, { useState, useRef, useEffect } from "react";
import "../index.css"; // Ajoute un fichier CSS pour le style
import p1 from "../../assets/p1.png";
import p2 from "../../assets/p2.png";
import p3 from "../../assets/p3.png";
import p4 from "../../assets/p4.png";
import p5 from "../../assets/p5.png";
import p6 from "../../assets/p6.png";

const images = [p2, p3, p4, p5, p6, p3, p4, p5];

const CustomCarousel = () => {
  const [mainImage, setMainImage] = useState(p1);
  const carouselRef = useRef(null);
  const [showNavButtons, setShowNavButtons] = useState(false);

  const changeMainImage = (src) => {
    setMainImage(src);
  };

  const scrollCustomCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth / 2;
      carouselRef.current.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      setShowNavButtons(images.length > 6);
    }
  }, []);

  return (
    <div className="container">
        
      <div className="mt-5">
        {/* Image principale */}
        <img src={mainImage} alt="" className="custom-phone img-fluid" style={{ width: "100%", height: "72vh", objectFit: "cover" }} />
      </div>

      {/* Container du carrousel */}
      <div className="custom-carousel-container">
        {showNavButtons && (
          <button className="custom-carousel-btn custom-prev" onClick={() => scrollCustomCarousel(-1)}>
            &#10094;
          </button>
        )}

        <div className="custom-flex custom-carousel" ref={carouselRef}>
          {images.map((src, index) => (
            <img key={index} className="custom-carousel-item" src={src} alt="logo" onClick={() => changeMainImage(src)} />
          ))}
        </div>

        {showNavButtons && (
          <button className="custom-carousel-btn custom-next" onClick={() => scrollCustomCarousel(1)}>
            &#10095;
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomCarousel;
