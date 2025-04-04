import { useScreenVisibility } from '../ScreenVisibilityContext';
import styled from "styled-components";


import { TypeAnimation } from 'react-type-animation';



const HomeText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  font-size: 20px;
  color: rgba(255, 255, 255, 0.9); /* Slightly transparent white text */
  font-weight: bold;

`;



export default function Chapter1() {
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

          <h1>Welcome to Chapter 1!</h1>

            <TypeAnimation 
              sequence={[
                  "It was a dark, stormy evening when the call came in. A nervous voice on the other end, trembling with something deeper than fear. The caretaker of Blackwood Mansion desperate for help. The house, passed down through generations, held more than memories. It held shadows. Secrets buried beneath its foundations. And now... something had begun to stir.", 1000,
              ]}
              speed={50}
              // repeat={Infinity}
            />

          <h2>Current Visible Screen: {Object.keys(screenVisibility).find(screen => screenVisibility[screen])}</h2>
          <p>This is the first chapter of your journey.</p>
          <button onClick={goBackToMain}>Back to Main</button>
          <button onClick={goToChapter2}>Go to Chapter 2</button>
        </div>
    </div>
  )
}