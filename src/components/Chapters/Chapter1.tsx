import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TypeAnimation } from 'react-type-animation';
import Modal from 'react-modal';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useScreenVisibility } from '../ScreenVisibilityContext';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';
import { useCardContext } from '../CardContext';

import { useDrag } from '@use-gesture/react';
import { animated } from '@react-spring/web';
import { get } from 'http';

Modal.setAppElement('#root');

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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
          qrbox: 250,
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


  const [cardImages, setCardImages] = useState([
    { id: 1, name: 'Placeholder 1', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
    { id: 2, name: 'Placeholder 2', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
    { id: 3, name: 'Placeholder 3', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
    { id: 4, name: 'Placeholder 4', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
    { id: 5, name: 'Placeholder 5', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
    { id: 6, name: 'Placeholder 6', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
    { id: 7, name: 'Placeholder 7', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
    { id: 8, name: 'Placeholder 8', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
    { id: 9, name: 'Placeholder 9', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
  ]);

  const { screenVisibility, handleScreen } = useScreenVisibility();
  const {
    cardData,
    handleTempArr,
    checkOrder,
    getCardNumber,
    currentArray,
    getCardSet,
    cardSetType,
    getSetOrder,
    
    setCardSet,
    isCorrectOrder,
    
  } = useCardContext();

  useEffect(() => {
    setCardSet('set1');
    const audio = new Audio('/projects/blackwood-mansion/assets/audio/PROLOGUE.mp3');
    audio.play();
  }, []); // empty array means it only runs once

  const [goToSlide, setGoToSlide] = useState<number | undefined>(undefined);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const lastFetchedURL = useRef<string | null>(null);

  const [orderIsCorrect, setOrderIsCorrect] = useState(false);

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
      } else {
        console.warn(`No matching card in cardData with id ${jsonData.id}`);
      }
    }
  }, [jsonData]);




  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const goBackToMain = () => handleScreen('main');
  const goToChapter2 = () => handleScreen('chapter_2');

  const handleCardClick = (cardIndex: number) => {
    setCurrentCardIndex(cardIndex);
    setShowModal(true);
  };

  const carouselSlides = cardImages.map((card, index) => ({
    key: index,
    content: (
      <div
        onClick={() => handleCardClick(index)}
        className="flex flex-col items-center justify-center bg-white shadow-lg rounded p-4 cursor-pointer"
      >
        <img
          src={card.image}
          alt={card.name}
          style={{ width: '200px', height: '200px' }}
          className="w-64 h-64 object-contain"
        />
        <span className="mt-2 text-xl font-bold">{getCardNumber(card.id)}</span>
        <p className="text-gray-800 text-lg">{card.name}</p>
      </div>
    ),
    onClick: () => setGoToSlide(index),
  }));

  const AnimatedDiv = animated('div');
  const indexRef = useRef(0); // Keeps track of the current index

  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], velocity }) => {
      if (!down && Math.hypot(...velocity) > 0.2) {
        const newIndex =
          xDir < 0
            ? (indexRef.current + 1) % cardImages.length // Swipe Left, loop to start
            : (indexRef.current - 1 + cardImages.length) % cardImages.length; // Swipe Right, loop to end

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

  return (
    // <div>
    <div  className="screen-wrap">
      <h1 style={{paddingTop: '20px'}}>Welcome to Chapter 1!</h1>

      <div className="intro-phrase-style chapter-p-color" style={{ height: '150px', width: '360px', overflow: 'hidden', transform: 'translateY(55px)', position: 'relative', margin: '0 auto' }}>
        <TypeAnimation
          sequence={[
        "It was a dark, stormy evening when the call came in. A nervous voice on the other end, trembling with something deeper than fear. The caretaker of Blackwood Mansion desperate for help. The house, passed down through generations, held more than memories. It held shadows. Secrets buried beneath its foundations. And now... something had begun to stir.",
        1000,
          ]}
          speed={50}
        />
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="QR Code Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
        closeTimeoutMS={200}
      >
        <div className="modal-header">
          <h2 className="modal-title">🪟 QR Code Scanner</h2>
          <button onClick={closeModal} className="close-btn">
            ✕
          </button>
        </div>
        <div className="modal-body">
          <QrReader
            delay={300}
            style={{ width: '100%' }}
            onError={(err) => console.error('QR scan error', err)}
            onScan={async (data: string | null) => {
              if (data) {
                setScanData(data);
                console.log('Scanned data:', data);
                try {
                  const response = await fetch(data);
                  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                  const json = await response.json();

                  //I Need this 
                    setJsonData(json);

                    // Update the JSON data display section
                    // if (json.id) 
                    if (!arrayOrder.includes(json.id)) 
                    {
                      // const matchedCard = cardData.find(card => card.id === json.id);
                      const matchedCard = cardData[json.id - 1];
                      // const matchedCard = cardData[currentCardIndex];
                      

                      // if (matchedCard) 
                      // {
                        const audio = new Audio(matchedCard.audio);
                        // const audio = new Audio(json.audio);
                        audio.play();
                        // Open a new modal to display card details
                        setShowModal(false); // Close the QR modal

                        const newModal = window.open('', '_blank', 'width=600,height=400');
                        if (newModal) {
                            newModal.document.write(`
                            <html>
                            <head>
                            <title>Card Details</title>
                            <style>
                              body {
                              font-family: Arial, sans-serif;
                              text-align: center;
                              padding: 20px;
                              }
                              img {
                              max-width: 100%;
                              height: auto;
                              }
                              button {
                              margin-top: 20px;
                              padding: 10px 20px;
                              background-color: #4CAF50;
                              color: white;
                              border: none;
                              border-radius: 5px;
                              cursor: pointer;
                              }
                              button:hover {
                              background-color: #45a049;
                              }
                            </style>
                            </head>
                            <body>
                            <h1>${matchedCard.name}</h1>
                            <img src="${matchedCard.image}" alt="${matchedCard.name}" />
                            <p>${currentCardIndex}</p>
                            <button id="playAudio">Play Audio</button>
                            <button id="addToSequence">Add to Sequence</button>
                            <button id="closeModal">Close Modal</button>


                            <script>
                              document.getElementById('playAudio').addEventListener('click', () => {
                              const audio = new Audio('${matchedCard.audio}');
                              audio.play();
                              });
                            </script>
                            </body>
                            </html>
                            `);

                            const closeModalButton = newModal.document.getElementById('closeModal');
                            if (closeModalButton) {
                              closeModalButton.addEventListener('click', () => {
                                newModal.close();
                              });
                            }

                            const addToSequenceButton = newModal.document.getElementById('addToSequence');
                            if (addToSequenceButton) {
                              addToSequenceButton.addEventListener('click', () => {
                                // temparry.push(matchedCard.id);
                                if (!arrayOrder.includes(matchedCard.id)) 
                                {
                                  // currentArray.push(matchedCard.id);
                                  // setArrayOrder(prev => [...prev, matchedCard.id]);
                                  setArrayOrder(prev => [...prev, json.id]);
                                  setJsonData(matchedCard);
                                  // alert('Card added to the sequence!');
                                  // getCardSet(cardSetType);
                                } 
                                else {
                                 alert('Card is already in the sequence!');
                                }
                                // setJsonData(matchedCard);
                                // alert('Card added to the sequence!');
                                newModal.close();
                                // currentArray.push(matchedCard.id);
                              });
                            }
                        }

                        // setJsonData(matchedCard);
                        // console.log('Matched Card:', matchedCard);
                      // } else {
                      //   console.warn(`No matching card in cardData with id ${json.id}`);
                      // }
                      // closeModal();
                    }
                    else{
                      alert('Card is already in the sequence!');
                    }
                  // setJsonData(json);
                  closeModal();
                } catch (error) {
                  console.error('Fetch error:', error);
                  setJsonData({ error: 'Failed to fetch data.' });
                }
              }
            }}
          />
          <p>Scanned Data: {scanData}</p>
        </div>
      </Modal>



      <div className="card-order-display">
        <h2 className='chapter-title-color'>Card Order</h2>
        {/* <div className="card-order-grid"> */}
        <div className="card-order-flex">
          {cardImages.map((card, index) => (
        <div
          key={card.id}
          className={`card-order-item ${
            arrayOrder.includes(card.id) ? 'scanned' : 'not-scanned'
          }`}
        >
          <img
            src={card.image}
            alt={card.name}
            style={{ width: '40px', height: '60px' }}
            className="object-contain"
          />
          <p>
            {arrayOrder.includes(card.id) ? (
          <span>
            <span role="img" aria-label="scanned">
            </span>{' '}
            {arrayOrder.indexOf(card.id) + 1}
          </span>
            ) : (
          <span role="img" aria-label="not-scanned">
          </span>
            )}
          </p>
        </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .card-order-display {
        margin: 20px auto;
        text-align: center;
        scale: 0.8;
      transform: translateY(10px);
          }
          .card-order-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        grid-template-rows: repeat(2, auto);
        gap: 10px;
        margin-top: 10px;
          }
          .card-order-item {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 5px;
        text-align: center;
        background-color: #f9f9f9;
          }
          .card-order-item.scanned {
        background-color: #d4edda; /* Light green for scanned */
        border-color: #c3e6cb;
          }
          .card-order-item.not-scanned {
        background-color: #f8d7da; /* Light red for not scanned */
        border-color: #f5c6cb;
          }
        `}
      </style>
      <div style={{ width: '300px', height: '400px', margin: '20px auto', overflow: 'hidden', transform: 'translateY(-60px)', position: 'relative' }}>
        <AnimatedDiv {...bind()} style={{ touchAction: 'pan-y', cursor: 'grab', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Carousel
          key={refreshCounter} // force remount when updated
          slides={carouselSlides}
          goToSlide={goToSlide}
          offsetRadius={2}
          showNavigation={false}
          animationConfig={config.gentle}
        />
        </AnimatedDiv>

      </div>

      <div className='button-group' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', justifyContent: 'center', transform: 'translateY(-50px)' }}>
        <button
          onClick={() => {
            currentArray.length = 0; // Clear the currentArray
            arrayOrder.length = 0; // Clear the arrayOrder
            
            setCardImages([
              { id: 1, name: 'Placeholder 1', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
              { id: 2, name: 'Placeholder 2', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
              { id: 3, name: 'Placeholder 3', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
              { id: 4, name: 'Placeholder 4', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
              { id: 5, name: 'Placeholder 5', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
              { id: 6, name: 'Placeholder 6', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
              { id: 7, name: 'Placeholder 7', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
              { id: 8, name: 'Placeholder 8', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
              { id: 9, name: 'Placeholder 9', image: '/projects/blackwood-mansion/assets/images/ch1.png', audio: 'Scan QR to update' },
            ]);

            alert('Order has been cleared!');
          }}
          className='spooky-btn'
        >
          Clear Order
        </button>

        <button
          onClick={() => {
            if (arrayOrder.length === cardData.length) {
              checkOrder(arrayOrder, cardSetType);
              //Loop through each array and check which order is coorect 
              //
            } else {
              alert(`Please click all cards first. : ${JSON.stringify(arrayOrder, null, 2)} \n` + 
              `Please click all cards first. : ${JSON.stringify(getSetOrder(cardSetType), null, 2)} \n` + 
              
              `Please click all cards first. : ${cardSetType} \n`);
            }
            
            // alert(`Please click all cards first. : ${JSON.stringify(jsonData, null, 2)}`);
          }}
          className='spooky-btn'
        >
          Check Order
        </button>

        <button className='spooky-btn' onClick={goBackToMain}>Back to Main</button>
        {/* <button onClick={goToChapter2}>Go to Chapter 2</button> */}
        {/* <button className='spooky-btn' onClick={goToChapter2}  disabled={!isCorrectOrder}>Go to Chapter 2</button> */}
        <button className='spooky-btn' onClick={goToChapter2}>Go to Chapter 2</button>
      </div>
    </div>
  );
};

export default Chapter1;
