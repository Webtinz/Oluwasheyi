import React from 'react';

const DonationSteps = () => {
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
              Select the medical program you wish to support
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center w-48 relative z-10">
            <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mb-4">
              02
            </div>
            <p className="text-white text-sm leading-tight">
              Enter your donation amount
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center w-48 relative z-10">
            <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mb-4">
              03
            </div>
            <p className="text-white text-sm leading-tight">
              Click the "Donate Now" button
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center w-48 relative z-10">
            <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mb-4">
              04
            </div>
            <p className="text-white text-sm leading-tight">
              Complete the secure payment process
            </p>
          </div>

          {/* Step 5 */}
          <div className="flex flex-col items-center text-center w-48 relative z-10">
            <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mb-4">
              05
            </div>
            <p className="text-white text-sm leading-tight">
              Receive a confirmation message and thank you note
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="bg-emerald-500 text-white px-8 py-3 rounded-md hover:bg-emerald-600 transition-colors">
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationSteps;