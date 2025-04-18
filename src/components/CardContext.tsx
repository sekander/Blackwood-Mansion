import React, { createContext, useContext, useState } from 'react';

export interface Card {
  id: number;
  image: string;
  name: string;
  audio: string;
  qrcode: string;
}

type CardSetType = 'set1' | 'set2' | 'set3';

interface CardContextProps {
  cardData: Card[];
  setCardSet: (type: CardSetType) => void;
  currentArray: number[];
  handleTempArr: (card: Card) => void;
  checkOrder: (array: number[]) => void;
  getCardNumber: (cardId: number) => number | null;
}

const CardContext = createContext<CardContextProps | undefined>(undefined);

export const useCardContext = (): CardContextProps => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCardContext must be used within a CardProvider');
  }
  return context;
};

const cardSet1: Card[] = [
  { id: 1, image: '/fall_object.webp', name: 'Fallen Object', audio: '../../asset/audio/bones-scream.mp3', qrcode: '' },
  { id: 2, image: '/whisper_image.webp', name: 'Suspicious Whispers', audio: '../../asset/audio/fart.mp3', qrcode: '' },
  { id: 3, image: '/bloody_knife.png', name: 'Bloody Knife', audio: '../../asset/audio/fart.mp3', qrcode: '' },
  { id: 4, image: '/torn_curtain.png', name: 'Torn Curtain', audio: '../../asset/audio/fart.mp3', qrcode: '' },
  { id: 5, image: '/locked_diary.png', name: 'Locked Diary', audio: '../../asset/audio/fart.mp3', qrcode: '' },
];

const cardSet2: Card[] = [
  { id: 6, image: '/ghost.png', name: 'Ghost', audio: '../../asset/audio/ghost.mp3', qrcode: '' },
  { id: 7, image: '/mirror.png', name: 'Broken Mirror', audio: '../../asset/audio/glass.mp3', qrcode: '' },
  { id: 8, image: '/shadow.png', name: 'Creepy Shadow', audio: '../../asset/audio/shadow.mp3', qrcode: '' },
  { id: 9, image: '/clown.png', name: 'Scary Clown', audio: '../../asset/audio/clown.mp3', qrcode: '' },
  { id: 10, image: '/doll.png', name: 'Haunted Doll', audio: '../../asset/audio/doll.mp3', qrcode: '' },
];

const cardSet3: Card[] = [
  { id: 11, image: '/grave.png', name: 'Graveyard', audio: '../../asset/audio/grave.mp3', qrcode: '' },
  { id: 12, image: '/bat.png', name: 'Flying Bat', audio: '../../asset/audio/bat.mp3', qrcode: '' },
  { id: 13, image: '/zombie.png', name: 'Zombie', audio: '../../asset/audio/zombie.mp3', qrcode: '' },
  { id: 14, image: '/fog.png', name: 'Thick Fog', audio: '../../asset/audio/fog.mp3', qrcode: '' },
  { id: 15, image: '/clock.png', name: 'Broken Clock', audio: '../../asset/audio/clock.mp3', qrcode: '' },
];

const getCardSet = (type: CardSetType): Card[] => {
  switch (type) {
    case 'set1':
      return cardSet1;
    case 'set2':
      return cardSet2;
    case 'set3':
      return cardSet3;
    default:
      return cardSet1;
  }
};

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cardSetType, setCardSetType] = useState<CardSetType>('set1');
  const [clickOrder, setClickOrder] = useState<number[]>([]);

  const cardData = getCardSet(cardSetType);

  const setCardSet = (type: CardSetType) => {
    setCardSetType(type);
    setClickOrder([]);
  };

  const handleTempArr = (card: Card) => {
    if (clickOrder.length < cardData.length) {
      if (!clickOrder.includes(card.id)) {
        setClickOrder([...clickOrder, card.id]);
      } else {
        console.log(`Card ${card.id} already clicked.`);
      }
    }
  };

  const checkOrder = (array: number[]) => {
    const orders: Record<CardSetType, number[]> = {
      set1: [2, 5, 3, 1, 4],
      set2: [6, 10, 7, 8, 9],
      set3: [12, 15, 11, 13, 14],
    };
    const correctOrder = orders[cardSetType];
    const isCorrect = correctOrder.every((val, index) => val === array[index]);

    if (isCorrect) {
      alert('Order is correct');
    } else {
      alert('Order is NOT correct');
      setClickOrder([]);
    }
  };

  const getCardNumber = (cardId: number): number | null => {
    const index = clickOrder.indexOf(cardId);
    return index >= 0 ? index + 1 : null;
  };

  return (
    <CardContext.Provider
      value={{
        cardData,
        setCardSet,
        currentArray: clickOrder,
        handleTempArr,
        checkOrder,
        getCardNumber,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
