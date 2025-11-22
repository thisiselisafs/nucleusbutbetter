import React, { useState } from 'react';
import { IPadFrame } from './components/IPadFrame';
import { EmbryoApp } from './components/EmbryoApp';
import { GuiderWindow } from './components/GuiderWindow';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    setCurrentScreen((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentScreen((prev) => Math.max(prev - 1, 0));
  };

  return (
    <main className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 bg-beige-100 relative">
       {/* Background decorative elements could go here */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         {/* Subtle grain or gradient if desired, currently keeping clean beige per request */}
      </div>

      <IPadFrame>
        <EmbryoApp 
          currentScreen={currentScreen} 
          onScreenChange={setCurrentScreen} 
        />
      </IPadFrame>

      <GuiderWindow 
        currentStep={currentScreen}
        onNext={handleNext}
        onBack={handleBack}
      />
    </main>
  );
}