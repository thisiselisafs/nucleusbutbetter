import React from 'react';
import { Eye, Waves, ChevronRight, User } from 'lucide-react';

// Simple Height Icon Component
const HeightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 4V20M8 4H16M8 20H16" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const AppearanceList: React.FC = () => {
  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-stone-100 overflow-hidden font-sans">
      
      {/* Item 1: Sex */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 flex items-center justify-center text-stone-500">
            <User className="w-4 h-4" strokeWidth={2} />
          </div>
          <span className="text-[11px] font-semibold text-stone-800">Sex</span>
        </div>
        <div className="flex items-center gap-2.5">
            {/* Fixed width container for icon alignment */}
            <div className="w-10 flex justify-center">
                <div className="w-8 h-8 rounded-full bg-[#F3E8FF] flex items-center justify-center shadow-sm ring-1 ring-black/5">
                   <span className="text-purple-600 text-base leading-none mb-0.5 font-medium">♀</span>
                </div>
            </div>
            <span className="text-[10px] font-medium text-stone-500 min-w-[4.5rem] text-center">Female</span>
            <ChevronRight className="w-4 h-4 text-stone-300 ml-1" />
        </div>
      </div>

      {/* Item 2: Eye Color */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 flex items-center justify-center text-stone-500">
             <Eye className="w-4 h-4" strokeWidth={2} />
          </div>
          <span className="text-[11px] font-semibold text-stone-800">Eye color</span>
        </div>
        <div className="flex items-center gap-2.5">
            <div className="w-10 flex justify-center">
                <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center shadow-sm relative ring-1 ring-black/5">
                    <Eye className="w-3.5 h-3.5 text-white/90" strokeWidth={2} />
                </div>
            </div>
            <span className="text-[10px] font-medium text-stone-500 min-w-[4.5rem] text-center">Blue</span>
            <ChevronRight className="w-4 h-4 text-stone-300 ml-1" />
        </div>
      </div>

      {/* Item 3: Hair Color */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 flex items-center justify-center text-stone-500">
            <Waves className="w-4 h-4" strokeWidth={2} />
          </div>
          <span className="text-[11px] font-semibold text-stone-800">Hair color</span>
        </div>
        <div className="flex items-center gap-2.5">
            <div className="w-10 flex justify-center">
                <div className="w-8 h-8 rounded-full bg-[#4A3B32] flex items-center justify-center shadow-sm ring-1 ring-black/5">
                   <Waves className="text-white/90 w-3.5 h-3.5" strokeWidth={2} />
                </div>
            </div>
            <span className="text-[10px] font-medium text-stone-500 min-w-[4.5rem] text-center">Brown</span>
            <ChevronRight className="w-4 h-4 text-stone-300 ml-1" />
        </div>
      </div>

      {/* Item 4: Height */}
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-3">
           <div className="w-4 h-4 flex items-center justify-center text-stone-500">
            <HeightIcon className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-semibold text-stone-800">Height</span>
        </div>
        <div className="flex items-center gap-2.5">
            <div className="w-10 flex justify-center">
                <span className="text-sm font-bold text-blue-600">+2</span>
            </div>
            <span className="text-[10px] font-medium text-stone-500 text-center min-w-[4.5rem]">inches</span>
            <ChevronRight className="w-4 h-4 text-stone-300 ml-1" />
        </div>
      </div>

    </div>
  );
};