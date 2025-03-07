import React, { useContext, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../index.css';
import nutrition from '../../assets/nutrition.png';
import exercise from '../../assets/exercise.png';
import healthtrack from '../../assets/natural-supplement.png';
import pregnancy from '../../assets/pregnancy.png';
import { getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';

const HealthAdviceCarousel = ({ healthAdvices }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [itemsToShow, setItemsToShow] = React.useState(1);

  // const healthAdvices = [
  //   {
  //     title: 'Nutrition ',
  //     image: nutrition,
  //     description: 'Lorem ipsum dolor sit<br/> amet nulls const.'
  //   },
  //   {
  //     title: 'Physical Activity',
  //     image: exercise,
  //     description: 'Lorem ipsum dolor sit <br/> amet nulls const.'
  //   },
  //   {
  //     title: 'Natural Health',
  //     image: healthtrack,
  //     description: 'Lorem ipsum dolor sit <br/> amet nulls const.'
  //   },
  //   {
  //     title: 'Pregnancy Monitoring',
  //     image: pregnancy,
  //     description: 'Lorem ipsum dolor sit <br/> amet nulls const.'
  //   },
  //   {
  //     title: 'Health Tracking',
  //     image: pregnancy,
  //     description: 'Lorem ipsum dolor sit <br/> amet nulls const.'
  //   }
  // ];

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

  const maxIndex = Math.max(0, healthAdvices?.length - itemsToShow);

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

  // Calculate visible advices
  const visibleAdvices = healthAdvices?.slice(currentIndex, currentIndex + itemsToShow);

  const { selectedLanguage } = useContext(LanguageContext);
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
    <div className="py-4" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
      <div className='hhe'>
        <div className='container'>
          <h2 className='text-center mb-5' style={{ textTransform: 'uppercase', fontSize: '36px', fontWeight: '700', color: '#17416F' }}>
            {selectedLanguage === 'fr' ? contents?.home_page_banner_link5.content_fr : contents?.home_page_banner_link5.content_en}
          </h2>
          <div className="relative" style={{ margin: '0 8rem' }}>
            {/* Navigation Buttons */}
            <button
              onClick={prev}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 transition-opacity ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                }`}
              disabled={currentIndex === 0}
              style={{ fontSize: '2rem', color: 'white' }} // Increase the icon size
            >
              <ChevronLeft />
            </button>

            <button
              onClick={next}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 transition-opacity ${currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                }`}
              disabled={currentIndex === maxIndex}
              style={{ fontSize: '2rem', color: 'white' }} // Increase the icon size
            >
              <ChevronRight />
            </button>

            {/* Cards Container */}
            <div className="healthcont grid grid-flow-col auto-cols-fr px-4" >
              {visibleAdvices?.map((advice, index) => (
                <div
                  key={currentIndex + index}
                  className="transition-all duration-300 ease-in-out transform"
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} // Ensures each card has equal height
                >
                  <div className="bg-white shadow-md h-100" style={{ border: '1px solid #17416F', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="flex flex-col items-center text-center gap-4" style={{ flexGrow: 1 }}>
                      <img src={advice.photo} alt={advice.topic} className="object-cover mt-5" />
                      <h3 className="font-semibold text-lg text-teal-600">
                        {selectedLanguage === 'fr' ? advice.topic : advice.topic_en}
                      </h3>
                      <p className="text-sm text-gray-600" >
                        {selectedLanguage === 'fr' ? (<div dangerouslySetInnerHTML={{
                          __html: advice.advice_text
                        }} />) : (<div dangerouslySetInnerHTML={{
                          __html: advice.advice_text_en
                        }} />)}
                      </p>
                    </div>
                    {/* Ensure the button is at the bottom of the card */}
                    <button className="w-full mt-2 p-3 btn btn-yt text-white" style={{ background: '#13AB9C' }}>
                      {selectedLanguage === 'fr' ? "Voir Plus" : "Learn More"}
                    </button>
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
