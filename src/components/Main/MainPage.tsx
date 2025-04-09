// import React from "react";
import styled from "styled-components";
import { useScreenVisibility } from "../ScreenVisibilityContext";
    
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



const StyledRectangle3 = styled.div`
  width: 574px;
  height: 100px;
  background: #D9D9D9;
`;

const StyledRectangle1 = styled.div`
  width: 388px;
  height: 372px;
  background: #701919;
  border-radius: 112px;
`;



// export const LoginPage = () => {
export default function MainPage() {
// State to hold the input value
    const { screenVisibility, handleScreen } = useScreenVisibility();  // Get visibility state and handler from context


  // Handler to switch to Chapter 1
  const goToChapter1 = () => {
    // setCurrentScreen('chapter_1');
    handleScreen('chapter_1');
  };


  return (
    <MainPageLayout>
        
        <StyledRectangle1>

          <StyledStudyBuddy>Main <br />Page</StyledStudyBuddy>
          <h2>Current Visible Screen: {Object.keys(screenVisibility).find(screen => screenVisibility[screen])}</h2>
          <button onClick={goToChapter1}>Go to Chapter 1</button>
        
        <StyledRectangle1 />
        </StyledRectangle1>



{/* {currentScreen === 'main' ? (
        <div>
          <StyledStudyBuddy>Main <br />Page</StyledStudyBuddy>
          <h2>Current Visible Screen: {Object.keys(screenVisibility).find(screen => screenVisibility[screen])}</h2>
          <button onClick={goToChapter1}>Go to Chapter 1</button>
        </div>
      ) : (
        <Chapter1 /> // Render Chapter 1 page
      )} */}
    </MainPageLayout>
  );
};