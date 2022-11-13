import React from 'react';
import ShadowOverlay from './ShadowOverlay';

export default function PopUpStartGame({ onStart, onCancel }) {
  return (
    <>
      <ShadowOverlay />
      <div className="fixed translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] px-8 py-6 bg-slate-50 shadow-lg z-30 rounded-2xl">
        <h1 className="text-2xl text-black">Start New Game?</h1>
        <div className="mt-6 flex items-center gap-3 justify-center">
          <button onClick={onCancel} className="border border-black rounded-xl py-2 px-4 text-lg">
            No
          </button>
          <button
            onClick={onStart}
            className="bg-green-400 hover:bg-green-500/80 transition rounded-xl py-2 px-4 text-lg">
            Yes
          </button>
        </div>
      </div>
    </>
  );
}
