import { useState, useEffect } from 'react';

const SUFFIXES = ['ый', 'ое'];
const CYRILLIC_CHARS = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';

export const MatrixSuffix = () => {
  const [currentSuffixIndex, setCurrentSuffixIndex] = useState(0);
  const [displayText, setDisplayText] = useState(SUFFIXES[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      const nextIndex = (currentSuffixIndex + 1) % SUFFIXES.length;
      const nextSuffix = SUFFIXES[nextIndex];
      const currentSuffix = SUFFIXES[currentSuffixIndex];
      const maxLength = Math.max(currentSuffix.length, nextSuffix.length);
      
      let frame = 0;
      const transitionFrames = 40;
      
      const animate = setInterval(() => {
        frame++;
        
        if (frame <= transitionFrames) {
          let newText = '';
          for (let i = 0; i < maxLength; i++) {
            const progress = frame / transitionFrames;
            const charProgress = Math.min(1, Math.max(0, progress * maxLength - i));
            
            if (charProgress < 0.5) {
              newText += currentSuffix[i] || '';
            } else if (charProgress < 0.85) {
              newText += CYRILLIC_CHARS[Math.floor(Math.random() * CYRILLIC_CHARS.length)];
            } else {
              newText += nextSuffix[i] || '';
            }
          }
          setDisplayText(newText);
        } else {
          setDisplayText(nextSuffix);
          setIsTransitioning(false);
          setCurrentSuffixIndex(nextIndex);
          clearInterval(animate);
        }
      }, 35);
      
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSuffixIndex]);

  return (
    <span className={`text-foreground ${isTransitioning ? 'matrix-glitch' : ''}`}>
      {displayText}
    </span>
  );
};