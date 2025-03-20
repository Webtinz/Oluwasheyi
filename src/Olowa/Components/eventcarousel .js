import React, { useContext, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../index.css';
import '../about.css';
import { getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';
import { format } from 'date-fns';

const EventsCarousel = ({ events }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [screenSize, setScreenSize] = useState('large');
  const [activeButton, setActiveButton] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize('small');
      } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
        setScreenSize('medium');
      } else {
        setScreenSize('large');
      }
    };

    // Initial screen size check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine how many slides to show based on screen size
  const getSlidesToShow = () => {
    switch (screenSize) {
      case 'small':
        return 1;
      case 'medium':
        return 2;
      case 'large':
        return 3;
      default:
        return 2;
    }
  };

  const slidesToShow = getSlidesToShow();

  const nextSlide = () => {
    setActiveButton("next");
    setCurrentSlide((prev) => (prev + 1) % (events?.length - slidesToShow + 1));
  };

  const prevSlide = () => {
    setActiveButton("prev");
    setCurrentSlide((prev) => (prev - 1 + (events?.length - slidesToShow + 1)) % (events?.length - slidesToShow + 1));
  };

  const { selectedLanguage } = useContext(LanguageContext);
  const [contents, setContents] = useState();

  // Get contents on component mount
  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await getAllContents();
        setContents(response.data);
      } catch (error) {
        console.error('Failed to fetch contents:', error.message || error);
      }
    };
    fetchContents();
  }, []);

  return (
    <div className="container-fluid py-5" style={{ background: '#17416F' }}>
      <div className="container px-lg-5 px-0">
        <div className="d-flex justify-content-between align-items-center mb-8">
          <h2 className="text-white" style={{ fontSize: screenSize === 'small' ? '24px' : '36px', fontWeight: 'bold', textTransform: 'uppercase' }}> 
            {selectedLanguage === 'fr' ? contents?.communoty_page_event_title.content_fr : contents?.communoty_page_event_title.content_en}
          </h2>
          <div className="d-flex gap-4">
            <button
              onClick={prevSlide}
              style={{
                backgroundColor: activeButton === "prev" ? "#13AB9C" : "#D1D5DB",
                padding: "8px",
                borderRadius: "50%",
                color: "white",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease-in-out",
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              style={{
                backgroundColor: activeButton === "next" ? "#13AB9C" : "#D1D5DB",
                padding: "8px",
                borderRadius: "50%",
                color: "white",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease-in-out",
              }}
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            className="d-flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`, transition: 'transform 0.5s ease' }}
          >
            {events?.map((event) => (
              <div key={event.id} style={{ width: `${100 / slidesToShow}%`, flexShrink: 0, padding: '6px' }}>
                <div className="bg-white shadow p-4" style={{ borderTopRightRadius: '30px' }}>
                  <div className='row'>
                    <div className='col-lg-6 mb-4'>
                      <div className="position-relative mb-4">
                        <img src={event.photo} alt={selectedLanguage === 'fr' ? event.nom : event.name} className="w-100 object-fit-cover" style={{ height: '250px' }} />
                        <div className="ppo1">
                          <span className='day'>{format(new Date(event.dateevent), "dd")}</span>
                          <span className="py-3 date">{format(new Date(event.dateevent), "MMM.yy")}</span>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6'>
                      <h3 className="fs-4 fw-semibold mb-2" style={{ color: '#17416F', fontWeight: '700' }}>
                        {selectedLanguage === 'fr' ? event.nom : event.name}
                      </h3>
                      <div className="text-muted mb-3" style={{ display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {selectedLanguage === 'fr' ? (
                          <div dangerouslySetInnerHTML={{ __html: event.description }} />
                        ) : (
                          <div dangerouslySetInnerHTML={{ __html: event.description_en }} />
                        )}
                      </div>
                      <button 
                        className="btn text-white px-4" 
                        onClick={() => setSelectedEvent(event)}
                        style={{ background: '#13AB9C' }}
                      >
                        {selectedLanguage === 'fr' ? "Voir Plus" : "Learn More"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedEvent && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body position-relative">
                  <div className='color1'>
                    <button onClick={() => setSelectedEvent(null)} className="btn-cl fs-3 text-whiteposition-absolute top-0 end-0 m-3">
                      <i className="bi bi-x-lg"></i>
                    </button>
                    <h2>{selectedLanguage === 'fr' ? selectedEvent.nom : selectedEvent.name}</h2>
                    <p>{selectedLanguage === 'fr' ? selectedEvent.description : selectedEvent.description_en}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show" onClick={() => setSelectedEvent(null)}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsCarousel;