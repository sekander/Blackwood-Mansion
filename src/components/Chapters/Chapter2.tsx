import React, { useState } from 'react'
import MainPage from '../Main/MainPage';


export default function Chapter2() {
  // State to manage which screen is visible
  const [currentScreen, setCurrentScreen] = useState<'main' | 'chapter_1' | 'chapter_2'>('chapter_1');

  // Handler to go back to MainPage
  const goBackToMain = () => {
    setCurrentScreen('main');
  };

//   // Handler to switch to Chapter 2
//   const goToChapter2 = () => {
//     setCurrentScreen('chapter_2');
//   };
  return (
    <div>

      {currentScreen === 'chapter_1' ? (
        <div>
          <h1>Welcome to Chapter 2!</h1>
          <p>This is the first chapter of your journey.</p>
          <button onClick={goBackToMain}>Back to Main</button>
          {/* <button onClick={goToChapter2}>Go to Chapter 2</button> */}
        </div>
      ) : currentScreen === 'chapter_2' ? (
        <Chapter2 /> // Render Chapter 2 page
      ) : (
        <MainPage />
      )}
    </div>
  )
}
