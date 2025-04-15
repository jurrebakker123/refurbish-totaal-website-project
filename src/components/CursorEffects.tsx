
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
      <motion.div 
        className="fixed w-3 h-3 bg-brand-lightGreen rounded-full pointer-events-none z-50"
        animate={{ 
          x: position.x - 6,
          y: position.y - 6,
          scale: cursorType === 'hover' ? 1.5 : 1,
          opacity: 0.7
        }}
        transition={{ 
          x: { duration: 0.1, ease: "linear" },
          y: { duration: 0.1, ease: "linear" },
          scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.2 }
        }}
      />
      <motion.div 
        className="fixed w-8 h-8 border-2 border-brand-darkGreen rounded-full pointer-events-none z-40"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: cursorType === 'hover' ? 1.5 : 1,
          borderColor: cursorType === 'hover' ? 'var(--brand-lightGreen)' : 'var(--brand-darkGreen)',
          opacity: 0.7
        }}
        transition={{ 
          x: { duration: 0.15, ease: "linear" },
          y: { duration: 0.15, ease: "linear" },
          scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.2 }
        }}
      />
    </>
  );
};
