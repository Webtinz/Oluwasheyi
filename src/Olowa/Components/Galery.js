import React, {  useEffect, useState, useRef } from 'react';
import "../index.css"; // Ajoute un fichier CSS pour le style
// import p1 from "../../assets/p1.png";
// import p2 from "../../assets/p2.png";
// import p3 from "../../assets/p3.png";
// import p4 from "../../assets/p4.png";
// import p5 from "../../assets/p5.png";
// import p6 from "../../assets/p6.png";
import { getAllContents } from '../../services/content.service';
// import LanguageContext from '../../context/LanguageContext';

const CustomCarousel = () => {

  // const { selectedLanguage } = useContext(LanguageContext);
  const [contents, setContents] = useState({}); // Initialisation avec un objet vide

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

  const [mainImage, setMainImage] = useState(null); // Évite d’accéder à undefined au départ

  // Met à jour mainImage lorsque contents est chargé
  useEffect(() => {
    if (contents?.gallery_img_1?.image) {
      setMainImage(contents.gallery_img_1.image);
    }
  }, [contents]);

  const carouselRef = useRef(null);

  const changeMainImage = (src) => {
    setMainImage(src);
  };

  const scrollCustomCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth / 2;
      carouselRef.current.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }
  };

  // Liste des images avec filtrage pour éviter les valeurs undefined
  const images = [
    contents?.gallery_img_2?.image,
    contents?.gallery_img_3?.image,
    contents?.gallery_img_4?.image,
    contents?.gallery_img_5?.image,
    contents?.gallery_img_6?.image,
    contents?.gallery_img_1?.image,
    contents?.gallery_img_2?.image,
    contents?.gallery_img_3?.image
  ].filter(Boolean); // Supprime les valeurs undefined ou null

  // Affiche les boutons de navigation si le nombre d'images est >= 6
  const showButtons = images.length >= 6;

  return (
    <div className="container">
      {/* Container de l'image principale avec boutons de navigation */}
      <div className="mt-4">
        {/* Image principale */}
        <img
          src={mainImage}
          alt=""
          className="custom-phone img-fluid"
          style={{ width: "100%", height: "80vh", objectFit: "cover" }}
        />
      </div>

      {/* Container du carrousel des miniatures */}
      <div className="custom-carousel-container position-relative">
        <div className="custom-flex custom-carousel" ref={carouselRef}>
          {images.map((src, index) => (
            <img
              key={index}
              className="custom-carousel-item"
              src={src}
              style={{ width: '500px', height: '150px' }}
              alt="logo"
              onClick={() => changeMainImage(src)}
            />
          ))}
        </div>
        {/* Boutons de navigation sur l'image principale */}
        {showButtons && (
          <>
            <button
              className="position-absolute top-50 start-0 translate-middle-y custom-carousel-btn custom-prev ms-4"
              style={{
                left: "20px",
                zIndex: 10,
                color: "white",
                border: "none",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: "transparent"
              }}
              onClick={() => scrollCustomCarousel(-1)}
            >
              <i className="bi bi-chevron-left fs-3"></i>
            </button>
            <button
              className="position-absolute top-50 end-0 translate-middle-y custom-carousel-btn custom-next me-4"
              style={{
                right: "20px",
                zIndex: 10,
                color: "white",
                border: "none",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: "transparent"
              }}
              onClick={() => scrollCustomCarousel(1)}
            >
              <i className="bi bi-chevron-right fs-3"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomCarousel;
