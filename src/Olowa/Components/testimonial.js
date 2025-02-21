import React, { useState, useEffect } from 'react';
import Logo from '../../assets/76.png';

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
  }
];

const PatientTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const cardsToShow = windowWidth >= 768 ? 2 : 1;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex(current => 
      current === 0 ? testimonials.length - cardsToShow : current - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(current => 
      current === testimonials.length - cardsToShow ? 0 : current + 1
    );
  };

  return (
    <div className='container-fluid py-5' style={{background:' #F6F6F6',paddingLeft:'0px',paddingRight:'0px'}}>
        <div className='container p-3'>
            <div className="flex flex-col md:flex-row gap-8 p-6">
                <div className="md:w-1/4">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4" style={{fontSize:'30px'}}>
                      WHAT OUR PATIENTS ARE SAYING
                    </h2>
                    <div className="flex gap-2">
                      <button 
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover"
                      >
                        <i class="bi bi-chevron-left"></i>
                      </button>                     
                      <button 
                        onClick={handleNext}
                        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover"
                      >
                        <i class="bi bi-chevron-right"></i>
                      </button>
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
                            <div className="text-teal-500 text-4xl mb-4">"</div>
                            <h3 className="text-xl font-semibold mb-2">{testimonial.title}</h3>
                            <p className="text-gray-600 mb-6">{testimonial.text}</p>
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
