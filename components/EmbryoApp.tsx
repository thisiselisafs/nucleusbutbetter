import React from 'react';
import { EmbryoDashboard } from './EmbryoApp/EmbryoDashboard';
import { EmbryoReport } from './EmbryoApp/EmbryoReport';
import { DetailView } from './EmbryoApp/DetailView';
import { ComparisonView } from './EmbryoApp/ComparisonView';

interface EmbryoAppProps {
  currentScreen: number;
  onScreenChange: (screen: number) => void;
}

export const EmbryoApp: React.FC<EmbryoAppProps> = ({ currentScreen, onScreenChange }) => {
  
  const handleEmbryoSelect = (id: number) => {
    onScreenChange(1);
  };

  const handleReportBack = () => {
    onScreenChange(0);
  };
  
  const handleDetailBack = () => {
    onScreenChange(1);
  }

  const handleSelectRisk = () => {
    onScreenChange(2);
  }

  const handleComparisonBack = () => {
    onScreenChange(2);
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#FDFBF7]">
      {currentScreen === 0 && (
        <EmbryoDashboard onEmbryoSelect={handleEmbryoSelect} />
      )}
      
      {/* Render EmbryoReport if screen is 1, 2 or 3 (so it stays visible behind overlay if needed, though logic below handles specific views) */}
      {/* Actually, to keep it clean: 
          0: Dashboard
          1: Report
          2: Detail View (Overlay)
          3: Comparison View (Full screen)
      */}

      {currentScreen === 1 && (
        <EmbryoReport onBack={handleReportBack} onSelectRisk={handleSelectRisk} />
      )}

      {currentScreen === 2 && (
         <>
            <EmbryoReport onBack={handleReportBack} onSelectRisk={handleSelectRisk} />
            <DetailView onBack={handleDetailBack} />
         </>
      )}

      {currentScreen === 3 && (
        <ComparisonView onBack={handleComparisonBack} />
      )}
    </div>
  );
};