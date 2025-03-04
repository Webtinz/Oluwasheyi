import React, { useContext, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Img from '../../assets/image.png';
import '../index.css';
import '../about.css';
import { getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';
import { format } from 'date-fns';

const EventsCarousel = ({ events }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const events = [
  //   {
  //     id: 1,
  //     date: { day: 10, month: 'FEB', date: 25 },
  //     title: 'Free Diabetes Screening',
  //     description: 'Nam et turpis pellentesque, pharetra metus eu, lacinia eraestibulum.',
  //     image: Img
  //   },
  //   {
  //     id: 2,
  //     date: { day: 11, month: 'FEB', date: 25 },
  //     title: 'Free Diabetes Screening',
  //     description: 'Nam et turpis pellentesque, pharetra metus eu, lacinia eraestibulum.',
  //     image: Img
  //   },
  //   {
  //     id: 3,
  //     date: { day: 15, month: 'FEB', date: 25 },
  //     title: 'Free Diabetes Screening',
  //     description: 'Nam et turpis pellentesque, pharetra metus eu, lacinia eraestibulum.',
  //     image: Img
  //   },
  //   {
  //     id: 4,
  //     date: { day: 20, month: 'FEB', date: 25 },
  //     title: 'Free Diabetes Screening',
  //     description: 'Nam et turpis pellentesque, pharetra metus eu, lacinia eraestibulum.',
  //     image: Img
  //   },
  // ];

  const slidesToShow = isMobile ? 1 : 2;

  const nextSlide = () => {
    setActiveButton("next");
    setCurrentSlide((prev) => (prev + 1) % (events?.length - slidesToShow + 1));
  };
  
  const prevSlide = () => {
    setActiveButton("prev");
    setCurrentSlide((prev) => (prev - 1 + (events?.length - slidesToShow + 1)) % (events?.length - slidesToShow + 1));
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
    <div className="container-fluid p-5" style={{background:'#17416F'}}>
      <div className="container px-5">
        <div className="d-flex justify-content-between align-items-center mb-8">
          <h2 className="text-white" style={{fontSize: isMobile ? '24px' : '36px', fontWeight: 'bold'}}> {selectedLanguage === 'fr' ? contents?.communoty_page_event_title.content_fr : contents?.communoty_page_event_title.content_en}</h2>
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
                <div className="bg-white shadow p-4" style={{borderTopRightRadius:'30px'}}>
                  <div className='row'>
                    <div className='col-lg-6 mb-4'>
                      <div className="position-relative mb-4">
                        <img src={Img} alt={selectedLanguage === 'fr' ? event.nom : event.name} className="w-100 object-fit-cover" style={{maxHeight: '200px'}} />
                        <div className="ppo1">
                          <span className='day'>{format(new Date(event.dateevent), "dd")}</span>
                          <span className="py-3 date">{format(new Date(event.dateevent), "MMM.yy")}</span>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6'>
                      <h3 className="fs-4 fw-semibold mb-2" style={{color:'#17416F',fontWeight:'700'}}>
                      {selectedLanguage === 'fr' ? event.nom : event.name}
                      </h3>
                      <p className="text-muted mb-3">{selectedLanguage === 'fr' ? event.description : event.description_en}</p>
                      <button className="btn text-white px-4" style={{background: '#13AB9C'}}>
                      {selectedLanguage === 'fr' ? "Voir Plus" : "Learn More"}
                      </button>
                    </div>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsCarousel;
