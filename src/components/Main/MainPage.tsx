// import React from "react";
import styled from "styled-components";
import { useScreenVisibility } from "../ScreenVisibilityContext";
import { useState } from "react";
    
const MainPageLayout = styled.div`
    display: flex;
    flex-direction: column;
  width: 390px;
  height: 844px;
`;

const StyledStudyBuddy = styled.span`
  color: black;
  font-size: 48px;
  font-family: Arial, sans-serif;
  font-weight: 700;
  line-height: 47.29px;
  word-wrap: break-word;
`;

// export const LoginPage = () => {
export default function MainPage() {
// State to hold the input value
    const { screenVisibility, handleScreen } = useScreenVisibility();  // Get visibility state and handler from context
      // State to control if content is visible or not
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the visibility
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };


  // Handler to switch to Chapter 1
  const goToChapter1 = () => {
    // setCurrentScreen('chapter_1');
    handleScreen('chapter_1');
  };



  return (
    <MainPageLayout>
        <div>
          <StyledStudyBuddy>Blackwood <br />Mansion</StyledStudyBuddy>
          <h2>Current Visible Screen: {Object.keys(screenVisibility).find(screen => screenVisibility[screen])}</h2>
        </div>
        <button onClick={toggleAccordion}>
          {isOpen ? 'Show Less' : 'Show More'}
        </button>
        {isOpen && (
          <p>
            To play this game, listen to audio files and follow the instructions based on the sounds.
          </p>
        )}

          <button onClick={goToChapter1}>START</button>

    </MainPageLayout>
  );
};