import { useScreenVisibility } from '../ScreenVisibilityContext';
import styled from "styled-components";
import { TypeAnimation } from 'react-type-animation';

const StyledFrame = styled.div`
  width: 400px;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid black;

  background-image: url('/images/chapter01screen.jpg'); /* Replace with your background image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(0px) opacity(0.95); /* 25% visible + blur */
  position: relative;
  overflow: hidden;
`;

const FrameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px); /* Blur effect */
  background-color: rgba(0, 0, 0, 0.25); /* 25% dark overlay */
  z-index: 1;
`;

const FrameContent = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const CenteredImage = styled.img`
  display: block;
  margin: 20px auto;
  max-width: 150px;
  height: auto;
`;

export default function Chapter1() {
  const { screenVisibility, handleScreen } = useScreenVisibility();

  const goBackToMain = () => {
    handleScreen('main');
  };

  const goToChapter2 = () => {
    handleScreen('chapter_2');
  };

  return (
    <StyledFrame>
      <FrameOverlay />
      <FrameContent>
        <h1>Welcome to Chapter 1!</h1>

        <TypeAnimation
          sequence={[
            "It was a dark, stormy evening when the call came in. A nervous voice on the other end, trembling with something deeper than fear. The caretaker of Blackwood Mansion desperate for help. The house, passed down through generations, held more than memories. It held shadows. Secrets buried beneath its foundations. And now... something had begun to stir.", 1000,
          ]}
          speed={50}
        />

        <CenteredImage src="/images/QR-chapter01.png" alt="QR Code" />

        <h2>
          Current Visible Screen:{" "}
          {Object.keys(screenVisibility).find((screen) => screenVisibility[screen])}
        </h2>

        <p>This is the first chapter of your journey.</p>

        <button onClick={goBackToMain}>Back to Main</button>
        <button onClick={goToChapter2}>Go to Chapter 2</button>
      </FrameContent>
    </StyledFrame>
  );
}
