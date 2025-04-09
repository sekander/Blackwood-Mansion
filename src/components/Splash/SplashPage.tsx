
import React, { useEffect } from 'react'
import styled from "styled-components";
import { useScreenVisibility } from '../ScreenVisibilityContext';


const StyledStudyBuddy = styled.span`
  color: black;
  font-size: 48px;
  font-family: Arial, sans-serif;
  font-weight: 700;
  line-height: 47.29px;
  word-wrap: break-word;
`;

export default function SplashPage() {
  const { screenVisibility , handleScreen } = useScreenVisibility();

  // Check if a cookie (JWT or username) exists when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
        handleScreen('main');
    }, 2000); // 2000ms = 2 seconds delay

    // Cleanup function to clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [handleScreen]);  // Dependency array ensures the effect runs only once when component mounts




  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>

      <StyledStudyBuddy>Blackwood<br />Mansion</StyledStudyBuddy> 
    </div>
  )
}
