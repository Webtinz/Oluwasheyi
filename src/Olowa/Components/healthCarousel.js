import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import '../index.css';
 
const HealthAdviceCarousel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [itemsToShow, setItemsToShow] = React.useState(1);

  const healthAdvices = [
    {
      title: 'Nutrition',
      icon: '🥗',
      description: 'Lorem ipsum dolor sit amet'
    },
    {
      title: 'Physical Activity',
      icon: '🏃',
      description: 'Lorem ipsum dolor sit amet'
    },
    {
      title: 'Natural Health',
      icon: '🌿',
      description: 'Lorem ipsum dolor sit amet'
    },
    {
      title: 'Pregnancy Monitoring',
      icon: '🤰',
      description: 'Lorem ipsum dolor sit amet'
    },
    {
      title: 'Health Tracking',
      icon: '📊',
      description: 'Lorem ipsum dolor sit amet'
    }
  ];

  React.useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(5);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(3);
      } else {
        setItemsToShow(1);
      }
    };

    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  const maxIndex = Math.max(0, healthAdvices.length - itemsToShow);

  const next = () => {
    setCurrentIndex((prevIndex) => 
      Math.min(prevIndex + 1, maxIndex)
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => 
      Math.max(0, prevIndex - 1)
    );
  };

  // Calculer les éléments visibles actuellement
  const visibleAdvices = healthAdvices.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <div className="container-fluid py-4" style={{paddingLeft:'0px', paddingRight:'0px'}}>
        <div className='hhe'>
            <div className='container py-3'>
              <h2 className='text-center mb-5' style={{textTransform:'uppercase', fontSize:'30px', fontWeight:'700', color:'#17416F'}}>health advices</h2>
                <div className="relative px-8">
                    {/* Navigation Buttons */}
                    <button 
                    onClick={prev}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg transition-opacity ${
                        currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                    }`}
                    disabled={currentIndex === 0}
                    >
                    <ArrowLeft className="w-6 h-6" />
                    </button>
                    
                    <button 
                    onClick={next}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg transition-opacity ${
                        currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                    }`}
                    disabled={currentIndex === maxIndex}
                    >
                    <ArrowRight className="w-6 h-6" />
                    </button>

                    {/* Cards Container */}
                    <div className="grid grid-flow-col auto-cols-fr" style={{margin:'0 20px'}}>
                        {visibleAdvices.map((advice, index) => (
                            <div 
                                key={currentIndex + index} 
                                className="transition-all duration-300 ease-in-out transform"
                                
                            >
                                <div className="bg-white shadow-md p-3 h-full" style={{border:'1px solid #17416F'}}>
                                    <div className="flex flex-col items-center text-center gap-4">
                                        <span className="text-4xl">{advice.icon}</span>
                                        <h3 className="font-semibold text-lg text-teal-600">
                                            {advice.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {advice.description}
                                        </p>
                                        <button className="mt-2 w-100 py-2 btn btn-yt text-white" style={{background:'#13AB9C'}}>
                                            Learn More
                                        </button>
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

export default HealthAdviceCarousel;