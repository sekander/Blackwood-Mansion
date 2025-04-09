import { useState } from 'react';
import { Cards } from '../Cards/Cards';
import { useScreenVisibility } from '../ScreenVisibilityContext';

export default function Chapter1() {
  const { screenVisibility, handleScreen } = useScreenVisibility();
  const [nextNumber, setNextNumber] = useState(1);
  const [assignedNumbers, setAssignedNumbers] = useState<Record<number, number>>({});

  const cardData = [
    {
      "id": 1,
      "image": "/fall_object.webp",
      "name": "Fallen Object",
      "audio": "../../asset/audio/bones-scream.mp3",
      "qrcode": ""
    },
    {
      "id": 2,
      "image": "/whisper_image.webp",
      "name": "Suspicious Whispers",
      "audio": "../../asset/audio/fart.mp3",
      "qrcode": ""
    },
    {
      "id": 3,
      "image": "/bloody_knife.png",
      "name": "Suspicious Whispers",
      "audio": "../../asset/audio/fart.mp3",
      "qrcode": ""
    },
    {
      "id": 4,
      "image": "/torn_curtain.png",
      "name": "Suspicious Whispers",
      "audio": "../../asset/audio/fart.mp3",
      "qrcode": ""
    },
    {
      "id": 5,
      "image": "/locked_diary.png",
      "name": "Suspicious Whispers",
      "audio": "../../asset/audio/fart.mp3",
      "qrcode": ""
    },
    // ... add more cards as needed
  ];

  const [array1, setArray1] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [array2, setArray2] = useState<number[]>([]);

  const assignNumber = (number: number) => {
    setArray1(prevArray1 => {
      setArray2(prevArray2 => {
        // If number exists in array2, move it back to array1
        if (prevArray2.includes(number)) {
          const newArray2 = prevArray2.filter(n => n !== number);
          const newArray1 = [...prevArray1, number].sort((a, b) => a - b);
          return newArray2;
        }
        // If number exists in array1, move it to array2
        else if (prevArray1.includes(number)) {
          const newArray1 = prevArray1.filter(n => n !== number);
          const newArray2 = [...prevArray2, number];
          return newArray2;
        }
        // Number not found in either array (shouldn't happen in normal flow)
        return prevArray2;
      });
      // Return the updated array1
      if (array2.includes(number)) {
        return [...prevArray1, number].sort((a, b) => a - b);
      } else {
        return prevArray1.filter(n => n !== number);
      }
    });
  };

  // Check if order is correct (array2 matches desired sequence)
  const isOrderCorrect = () => {
    const correctOrder = [8, 5, 3, 4, 2, 6, 7, 1, 9]; // Or your specific required order
    return JSON.stringify(array2) === JSON.stringify(correctOrder);
  };


  const goBackToMain = () => handleScreen('main');
  const goToChapter2 = () => handleScreen('chapter_2');

  return (
    <div className="chapter-container">
      <h1>Mystery at Blackwood Manor</h1>
      <h2>Chapter 1: The Gathering</h2>
      
      <div className="cards-grid">
        {cardData.map((card) => (
          <div 
            key={card.id}
            onClick={() => assignNumber(card.id)}
            className={`card-wrapper ${assignedNumbers[card.id] ? 'numbered' : ''}`}
          >
            <Cards 
              image={card.image}  // Changed prop name to match component
              name={card.name}
              qrcode={card.qrcode}
              audio={card.audio}
            />
            {assignedNumbers[card.id] && (
              <div className="card-number">{assignedNumbers[card.id]}</div>
            )}
          </div>
        ))}
      </div>

      <div className="chapter-controls">
        <button onClick={goBackToMain}>Back to Main</button>
        <button 
          onClick={goToChapter2} 
          disabled={!isOrderCorrect()}
          // className={checkOrderCorrect() ? 'active' : 'disabled'}
        >
          Continue to Chapter 2
        </button>
      </div>

      {/* {checkOrderCorrect() && (
        <div className="success-message">
          Correct sequence! You may proceed.
        </div>
      )} */}
    </div>
  );
}