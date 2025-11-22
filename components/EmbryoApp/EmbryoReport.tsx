import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, MoveVertical, Gauge, Hand, Target, Stethoscope, Wine, Wheat, Droplet, HeartPulse, Activity, Brain, Moon, CloudLightning, Network, Zap } from 'lucide-react';
import { AppearanceList } from './AppearanceList';
import { RiskSection } from './RiskSection';

interface EmbryoReportProps {
  onBack: () => void;
  onSelectRisk?: () => void;
}

export const EmbryoReport: React.FC<EmbryoReportProps> = ({ onBack, onSelectRisk }) => {
  const [activeScroll, setActiveScroll] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setActiveScroll(scrollTop > 10);
  };

  return (
    <div 
      className="w-full h-full flex flex-col bg-[#FDFBF7] text-stone-800 overflow-y-auto no-scrollbar relative font-sans selection:bg-stone-200 animate-in fade-in slide-in-from-bottom-4 duration-500"
      onScroll={handleScroll}
    >
      {/* Header - pointer-events-none to disable clicks */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-[#FDFBF7]/95 backdrop-blur-sm transition-all border-b border-transparent data-[scrolled=true]:border-stone-100 pointer-events-none" data-scrolled={activeScroll}>
        <div className="flex items-center gap-3 pointer-events-auto" onClick={onBack}>
          <button className="flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors">
            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
          </button>
          <h1 className="text-xl font-serif italic text-stone-900">
            Embryo #1
          </h1>
        </div>
        
        <div className="flex items-center gap-1 bg-white border border-stone-100 px-2 py-1 rounded-full shadow-sm">
          <span className="text-[9px] font-medium text-stone-800 tracking-wide uppercase">Predictive strength: All</span>
          <ChevronDown className="w-2.5 h-2.5 text-stone-400" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pb-12 max-w-5xl mx-auto w-full">
        
        {/* Section: Basic information */}
        <section className="mt-6">
          <h2 className="text-base font-bold text-stone-800 mb-3 ml-1">Basic information</h2>
          <AppearanceList />
        </section>

        {/* Section: Body */}
        <RiskSection 
          title="Body"
          items={[
            { icon: <Gauge strokeWidth={2} className="w-4 h-4" />, label: "BMI", value: "+0", unit: "BMI units" },
            { icon: <Hand strokeWidth={2} className="w-4 h-4" />, label: "Rheumatoid arthritis", value: "+0", unit: "% points" },
          ]}
        />

        {/* Section: Cancers */}
        <RiskSection 
          title="Cancers"
          items={[
            { icon: <Target strokeWidth={2} className="w-4 h-4" />, label: "Breast cancer", value: "+3", unit: "% points" },
          ]}
        />

        {/* Section: Female health */}
        <RiskSection 
          title="Female health"
          items={[
            { icon: <Stethoscope strokeWidth={2} className="w-4 h-4" />, label: "Endometriosis", value: "+1", unit: "% points" },
            { icon: <Stethoscope strokeWidth={2} className="w-4 h-4" />, label: "Polycystic ovarian syndrome", value: "-1", unit: "% points" },
          ]}
        />

        {/* Section: Food & diet */}
        <section className="mt-6">
            <h2 className="text-base font-bold text-stone-800 mb-3 ml-1">Food & diet</h2>
            <div className="bg-white rounded-[20px] shadow-sm border border-stone-100 overflow-hidden">
                {/* Normal Items */}
                 <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100">
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 text-stone-500 flex items-center justify-center"><Wine className="w-4 h-4" strokeWidth={2} /></div>
                        <span className="text-xs font-semibold text-stone-800">Alcohol dependence</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 flex justify-center">
                            <span className="text-stone-400 font-bold text-sm">+0</span>
                        </div>
                        <span className="text-[10px] font-medium text-stone-500 text-center min-w-[4.5rem]">% points</span>
                        <div className="w-5" />
                    </div>
                </div>

                 <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100">
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 text-stone-500 flex items-center justify-center"><Wheat className="w-4 h-4" strokeWidth={2} /></div>
                        <span className="text-xs font-semibold text-stone-800">Celiac disease</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 flex justify-center">
                            <span className="text-stone-400 font-bold text-sm">+0</span>
                        </div>
                        <span className="text-[10px] font-medium text-stone-500 text-center min-w-[4.5rem]">% points</span>
                        <div className="w-5" />
                    </div>
                </div>

                {/* Clickable Type 2 Diabetes Item */}
                <div 
                    className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-stone-50 transition-colors active:bg-stone-100"
                    onClick={onSelectRisk}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 text-stone-500 flex items-center justify-center"><Droplet className="w-4 h-4" strokeWidth={2} /></div>
                        <span className="text-xs font-semibold text-stone-800">Type 2 diabetes</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 flex justify-center">
                            <span className="text-sm font-bold text-blue-600">+9</span>
                        </div>
                        <span className="text-[10px] font-medium text-stone-500 text-center min-w-[4.5rem]">% points</span>
                        <ChevronDown className="w-4 h-4 text-stone-300 -rotate-90 ml-1" />
                    </div>
                </div>
            </div>
        </section>

        {/* Section: Heart */}
        <RiskSection 
          title="Heart"
          items={[
            { icon: <HeartPulse strokeWidth={2} className="w-4 h-4" />, label: "Coronary artery disease", value: "+1", unit: "% points" },
            { icon: <Activity strokeWidth={2} className="w-4 h-4" />, label: "Hypertension", value: "+4", unit: "% points" },
          ]}
        />

         {/* Section: Mind */}
         <RiskSection 
          title="Mind"
          items={[
            { icon: <Brain strokeWidth={2} className="w-4 h-4" />, label: "Alzheimer's disease", value: "-2", unit: "% points" },
            { icon: <Brain strokeWidth={2} className="w-4 h-4" />, label: "Autism spectrum disorder", value: "-0", unit: "% points" },
            { icon: <Brain strokeWidth={2} className="w-4 h-4" />, label: "Bipolar disorder", value: "-0", unit: "% points" },
            { icon: <Moon strokeWidth={2} className="w-4 h-4" />, label: "Insomnia", value: "-4", unit: "% points" },
            { icon: <Brain strokeWidth={2} className="w-4 h-4" />, label: "IQ", value: "+2", unit: "IQ points" },
            { icon: <CloudLightning strokeWidth={2} className="w-4 h-4" />, label: "Migraine", value: "-1", unit: "% points" },
            { icon: <Network strokeWidth={2} className="w-4 h-4" />, label: "Multiple sclerosis", value: "+0", unit: "% points" },
            { icon: <Zap strokeWidth={2} className="w-4 h-4" />, label: "Parkinson's disease", value: "+0", unit: "% points" },
            { icon: <Brain strokeWidth={2} className="w-4 h-4" />, label: "Schizophrenia", value: "+1", unit: "% points" },
          ]}
        />

      </main>

      {/* Floating Action Button - Scroll - pointer-events-none */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <button className="bg-white flex items-center gap-2 px-5 py-2.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-stone-100">
          <span className="text-xs font-medium text-stone-800">Scroll</span>
          <MoveVertical className="w-3.5 h-3.5 text-stone-800" />
        </button>
      </div>
    </div>
  );
};