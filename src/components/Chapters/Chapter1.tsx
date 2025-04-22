import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { TypeAnimation } from 'react-type-animation';
import Modal from 'react-modal';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useScreenVisibility } from '../ScreenVisibilityContext';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';
import { useCardContext } from '../CardContext';
import { useDrag } from '@use-gesture/react';
import { animated } from '@react-spring/web';

Modal.setAppElement('#root');

// Container with fixed dimensions and background
const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 800px;
  background-image: url("/projects/blackwood-mansion/assets/images/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
`;

// Horror animations
const flicker = keyframes`
  0% { opacity: 0.8; }
  5% { opacity: 0.5; }
  10% { opacity: 0.6; }
  15% { opacity: 0.85; }
  25% { opacity: 0.5; }
  30% { opacity: 1; }
  35% { opacity: 0.4; }
  40% { opacity: 0.8; }
  50% { opacity: 0.6; }
  65% { opacity: 0.8; }
  75% { opacity: 0.5; }
  85% { opacity: 0.9; }
  100% { opacity: 0.7; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const bloodDrip = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 100vh; }
`;

const ghostFloat = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(2deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(5px) rotate(-2deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

const lightning = keyframes`
  0% { opacity: 0; }
  2% { opacity: 1; }
  4% { opacity: 0; }
  100% { opacity: 0; }
`;

// Overlay for horror effects
const HorrorOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(10, 10, 10, 0.7);
  animation: ${flicker} 5s infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(139, 0, 0, 0.1) 0%,
      transparent 10%,
      transparent 90%,
      rgba(139, 0, 0, 0.1) 100%
    );
    pointer-events: none;
    animation: ${bloodDrip} 60s linear infinite;
    background-size: 100% 200%;
    z-index: 0;
  }
`;

const HorrorTitle = styled.h1`
  color: #ff4444;
  text-shadow: 0 0 5px #8b0000, 0 0 10px #8b0000;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  position: relative;
  text-align: center;
  letter-spacing: 1px;
  animation: ${pulse} 3s infinite;
  z-index: 1;
`;

const HorrorModal = styled(Modal)`
  &.modal-content {
    background-color: #1a1a1a;
    border: 1px solid #8b0000;
    border-radius: 0;
    padding: 1.5rem;
    width: 350px;
    margin: auto;
    color: #e0e0e0;
    box-shadow: 0 0 20px #8b0000;
    max-height: 80vh;
    overflow-y: auto;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1001;
  }

  &.modal-overlay {
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
`;

const ScannerBox = styled.div`
  width: 250px;
  height: 250px;
  border: 2px dashed #8b0000;
  margin: 15px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
`;

const ScannerText = styled.p`
  color: #ff6666;
  text-align: center;
  margin: 10px 0;
  text-shadow: 0 0 3px #8b0000;
  font-size: 0.9rem;
`;

const HorrorButton = styled.button`
  background-color: #330000;
  color: #ff4444;
  border: 1px solid #8b0000;
  padding: 0.6rem 1.2rem;
  margin: 0.3rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  font-size: 0.9rem;

  &:hover {
    background-color: #8b0000;
    color: #fff;
    text-shadow: 0 0 5px #fff;
    box-shadow: 0 0 10px #ff4444;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 68, 68, 0.4),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const GhostlyCard = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid #8b0000;
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
  box-shadow: 0 0 15px rgba(139, 0, 0, 0.5);
  animation: ${ghostFloat} 4s ease-in-out infinite;
  transform-style: preserve-3d;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 20px #ff4444;
    transform: scale(1.05) rotateY(5deg);
  }

  img {
    filter: sepia(50%) hue-rotate(300deg) brightness(0.8);
    transition: all 0.3s;
  }

  &:hover img {
    filter: sepia(30%) hue-rotate(300deg) brightness(1);
  }
`;

const LightningEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  opacity: 0;
  pointer-events: none;
  z-index: 10;
  animation: ${lightning} 5s infinite;
`;

const CardOrderDisplay = styled.div`
  margin: 20px auto;
  text-align: center;
  scale: 0.8;
  transform: translateY(-47px);
  z-index: 2;
`;

const CardOrderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-template-rows: repeat(2, auto);
  gap: 10px;
  margin-top: 10px;
`;

const CardOrderItem = styled.div<{ scanned: boolean }>`
  border: 1px solid ${props => props.scanned ? '#c3e6cb' : '#f5c6cb'};
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  background-color: ${props => props.scanned ? '#d4edda' : '#f8d7da'};
  box-shadow: 0 0 5px ${props => props.scanned ? 'rgba(0,255,0,0.3)' : 'rgba(255,0,0,0.3)'};
  transition: all 0.3s;
`;

interface QrReaderProps {
  delay: number;
  style: CSSProperties;
  onError: (err: any) => void;
  onScan: (data: string | null) => void;
}

const QrReader: React.FC<QrReaderProps> = ({ delay, style, onError, onScan }) => {
  const qrScannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (qrScannerRef.current) {
      const qrCodeScanner = new Html5QrcodeScanner(
        qrScannerRef.current.id,
        {
          fps: 10,
          qrbox: { width: 200, height: 200 },
          aspectRatio: 1.0,
        },
        false
      );
    
      qrCodeScanner.render(
        (decodedText: string) => onScan(decodedText),
        (error: string) => onError(error)
      );
    
      return () => {
        qrCodeScanner.clear().catch((err) => console.error('Error clearing QR scanner:', err));
      };
    }
  }, [onScan, onError]);

  return (
    <div style={style}>
      <div ref={qrScannerRef} id="qr-reader" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

const Chapter1: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [scanData, setScanData] = useState<string>('Not Found');
  const [jsonData, setJsonData] = useState<any>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [arrayOrder, setArrayOrder] = useState<number[]>([]); 
  const [bloodSpatter, setBloodSpatter] = useState<Array<{x: number, y: number, size: number}>>([]);
  const [ghostVisible, setGhostVisible] = useState(false);
  const [lightningActive, setLightningActive] = useState(false);

  const [cardImages, setCardImages] = useState([
    { id: 1, name: 'Old Photograph', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
    { id: 2, name: 'Rusty Key', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
    { id: 3, name: 'Torn Letter', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
    { id: 4, name: 'Pocket Watch', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
    { id: 5, name: 'Wedding Ring', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
    { id: 6, name: 'Bloody Handkerchief', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
    { id: 7, name: 'Broken Glasses', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
    { id: 8, name: 'Child\'s Drawing', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
    { id: 9, name: 'Lock of Hair', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
  ]);

  const { handleScreen } = useScreenVisibility();
  const {
    cardData,
    checkOrder,
    getCardNumber,
    currentArray,
    cardSetType,
    setCardSet,
    getSetOrder
  } = useCardContext();

  useEffect(() => {
    setCardSet('set1');
  }, []);

  const [goToSlide, setGoToSlide] = useState<number | undefined>(undefined);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const lastFetchedURL = useRef<string | null>(null);

  // Blood spatter, ghost and lightning effects
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setBloodSpatter(prev => [
          ...prev,
          {
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 10 + 5
          }
        ]);
      }
      
      if (bloodSpatter.length > 5) {
        setBloodSpatter(prev => prev.slice(1));
      }

      // Random ghost appearance
      if (Math.random() > 0.9) {
        setGhostVisible(true);
        setTimeout(() => setGhostVisible(false), 2000);
      }

      // Random lightning effect
      if (Math.random() > 0.95) {
        setLightningActive(true);
        setTimeout(() => setLightningActive(false), 100);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [bloodSpatter.length]);

  useEffect(() => {
    if (jsonData && jsonData.id) {
      const matchedCard = cardData.find(card => card.id === jsonData.id);
      if (matchedCard) {
        setCardImages(prevCards =>
          prevCards.map(card =>
            card.id === jsonData.id
              ? {
                  ...card,
                  name: jsonData.name ?? card.name,
                  image: jsonData.image ?? card.image,
                  audio: jsonData.audio ?? card.audio,
                }
              : card
          )
        );
      }
    }
  }, [jsonData]);

  const openModal = () => {
    setShowModal(true);
    const audio = new Audio('/projects/blackwood-mansion/assets/sounds/creaky-door.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.error('Audio play failed:', e));
  };

  const closeModal = () => {
    setShowModal(false);
    const audio = new Audio('/projects/blackwood-mansion/assets/sounds/ghost-whisper.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.error('Audio play failed:', e));
  };

  const goBackToMain = () => handleScreen('main');
  const goToChapter2 = () => handleScreen('chapter_2');

  const handleCardClick = (cardIndex: number) => {
    setCurrentCardIndex(cardIndex);
    openModal();
  };

  const carouselSlides = cardImages.map((card, index) => ({
    key: index,
    content: (
      <GhostlyCard onClick={() => handleCardClick(index)}>
        <img
          src={card.image}
          alt={card.name}
          style={{ width: '140px', height: '140px', objectFit: 'contain' }}
        />
        <span style={{ 
          marginTop: '8px',
          fontSize: '1rem',
          fontWeight: 'bold',
          color: '#ff4444',
          display: 'block',
          textAlign: 'center'
        }}>
          {getCardNumber(card.id)}
        </span>
        <p style={{ 
          color: '#ff8888',
          fontSize: '0.8rem',
          marginTop: '4px',
          textAlign: 'center'
        }}>
          {card.name}
        </p>
      </GhostlyCard>
    ),
    onClick: () => setGoToSlide(index),
  }));

  const AnimatedDiv = animated('div');
  const indexRef = useRef(0);

  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], velocity }) => {
      if (!down && Math.hypot(...velocity) > 0.2) {
        const newIndex =
          xDir < 0
            ? Math.min(cardImages.length - 1, indexRef.current + 1)
            : Math.max(0, indexRef.current - 1);

        indexRef.current = newIndex;
        setGoToSlide(newIndex);
      }
    },
    {
      filterTaps: true,
      axis: 'x',
      pointer: { touch: true, buttons: [1] },
    }
  );

  const playErrorSound = () => {
    const audio = new Audio('/projects/blackwood-mansion/assets/sounds/error.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.error('Audio play failed:', e));
  };

  const playSuccessSound = () => {
    const audio = new Audio('/projects/blackwood-mansion/assets/sounds/success.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.error('Audio play failed:', e));
  };

  const playThunderSound = () => {
    const audio = new Audio('/projects/blackwood-mansion/assets/sounds/thunder.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.error('Audio play failed:', e));
  };

  useEffect(() => {
    if (lightningActive) {
      playThunderSound();
    }
  }, [lightningActive]);

  return (
    <SplashContainer>
      {lightningActive && <LightningEffect />}
      <HorrorOverlay>
        {/* Blood spatter effects */}
        {bloodSpatter.map((spatter, i) => (
          <div 
            key={i}
            style={{
              position: 'absolute',
              left: `${spatter.x}%`,
              top: `${spatter.y}%`,
              width: `${spatter.size}px`,
              height: `${spatter.size}px`,
              background: 'radial-gradient(circle, rgba(139,0,0,0.7) 0%, rgba(139,0,0,0) 70%)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
        ))}

        {/* Ghost effect */}
        {ghostVisible && (
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '150px',
            height: '200px',
            background: 'url("/projects/blackwood-mansion/assets/images/ghost.png") no-repeat center center',
            backgroundSize: 'contain',
            opacity: 0.8,
            pointerEvents: 'none',
            zIndex: 2,
            animation: `${ghostFloat} 3s ease-in-out infinite`
          }} />
        )}

        <HorrorTitle>The Blackwood Mansion - Chapter 1</HorrorTitle>

        <div style={{ height: '150px', width: '360px', overflow: 'hidden' }}>
          <TypeAnimation
            sequence={[
              "It was a dark, stormy evening when the call came in. A nervous voice on the other end, trembling with something deeper than fear. The caretaker of Blackwood Mansion desperate for help. The house, passed down through generations, held more than memories. It held shadows. Secrets buried beneath its foundations. And now... something had begun to stir.",
              1000,
            ]}
            speed={50}
            style={{
              color: '#ff6666',
              fontSize: '0.9rem',
              textAlign: 'center',
              margin: '1rem 0',
              lineHeight: '1.4',
              textShadow: '0 0 3px #8b0000'
            }}
          />
        </div>

        <CardOrderDisplay>
          <h2 style={{ color: '#ff4444', textShadow: '0 0 3px #8b0000' }}>Artifact Collection</h2>
          <CardOrderGrid>
            {cardImages.map((card) => (
              <CardOrderItem key={card.id} scanned={arrayOrder.includes(card.id)}>
                <img
                  src={card.image}
                  alt={card.name}
                  style={{ width: '40px', height: '60px', objectFit: 'contain' }}
                />
                <p>
                  {arrayOrder.includes(card.id) ? (
                    <span style={{ color: '#ff4444' }}>
                      {arrayOrder.indexOf(card.id) + 1}
                    </span>
                  ) : (
                    <span style={{ color: '#ff8888' }}>?</span>
                  )}
                </p>
              </CardOrderItem>
            ))}
          </CardOrderGrid>
        </CardOrderDisplay>

        <div style={{ 
          width: '100%',
          height: '400px',
          position: 'relative',
          margin: '1rem 0',
          transform: 'translateY(-120px)'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/projects/blackwood-mansion/assets/images/cobweb.png") no-repeat center center',
            backgroundSize: 'contain',
            opacity: 0.2,
            pointerEvents: 'none',
            zIndex: 1
          }} />
          
          <AnimatedDiv {...bind()} style={{ 
            touchAction: 'pan-y', 
            cursor: 'grab', 
            height: '100%', 
            width: '100%',
            position: 'relative',
            zIndex: 2
          }}>
            <Carousel
              key={refreshCounter}
              slides={carouselSlides}
              goToSlide={goToSlide}
              offsetRadius={2}
              showNavigation={false}
              animationConfig={config.gentle}
            />
          </AnimatedDiv>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '10px', 
          justifyContent: 'center', 
          transform: 'translateY(-125px)',
          width: '100%',
          maxWidth: '360px',
          margin: '0 auto'
        }}>
          <HorrorButton
            onClick={() => {
              currentArray.length = 0;
              arrayOrder.length = 0;
              setCardImages([
                { id: 1, name: 'Old Photograph', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
                { id: 2, name: 'Rusty Key', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
                { id: 3, name: 'Torn Letter', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
                { id: 4, name: 'Pocket Watch', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
                { id: 5, name: 'Wedding Ring', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
                { id: 6, name: 'Bloody Handkerchief', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
                { id: 7, name: 'Broken Glasses', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
                { id: 8, name: 'Child\'s Drawing', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
                { id: 9, name: 'Lock of Hair', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
              ]);
              playSuccessSound();
            }}
          >
            Reset Artifacts
          </HorrorButton>

          <HorrorButton
            onClick={() => {
              if (arrayOrder.length === cardData.length) {
                checkOrder(arrayOrder, cardSetType);
                playSuccessSound();
              } else {
                playErrorSound();
                alert(`The spirits demand all ${cardData.length} artifacts! You have only gathered ${arrayOrder.length}...`);
              }
            }}
          >
            Complete Ritual
          </HorrorButton>

          <HorrorButton onClick={goBackToMain}>
            Flee Mansion
          </HorrorButton>

          <HorrorButton onClick={goToChapter2}>
            Next Chapter
          </HorrorButton>
        </div>

        <HorrorModal
          isOpen={showModal}
          onRequestClose={closeModal}
          contentLabel="QR Code Scanner"
        >
          <h2 style={{ 
            color: '#ff4444', 
            textAlign: 'center',
            margin: '0 0 1rem',
            fontSize: '1.4rem'
          }}>
            🕷️ Cursed QR Scanner 🕷️
          </h2>
          
          <ScannerBox>
            <QrReader
              delay={300}
              style={{ width: '100%', height: '100%' }}
              onError={(err) => {
                console.error('QR scan error', err);
                playErrorSound();
              }}
              onScan={async (data: string | null) => {
                if (data) {
                  setScanData(data);
                  try {
                    const response = await fetch(data);
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    const json = await response.json();
                    setJsonData(json);
                    
                    if (!arrayOrder.includes(json.id)) {
                      const matchedCard = cardData[json.id - 1];
                      if (matchedCard) {
                        const audio = new Audio(matchedCard.audio);
                        audio.play().catch(e => console.error('Audio play failed:', e));
                        
                        setArrayOrder(prev => [...prev, json.id]);
                        setJsonData(matchedCard);
                      }
                    } else {
                      alert('This artifact has already been collected!');
                      playErrorSound();
                    }
                    
                    closeModal();
                  } catch (error) {
                    console.error('Fetch error:', error);
                    setJsonData({ error: 'The spirits are blocking your connection...' });
                    playErrorSound();
                  }
                }
              }}
            />
          </ScannerBox>
          
          <ScannerText>Scanned Data: {scanData}</ScannerText>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            marginTop: '1rem'
          }}>
            <HorrorButton onClick={closeModal}>
              Close Scanner
            </HorrorButton>
          </div>
        </HorrorModal>
      </HorrorOverlay>
    </SplashContainer>
  );
};

export default Chapter1;