// import React from "react";
import styled from "styled-components";
import React, { useState } from 'react';
import Chapter1 from "../Chapters/Chapter1";
    
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
    const [inputValue, setInputValue] = useState('');
    const [currentScreen, setCurrentScreen] = useState<'main' | 'chapter_1'>('main');


  // Handler to switch to Chapter 1
  const goToChapter1 = () => {
    setCurrentScreen('chapter_1');
  };


  return (
    <MainPageLayout>

{currentScreen === 'main' ? (
        <div>
          <StyledStudyBuddy>Main <br />Page</StyledStudyBuddy>
          <button onClick={goToChapter1}>Go to Chapter 1</button>
        </div>
      ) : (
        <Chapter1 /> // Render Chapter 1 page
      )}
    </MainPageLayout>
  );
};