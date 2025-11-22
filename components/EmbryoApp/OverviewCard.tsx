import React from 'react';

interface OverviewCardProps {
  label: string;
  value: string;
  subIcon?: string;
  isFirst?: boolean;
  valueClass?: string;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({ label, value, subIcon, isFirst, valueClass }) => {
  return (
    <div className={`flex-1 p-6 md:p-8 flex flex-col gap-2 ${isFirst ? 'rounded-t-[28px] md:rounded-l-[28px] md:rounded-tr-none' : 'rounded-b-[28px] md:rounded-r-[28px] md:rounded-bl-none'}`}>
      <span className="text-stone-500 text-sm font-medium tracking-wide">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className={`text-3xl text-stone-800 ${valueClass ? valueClass : 'font-semibold text-stone-400'}`}>
          {/* If specific styling needed for the value text */}
          {valueClass ? value : <span className="text-stone-400 font-semibold">{value}</span>}
        </span>
        {subIcon && <span className="text-stone-400 text-2xl font-light">{subIcon}</span>}
      </div>
    </div>
  );
};