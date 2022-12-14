import React, { useEffect, useState } from 'react';
import { DELAY_FLIPPED } from '../utils/GAME';
import { millisToTimer } from '../utils/time';

function StopWatch({
  isStart,
  isFinished = false,
  isReset = false,
  handleGameIsRunning,
  highScore,
  level
}) {
  const [time, setTime] = useState(0);
  const [isDelayed, setIsDelayed] = useState(true);

  const handleReset = () => setTime(0);

  useEffect(() => {
    let interval = null;
    if (isStart) setTimeout(() => setIsDelayed(false), DELAY_FLIPPED[level] || 2000);

    if (!isFinished && isStart && !isDelayed) {
      handleGameIsRunning();
      interval = setInterval(() => {
        setTime((time) => time + 1000);
      }, 1000);
    } else {
      if ((highScore == 0 || time < highScore) && isFinished)
        localStorage.setItem('high-score', time);
      if (isFinished) setIsDelayed(true);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isFinished, isStart, isDelayed]);

  useEffect(() => {
    if (isReset) handleReset();
  }, [isReset]);

  return (
    <div className="rounded-2xl p-3 bg-green-400 w-max mb-4 mx-auto flex items-center gap-1 font-medium text-xl sticky top-10 z-20">
      <h1>{millisToTimer({ time, type: 'minute' })}</h1>
      <span>:</span>
      <h1>{millisToTimer({ time, type: 'second' })}</h1>
    </div>
  );
}

export default StopWatch;
