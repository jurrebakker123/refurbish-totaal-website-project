
import { useEffect, useState } from 'react';

export const CursorEffects = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'hover'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Cursor volgt de muis
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Controleer of we over een klikbaar element zweven
      const target = e.target as HTMLElement;
      const isHoverable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        target.className.includes('hover-') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setCursorType(isHoverable ? 'hover' : 'default');
    };
    
    // Detecteer wanneer de muis het venster verlaat
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    // Alleen toevoegen op apparaten die een muis gebruiken
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
      window.addEventListener('mousemove', updateCursorPosition);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
      setIsVisible(true);
    }
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Alleen renderen op niet-touch apparaten en alleen als de muis in het venster is
  if (!isVisible) return null;

  return (
    <>
      <div 
        className="cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 0.7 : 0
        }}
      />
      <div 
        className="cursor-outline"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorType === 'hover' ? 1.5 : 1})`,
          borderColor: cursorType === 'hover' ? 'var(--brand-lightGreen)' : 'var(--brand-darkGreen)',
          opacity: isVisible ? 0.7 : 0
        }}
      />
    </>
  );
};
