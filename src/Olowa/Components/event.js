import React, { useContext, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../index.css';
import '../about.css';
import Mask2 from '../../assets/Fr1.png';
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
    <section className="container-fluid py-5 position-relative" style={{ backgroundColor: "#17416F", paddingLeft: '0px', paddingRight: '0px' }}>
      <div className="container px-lg-5 px-0 evene">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-white text-uppercase" style={{ fontWeight: 700, fontSize: screenSize === 'small' ? '24px' : '36px' }}> 
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
              <div key={event.id} style={{ width: `${100 / slidesToShow}%`, flexShrink: 0, padding: '12px' }}>
                <div className="p-3 bg-white event-card">
                  <div className="row">
                    <div className="col-lg-12 mb-4">
                      <div className="position-relative">
                        <img src={event.photo} alt={selectedLanguage === 'fr' ? event.nom : event.name} className="image-fluid w-100" style={{ height: '250px', objectFit: 'cover' }} />
                        <div className="ppo1">
                          <span className="event-day">{format(new Date(event.dateevent), "dd")}</span>
                          <span className="event-date upper py-3">{format(new Date(event.dateevent), "MMM.yy")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 px-4 py-3 mt-4 mt-lg-0 ool">
                      <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-8">
                          <p className="event-title"  style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{selectedLanguage === 'fr' ? event.nom : event.name}</p>
                        </div>
                      </div>
                      <span className="event-divider"></span>
                      <div className="d-flex justify-content-end">
                        <a 
                          href="#" 
                          className="event-read-more"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedEvent(event);
                          }}
                        >
                          {selectedLanguage === 'fr' ? "Voir Plus" : "Learn More"}
                        </a>
                      </div>
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
                    <p>
                      {selectedLanguage === 'fr' ? (
                        <div dangerouslySetInnerHTML={{ __html: selectedEvent.description }} />
                      ) : (
                        <div dangerouslySetInnerHTML={{ __html: selectedEvent.description_en }} />
                      )}
                    </p>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show" onClick={() => setSelectedEvent(null)}></div>
          </div>
        )}
      </div>
      <div className="position-absolute bottom-0 end-0">
        <img src={Mask2} alt="" style={{width:'70%'}}/>
      </div>
    </section>
  );
};

export default EventsCarousel;