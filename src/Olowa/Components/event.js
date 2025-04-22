/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../index.css';
import '../about.css';
import Mask2 from '../../assets/Fr1.png';
import { suscribeToEvent } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';
import { format } from 'date-fns';
import { useLoader } from '../../context/LoaderContext';

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
  // const [contents, setContents] = useState();

  const { appData } = useLoader();
  const { contents } = appData;
  // // Get contents on component mount
  // useEffect(() => {
  //   const fetchContents = async () => {
  //     try {
  //       const response = await getAllContents();
  //       setContents(response.data);
  //     } catch (error) {
  //       console.error('Failed to fetch contents:', error.message || error);
  //     }
  //   };
  //   fetchContents();
  // }, []);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [message, setMessage] = useState('')

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    eventId: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.eventId = selectedEvent.id;
      console.log('Form to submit:', formData);
      await suscribeToEvent(formData);
      setMessage(selectedLanguage === 'en' ? "Registration successful! 🎉" : "Inscription à l'événement réussi 🎉")
      // Fermer le modal
      setSelectedEvent(null);

      setFormData({})

      // Afficher la notification de succès
      setShowSuccessMessage(true);

      // Masquer la notification après 5 secondes
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage(selectedLanguage === 'en' ? "You are already subscribed to this event. " : "Vous êtes déjà inscrit à cet événement.")
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <section className="container-fluid py-5 position-relative" style={{ backgroundColor: "#17416F", paddingLeft: '0px', paddingRight: '0px' }}>
      <div className="container px-lg-5 px-0 evene">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-white text-uppercase" style={{ fontWeight: 700, fontSize: screenSize === 'small' ? '24px' : '36px' }}>
            {selectedLanguage === 'fr' ? contents?.data.communoty_page_event_title.content_fr : contents?.data.communoty_page_event_title.content_en}
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
                        <img src={event.photo} alt={selectedLanguage === 'fr' ? event.nom : event.name} className="image-fluid w-100" style={{ height: '250px', objectFit: 'contain', backgroundColor:'#17416f1c' }} />
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
                          <p className="event-title" style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{selectedLanguage === 'fr' ? event.nom : event.name}</p>
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
            <div className="modal-dialog modal-dialog-centered mod-ev">
              <div className="modal-content">
                <div className="modal-body position-relative">
                  <div className='color1'>
                    <button onClick={() => setSelectedEvent(null)} className="btn-cl fs-3 text-whiteposition-absolute top-0 end-0 m-3">
                      <i className="bi bi-x-lg"></i>
                    </button>
                    <strong>
                      <h2>{selectedLanguage === 'fr' ? selectedEvent.nom : selectedEvent.name}</h2>
                    </strong> <br />
                    <div>
                      {selectedLanguage === 'fr' ? (
                        <div dangerouslySetInnerHTML={{ __html: selectedEvent.description }} />
                      ) : (
                        <div dangerouslySetInnerHTML={{ __html: selectedEvent.description_en }} />
                      )}
                    </div>
                    {/* <div className="col"> */}
                    <div className="mt-4">
                      <div className="mb-6">
                        <h1 className="text-2xl font-bold text-blue-900 text-center">
                          {selectedLanguage === 'fr' ? "S'inscrire" : "Register"}
                        </h1>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <label className="block text-blue-900">
                            {selectedLanguage === 'fr' ? "Prenom" : "Firstname"}
                          </label>
                          <input
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                            placeholder="firstname"
                            className="form-control"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-blue-900">
                            {selectedLanguage === 'fr' ? "Nom" : "Lastname"}
                          </label>
                          <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                            placeholder="lastname"
                            className="form-control"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-blue-900">
                            {selectedLanguage === 'fr' ? contents?.data.feedback_label_2.content_fr : contents?.data.feedback_label_2.content_en} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Email Address"
                            className="form-control"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-blue-900">
                            {selectedLanguage === 'fr' ? 'Telephone' : 'Phone number'} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            placeholder="Phone number"
                            className="form-control"
                          />
                        </div>

                        <div className="d-flex justify-content-center">
                          <button type="submit" className="btn btn-primary">
                            {selectedLanguage === 'fr' ? contents?.data.feedback_button.content_fr : contents?.data.feedback_button.content_en}
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show" onClick={() => setSelectedEvent(null)}></div>
          </div>
        )}
      </div>
      <div className="position-absolute bottom-0 end-0">
        <img src={Mask2} alt="" style={{ width: '70%' }} />
      </div>
      {showSuccessMessage && (
        <div className="alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3" role="alert">
          {message}
        </div>
      )}
    </section>
  );
};

export default EventsCarousel;