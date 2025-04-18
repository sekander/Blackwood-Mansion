import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useScreenVisibility } from '../ScreenVisibilityContext';

// === Animations ===
const flicker = keyframes`
  0%, 100% { opacity: 0.1; text-shadow: 0 0 5px #fff; }
  2%, 9%, 30%, 77% {
    opacity: 1;
    text-shadow: 0 0 10px #fff, 0 0 20px #ff0000;
  }
  20% { text-shadow: 0 0 30px #ff0000; }
  25%, 70% { opacity: 0.3; }
  72% { opacity: 0.2; }
`;

const letterAppear = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// === Styled Components ===
const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 800px;
  background-image: url("/projects/blackwood-mansion/assets/images/splash02.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

const AnimatedTitle = styled.div`
  font-size: 48px;
  font-family: 'Times New Roman', serif;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  color: #e6e6e6;
  animation: ${flicker} 4s infinite alternate;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 36px;
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

const BottomLoaderContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DangerIcon = styled.img`
  width: 80px;
  height: 80px;
  animation: ${flicker} 2s infinite alternate;
  margin-bottom: 5px;
`;

const LoadingBarContainer = styled.div`
  width: 80%;
  height: 16px;
  border: 2px solid #ff0000;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
`;

const LoadingBarFill = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  height: 100%;
  background: linear-gradient(to right, #ff0000, #880000);
  transition: width 0.2s ease-in-out;
`;

const LoadingText = styled.div`
  margin-top: 8px;
  font-size: 16px;
  color: #ff4d4d;
  font-weight: bold;
  text-shadow: 0 0 5px #000;
`;

// === Horror Title Component ===
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
          delay={startDelay + index * 0.1}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </LetterSpan>
      ))}
    </AnimatedTitle>
  );
};

// === Splash Page ===
export default function SplashPage() {
  const { handleScreen } = useScreenVisibility();
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0);

  useEffect(() => {
    // Slow down loading bar: 100 steps x 80ms = 8s
    const loadingInterval = setInterval(() => {
      setLoadingPercent(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 80);

    const secondLineTimer = setTimeout(() => {
      setShowSecondLine(true);
    }, 1000); // Blackwood first, Mansion after 1s

    const redirectTimer = setTimeout(() => {
      handleScreen('main');
    }, 9000); // Total 9 seconds splash screen

    return () => {
      clearInterval(loadingInterval);
      clearTimeout(secondLineTimer);
      clearTimeout(redirectTimer);
    };
  }, [handleScreen]);

  return (
    <SplashContainer>
      <HorrorTitle text="Blackwood" />
      {showSecondLine && <HorrorTitle text="Mansion" startDelay={0.5} />}

      <BottomLoaderContainer>
        <DangerIcon src="/projects/blackwood-mansion/assets/images/danger01.png" alt="Danger" />
        <LoadingBarContainer>
          <LoadingBarFill width={loadingPercent} />
        </LoadingBarContainer>
        <LoadingText>{loadingPercent}% Loading</LoadingText>
      </BottomLoaderContainer>
    </SplashContainer>
  );
}
