import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
        className="rounded-lg w-full h-full object-cover"
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
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [maxVisibleCards, setMaxVisibleCards] = React.useState(4);

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
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  };

  const buttonStyle = {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    borderRadius: "50%",
    padding: "0.5rem",
    color: currentIndex === 0 ? "black" : "white",
    backgroundColor: currentIndex === 0 ? "#D1D5DB" : "#13AB9C", // Gris si désactivé, sinon vert
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
    color: currentIndex === 0 ? "white" : "black",
    backgroundColor: currentIndex === 0 ? "#13AB9C" : "#D1D5DB", // Gris si désactivé, sinon vert
    cursor: currentIndex >= maxIndex ? "not-allowed" : "pointer",
    transition: "background-color 0.3s",
  };
  return (
    <div className="container mt-4">
      <h2 className="text-center text-2xl font-bold text-blue-900 uppercase mb-8" style={{fontSize:'36px'}}>
        Meet the team
      </h2>
      <div className="relative px-4 mt-4">
        <button onClick={prevSlide} disabled={currentIndex === 0} style={buttonStyle}>
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / maxVisibleCards}%)`,
              width: `${(doctors.length * 100) / maxVisibleCards}%`
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

        <button onClick={nextSlide} disabled={currentIndex >= maxIndex} style={buttonStyle1}>
          <ChevronRight className="w-6 h-6" />
        </button>
        

        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-secondary' : 'bg-success'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorCarousel;