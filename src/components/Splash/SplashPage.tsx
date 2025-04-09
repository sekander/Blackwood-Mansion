import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useScreenVisibility } from '../ScreenVisibilityContext';

// Animations
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const flicker = keyframes`
  0% { opacity: 0.1; text-shadow: 0 0 5px #fff; }
  2% { opacity: 1; text-shadow: 0 0 10px #fff, 0 0 20px #ff0000; }
  8% { opacity: 0.1; text-shadow: 0 0 5px #fff; }
  9% { opacity: 1; text-shadow: 0 0 10px #fff, 0 0 20px #ff0000; }
  12% { opacity: 0.1; text-shadow: 0 0 5px #fff; }
  20% { opacity: 1; text-shadow: 0 0 10px #fff, 0 0 30px #ff0000; }
  25% { opacity: 0.3; text-shadow: 0 0 5px #fff; }
  30% { opacity: 1; text-shadow: 0 0 10px #fff, 0 0 20px #ff0000; }
  70% { opacity: 0.7; text-shadow: 0 0 5px #fff; }
  72% { opacity: 0.2; text-shadow: 0 0 5px #fff; }
  77% { opacity: 0.9; text-shadow: 0 0 10px #fff, 0 0 30px #ff0000; }
  100% { opacity: 0.9; text-shadow: 0 0 5px #fff, 0 0 20px #ff0000; }
`;

const letterAppear = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Styled components
const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 800px;
  background-image: url('/images/splash-screen.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const AnimatedTitle = styled.div`
  font-size: 48px;
  font-family: 'Times New Roman', serif;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  margin-bottom: 20px;
  color: #e6e6e6;
  animation: ${flicker} 4s infinite alternate;
  
  @media (max-width: 480px) {
    font-size: 36px;
    margin-bottom: 15px;
  }
`;

interface LetterSpanProps {
  delay: number;
}

const LetterSpan = styled.span<LetterSpanProps>`
  display: inline-block;
  opacity: 0;
  animation: ${letterAppear} 0.5s forwards;
  animation-delay: ${props => props.delay}s;
  text-shadow: 0 0 5px #fff, 0 0 10px #ff0000;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 0, 0, 0.3);
  border-radius: 50%;
  border-top: 4px solid #ff0000;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin-top: 20px;
  
  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

interface HorrorTitleProps {
  text: string;
  startDelay?: number;
}

const HorrorTitle: React.FC<HorrorTitleProps> = ({ text, startDelay = 0 }) => {
  const letters = text.split('');
  
  return (
    <AnimatedTitle>
      {letters.map((letter: string, index: number) => (
        <LetterSpan 
          key={index} 
          delay={startDelay + (index * 0.1)}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </LetterSpan>
      ))}
    </AnimatedTitle>
  );
};

export default function SplashPage() {
  const { handleScreen } = useScreenVisibility();
  const [showSecondLine, setShowSecondLine] = useState(false);

  useEffect(() => {
    const secondLineTimer = setTimeout(() => {
      setShowSecondLine(true);
    }, 1500);

    const redirectTimer = setTimeout(() => {
      handleScreen('main');
    }, 5000);

    return () => {
      clearTimeout(secondLineTimer);
      clearTimeout(redirectTimer);
    };
  }, [handleScreen]);

  return (
    <SplashContainer>
      <HorrorTitle text="Blackwood" />
      {showSecondLine && <HorrorTitle text="Mansion" startDelay={0.5} />}
      <LoadingSpinner />
    </SplashContainer>
  );
}