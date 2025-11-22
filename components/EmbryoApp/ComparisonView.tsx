import React from 'react';
import { HeartPulse, Target, Brain, Waves, Eye, SlidersHorizontal, Menu, ChevronRight } from 'lucide-react';

interface ComparisonViewProps {
  onBack: () => void;
}

// Icon Components
const HeightIcon = ({ className, strokeWidth = 2 }: { className?: string, strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
    <path d="M12 4V20M8 4H16M8 20H16" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Cell Components
const RingScoreCell = ({ value, unit }: { value: string | number; unit: string }) => {
  if (value === 'N/A') {
    return <span className="text-[10px] text-stone-400 font-medium w-full text-center block">N/A</span>;
  }

  const valStr = String(value);
  const isPositive = valStr.startsWith('+');
  
  // Colors
  const textColor = isPositive ? 'text-blue-600' : 'text-stone-400';

  return (
    <div className="flex items-center justify-center gap-1 w-full">
      <span className={`text-sm font-bold ${textColor}`}>
        {value}
      </span>
      <span className="text-[10px] font-medium text-stone-500 whitespace-nowrap hidden md:inline">{unit}</span>
    </div>
  );
};

const DotScoreCell = ({ value, unit }: { value: string; unit: string }) => {
  const isPositive = value.startsWith('+');
  const textColor = isPositive ? 'text-blue-600' : 'text-stone-500';

  return (
    <div className="flex items-center justify-center gap-1 w-full">
      <span className={`text-sm font-bold ${textColor} leading-none`}>{value}</span>
      <span className="text-[10px] font-medium text-stone-500 whitespace-nowrap hidden md:inline">{unit}</span>
    </div>
  );
};

const AttributeCell = ({ type, value, label }: { type: 'hair' | 'eye'; value: string; label: React.ReactNode }) => {
  // Color mapping based on reference image
  let bg = 'bg-stone-800';
  let iconColor = 'text-white/90';
  
  if (type === 'hair') {
      if (value === 'brown') bg = 'bg-[#5D4037]'; // Brown
      if (value === 'dark_brown') bg = 'bg-[#3E2723]'; // Dark Brown
  } else if (type === 'eye') {
      if (value === 'blue') bg = 'bg-[#448AFF]'; // Blue
      if (value === 'green') bg = 'bg-[#558B2F]'; // Green/Hazel
  }

  return (
    // Use justify-start and pl-4 to ensure circles align vertically in a straight line, regardless of label length
    <div className="flex items-center justify-start gap-2 w-full h-full pl-4">
      <div className={`w-7 h-7 rounded-full ${bg} flex items-center justify-center shrink-0 ring-1 ring-black/5 shadow-sm`}>
         {type === 'hair' ? (
             <Waves className={`w-3 h-3 ${iconColor}`} strokeWidth={2} />
         ) : (
             <Eye className={`w-3 h-3 ${iconColor}`} strokeWidth={2} />
         )}
      </div>
      <span className="text-[10px] font-medium text-stone-600 leading-tight hidden md:block text-left">{label}</span>
    </div>
  );
};

export const ComparisonView: React.FC<ComparisonViewProps> = ({ onBack }) => {
  const embryos = [
    { id: 1, name: 'Embryo 1', sex: 'female' },
    { id: 2, name: 'Embryo 2', sex: 'male' },
    { id: 3, name: 'Embryo 3', sex: 'male' },
    { id: 4, name: 'Embryo 4', sex: 'male' },
    { id: 5, name: 'Embryo 5', sex: 'male' },
  ];

  // Updated widths to fit screen and ensure single line text
  const colHeaderWidth = "w-[200px]"; 
  const colDataWidth = "w-[95px]";

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] animate-in fade-in duration-500 p-5">
      
      {/* Top Bar (Logo) */}
      <header className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200/60 shrink-0">
        <div className="flex items-center gap-2">
          {/* Logo Icon */}
          <div className="w-4 h-4 bg-black rounded-full shrink-0"></div>
          <div className="flex items-baseline gap-1">
            <span className="font-sans text-[11px] font-semibold tracking-wide text-stone-900">Nucleus</span>
            <span className="font-serif text-[11px] italic text-stone-900">Embryo</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-transparent border border-transparent">
            <Menu className="w-3.5 h-3.5 text-stone-600" />
          </button>
          <div className="w-7 h-7 bg-stone-900 rounded-full flex items-center justify-center text-white font-medium text-[10px]">
            T
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h1 className="text-2xl font-serif text-stone-900 tracking-tight">Compare your embryos</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white pl-3 pr-4 py-1.5 rounded-full flex items-center gap-2 shadow-md transition-colors relative group active:scale-95 duration-200">
          <SlidersHorizontal className="w-3 h-3" />
          <span className="text-[10px] font-medium">Filters</span>
          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-[8px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#FDFBF7] group-hover:scale-110 transition-transform">21</div>
        </button>
      </div>

      {/* Table Wrapper - Flex 1 to take remaining height */}
      <div className="flex-1 relative min-h-0">
        {/* Scrollable Container with padding bottom to match sides */}
        <div className="w-full h-full overflow-auto no-scrollbar pb-5">
            <div className="min-w-max h-full flex flex-col mx-auto w-fit">
                
                {/* Sticky Header Row */}
                <div className="flex sticky top-0 z-20 bg-[#FDFBF7]">
                    {/* Empty top-left corner - border-r-2 for alignment */}
                    <div className={`${colHeaderWidth} shrink-0 bg-[#F9F7F2] rounded-tl-[16px] border-b border-r-2 border-stone-200 sticky left-0 z-30`}></div>
                    
                    {/* Embryo Columns */}
                    {embryos.map((embryo, i) => (
                        <div 
                            key={embryo.id} 
                            className={`${colDataWidth} shrink-0 flex items-center justify-center gap-1.5 py-2 bg-[#F9F7F2] border-b border-stone-200/60 ${i !== 0 ? 'border-l border-stone-200/60' : ''}
                                ${i === embryos.length - 1 ? 'rounded-tr-[16px]' : ''}
                            `}
                        >
                            <span className={`text-sm leading-none ${embryo.sex === 'female' ? 'text-pink-500' : 'text-blue-500'}`}>
                                {embryo.sex === 'female' ? '♀' : '♂'}
                            </span>
                            <span className="text-[10px] font-medium text-stone-600">{embryo.name}</span>
                        </div>
                    ))}
                </div>

                {/* Rows Container - flex-1 to expand rows */}
                <div className="flex flex-col flex-1">
                    
                    {/* Row 1: Coronary artery disease */}
                    <div className="flex flex-1 group hover:bg-stone-50 transition-colors cursor-default">
                        <div className={`${colHeaderWidth} shrink-0 sticky left-0 z-10 bg-[#F9F7F2] border-b border-r-2 border-stone-200 flex items-center px-3 py-2 gap-2`}>
                             <div className="w-3.5 h-3.5 flex items-center justify-center text-stone-500">
                                <HeartPulse className="w-3.5 h-3.5" strokeWidth={2} />
                             </div>
                             <span className="text-[11px] font-semibold text-stone-800 leading-tight">Coronary artery disease</span>
                        </div>
                        {/* Cells */}
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><RingScoreCell value="+1" unit="%" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><RingScoreCell value="-17" unit="%" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><RingScoreCell value="-5" unit="%" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><RingScoreCell value="-5" unit="%" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-stone-100 flex items-center justify-center px-1 py-2`}><RingScoreCell value="-5" unit="%" /></div>
                    </div>

                    {/* Row 2: Breast Cancer */}
                    <div className="flex flex-1 group hover:bg-stone-50 transition-colors cursor-default">
                        <div className={`${colHeaderWidth} shrink-0 sticky left-0 z-10 bg-[#F9F7F2] border-b border-r-2 border-stone-200 flex items-center px-3 py-2 gap-2`}>
                             <div className="w-3.5 h-3.5 flex items-center justify-center text-stone-500">
                                <Target className="w-3.5 h-3.5" strokeWidth={2} />
                             </div>
                             <span className="text-[11px] font-semibold text-stone-800 leading-tight">Breast cancer</span>
                        </div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><RingScoreCell value="+3" unit="%" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><RingScoreCell value="N/A" unit="" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><RingScoreCell value="N/A" unit="" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><RingScoreCell value="N/A" unit="" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-stone-100 flex items-center justify-center px-1 py-2`}><RingScoreCell value="N/A" unit="" /></div>
                    </div>

                     {/* Row 3: Alzheimer's */}
                     <div className="flex flex-1 group hover:bg-stone-50 transition-colors cursor-default">
                        <div className={`${colHeaderWidth} shrink-0 sticky left-0 z-10 bg-[#F9F7F2] border-b border-r-2 border-stone-200 flex items-center px-3 py-2 gap-2`}>
                             <div className="w-3.5 h-3.5 flex items-center justify-center text-stone-500">
                                <Brain className="w-3.5 h-3.5" strokeWidth={2} />
                             </div>
                             <span className="text-[11px] font-semibold text-stone-800 leading-tight">Alzheimer's disease</span>
                        </div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><RingScoreCell value="-2" unit="%" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><RingScoreCell value="+2" unit="%" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><RingScoreCell value="+6" unit="%" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><RingScoreCell value="+2" unit="%" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-stone-100 flex items-center justify-center px-1 py-2`}><RingScoreCell value="+4" unit="%" /></div>
                    </div>

                    {/* Row 4: Hair Color */}
                    <div className="flex flex-1 group hover:bg-stone-50 transition-colors cursor-default">
                        <div className={`${colHeaderWidth} shrink-0 sticky left-0 z-10 bg-[#F9F7F2] border-b border-r-2 border-stone-200 flex items-center px-3 py-2 gap-2`}>
                             <div className="w-3.5 h-3.5 flex items-center justify-center text-stone-500">
                                <Waves className="w-3.5 h-3.5" strokeWidth={2} />
                             </div>
                             <span className="text-[11px] font-semibold text-stone-800 leading-tight">Hair color</span>
                        </div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}>
                            <AttributeCell type="hair" value="brown" label="Brown" />
                        </div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}>
                            <AttributeCell type="hair" value="brown" label="Brown" />
                        </div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}>
                             <AttributeCell type="hair" value="dark_brown" label={<>Dark<br/>brown</>} />
                        </div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}>
                             <AttributeCell type="hair" value="brown" label="Brown" />
                        </div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-stone-100 flex items-center justify-center px-1 py-2`}>
                             <AttributeCell type="hair" value="dark_brown" label={<>Dark<br/>brown</>} />
                        </div>
                    </div>

                    {/* Row 5: Eye Color */}
                    <div className="flex flex-1 group hover:bg-stone-50 transition-colors cursor-default">
                        <div className={`${colHeaderWidth} shrink-0 sticky left-0 z-10 bg-[#F9F7F2] border-b border-r-2 border-stone-200 flex items-center px-3 py-2 gap-2`}>
                             <div className="w-3.5 h-3.5 flex items-center justify-center text-stone-500">
                                <Eye className="w-3.5 h-3.5" strokeWidth={2} />
                             </div>
                             <span className="text-[11px] font-semibold text-stone-800 leading-tight">Eye color</span>
                        </div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}>
                            <AttributeCell type="eye" value="blue" label="Blue" />
                        </div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}>
                             <AttributeCell type="eye" value="green" label="Green" />
                        </div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}>
                             <AttributeCell type="eye" value="blue" label="Blue" />
                        </div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}>
                             <AttributeCell type="eye" value="green" label="Green" />
                        </div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-stone-100 flex items-center justify-center px-1 py-2`}>
                             <AttributeCell type="eye" value="blue" label="Blue" />
                        </div>
                    </div>

                    {/* Row 6: Height */}
                    <div className="flex flex-1 group hover:bg-stone-50 transition-colors cursor-default">
                        <div className={`${colHeaderWidth} shrink-0 sticky left-0 z-10 bg-[#F9F7F2] border-b border-r-2 border-stone-200 flex items-center px-3 py-2 gap-2`}>
                             <div className="w-3.5 h-3.5 flex items-center justify-center text-stone-500">
                                <HeightIcon className="w-3.5 h-3.5" strokeWidth={2} />
                             </div>
                             <span className="text-[11px] font-semibold text-stone-800 leading-tight">Height</span>
                        </div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><DotScoreCell value="+2" unit="in" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><DotScoreCell value="+0" unit="in" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><DotScoreCell value="+1" unit="in" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><DotScoreCell value="+1" unit="in" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-stone-100 flex items-center justify-center px-1 py-2`}><DotScoreCell value="+1" unit="in" /></div>
                    </div>

                    {/* Row 7: IQ */}
                    <div className="flex flex-1 group hover:bg-stone-50 transition-colors cursor-default">
                        <div className={`${colHeaderWidth} shrink-0 sticky left-0 z-10 bg-[#F9F7F2] border-b border-r-2 border-stone-200 rounded-bl-[16px] flex items-center px-3 py-2 gap-2`}>
                             <div className="w-3.5 h-3.5 flex items-center justify-center text-stone-500">
                                <Brain className="w-3.5 h-3.5" strokeWidth={2} />
                             </div>
                             <span className="text-[11px] font-semibold text-stone-800 leading-tight">IQ</span>
                        </div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><DotScoreCell value="+2" unit="pts" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><DotScoreCell value="+3" unit="pts" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><DotScoreCell value="+3" unit="pts" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-r border-stone-100 flex items-center justify-center px-1 py-2`}><DotScoreCell value="+3" unit="pts" /></div>
                        <div className={`${colDataWidth} shrink-0 bg-white border-b border-stone-100 rounded-br-[16px] flex items-center justify-center px-1 py-2`}><DotScoreCell value="+3" unit="pts" /></div>
                    </div>

                </div>
            </div>
        </div>

        {/* Decorative Arrow - Centered relative to the Table Area Wrapper */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-10 pr-1">
           <ChevronRight className="w-6 h-6 text-stone-300/50" />
        </div>
      </div>

    </div>
  );
};