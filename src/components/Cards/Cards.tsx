// Cards.tsx
import React from 'react';

type CardsProps = {
  image: string;  // Changed from 'img' to 'image' to match your data
  name: string;
  qrcode: string;
  audio: string;
};

export const Cards: React.FC<CardsProps> = ({ image, name, qrcode, audio }) => {
  return (
    <div className='card-container'>
      <img src={image} alt={name} width={100} /> {/* Changed prop name here */}
      <h3 className="card-title">{name}</h3>
      {qrcode && <img src={qrcode} alt="QR Code" className="qrcode" />}
      {/* {audio && (
        <audio controls>
          <source src={audio} type="audio/mpeg" />
        </audio>
      )} */}
    </div>
  );
};