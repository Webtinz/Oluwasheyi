import React, { useState, useEffect, useCallback, useContext } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";
import Img1 from '../../assets/o1.png';
import Img2 from '../../assets/o2.png';
import Img3 from '../../assets/o3.png';
import '../index.css';
import { getAllContents, getServices } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';
const ServicesCarousel = ({ services }) => {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeButton, setActiveButton] = useState(null);
  const [animationDirection, setAnimationDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { selectedLanguage } = useContext(LanguageContext);
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

  const totalPages = Math.ceil(services?.length / visibleCount);

  useEffect(() => {

    const handleResize = () => {

      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
      // Réinitialiser l'index si nécessaire après redimensionnement
      setCurrentIndex(prev => Math.min(prev, Math.ceil(services?.length / visibleCount) - 1));
    };

    handleResize();
    handleNext();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [services?.length]);

  const handlePrevious = () => {
    if (isAnimating || currentIndex <= 0) return;

    setIsAnimating(true);
    setAnimationDirection('prev');
    setActiveButton("prev");

    setTimeout(() => {
      setCurrentIndex(prev => prev - 1);
      setIsAnimating(false);
      setAnimationDirection(null);
    }, 300);
  };

  const handleNext = () => {
    if (isAnimating || currentIndex >= totalPages - 1) return;

    setIsAnimating(true);
    setAnimationDirection('next');
    setActiveButton("next");

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
      setAnimationDirection(null);
    }, 300);
  };

  const goToPage = (pageIndex) => {
    if (isAnimating || pageIndex === currentIndex) return;

    setIsAnimating(true);
    setAnimationDirection(pageIndex > currentIndex ? 'next' : 'prev');

    setTimeout(() => {
      setCurrentIndex(pageIndex);
      setIsAnimating(false);
      setAnimationDirection(null);
    }, 300);
  };

  // Calculer les services à afficher
  const getVisibleServices = () => {
    const startIdx = currentIndex * visibleCount;
    const endIdx = Math.min(startIdx + visibleCount, services?.length);
    return services?.slice(startIdx, endIdx);
  };

  const visibleServices = getVisibleServices();

  // Animation CSS classes
  const getAnimationClass = () => {
    if (!animationDirection) return '';
    return animationDirection === 'next' ? 'slide-left' : 'slide-right';
  };




  return (
    <div className="container mx-auto px-4">
      {/* Header avec titre et boutons de navigation */}
      <div className="flex justify-between items-center gap-4 relative mb-8" style={{ margin: '30px 10px' }}>
        <div>
          <h2 className="text-2xl font-bold" style={{ fontSize: '36px', color: '#17416F',textTransform:'uppercase' }}>{selectedLanguage === 'fr' ? contents?.home_page_banner_link3.content_fr : contents?.home_page_banner_link3.content_en}</h2>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handlePrevious}
            className="rounded-full p-2 shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            style={{
              backgroundColor: (activeButton === "prev" || animationDirection === 'prev') ? "#13AB9C" : "#E3E3E3",
              color: (activeButton === "prev" || animationDirection === 'prev') ? "white" : "black",
              opacity: currentIndex === 0 ? 0.6 : 1
            }}
            aria-label="Previous service"
            disabled={currentIndex === 0 || isAnimating}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="rounded-full p-2 shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            style={{
              backgroundColor: (activeButton === "next" || animationDirection === 'next') ? "#13AB9C" : "#E3E3E3",
              color: (activeButton === "next" || animationDirection === 'next') ? "white" : "black",
              opacity: currentIndex === totalPages - 1 ? 0.6 : 1
            }}
            aria-label="Next service"
            disabled={currentIndex === totalPages - 1 || isAnimating}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* CSS pour les animations */}
      <style jsx>{`
        @keyframes slideLeft {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideRight {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .slide-left {
          animation: slideLeft 300ms ease-out forwards;
        }
        
        .slide-right {
          animation: slideRight 300ms ease-out forwards;
        }
      `}</style>

      {/* Conteneur des cartes */}
      <div className="relative overflow-hidden">
        <div
          className={`grid transition-opacity duration-300 ${getAnimationClass()}`}
          style={{
            gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
            gap: '1rem',
            opacity: isAnimating ? 0.5 : 1
          }}
        >
          {visibleServices?.map((service, index) => (
            <div
              key={`${service.id}-${currentIndex}-${index}`}
              className="w-full px-3"
            >
              <div
                className="h-full p-3 back"
                style={{ backgroundColor: "#13AB9C", borderTopRightRadius: '30px' }}
              >
                <div className="relative aspect-video">
                  <img
                    src={service.photo}
                    alt={service.nom}
                    className="w-full h-full object-cover"
                    style={{ borderTopRightRadius: '30px', height:'250px' }}
                  />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <h3 className="text-white text-xl font-medium" style={{ fontSize: '24px' }}>
                    {selectedLanguage === 'fr' ? service.nom : service.nom_en}
                  </h3>
                  <Link
                    to="/service"
                    type="button"
                    className="text-white hover:opacity-80 transition-opacity"
                    aria-label={`View ${selectedLanguage === 'fr' ? service.nom : service.nom_en} details`}
                  >
                    <i className="bi bi-arrow-right-circle" style={{ fontSize: '24px' }}></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className="w-3 h-3 rounded-full transition-colors focus:outline-none"
            style={{
              backgroundColor: currentIndex === index ? '#13AB9C' : '#E3E3E3',
              cursor: isAnimating || currentIndex === index ? 'not-allowed' : 'pointer',
              opacity: isAnimating ? 0.6 : 1
            }}
            aria-label={`Go to page ${index + 1}`}
            aria-current={currentIndex === index ? 'page' : undefined}
            disabled={isAnimating || currentIndex === index}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesCarousel;