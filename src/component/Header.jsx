import { useState, useEffect } from 'react';

const Header = () => {
  const sentences = [
    "Portfolio",
    "Website",
    "Page",
    "Great!"
  ];
  const staticPrefix = "Eyob Wende's ";
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentSentence = sentences[index];
      if (isDeleting) {
        if (charIndex > 0) {
          setDisplayText(staticPrefix + currentSentence.substring(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % sentences.length);
        }
      } else {
        if (charIndex < currentSentence.length) {
          setDisplayText(staticPrefix + currentSentence.substring(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
        }
      }
    };

    const typingSpeed = isDeleting ? 50 : 150;
    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, index, sentences]);

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 fixed top-0 left-0 w-full z-10 mt-10 h-35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold mt-8 whitespace-nowrap overflow-hidden h-9 flex items-center justify-center">
          {displayText}
        </h1>
        <p className="mt-1 text-lg">Welcome to my digital space</p>
      </div>
    </header>
  );
};

export default Header;