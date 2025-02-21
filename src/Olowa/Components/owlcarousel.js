import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";
import Img1 from '../../assets/o1.png';
import Img2 from '../../assets/o2.png';
import Img3 from '../../assets/o3.png';
import '../index.css';

const ServicesCarousel = () => {
  const services = [
    {
      id: 1,
      title: 'Gynecology',
      image: Img1,
      color: '#13AB9C'
    },
    {
      id: 2,
      title: 'Pediatry',
      image: Img2,
      color: '#13AB9C'
    },
    {
      id: 3,
      title: 'Ophthalmology',
      image: Img3,
      color: '#13AB9C'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeButton, setActiveButton] = useState(null);

  const extendedServices = [...services, ...services, ...services];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    
    if (currentIndex >= services.length) {
      setIsTransitioning(true);
      setCurrentIndex(0);
    } else if (currentIndex < 0) {
      setIsTransitioning(true);
      setCurrentIndex(services.length - 1);
    }
  }, [currentIndex, services.length]);

  const handlePrevious = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
      setActiveButton("prev");
    }
  };

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
      setActiveButton("next");
    }
  };

  const translateX = -(currentIndex * (100 / visibleCount));

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center gap-4 relative mb-8" style={{margin:'30px 10px'}}>
        <div>
          <h2 className="text-2xl font-bold" style={{fontSize:'36px', color:'#17416F'}}>OUR SERVICES</h2>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handlePrevious}
            className="rounded-full p-2 shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            style={{
              backgroundColor: activeButton === "prev" ? "#13AB9C" : "#E3E3E3",
              color: activeButton === "prev" ? "white" : "black",
            }}
            aria-label="Previous service"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full p-2 shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            style={{
              backgroundColor: activeButton === "next" ? "#13AB9C" : "#E3E3E3",
              color: activeButton === "next" ? "white" : "black",
            }}
            aria-label="Next service"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(${translateX}%)`,
            width: `${(100 * extendedServices.length) / visibleCount}%`
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedServices.map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              className="flex-shrink-0"
              style={{ width: `${100 / extendedServices.length}%` }}
            >
              <div 
                className="overflow-hidden h-full mx-2 p-3 back"
                style={{ backgroundColor: service.color , borderTopRightRadius:'30px'}}
              >
                <div className="relative aspect-video">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    style={{borderTopRightRadius:'30px'}}
                  />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <h3 className="text-white text-xl font-medium" style={{fontSize:'24px'}}>
                    {service.title}
                  </h3>
                  <Link 
                    // to={`/services/${service.id}`}
                    to="/service"
                    type="button"
                    className="text-white hover:opacity-80 transition-opacity"
                    aria-label={`View ${service.title} details`}
                  >
                    <i class="bi bi-arrow-right-circle" style={{fontSize:'24px'}}></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesCarousel;
