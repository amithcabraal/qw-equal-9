import React from 'react';

interface TourHighlightProps {
  targetElement: Element | null;
}

export const TourHighlight: React.FC<TourHighlightProps> = ({ targetElement }) => {
  if (!targetElement) return null;

  const rect = targetElement.getBoundingClientRect();
  
  return (
    <div
      className="fixed pointer-events-none z-40 border-3 border-red-500 rounded-lg transition-all duration-300"
      style={{
        top: rect.top - 4 + window.scrollY,
        left: rect.left - 4,
        width: rect.width + 8,
        height: rect.height + 8,
      }}
    />
  );
};