import React, { useState } from 'react';
import { ChevronLeft, Info, TrendingUp, AlertCircle, FileText, ChevronDown, User } from 'lucide-react';

interface DetailViewProps {
  onBack: () => void;
}

// Component for the "People Grid" chart
const PeopleGrid: React.FC<{ percentage: number; color: string; label: string; subLabel: string }> = ({ percentage, color, label, subLabel }) => {
  // Total 50 icons (5 rows of 10) to approximate the look
  const totalIcons = 50;
  const filledCount = Math.round((percentage / 100) * totalIcons);

  return (
    <div className="flex-1 bg-[#F2EFE6] rounded-xl p-4 flex flex-col gap-3 items-center">
      <div className={`text-xs font-bold ${color === 'blue' ? 'text-blue-600' : 'text-stone-600'} text-center`}>
        {label}: {subLabel}
      </div>
      
      <div className="grid grid-cols-10 gap-1">
        {Array.from({ length: totalIcons }).map((_, i) => {
          const isFilled = i < filledCount;
          return (
            <div key={i} className="flex justify-center">
               {/* Simple Person Icon Circle */}
               <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border ${
                 isFilled 
                   ? (color === 'blue' ? 'bg-blue-500 border-blue-500' : 'bg-stone-400 border-stone-400') 
                   : 'bg-transparent border-stone-300'
               } flex items-end justify-center overflow-hidden`}>
                 {/* Silhouette head/body */}
                 <div className={`w-full h-[60%] rounded-t-full ${isFilled ? 'bg-white/90' : 'bg-stone-300/50'}`}></div>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Bell Curve Component
const BellCurve = () => {
  // SVG Viewbox dimensions
  const width = 320;
  const height = 160;
  const margin = 25;
  const graphWidth = width - 2 * margin;
  const baseY = 130;
  const scaleY = 100; // Amplitude
  
  // Normal distribution: -4 to 4 SD
  const minSD = -4;
  const maxSD = 4;
  const range = 8;
  const pixelsPerSD = graphWidth / range;
  
  const getX = (sd: number) => margin + (sd - minSD) * pixelsPerSD;
  
  const getY = (sd: number) => {
    // standard normal PDF scaled
    const y = Math.exp(-0.5 * sd * sd);
    return baseY - (y * scaleY);
  };

  // Paths
  const generateCurve = () => {
    let d = "";
    for (let i = 0; i <= 100; i++) {
      const sd = minSD + (i/100) * range;
      d += `${i===0?'M':'L'} ${getX(sd)} ${getY(sd)}`;
    }
    return d;
  };

  // Shading 1.15 to 2.0
  const scoreSD = 1.15;
  const endSD = 2.0;
  const generateShade = () => {
     let d = `M ${getX(scoreSD)} ${baseY}`;
     d += ` L ${getX(scoreSD)} ${getY(scoreSD)}`;
     
     // curve segment
     for(let i=0; i<=20; i++) {
         const t = i/20;
         const sd = scoreSD + t*(endSD - scoreSD);
         d += ` L ${getX(sd)} ${getY(sd)}`;
     }
     
     d += ` L ${getX(endSD)} ${getY(endSD)}`; // To intersection point
     d += ` L ${getX(endSD)} ${baseY}`; // Down to axis
     d += " Z";
     return d;
  };
  
  const scoreX = getX(scoreSD);
  const scoreY = getY(scoreSD);

  return (
    <div className="relative w-full mt-14 mb-4">
      <svg className="w-full overflow-visible" viewBox={`0 0 ${width} ${height}`}>
         {/* Y Axis */}
         <line x1={margin} y1={baseY} x2={margin} y2={10} stroke="#a8a29e" strokeWidth="1" />
         <text x={margin-10} y={height/2} className="text-[8px] fill-stone-400 font-medium" transform={`rotate(-90, ${margin-10}, ${height/2})`} textAnchor="middle">NUMBER OF PEOPLE</text>

         {/* X Axis */}
         <line x1={margin} y1={baseY} x2={width-margin} y2={baseY} stroke="#a8a29e" strokeWidth="1" />
         
         {/* Shading */}
         <path d={generateShade()} fill="#eff6ff" />
         <line x1={getX(endSD)} y1={baseY} x2={getX(endSD)} y2={getY(endSD)} stroke="#bfdbfe" strokeWidth="1" />

         {/* Dotted Lines */}
         {[-3, -2, -1, 0, 1, 2, 3].map(sd => (
             <g key={sd}>
                <line x1={getX(sd)} y1={baseY} x2={getX(sd)} y2={getY(sd)} stroke="#e7e5e4" strokeWidth="1" strokeDasharray="3 3" />
                <text x={getX(sd)} y={baseY + 10} fontSize="8" fill="#78716c" textAnchor="middle">{sd}</text>
             </g>
         ))}

         {/* Curve */}
         <path d={generateCurve()} fill="none" stroke="#78716c" strokeWidth="1.5" strokeDasharray="3 3" />

         {/* Risk Labels */}
         <text x={getX(-3.5)} y={baseY + 24} fontSize="8" fill="#57534e" fontWeight="bold" textAnchor="middle">LOWER RISK</text>
         <text x={getX(0)} y={baseY + 24} fontSize="8" fill="#57534e" fontWeight="bold" textAnchor="middle">AVERAGE RISK</text>
         <text x={getX(3.5)} y={baseY + 24} fontSize="8" fill="#57534e" fontWeight="bold" textAnchor="middle">HIGHER RISK</text>

         {/* Score Line */}
         <line x1={scoreX} y1={baseY} x2={scoreX} y2={scoreY} stroke="#1c1917" strokeWidth="1.5" />
         <circle cx={scoreX} cy={baseY} r="2.5" fill="#1c1917" />
      </svg>

      {/* Tooltip */}
      <div 
         className="absolute -top-8 left-0 bg-white rounded-[14px] border border-stone-200 shadow-md pl-1.5 pr-3 py-1.5 flex items-center gap-2"
         style={{ left: `${(scoreX/width)*100}%`, transform: 'translateX(-40%)' }}
      >
         <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
             <div className="w-5 h-5 bg-blue-500 rounded-full flex items-end justify-center overflow-hidden">
                 <User className="w-3.5 h-3.5 text-white fill-white mb-[-1px]" />
             </div>
         </div>
         <div className="flex flex-col leading-none">
             <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider mb-0.5">Score</span>
             <span className="text-sm font-bold text-stone-900">1.15</span>
         </div>
      </div>
    </div>
  );
};

export const DetailView: React.FC<DetailViewProps> = ({ onBack }) => {
  return (
    <div className="absolute inset-0 z-50 flex justify-end">
      {/* Backdrop: Darkens the rest of the screen */}
      <div 
        className="absolute inset-0 bg-stone-900/20 backdrop-blur-[1px] animate-in fade-in duration-500 cursor-pointer"
        onClick={onBack}
      />

      {/* Drawer Panel: Slides in from right, HALF WIDTH */}
      <div className="relative w-1/2 h-full bg-[#FDFBF7] shadow-2xl overflow-y-auto no-scrollbar animate-in slide-in-from-right duration-500 border-l border-stone-100">
        
        {/* Header */}
        <header className="sticky top-0 bg-[#FDFBF7]/95 backdrop-blur-sm z-10 px-6 py-4 flex items-center gap-3 border-b border-stone-100">
          <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors">
            <ChevronLeft className="w-5 h-5 text-stone-600" />
          </button>
          <h1 className="text-sm font-bold text-stone-800">Type 2 diabetes</h1>
        </header>

        <div className="px-6 pb-10">
          <p className="text-xs text-stone-600 leading-relaxed mt-4">
            Type 2 diabetes is a long-term condition that causes high blood sugar levels. A person with type 2 diabetes either can't make enough insulin or responds poorly to it. The condition can affect people of all ages, but is more common in people older than 45.
          </p>

          {/* Predicted Risk Card */}
          <section className="mt-8">
            <h3 className="text-xs font-bold text-stone-800 mb-3">This embryo's predicted risk</h3>
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-stone-100">
              
              {/* Score Top */}
              <div className="flex items-center gap-4 mb-8 border-b border-stone-50 pb-6">
                {/* Large Text Number instead of Ring */}
                <div className="text-4xl font-bold text-blue-600 tracking-tight">
                  +9.3
                </div>
                <p className="text-xs text-stone-500 pt-1">
                  <span className="font-bold text-stone-700">percentage points</span> compared to the typical female with a BMI between 18.5-24.9.
                </p>
              </div>

              {/* Comparison Section */}
              <div>
                <p className="text-xs text-stone-600 mb-4">
                  The chance of this embryo developing type 2 diabetes with a BMI between 18.5-24.9:
                </p>
                
                <div className="flex flex-col gap-4">
                  <PeopleGrid 
                    percentage={26.4} 
                    color="blue" 
                    label="Embryo 1" 
                    subLabel="26.4% chance"
                  />
                  <PeopleGrid 
                    percentage={17.1} 
                    color="stone" 
                    label="Typical female" 
                    subLabel="17.1% chance"
                  />
                </div>
              </div>

            </div>
          </section>

          {/* Genetic Influence Card */}
          <section className="mt-6">
            <div className="flex items-start justify-between mb-2">
               <div>
                   <h3 className="text-xs font-bold text-stone-800">Genetic influence</h3>
                   <div className="text-xs font-bold text-stone-800">(Z-score)</div>
               </div>
               <div className="text-[10px] text-stone-500 flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-full hover:bg-stone-200 transition-colors cursor-pointer">
                 <Info className="w-3 h-3" /> What does this mean?
               </div>
            </div>
            
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-stone-100">
               <h4 className="text-xs font-bold text-stone-800 mb-2">Above average risk</h4>
               <p className="text-xs text-stone-600 leading-relaxed mb-4">
                 Most people tend to have a Z-score between -1 and 1, which indicates they have an average genetic risk for type 2 diabetes. This embryo's score is 1.15, which means they will have an above average genetic risk.
               </p>
               
               <BellCurve />
            </div>
          </section>

          {/* Good to Know */}
          <section className="mt-8 flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-stone-500 shrink-0" />
            <div>
              <h3 className="text-xs font-bold text-stone-800 mb-1">Good to know</h3>
              <p className="text-xs text-stone-500">
                Type 2 diabetes can be associated with the following: <span className="underline decoration-stone-300 underline-offset-2 cursor-pointer hover:text-stone-800">BMI</span>.
              </p>
            </div>
          </section>

          {/* Prediction Strength */}
          <section className="mt-8 flex items-start gap-3">
             <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-blue-200">
               <div className="w-3 h-1.5 border-b-2 border-white rounded-b-full"></div>
             </div>
             <div>
               <h3 className="text-xs font-bold text-stone-800 mb-1">Prediction strength: Medium</h3>
               <p className="text-xs text-stone-500">This predictor can still be useful, but has lower accuracy overall.</p>
             </div>
          </section>

          {/* Disclaimers */}
          <section className="mt-8 flex items-start gap-3">
             <FileText className="w-6 h-6 text-stone-800 shrink-0" />
             <div>
               <h3 className="text-xs font-bold text-stone-800 mb-1">Genetic predictions are not guarantees</h3>
               <p className="text-xs text-stone-500 leading-relaxed">
                 A higher genetic risk doesn't mean someone <i>will</i> develop a disease, just as a lower risk doesn't mean they <i>won't</i>. Besides genetics, environmental factors, lifestyle choices, and other factors also significantly influence a person's chance of developing a disease.
               </p>
             </div>
          </section>

          <section className="mt-8 flex items-start gap-3">
             <AlertCircle className="w-6 h-6 text-stone-800 shrink-0" />
             <div>
               <h3 className="text-xs font-bold text-stone-800 mb-1">This is not a diagnosis</h3>
               <p className="text-xs text-stone-500 leading-relaxed">
                 If you have any questions or concerns after reading this report, we recommend speaking with your primary healthcare provider or a genetic counselor.
               </p>
             </div>
          </section>

          {/* Bottom Accordions */}
          <div className="mt-8 border-t border-stone-200">
            <div className="flex items-center justify-between py-4 border-b border-stone-200 cursor-pointer hover:bg-stone-50 transition-colors">
               <div className="flex items-center gap-2 text-stone-800 font-medium text-xs">
                 <FileText className="w-4 h-4" /> References
               </div>
               <ChevronDown className="w-4 h-4 text-stone-400" />
            </div>
            <div className="flex items-center justify-between py-4 border-b border-stone-200 cursor-pointer hover:bg-stone-50 transition-colors">
               <div className="flex items-center gap-2 text-stone-800 font-medium text-xs">
                 <Info className="w-4 h-4" /> Methods & Limitations
               </div>
               <ChevronDown className="w-4 h-4 text-stone-400" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};