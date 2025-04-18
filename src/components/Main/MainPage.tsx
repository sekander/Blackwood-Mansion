import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useScreenVisibility } from "../ScreenVisibilityContext";

// Animation for floating/flickering horror text
const floatFlicker = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 0.8;
    text-shadow: 0 0 5px #fff;
  }
  25% {
    transform: translateY(-5px);
    text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;
  }
  50% {
    transform: translateY(0px);
    opacity: 1;
    text-shadow: 0 0 5px #fff;
  }
  75% {
    transform: translateY(5px);
    text-shadow: 0 0 10px #ff0000;
  }
  100% {
    transform: translateY(0px);
    opacity: 0.8;
    text-shadow: 0 0 5px #fff;
  }
`;

// Layout
const MainPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 844px;
  background-image: url("/projects/blackwood-mansion/assets/images/background.jpg"); /* Replace with your background */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 30px;
  box-sizing: border-box;
  color: #fff;
  text-align: center;
`;

// Horror-style floating title
const FloatingTitle = styled.div`
  font-size: 42px;
  font-family: 'Times New Roman', serif;
  font-weight: 700;
  animation: ${floatFlicker} 3s infinite ease-in-out;
  margin-bottom: 20px;
  line-height: 1.2;
  color: #eee;
`;

const InfoText = styled.h3`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;
`;

const ToggleButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  background-color: #290000;
  color: white;
  border: 1px solid red;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 10px;

  &:hover {
    background-color: #400000;
  }
`;

const StartButton = styled.button`
  padding: 12px 30px;
  font-size: 16px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 30px;
  font-weight: bold;
  cursor: pointer;
  animation: ${floatFlicker} 2s infinite alternate;

  &:hover {
    background-color: #b30000;
  }
`;

const AccordionText = styled.p`
  font-size: 14px;
  margin: 10px 0 20px;
  color: #f0f0f0;
`;

export default function MainPage() {
  const { screenVisibility, handleScreen } = useScreenVisibility();
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const goToChapter1 = () => {
    handleScreen('chapter_1');
  };

  return (
    <MainPageLayout>
      <FloatingTitle>Blackwood<br />Mansion</FloatingTitle>

      {/* <InfoText>
        Current Visible Screen: <br />
        {Object.keys(screenVisibility).find(screen => screenVisibility[screen])}
      </InfoText> */}

      <ToggleButton onClick={toggleAccordion}>
        {isOpen ? 'Hide Instructions' : 'Show Instructions'}
      </ToggleButton>

      {isOpen && (
        <AccordionText>
          To play this game, listen to audio files and follow the instructions based on the sounds.
        </AccordionText>
      )}

      <StartButton onClick={goToChapter1}>START</StartButton>
    </MainPageLayout>
  );
}
