import React, { useState, useEffect, useRef } from 'react';
import './DoctorCarousel.css'; // Vous devrez créer ce fichier CSS séparément

const DoctorCarousel = ({doctors}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const carouselInnerRef = useRef(null);

  // Mettre à jour le nombre de cartes par vue selon la taille d'écran
  useEffect(() => {
    const updateLayout = () => {
      const windowWidth = window.innerWidth;
      
      if (windowWidth >= 992) {
        setCardsPerView(4);
      } else if (windowWidth >= 768) {
        setCardsPerView(3);
      } else {
        setCardsPerView(1);
      }
    };

    // Initialisation
    updateLayout();
    
    // Écouter les changements de taille de fenêtre
    window.addEventListener('resize', updateLayout);
    
    // Nettoyage
    return () => {
      window.removeEventListener('resize', updateLayout);
    };
  }, []);

  // S'assurer que l'index actuel reste valide quand cardsPerView change
  useEffect(() => {
    if (currentIndex > doctors.length - cardsPerView) {
      setCurrentIndex(Math.max(0, doctors.length - cardsPerView));
    }
  }, [cardsPerView, currentIndex, doctors.length]);

  // Navigation
  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < doctors.length - cardsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Calculer le style de transformation
  const getCarouselStyle = () => {
    // On utilise des valeurs relatives plutôt que des pixels pour plus de flexibilité
    const cardWidth = 100 / cardsPerView;
    return {
      transform: `translateX(-${currentIndex * cardWidth}%)`,
      width: `${(doctors.length / cardsPerView) * 100}%`,
      display: 'flex'
    };
  };

  const getCardStyle = () => {
    // Calculer la largeur en pourcentage en tenant compte des marges
    const marginPercentage = 2; // 1% de marge de chaque côté
    const widthPercentage = 100 / cardsPerView - (marginPercentage * 2);
    
    return {
      width: `${widthPercentage}%`,
      margin: `0 ${marginPercentage}%`
    };
  };

  return (
    <div className="doc55-carousel-container container mt-5">
      <div className="doc55-carousel-wrapper">
        {/* Bouton précédent centré verticalement */}
        <button 
          className={`doc55-nav-btn doc55-prev-btn ${currentIndex <= 0 ? 'doc55-disabled' : ''}`} 
          onClick={goToPrev}
          disabled={currentIndex <= 0}
        >
          &#10094;
        </button>
        
        <div className="doc55-carousel">
          <div 
            className="doc55-carousel-inner" 
            ref={carouselInnerRef} 
            style={getCarouselStyle()}
          >
            {doctors.map((doctor) => (
              <div 
                key={doctor.id} 
                className="doc55-doctor-card" 
                style={getCardStyle()}
              >
                <div className="doc55-doctor-image">
                  <img src={doctor.photo} alt={doctor.nom} />
                </div>
                <div className="doc55-doctor-info">
                  <div className="doc55-doctor-name">{doctor.nom} {doctor.prenom}</div>
                  <div className="doc55-doctor-specialty">{doctor.titre}</div>
                </div>
                <span className='d-block my-3' style={{ borderBottom: '1px solid #17416F33', width: '90%' }}></span>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton suivant centré verticalement */}
        <button 
          className={`doc55-nav-btn doc55-next-btn ${currentIndex >= doctors.length - cardsPerView ? 'doc55-disabled' : ''}`} 
          onClick={goToNext}
          disabled={currentIndex >= doctors.length - cardsPerView}
        >
          &#10095;
        </button>
      </div>
      
      <div className="doc55-dots-container">
        {Array.from({ length: Math.ceil((doctors.length - cardsPerView) / 1) + 1 }).map((_, i) => (
          <span 
            key={i} 
            className={`doc55-dot ${i === Math.floor(currentIndex) ? 'doc55-active' : ''}`} 
            onClick={() => goToSlide(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default DoctorCarousel;