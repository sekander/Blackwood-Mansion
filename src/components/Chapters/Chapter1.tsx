import { useState } from 'react';
import { Cards } from '../Cards/Cards';
import { useScreenVisibility } from '../ScreenVisibilityContext';

interface Card {
  id: number;
  image: string;
  name: string;
  audio: string,
  qrcode: string
}

const cardData: Card[] = [
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
    "name": "Bloody Knife",
    "audio": "../../asset/audio/fart.mp3",
    "qrcode": ""
  },
  {
    "id": 4,
    "image": "/torn_curtain.png",
    "name": "Torn Curtain",
    "audio": "../../asset/audio/fart.mp3",
    "qrcode": ""
  },
  {
    "id": 5,
    "image": "/locked_diary.png",
    "name": "Locked Diary",
    "audio": "../../asset/audio/fart.mp3",
    "qrcode": ""
  },
];


export default function Chapter1() {
  const { handleScreen } = useScreenVisibility();
  const [clickOrder, setClickOrder] = useState<number[]>([]);
  const [tempArr, setTempArr ] = useState([]);

 

  const handleCardClick = (cardId: number) => {
    // If card is already selected, remove it from the sequence
    if (clickOrder.includes(cardId)) {
      setClickOrder(prev => prev.filter(id => id !== cardId));
    } 
    // Otherwise add it to the sequence if we haven't reached the max (5)
    else if (clickOrder.length < cardData.length) {
      setClickOrder(prev => [...prev, cardId]);
    }
  };

  const currentArray : number[] = []

  const handleTempArr = (card: Card) => {
    if(currentArray.length < cardData.length ){
      console.log("HandleTempArr")
      console.log(card.id)
  
      if(!currentArray.includes(card.id)) {
        currentArray.push(card.id)
        console.log(currentArray)
      } else {
        console.log(`card ${card.id} is already in the array` )
      }
    }
  };


  const checkOrder = (array: number[]) => {
    const correctOrder = [2, 5, 3, 1, 4];
    
    let correctOder: Boolean = true;

    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if( element == correctOrder[index]){
        correctOder = true;
      } else {
        correctOder = false;
      }
    }
    
    if(correctOder) {
      alert(`order is correct`)
    } else {
      alert("order is not correct")
    }
    // array.forEach((num: number) => {
    //   if(array[num] === correctOrder[num]){
    //     console.log("correct")
    //   } else {
    //     console.log("non-correct")
    //   }
    // }
    // )
  }

  const getCardNumber = (cardId: number) => {
    const index = clickOrder.indexOf(cardId);
    return index >= 0 ? index + 1 : null;
  };

  const isOrderCorrect = () => {
    // Replace with your desired correct order
    const correctOrder = [2, 5, 3, 1, 4];
    return JSON.stringify(clickOrder) === JSON.stringify(correctOrder);
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
            // onClick={() => handleCardClick(card.id)}
            onClick={() => handleTempArr(card)}
            className={`card-wrapper ${getCardNumber(card.id) ? 'numbered' : ''}`}
          >
            <Cards 
              image={card.image}
              name={card.name}
              qrcode={card.qrcode}
              audio={card.audio}
            />
            {getCardNumber(card.id) && (
              <div className="card-number">{getCardNumber(card.id)}</div>
            )}
          </div>
        ))}
      </div>

      <div className="chapter-controls">
        <button onClick={goBackToMain}>Back to Main</button>
        <button 
          // onClick={goToChapter2} 
          onClick={() => checkOrder(currentArray)} 
          // disabled={!isOrderCorrect() || clickOrder.length !== cardData.length}
        >
          Continue to Chapter 2
        </button>
      </div>
    </div>
  );
}