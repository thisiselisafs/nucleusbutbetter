import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';

interface GuiderWindowProps {
  onNext: () => void;
  onBack: () => void;
  currentStep?: number;
}

export const GuiderWindow: React.FC<GuiderWindowProps> = ({ onNext, onBack, currentStep = 0 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // Track if user has started interacting to remove enter animations
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      // Calculate delta
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      
      let newX = initialPos.current.x + dx;
      let newY = initialPos.current.y + dy;

      // Apply boundary constraints (rejected by edges)
      if (windowRef.current) {
        const el = windowRef.current;
        const rect = el.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        const margin = 20; // Boundary margin

        // Calculate limits for 'newX' (which is offset from center)
        // CenterX of screen = window.innerWidth / 2
        // Element CenterX = CenterX + newX
        // Left Edge = (CenterX + newX) - w/2
        // Right Edge = (CenterX + newX) + w/2
        
        const centerX = window.innerWidth / 2;
        
        // Right boundary
        // (centerX + newX) + w/2 <= window.innerWidth - margin
        const maxX = (window.innerWidth - margin - w/2) - centerX;
        
        // Left boundary
        // (centerX + newX) - w/2 >= margin
        const minX = (margin + w/2) - centerX;
        
        newX = Math.max(minX, Math.min(maxX, newX));

        // Calculate limits for 'newY' (offset from bottom-8 position)
        // Base position (y=0) is bottom: 2rem (32px)
        // Bottom edge Y = window.innerHeight - 32 + newY
        // Top edge Y = (window.innerHeight - 32 + newY) - h
        
        // Bottom boundary (screen bottom)
        // Bottom Edge Y <= window.innerHeight - margin
        // (window.innerHeight - 32 + newY) <= window.innerHeight - margin
        // -32 + newY <= -margin => newY <= 32 - margin
        const maxY = 32 - margin;

        // Top boundary (screen top)
        // Top Edge Y >= margin
        // (window.innerHeight - 32 + newY) - h >= margin
        // newY >= margin - window.innerHeight + 32 + h
        const minY = margin - window.innerHeight + 32 + h;
        
        newY = Math.max(minY, Math.min(maxY, newY));
      }

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setHasInteracted(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    initialPos.current = { ...position };
  };

  const steps = [
    {
      title: "Welcome to IVF+",
      text: "By doing IVF with Nucleus, you can get far more insight into the future health and well-being of your baby."
    },
    {
      title: "Optimize for health and beyond",
      text: "Nucleus provides over 2,000 genetic analyses spanning hereditary diseases, cancers, chronic conditions, appearance, cognitive ability, mental health, and more."
    },
    {
      title: "In-depth reporting",
      text: "Each analysis includes a detailed report, which shows your embryo’s result and the science behind it."
    },
    {
      title: "Choose thoughtfully",
      text: "Sort, compare, and choose your embryos based on what matters most to you."
    }
  ];

  // Fallback to last step if currentStep exceeds array bounds
  const content = steps[Math.min(currentStep, steps.length - 1)];
  const isLastStep = currentStep >= steps.length - 1;

  return (
    <div 
      ref={windowRef}
      onMouseDown={onMouseDown}
      style={{ 
        transform: `translate(calc(-50% + ${position.x}px), ${position.y}px)`,
        // Ensure hardware acceleration and disable transitions during drag for speed
        willChange: 'transform',
        transition: isDragging ? 'none' : undefined
      }}
      className={`
        absolute bottom-8 left-1/2 z-50 w-[85%] max-w-[340px] 
        bg-[#2f484f] text-white rounded-[20px] p-6 font-sans
        shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] 
        border border-white/10 cursor-grab active:cursor-grabbing select-none
        ${!hasInteracted ? 'animate-in slide-in-from-bottom-10 fade-in duration-700' : ''}
      `}
    >
      <h3 className="text-lg font-medium mb-2 text-white">{content.title}</h3>
      <p className="text-slate-200 text-sm leading-relaxed mb-6 font-light">
        {content.text}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            {currentStep > 0 && (
                <button 
                    onClick={(e) => { e.stopPropagation(); onBack(); }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="text-white/60 hover:text-white transition-colors -ml-1 cursor-pointer"
                    aria-label="Previous step"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
            )}
            <div className="flex gap-2">
            {steps.map((_, i) => (
                <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    i === currentStep ? 'bg-white' : 'bg-white/30'
                }`}
                />
            ))}
            </div>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          onMouseDown={(e) => e.stopPropagation()}
          className="bg-white text-[#2f484f] px-5 py-1.5 rounded-full font-semibold text-xs hover:bg-stone-100 transition-colors cursor-pointer"
        >
          {isLastStep ? "Get started" : "Next"}
        </button>
      </div>
    </div>
  );
};