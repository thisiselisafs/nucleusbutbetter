import React from 'react';
import { Plus, Menu, ChevronRight } from 'lucide-react';

interface EmbryoDashboardProps {
  onEmbryoSelect: (id: number) => void;
}

export const EmbryoDashboard: React.FC<EmbryoDashboardProps> = ({ onEmbryoSelect }) => {
  // Duplicated list to ensure scrolling
  const embryos = [
    { id: 1, sex: 'female', label: 'Embryo 1', color: 'bg-gradient-to-br from-[#d946ef] to-[#be185d]' },
    { id: 2, sex: 'male', label: 'Embryo 2', color: 'bg-gradient-to-br from-[#60a5fa] to-[#2563eb]' },
    { id: 3, sex: 'male', label: 'Embryo 3', color: 'bg-gradient-to-br from-[#60a5fa] to-[#2563eb]' },
    { id: 4, sex: 'male', label: 'Embryo 4', color: 'bg-gradient-to-br from-[#60a5fa] to-[#2563eb]' },
    { id: 5, sex: 'male', label: 'Embryo 5', color: 'bg-gradient-to-br from-[#60a5fa] to-[#2563eb]' },
    { id: 6, sex: 'female', label: 'Embryo 6', color: 'bg-gradient-to-br from-[#d946ef] to-[#be185d]' },
    { id: 7, sex: 'female', label: 'Embryo 7', color: 'bg-gradient-to-br from-[#d946ef] to-[#be185d]' },
    { id: 8, sex: 'female', label: 'Embryo 8', color: 'bg-gradient-to-br from-[#d946ef] to-[#be185d]' },
    { id: 9, sex: 'female', label: 'Embryo 9', color: 'bg-gradient-to-br from-[#d946ef] to-[#be185d]' },
    { id: 10, sex: 'male', label: 'Embryo 10', color: 'bg-gradient-to-br from-[#60a5fa] to-[#2563eb]' },
    { id: 11, sex: 'male', label: 'Embryo 11', color: 'bg-gradient-to-br from-[#60a5fa] to-[#2563eb]' },
    { id: 12, sex: 'male', label: 'Embryo 12', color: 'bg-gradient-to-br from-[#60a5fa] to-[#2563eb]' },
    { id: 13, sex: 'male', label: 'Embryo 13', color: 'bg-gradient-to-br from-[#60a5fa] to-[#2563eb]' },
    { id: 14, sex: 'female', label: 'Embryo 14', color: 'bg-gradient-to-br from-[#d946ef] to-[#be185d]' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-stone-800 overflow-y-auto no-scrollbar font-sans selection:bg-stone-200 p-6">
      
      {/* Header - pointer-events-none to prevent clicks */}
      <header className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200/60 pointer-events-none">
        <div className="flex items-center gap-2">
          {/* Logo Icon */}
          <div className="w-5 h-5 bg-black rounded-full shrink-0"></div>
          <div className="flex items-baseline gap-1">
            <span className="font-sans text-xs font-semibold tracking-wide text-stone-900">Nucleus</span>
            <span className="font-serif text-xs italic text-stone-900">Embryo</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent border border-transparent">
            <Menu className="w-4 h-4 text-stone-600" />
          </button>
          <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center text-white font-medium text-xs">
            T
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
          Lily and Brad's embryos
        </h1>
        
        {/* Button disabled */}
        <button className="self-start md:self-center flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-200 bg-white cursor-default shadow-sm pointer-events-none">
          <Plus className="w-3.5 h-3.5 text-stone-600" />
          <span className="text-xs font-medium text-stone-700">Add embryos</span>
        </button>
      </div>

      {/* Embryos Grid Section */}
      <div className="flex-1 pb-8">
        <h2 className="text-base font-bold text-stone-800 mb-4">Your embryos</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-6">
          {embryos.map((embryo) => {
            return (
              <div 
                key={embryo.id}
                className={`relative aspect-[2/1] ${embryo.color} rounded-[20px] p-3 flex flex-col items-center justify-center text-white shadow-sm opacity-90 cursor-default pointer-events-none`}
              >
                <div className="flex items-center gap-1.5 md:gap-2 w-full justify-center">
                  {/* Gender Symbol */}
                  <span className="text-lg md:text-xl font-light opacity-90 leading-none shrink-0">
                     {embryo.sex === 'female' ? '♀' : '♂'}
                  </span>
                  
                  {/* Label - Reduced text size for double digits */}
                  <span className="text-[11px] md:text-xs font-medium tracking-wide whitespace-nowrap truncate">{embryo.label}</span>
                  
                  {/* Chevron */}
                  <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-70 shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};