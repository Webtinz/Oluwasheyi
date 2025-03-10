import React, { useContext, useEffect, useState } from 'react';
import { getAllContents } from '../../services/content.service';
import LanguageContext from '../../context/LanguageContext';

const DonationSteps = () => {
  const { selectedLanguage } = useContext(LanguageContext);
  const [contents, setContents] = useState();

  // Get contents on component mount
  useEffect(() => {
    const fetchContents = async () => {
      try {
        // const savedContents = localStorage.getItem("contents");
        // if (savedContents) {
        //   setContents(JSON.parse(savedContents));
        // } else {
        // Fetch contents if not in localStorage
        const response = await getAllContents();
        setContents(response.data);
        //   localStorage.setItem("contents", JSON.stringify(response.data));
        // }
      } catch (error) {
        console.error('Failed to fetch contents:', error.message || error);
      }
    };
    fetchContents();
  }, []);

  return (
    <div className="bg-blue-900 w-full min-h-[300px] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative flex justify-between items-start mb-12">
          {/* SVG Connection Line */}
          <div className="absolute w-full" style={{ top: '24px' }}>
            <svg width="100%" height="2">
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                stroke="#10B981"
                strokeWidth="2"
                strokeDasharray="2 4"
              />
            </svg>
          </div>

          {/* Step 1 */}
          <div className="flex flex-col items-center text-center w-48 relative z-10">
            <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mb-4">
              01
            </div>
            <p className="text-white text-sm leading-tight">
              {selectedLanguage === 'fr' ? contents?.donation_step_1.content_fr : contents?.donation_step_1.content_en}
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center w-48 relative z-10">
            <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mb-4">
              02
            </div>
            <p className="text-white text-sm leading-tight">
              {selectedLanguage === 'fr' ? contents?.donation_step_2.content_fr : contents?.donation_step_2.content_en}
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center w-48 relative z-10">
            <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mb-4">
              03
            </div>
            <p className="text-white text-sm leading-tight">
              {selectedLanguage === 'fr' ? contents?.donation_step_3.content_fr : contents?.donation_step_3.content_en}
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center w-48 relative z-10">
            <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mb-4">
              04
            </div>
            <p className="text-white text-sm leading-tight">
              {selectedLanguage === 'fr' ? contents?.donation_step_4.content_fr : contents?.donation_step_4.content_en}
            </p>
          </div>

          {/* Step 5 */}
          <div className="flex flex-col items-center text-center w-48 relative z-10">
            <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mb-4">
              05
            </div>
            <p className="text-white text-sm leading-tight">
              {selectedLanguage === 'fr' ? contents?.donation_step_5.content_fr : contents?.donation_step_5.content_en}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="bg-emerald-500 text-white px-8 py-3 rounded-md hover:bg-emerald-600 transition-colors">
            {selectedLanguage === 'fr' ? contents?.donation_step_button.content_fr : contents?.donation_step_button.content_en}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationSteps;