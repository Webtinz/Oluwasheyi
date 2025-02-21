import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Img from '../../assets/image.png';
import '../index.css';
import '../about.css';

const EventsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const events = [
    {
      id: 1,
      date: { day: 10, month: 'FEB', date: 25 },
      title: 'Free Diabetes Screening',
      description: 'Nam et turpis pellentesque, pharetra metus eu, lacinia eraestibulum.',
      image: Img
    },
    {
      id: 2,
      date: { day: 10, month: 'FEB', date: 25 },
      title: 'Free Diabetes Screening',
      description: 'Nam et turpis pellentesque, pharetra metus eu, lacinia eraestibulum.',
      image: Img
    },
    {
      id: 3,
      date: { day: 15, month: 'FEB', date: 25 },
      title: 'Free Diabetes Screening',
      description: 'Nam et turpis pellentesque, pharetra metus eu, lacinia eraestibulum.',
      image: Img
    },
    {
      id: 4,
      date: { day: 20, month: 'FEB', date: 25 },
      title: 'Free Diabetes Screening',
      description: 'Nam et turpis pellentesque, pharetra metus eu, lacinia eraestibulum.',
      image: Img
    },
  ];

  const slidesToShow = isMobile ? 1 : 2;

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlide = events.length - slidesToShow;
      return prev >= maxSlide ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlide = events.length - slidesToShow;
      return prev === 0 ? maxSlide : prev - 1;
    });
  };

  return (
    <div className="bg-blue-900 p-5">
      <div className="max-w-6xl mx-auto">
        {/* Header with title and navigation buttons */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-2xl font-bold" style={{fontSize:'30px'}}>UPCOMING EVENTS</h2>
          <div className="flex gap-4">
            <button
                    onClick={prevSlide}
                    style={{
                        backgroundColor: "#D1D5DB", // Couleur de fond
                        padding: "8px", // Équivalent de p-2
                        borderRadius: "50%", // Bouton arrondi
                        color: "white", // Texte en blanc
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease-in-out",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#13AB9C")} // Changement au survol
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#D1D5DB")} // Retour à la couleur initiale
                    aria-label="Previous slide"
                    >
                    <ChevronLeft size={24} />
            </button>

            <button
                onClick={nextSlide}
                style={{
                    backgroundColor: "#D1D5DB", // Gris clair, équivalent de bg-gray-300
                    padding: "8px", // p-2
                    borderRadius: "50%", // Bouton arrondi
                    color: "white", // Gris foncé, text-gray-600
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#13AB9C")} // Gris plus foncé au survol
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#D1D5DB")} // Retour couleur initiale
                aria-label="Next slide"
                >
                <ChevronRight size={24} />
            </button>
          </div>
        </div>
        <br/>
        <div className="relative">
          {/* Cards Container */}
            {/* <div className="overflow-hidden flex justify-center">
                <div
                    className="flex gap-6 transition-transform duration-500 ease-in-out"
                    style={{
                    transform: `translateX(-${currentSlide * (isMobile ? 100 : 50)}%)`
                    }}
                >
                    {events.map((event, index) => (
                    <div
                        key={event.id}
                        className={`${
                        isMobile ? 'w-full' : 'w-[calc(50%-12px)]'
                        } flex-shrink-0 transition-opacity duration-500 mx-auto`}
                        style={{
                        opacity: isMobile
                            ? index === currentSlide
                            ? 1
                            : 0
                            : index === currentSlide || index === currentSlide + 1
                            ? 1
                            : 0,
                        pointerEvents: isMobile
                            ? index === currentSlide
                            ? 'auto'
                            : 'none'
                            : index === currentSlide || index === currentSlide + 1
                            ? 'auto'
                            : 'none'
                        }}
                    >
                        <div className="bg-white rounded-lg overflow-hidden h-full">
                            <div className="relative">
                                <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-48 object-cover"
                                />
                                <div className="absolute bottom-0 left-0 bg-emerald-500 text-white p-2 w-16 text-center">
                                <div className="text-2xl font-bold">{event.date.day}</div>
                                <div className="text-sm">FEB.{event.date.date}</div>
                                </div>
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-blue-900 text-xl font-semibold mb-2">
                                {event.title}
                                </h3>
                                <p className="text-gray-600 mb-4">{event.description}</p>
                                <button className="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                                Read More
                                </button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div> */}
            <div className="overflow-hidden d-flex justify-content-center">
                <div
                    className="d-flex gap-3 transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentSlide * (isMobile ? 100 : 50)}%)`
                    }}
                >
                    {events.map((event, index) => (
                        <div
                            key={event.id}
                            className={`${
                                isMobile ? 'w-100' : 'w-50'
                            } flex-shrink-0 transition-opacity duration-500 mx-auto`}
                            style={{
                                opacity: isMobile
                                    ? index === currentSlide
                                        ? 1
                                        : 0
                                    : index === currentSlide || index === currentSlide + 1
                                        ? 1
                                        : 0,
                                pointerEvents: isMobile
                                    ? index === currentSlide
                                        ? 'auto'
                                        : 'none'
                                    : index === currentSlide || index === currentSlide + 1
                                        ? 'auto'
                                        : 'none'
                            }}
                        >
                            <div className="bg-white overflow-hidden h-100 shadow p-4" style={{borderTopRightRadius:'30px'}}>
                                <div className='row'>
                                    <div className='col-md-6 mx-auto mb-4'>
                                        <div className="position-relative">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-100 h-100 object-fit-cover"
                                            />
                                            <div class="ppo1">
                                                <span className='day'>{event.date.day}</span>
                                                <span class="py-3 date">FEB.{event.date.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-6 mx-auto mb-4'>
                                        <div className="p-4">
                                            <h3 className="fs-4 fw-semibold mb-2" 
                                                style={{color:'#17416F',fontWeight:'700'}}
                                            >
                                                {event.title}
                                            </h3>
                                            <p className="text-muted mb-3">{event.description}</p>
                                            <button className="btn btn-suc text-white px-4" style={{background: '#13AB9C'}}>
                                                Read More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>



          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: Math.ceil(events.length / slidesToShow) }).map((_, index) => {
                    const isActive = Math.floor(currentSlide / slidesToShow) === index;

                    return (
                    <button
                        key={index}
                        style={{
                        height: "8px",
                        width: "8px",
                        borderRadius: "50%",
                        backgroundColor: isActive ? "#13AB9C" : "#D1D5DB", // Active : vert, Inactif : gris
                        transition: "background-color 0.3s ease-in-out",
                        }}
                        onClick={() => setCurrentSlide(index * slidesToShow)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                    );
                })}
            </div>

        </div>
      </div>
    </div>
  );
};

export default EventsCarousel;