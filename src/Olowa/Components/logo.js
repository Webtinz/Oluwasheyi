import React, { useContext, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "../index";
import Img from '../../assets/image 7.png';
import Img1 from '../../assets/image 6.png';
import Img2 from '../../assets/image 8.png';
import Img3 from '../../assets/image 10.png';
import Img4 from '../../assets/image 9.png';
import Img5 from '../../assets/image 11.png';
import { getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';

const logos = [
  { id: 1, src: Img, alt: 'Red Circle Logo' },
  { id: 2, src: Img1, alt: 'HSPA Logo' },
  { id: 3, src: Img2, alt: 'Green Organization Logo' },
  { id: 4, src: Img3, alt: 'Accreditation System Logo' },
  { id: 5, src: Img4, alt: 'National Hospital Logo' },
  { id: 6, src: Img5, alt: 'FQHC Logo' }
];

const LogoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeButton, setActiveButton] = useState(null);

  // Calculer le nombre d'images à afficher selon la taille d'écran
  const getVisibleSlides = () => {
    if (window.innerWidth >= 1280) return 5; // xl
    if (window.innerWidth >= 768) return 3; // md
    return 2; // sm
  };

  const next = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= logos.length ? 0 : nextIndex;
    });
    setActiveButton("next");
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? logos.length - 1 : nextIndex;
    });
    setActiveButton("prev");
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
    <div className="container meetteam">
      <div className="d-flex align-items-center ms-md-5 ms-0">
        <h1 
          className="position-relative title-certifications" 
          style={{ textTransform: "uppercase", fontSize: '30px', fontWeight: '700' }}
        >
          {selectedLanguage === 'fr' ? contents?.communoty_page_title.content_fr : contents?.communoty_page_title.content_en}
        </h1>
      </div>
      <br/>
      <div className="mt-8">
        <div className="relative px-4">
          <button 
            onClick={prev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2`}
            style={{
              // backgroundColor: activeButton === "prev" ? "#4b5563" : "white",
              color: activeButton === "prev" ? "gray" : "gray" // text-white ou text-gray-600
            }}
          >
            <ChevronLeft style={{ width: "34px", height: "34px" }} />
          </button>

          <div className="overflow-hidden mx-12">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / getVisibleSlides())}%)`,
                gap: '2rem'
              }}
            >
              {logos.map((logo) => (
                <div 
                  key={logo.id} 
                  className="flex-shrink-0"
                  style={{
                    width: `calc(${100 / getVisibleSlides()}% - 1rem)`,
                  }}
                >
                  <img 
                    src={logo.src} 
                    alt={logo.alt}
                    className="img-fluid"
                    style={{objectFit:'contain',width:'120px',height:'120px'}}
                  />
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={next}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2`}
            style={{
              // backgroundColor: activeButton === "next" ? "#4b5563" : "white",
              color: activeButton === "next" ? "gray" : "gray" // text-white ou text-gray-600
            }}
          >
            <ChevronRight  style={{ width: "34px", height: "34px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
