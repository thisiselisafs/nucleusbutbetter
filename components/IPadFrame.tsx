import React from 'react';

interface IPadFrameProps {
  children: React.ReactNode;
}

export const IPadFrame: React.FC<IPadFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto w-[90%] max-w-[1100px] aspect-[4/3] max-h-[85vh] bg-gray-900 rounded-[32px] md:rounded-[48px] p-3 md:p-5 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.4)] ring-4 ring-gray-900/50 border-4 border-gray-800 transition-all duration-500 ease-in-out">
      {/* Screen Area */}
      <div className="w-full h-full bg-[#FDFBF7] rounded-[20px] md:rounded-[28px] overflow-hidden relative shadow-inner isolate">
        {children}
      </div>

      {/* Power Button (Left Edge, Top) */}
      <div className="absolute -left-[6px] top-14 h-12 w-1.5 bg-gray-800 rounded-l-md"></div>
      
      {/* Volume Buttons (Top Edge, Left) */}
      <div className="absolute -top-[6px] left-14 w-12 h-1.5 bg-gray-800 rounded-t-md"></div>
      <div className="absolute -top-[6px] left-28 w-12 h-1.5 bg-gray-800 rounded-t-md"></div>
    </div>
  );
};