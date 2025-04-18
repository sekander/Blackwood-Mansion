import React, { createContext, useContext, useState } from 'react';

export interface Card {
  id: number;
  name: string;
  image: string;
  audio: string;
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
  { id: 1, name: 'Fallen Object', image: '/projects/blackwood-mansion/assets/images/fall_object.webp',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_1_mixdown.mp3'},
  { id: 2, name: 'Suspicious Whispers', image: '/projects/blackwood-mansion/assets/images/whisper_image.webp',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_2_mixdown.mp3'},
  { id: 3, name: 'Bloody Knife', image: '/projects/blackwood-mansion/assets/images/bloody_knife.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_3_mixdown.mp3'},
  { id: 4, name: 'Torn Curtain', image: '/projects/blackwood-mansion/assets/images/torn_curtain.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_4_mixdown.mp3'},
  { id: 5, name: 'Locked Diary', image: '/projects/blackwood-mansion/assets/images/locked_diary.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_5_mixdown.mp3'},
  { id: 6, name: 'Locked Diary', image: '/projects/blackwood-mansion/assets/images/locked_diary.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_6_mixdown.mp3'},
  { id: 7, name: 'Locked Diary', image: '/projects/blackwood-mansion/assets/images/locked_diary.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_7_mixdown.mp3'},
  { id: 8, name: 'Locked Diary', image: '/projects/blackwood-mansion/assets/images/locked_diary.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_8_mixdown.mp3'},
  { id: 9, name: 'Locked Diary', image: '/projects/blackwood-mansion/assets/images/locked_diary.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_1_SFX_9_mixdown.mp3'},
];

const cardSet2: Card[] = [
  { id: 10, name: 'Ghost', image: '/projects/blackwood-mansion/assets/images/ghost.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_2_SFX_1_mixdown.mp3'},
  { id: 11, name: 'Broken Mirror', image: '/projects/blackwood-mansion/assets/images/mirror.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_2_SFX_2_mixdown.mp3'},
  { id: 12, name: 'Creepy Shadow', image: '/projects/blackwood-mansion/assets/images/shadow.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_2_SFX_3_mixdown.mp3'},
  { id: 13, name: 'Scary Clown', image: '/projects/blackwood-mansion/assets/images/clown.png', audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_2_SFX_4_mixdown.mp3'},
  { id: 14, name: 'Haunted Doll', image:'/projects/blackwood-mansion/assets/images/doll.png', audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_2_SFX_5_mixdown.mp3'},
  { id: 15, name: 'Haunted Doll', image:'/projects/blackwood-mansion/assets/images/doll.png', audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_2_SFX_6_mixdown.mp3'},
];

const cardSet3: Card[] = [
  { id: 16, name: 'Graveyard', image: '/projects/blackwood-mansion/assets/images/grave.png', audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_3_SFX_1_mixdown.mp3'},
  { id: 17, name: 'Flying Bat', image: '/projects/blackwood-mansion/assets/images/bat.png', audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_3_SFX_2_mixdown.mp3'},
  { id: 18, name: 'Zombie', image: '/projects/blackwood-mansion/assets/images/zombie.png', audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_3_SFX_3_mixdown.mp3'},
  { id: 19, name: 'Thick Fog', image: '/projects/blackwood-mansion/assets/images/fog.png', audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_3_SFX_4_mixdown.mp3'},
  { id: 20, name: 'Broken Clock',image: '/projects/blackwood-mansion/assets/images/clock.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_3_SFX_5_mixdown.mp3'},
  { id: 21, name: 'Broken Clock',image: '/projects/blackwood-mansion/assets/images/clock.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_3_SFX_6_mixdown.mp3'},
  { id: 22, name: 'Broken Clock',image: '/projects/blackwood-mansion/assets/images/clock.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_3_SFX_7_mixdown.mp3'},
  { id: 23, name: 'Broken Clock',image: '/projects/blackwood-mansion/assets/images/clock.png',  audio: '/projects/blackwood-mansion/assets/audio/CHAPTER_3_SFX_8_mixdown.mp3'},
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
      set1: [2, 5, 3, 1, 4, 6, 7, 8, 9],
      set2: [10, 11, 12, 13, 14, 15],
      set3: [16, 17, 18, 19, 20, 21, 22, 23],
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
