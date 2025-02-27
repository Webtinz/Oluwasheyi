import React, { useContext, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';

// Importez vos images ici
import Img1 from '../../assets/1.png';
import Img2 from '../../assets/2.png';
import Img3 from '../../assets/3.png';
import Img4 from '../../assets/4.png';


const DoctorCard = ({ name, specialty, imageUrl }) => (
  
  <div className="flex flex-col items-center p-4 min-w-[280px]">
    <div className="relative w-full aspect-square mb-4">
      <img 
        src={imageUrl}
        alt={`Dr. ${name}`}
        className="w-full h-full object-cover"
        style={{borderTopRightRadius:'30px'}}
      />
    </div>
    <h3 className="text-lg font-semibold text-blue-900">{name}</h3>
    <p className="text-sm text-teal-600">{specialty}</p>
  </div>
);

const DoctorCarousel = () => {
  // Définissez vos données de médecins ici avec les images importées
  const doctors = [
    {
      imageUrl: Img1, // Utilisez l'image importée
      name: "Dr. Smith",
      specialty: "Gynecologist"
    },
    {
      imageUrl: Img2,
      name: "Dr. Johnson",
      specialty: "Gynecologist"
    },
    {
      imageUrl: Img3,
      name: "Dr. Williams",
      specialty: "Gynecologist"
    },
    {
      imageUrl: Img4,
      name: "Dr. Brown",
      specialty: "Gynecologist"
    },
    {
      imageUrl: Img3,
      name: "Dr. Williams",
      specialty: "Gynecologist"
    },
    {
      imageUrl: Img4,
      name: "Dr. Williams",
      specialty: "Gynecologist"
    },
    {
      imageUrl: Img2,
      name: "Dr. Williams",
      specialty: "Gynecologist"
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [maxVisibleCards, setMaxVisibleCards] = React.useState(4);
  const [activeButton, setActiveButton] = React.useState(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setMaxVisibleCards(1);
      else if (window.innerWidth < 768) setMaxVisibleCards(2);
      else if (window.innerWidth < 1024) setMaxVisibleCards(3);
      else setMaxVisibleCards(4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, doctors.length - maxVisibleCards);

  const nextSlide = () => {
    const step = 1;
    setCurrentIndex(prev => Math.min(prev + step, maxIndex));
    setActiveButton('next');
  };

  const prevSlide = () => {
    const step = 1;
    setCurrentIndex(prev => Math.max(prev - step, 0));
    setActiveButton('prev');
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
    setActiveButton(null);
  };

  // Styles de boutons modifiés pour maintenir la couleur après le clic
  const buttonStyle = {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    borderRadius: "50%",
    padding: "0.5rem",
    color: currentIndex === 0 ? "black" : "white",
    backgroundColor: currentIndex === 0 ? "#D1D5DB" : 
                    (activeButton === 'prev' ? "#13AB9C" : "#13AB9C"),
    cursor: currentIndex === 0 ? "not-allowed" : "pointer",
    transition: "background-color 0.3s",
  };
  
  const buttonStyle1 = {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    borderRadius: "50%",
    padding: "0.5rem",
    color: currentIndex >= maxIndex ? "black" : "white",
    backgroundColor: currentIndex >= maxIndex ? "#D1D5DB" : 
                    (activeButton === 'next' ? "#13AB9C" : "#13AB9C"),
    cursor: currentIndex >= maxIndex ? "not-allowed" : "pointer",
    transition: "background-color 0.3s",
  };
  
  // Calculer la largeur d'une carte
  const cardWidth = 100 / maxVisibleCards;

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

  // Style du conteneur pour que les cartes soient toutes visibles
  const containerStyle = {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  };
  
  return (
    <div className="container mt-4 meetteam">
      <h2 className="text-center text-2xl font-bold uppercase mb-8" style={{fontSize:'36px', color:'#17416F'}}>
        {selectedLanguage === 'fr' ? contents?.home_page_team_title.content_fr : contents?.home_page_team_title.content_en}
      </h2>
      <div className="relative px-4 mt-4">
        <button 
          onClick={prevSlide} 
          disabled={currentIndex === 0} 
          style={buttonStyle}
        >
          <ChevronLeft style={{width:'40px', height:'40px'}} />
        </button>

        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * cardWidth}%)`,
              width: `${doctors.length * cardWidth}%`
            }}
          >
            {doctors.map((doctor, index) => (
              <div 
                key={index}
                className="flex-shrink-0"
                style={{ width: `${100 / doctors.length}%` }}
              >
                <DoctorCard {...doctor} />
                <span className='d-block my-3' style={{borderBottom:'1px solid #17416F33', width:'90%'}}></span>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={nextSlide} 
          disabled={currentIndex >= maxIndex} 
          style={buttonStyle1}
        >
          <ChevronRight style={{width:'40px', height:'40px'}} />
        </button>
        
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
            key={index}
            style={{
              width: '0.8rem', // w-2
              height: '0.8rem', // h-2
              borderRadius: '50%', // rounded-full
              transition: 'background-color 0.3s ease', // transition-colors
              backgroundColor: index === currentIndex ? '#13AB9C' : '', // bg-secondary / bg-success
              border: index === currentIndex ? '1px solid #13AB9C' : '2px solid #17416F',
            }}
            onClick={() => goToSlide(index)}
          />          
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorCarousel;