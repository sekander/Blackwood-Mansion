import { useScreenVisibility } from '../ScreenVisibilityContext';


export default function Chapter2() {
  // State to manage which screen is visible
  const { screenVisibility, handleScreen } = useScreenVisibility();

  // Handler to go back to MainPage
  const goBackToMain = () => {
    handleScreen('main');
  };

  return (
    <div>
        <div>

          <h1>Welcome to Chapter 1!</h1>
          <h2>Current Visible Screen: {Object.keys(screenVisibility).find(screen => screenVisibility[screen])}</h2>
          <p>This is the first chapter of your journey.</p>
          <button onClick={goBackToMain}>Back to Main</button>
        </div>
    </div>
  )
}
