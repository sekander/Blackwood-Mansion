import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import SplashPage from './components/Splash/SplashPage';
import MainPage from './components/Main/MainPage';

import { ScreenVisibilityProvider } from './components/ScreenVisibilityContext';
import { useScreenVisibility } from './components/ScreenVisibilityContext';
import Chapter1 from './components/Chapters/Chapter1';
import Chapter2 from './components/Chapters/Chapter2';

const StyledFrame = styled.div`
  width: 400px;
  height: 800px;
  display: flex;               /* Enables Flexbox */
  flex-direction: column;
  justify-content: center;     /* Centers horizontally */
  align-items: center;         /* Centers vertically */
  border: 2px solid black;
`;

function App() {
  const { screenVisibility, handleScreen } = useScreenVisibility();  // Get visibility state and handler from context

  return (
    <div className="App">
      <header className="App-header"></header>

      <StyledFrame
      >
        {screenVisibility.splash && <SplashPage />}
        {screenVisibility.main && <MainPage />}
        {screenVisibility.chapter_1 && <Chapter1/>}
        {screenVisibility.chapter_2 && <Chapter2/>}

      </StyledFrame>
    </div>
  );
}

// Wrap the App component with the ScreenVisibilityProvider to enable context usage
const AppWithProvider = () => (
  <ScreenVisibilityProvider>
    <App />
  </ScreenVisibilityProvider>
);

export default AppWithProvider;
