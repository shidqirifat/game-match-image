import React from 'react';
import { millisToTimer } from '../utils/time';

export default function HighScore({ score, onReset, isFinished }) {
  if (score < 1) return null;
  return (
    <div className="flex gap-2 items-center">
      <div className="px-3 py-2 bg-blue-200 w-max rounded-md">
        <h2>
          Your High Score:{' '}
          {millisToTimer({ time: score, type: 'minute', label: 'min ', invisibleEmpty: true })}
          {millisToTimer({ time: score, type: 'second', label: 'sec' })}
        </h2>
      </div>
      {isFinished && (
        <button
          onClick={onReset}
          className="bg-red-500 hover:bg-red-600 transition py-2 px-3 rounded-md w-max text-white font-semibold">
          Reset High Score
        </button>
      )}
    </div>
  );
}
