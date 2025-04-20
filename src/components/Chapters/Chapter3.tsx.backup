import { useScreenVisibility } from '../ScreenVisibilityContext';
import styled from "styled-components";

import { TypeAnimation } from 'react-type-animation';

export default function Chapter3() {

// State to manage which screen is visible
  const { screenVisibility, handleScreen } = useScreenVisibility();
  // Handler to go back to MainPage
  const goBackToMain = () => {
    handleScreen('main');
  };

  // Handler to switch to Chapter 2
  const goToChapter2 = () => {
    handleScreen('chapter_2');
  };
  return (
    <div>
        <div>

          <h1>Welcome to Chapter 3!</h1>
          <TypeAnimation 
              sequence={[
                "The detective’s hand hovered over the cursed journal, but the sudden sound of footsteps froze him. Hooded cloaked figures emerged from the shadows with glowing eyes."
              ]}
              speed={50}
            //   repeat={Infinity}
            />

          <h2>Current Visible Screen: {Object.keys(screenVisibility).find(screen => screenVisibility[screen])}</h2>
          <p>This is the first chapter of your journey.</p>
          <button onClick={goBackToMain}>Back to Main</button>
          <button onClick={goToChapter2}>Go to Chapter 2</button>
        </div>
    </div>
  )
}