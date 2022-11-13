import Image from 'next/legacy/image';
import React, { useEffect, useState } from 'react';

const DELAY_FLIPPED = {
  easy: 1000,
  medium: 2300,
  hard: 3500,
  expert: 6000
};

export default function CardItem({ onClick, isFlip, item, isStart, level }) {
  const [isFliped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isStart) {
      setIsFlipped(true);
      setTimeout(() => setIsFlipped(false), DELAY_FLIPPED[level] || 2000);
    }
  }, [isStart]);

  useEffect(() => setIsFlipped(isFlip), [isFlip]);

  return (
    <div
      key={item.id}
      onClick={onClick}
      className={`relative overflow-hidden rounded-3xl ${isFliped ? 'flip' : ''} ${
        isStart ? 'cursor-pointer' : ''
      } shadow-md h-72`}>
      <div
        className={`bg-slate-300 absolute inset-0 z-10 transition-all ${
          isFliped ? 'flip-item' : ''
        }`}
      />
      <Image src={item.image} alt={`Image ${item.id}`} layout="fill" className="object-cover" />
    </div>
  );
}
