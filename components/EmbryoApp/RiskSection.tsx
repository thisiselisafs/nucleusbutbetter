import React from 'react';
import { ChevronRight } from 'lucide-react';

interface RiskItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  progress?: number; // Kept for interface compatibility but unused visually
}

const RiskItem: React.FC<RiskItemProps> = ({ icon, label, value, unit }) => {
  // Determine color based on sign
  const isPositive = value.startsWith('+');
  const colorClass = isPositive ? 'text-blue-600' : 'text-stone-400';

  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100 last:border-none">
      <div className="flex items-center gap-3">
        {/* Icon Container */}
        <div className="w-4 h-4 text-stone-500 flex items-center justify-center">
            {icon}
        </div>
        <span className="text-[11px] font-semibold text-stone-800">{label}</span>
      </div>
      
      <div className="flex items-center gap-2.5">
        <div className="w-10 flex justify-center">
            <span className={`text-sm font-bold ${colorClass}`}>{value}</span>
        </div>
        <span className="text-[10px] font-medium text-stone-500 text-center min-w-[4.5rem]">{unit}</span>
        <ChevronRight className="w-4 h-4 text-stone-300 ml-1" />
      </div>
    </div>
  );
};

interface RiskSectionProps {
  title: string;
  items: RiskItemProps[];
}

export const RiskSection: React.FC<RiskSectionProps> = ({ title, items }) => {
  return (
    <section className="mt-6">
      <h2 className="text-base font-bold text-stone-800 mb-3 ml-1">{title}</h2>
      <div className="bg-white rounded-[20px] shadow-sm border border-stone-100 overflow-hidden">
        {items.map((item, index) => (
          <RiskItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
};