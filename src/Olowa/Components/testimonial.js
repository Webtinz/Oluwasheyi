import React, { useState, useEffect } from 'react';
import Logo from '../../assets/76.png';
import Msk from '../../assets/Fr.png';
import Ic from '../../assets/11d.png';

const testimonials = [
  {
    id: 1,
    title: "Highly Recommended!!",
    text: "Lorem ipsum dolor sit amet nulls const consectetur. A lectus urna sit ut eniset pretium placerat faucibus faucibus. St quis consequat eget nulla fusce dignissim.",
    author: "Jane Cooper",
    location: "Cotonou",
    avatar: Logo
  },
  {
    id: 2,
    title: "Great Hospital",
    text: "Lorem ipsum dolor sit amet nulls const consectetur. A lectus urna sit ut eniset pretium placerat faucibus faucibus. St quis consequat eget nulla fusce dignissim.",
    author: "Jane Cooper",
    location: "Cotonou",
    avatar: Logo
  },
  {
    id: 3,
    title: "Great Hospital",
    text: "Lorem ipsum dolor sit amet nulls const consectetur. A lectus urna sit ut eniset pretium placerat faucibus faucibus. St quis consequat eget nulla fusce dignissim.",
    author: "Jane Cooper",
    location: "Cotonou",
    avatar: Logo
  },
  {
    id: 4,
    title: "Great Hospital",
    text: "Lorem ipsum dolor sit amet nulls const consectetur. A lectus urna sit ut eniset pretium placerat faucibus faucibus. St quis consequat eget nulla fusce dignissim.",
    author: "Jane Cooper",
    location: "Cotonou",
    avatar: Logo
  }
];

const PatientTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const cardsToShow = windowWidth >= 568 ? 2 : 1;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isPrevActive, setIsPrevActive] = useState(false);
  const [isNextActive, setIsNextActive] = useState(false);

  const handlePrev = () => {
    setIsPrevActive(true);
    setIsNextActive(false);
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // Empêche de descendre sous 0
  };

  const handleNext = () => {
    setIsNextActive(true);
    setIsPrevActive(false);
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, testimonials.length - 1)); // Empêche de dépasser le dernier élément
  };

  return (
    <div className='container-fluid py-5' style={{background:' #F6F6F6',paddingLeft:'0px',paddingRight:'0px'}}>
        <div className='container p-3'>
            <div className="flex flex-col md:flex-row gap-8 p-6">
                <div className="md:w-1/4">
                    <h2 className="text-2xl font-bold mb-4" style={{fontSize:'36px',color:'#17416F'}}>
                      WHAT OUR PATIENTS ARE SAYING
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={handlePrev}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: isPrevActive ? '#13AB9C' : '#E0E0E0',
                          color: isPrevActive ? 'white' : 'black',
                          transition: 'background-color 0.3s, color 0.3s',
                        }}
                      >
                        <i className="bi bi-chevron-left fs-3"></i>
                      </button>

                      <button
                        onClick={handleNext}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: isNextActive ? '#13AB9C' : '#E0E0E0',
                          color: isNextActive ? 'white' : 'black',
                          transition: 'background-color 0.3s, color 0.3s',
                        }}
                      >
                        <i className="bi bi-chevron-right fs-3"></i>
                      </button>
                    </div>
                    <div className='d-flex justify-content-end mt-4'>
                      <img 
                        src={Msk} 
                        alt="Mask logo" 
                      />
                    </div>
                </div>

                <div className="md:w-3/4 overflow-hidden">
                    <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
                        width: `${(testimonials.length / cardsToShow) * 100}%`
                    }}
                    >
                    {testimonials.map((testimonial) => (
                        <div 
                        key={testimonial.id}
                        className="px-4"
                        style={{ width: `${100 / testimonials.length * cardsToShow}%` }}
                        >
                        <div className=" p-6 h-full" 
                            style={{
                                border:'1px solid #17416F',
                                borderTopRightRadius:'30px',
                                background:'white',
                            }}
                        >
                            <div className="mb-4"><img src={Ic} /></div>
                            <h3 className="text-xl font-semibold mb-2" style={{color:'#17416F',fontWeight:'700'}}>{testimonial.title}</h3>
                            <p className="text-gray-600 mb-6">{testimonial.text}</p>
                            <hr className="my-4" />
                            <div className="flex items-center gap-3">
                            <img 
                                src={testimonial.avatar} 
                                alt={testimonial.author} 
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <p className="font-semibold">{testimonial.author}</p>
                                <p className="text-gray-500">{testimonial.location}</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PatientTestimonials;
