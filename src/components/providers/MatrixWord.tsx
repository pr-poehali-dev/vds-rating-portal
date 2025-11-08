import { useState, useEffect } from 'react';

const WORDS = ['хостинг', 'облако'];
const CYRILLIC_CHARS = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';

export const MatrixWord = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState(WORDS[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      const nextIndex = (currentWordIndex + 1) % WORDS.length;
      const nextWord = WORDS[nextIndex];
      const currentWord = WORDS[currentWordIndex];
      const maxLength = Math.max(currentWord.length, nextWord.length);
      
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
              newText += currentWord[i] || '';
            } else if (charProgress < 0.85) {
              newText += CYRILLIC_CHARS[Math.floor(Math.random() * CYRILLIC_CHARS.length)];
            } else {
              newText += nextWord[i] || '';
            }
          }
          setDisplayText(newText);
        } else {
          setDisplayText(nextWord);
          setIsTransitioning(false);
          setCurrentWordIndex(nextIndex);
          clearInterval(animate);
        }
      }, 35);
      
    }, 4000);

    return () => clearInterval(interval);
  }, [currentWordIndex]);

  return (
    <span className="relative inline-block">
      <span className={`text-foreground ${isTransitioning ? 'matrix-glitch' : ''}`}>
        {displayText}
      </span>
    </span>
  );
};