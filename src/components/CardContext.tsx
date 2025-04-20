import React, { createContext, useContext, useState, useMemo } from 'react';
// import React, { createContext, useContext, useState } from 'react';

export interface Card {
  id: number;
  name: string;
  image: string;
  audio: string;
}

type CardSetType = 'set1' | 'set2' | 'set3';

interface CardContextProps {
  cardData: Card[];
  cardSetType: CardSetType;
  setCardSet: (type: CardSetType) => void;
  currentArray: number[];
  handleTempArr: (card: Card) => void;
  checkOrder: (array: number[], type: CardSetType) => void;
  getCardNumber: (cardId: number) => number | null;
  getCardSet: (type: CardSetType) => Card[];
  getSetOrder: (type: CardSetType) => number[];
  // getSetOrder: () => number[];
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
  { id: 1, name: 'Fallen Object', image: '/projects/blackwood-mansion/assets/images/1.jpeg',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_1_mixdown.mp3'},
  { id: 2, name: 'Suspicious Whispers', image: '/projects/blackwood-mansion/assets/images/2.jpeg',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_2_mixdown.mp3'},
  { id: 3, name: 'Bloody Knife', image: '/projects/blackwood-mansion/assets/images/3.jpeg',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_3_mixdown.mp3'},
  { id: 4, name: 'Torn Curtain', image: '/projects/blackwood-mansion/assets/images/4.jpeg',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_4_mixdown.mp3'},
  { id: 5, name: 'Locked Diary', image: '/projects/blackwood-mansion/assets/images/5.jpeg',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_5_mixdown.mp3'},
  { id: 6, name: 'Locked Diary', image: '/projects/blackwood-mansion/assets/images/6.jpeg',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_6_mixdown.mp3'},
  { id: 7, name: 'Locked Diary', image: '/projects/blackwood-mansion/assets/images/7.jpeg',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_7_mixdown.mp3'},
  { id: 8, name: 'Locked Diary', image: '/projects/blackwood-mansion/assets/images/8.jpeg',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_8_mixdown.mp3'},
  { id: 9, name: 'Locked Diary', image: '/projects/blackwood-mansion/assets/images/9.jpeg',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_9_mixdown.mp3'},
];

const cardSet2: Card[] = [
  { id: 1, name: 'Ghost', image: '/projects/blackwood-mansion/assets/images/10.jpeg',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_2_SFX_1_mixdown.mp3'},
  { id: 2, name: 'Broken Mirror', image: '/projects/blackwood-mansion/assets/images/11.jpeg',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_2_SFX_2_mixdown.mp3'},
  { id: 3, name: 'Creepy Shadow', image: '/projects/blackwood-mansion/assets/images/12.jpeg',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_2_SFX_3_mixdown.mp3'},
  { id: 4, name: 'Scary Clown', image: '/projects/blackwood-mansion/assets/images/13.jpeg', audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_2_SFX_4_mixdown.mp3'},
  { id: 5, name: 'Haunted Doll', image:'/projects/blackwood-mansion/assets/images/14.jpeg', audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_2_SFX_5_mixdown.mp3'},
  { id: 6, name: 'Haunted Doll', image:'/projects/blackwood-mansion/assets/images/15.jpeg', audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_2_SFX_6_mixdown.mp3'},
];

const cardSet3: Card[] = [
  { id: 1, name: 'Graveyard', image: '/projects/blackwood-mansion/assets/images/16.jpeg', audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_3_SFX_1_mixdown.mp3'},
  { id: 2, name: 'Flying Bat', image: '/projects/blackwood-mansion/assets/images/17.jpeg', audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_3_SFX_2_mixdown.mp3'},
  { id: 3, name: 'Zombie', image: '/projects/blackwood-mansion/assets/images/19.jpeg', audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_3_SFX_3_mixdown.mp3'},
  { id: 4, name: 'Thick Fog', image: '/projects/blackwood-mansion/assets/images/20.jpeg', audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_3_SFX_4_mixdown.mp3'},
  { id: 5, name: 'Broken Clock',image: '/projects/blackwood-mansion/assets/images/clock.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_3_SFX_5_mixdown.mp3'},
  { id: 6, name: 'Broken Clock',image: '/projects/blackwood-mansion/assets/images/clock.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_3_SFX_6_mixdown.mp3'},
  { id: 7, name: 'Broken Clock',image: '/projects/blackwood-mansion/assets/images/clock.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_3_SFX_7_mixdown.mp3'},
  { id: 8, name: 'Broken Clock',image: '/projects/blackwood-mansion/assets/images/clock.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_3_SFX_8_mixdown.mp3'},
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

  // const cardData = getCardSet(cardSetType);
  const cardData = useMemo(() => getCardSet(cardSetType), [cardSetType]);

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

  const checkOrder = (array: number[], type: CardSetType) => {
    const orders: Record<CardSetType, number[]> = {
      set1: [2, 5, 3, 1, 4, 6, 7, 8, 9],
      set2: [1, 2, 3, 4, 5, 6],
      set3: [1, 2, 3, 4, 5, 6, 7, 8],
    };
    const correctOrder = orders[type];
    const isCorrect = correctOrder.every((val, index) => val === array[index]);

    if (isCorrect) {
      alert('Order is correct');
    } else {
      alert('Order is NOT correct');
      setClickOrder([]);
    }
  };
  const getSetOrder = (type: CardSetType): number[] => {
    const orders: Record<CardSetType, number[]> = {
      set1: [2, 5, 3, 1, 4, 6, 7, 8, 9],
      set2: [1, 2, 3, 4, 5, 6],
      set3: [1, 2, 3, 4, 5, 6, 7, 8],
    };
    return orders[type];
  };

  const getCardNumber = (cardId: number): number | null => {
    const index = clickOrder.indexOf(cardId);
    return index >= 0 ? index + 1 : null;
  };

  return (
    <CardContext.Provider
      value={{
        cardData,
        cardSetType,
        setCardSet,
        currentArray: clickOrder,
        handleTempArr,
        checkOrder,
        getCardNumber,
        // getSetOrder,
        getCardSet,
        getSetOrder,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
