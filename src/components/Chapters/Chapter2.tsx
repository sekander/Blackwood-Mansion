import { useScreenVisibility } from '../ScreenVisibilityContext';

import { TypeAnimation } from 'react-type-animation';

export default function Chapter2() {
  // State to manage which screen is visible
  const { screenVisibility, handleScreen } = useScreenVisibility();

  // Handler to go back to MainPage
  const goBackToMain = () => {
    handleScreen('main');
  };
  
  const goToChaper3 = () => {
    handleScreen('chapter_3');
  };

  return (
    <div>
        <div>

          <h1>Welcome to Chapter 2!</h1>
            <TypeAnimation 
              sequence={[
                "as the door opens detective Jones feels chills that makes the hairs on the back on his neck stand up. He makes the brave decision to walk in and what he finds will forever change the Blackwood Mansion."
              ]}
              speed={50}
              // repeat={Infinity}
            />
          <h2>Current Visible Screen: {Object.keys(screenVisibility).find(screen => screenVisibility[screen])}</h2>
          <p>This is the first chapter of your journey.</p>
          <button onClick={goBackToMain}>Back to Main</button>
          <button onClick={goToChaper3}>Back to Chapter 3</button>
        </div>
    </div>
  )
}
