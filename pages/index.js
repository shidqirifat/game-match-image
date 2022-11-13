import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CardItem from '../components/CardItem';
import HighScore from '../components/HighScore';
import PopUpStartGame from '../components/PopUpStartGame';
import StopWatch from '../components/Stopwatch';
import { congratulations } from '../components/WonEffect';
import { GENERATE_RANDOM_IMAGES } from '../utils/GAME';

const CARD_COUNT_TEMPLATE = {
  easy: 4,
  medium: 8,
  hard: 12,
  expert: 16
};

export default function Home() {
  const router = useRouter();
  const [cardCount, setCardCount] = useState(null);
  const [popUpActive, setPopUpActive] = useState('');
  const [highScore, setHighScore] = useState(0);
  const [isFinishGame, setIsFinishGame] = useState(false);
  const [isStartGame, setIsStartGame] = useState(false);
  const [isNewGame, setIsNewGame] = useState(true);
  const [currentFlip, setCurrentFlip] = useState([]);
  const [flipItems, setFlipItems] = useState([]);
  const [randomImages, setRandomImages] = useState([]);

  const onCancelNewGame = () => {
    setPopUpActive('');
    setHighScore(localStorage.getItem('high-score') || 0);
  };

  const handleResetScore = () => {
    localStorage.setItem('high-score', 0);
    setHighScore(0);
  };

  const handleStartGame = () => {
    setTimeout(() => setIsStartGame(true), isFinishGame ? 1000 : 0);
    setIsFinishGame(false);
    setIsNewGame(true);
    setPopUpActive('');
  };

  const checkIsItemFlip = ({ id, uuid }) =>
    currentFlip.find((item) => item.id === id) || flipItems.includes(uuid);

  const handleGameIsRunning = () => setIsNewGame(false);

  const handleFlipCard = ({ id, uuid }) => {
    if (checkIsItemFlip({ id, uuid }) || !isStartGame) return;
    if (isFinishGame) return askPlayAgain();

    setCurrentFlip((prevFlip) => [...prevFlip, { id, uuid }]);
  };

  const askPlayAgain = () => setPopUpActive('new-game');

  const handleFinishGame = () => {
    setIsFinishGame(true);
    setIsStartGame(false);
    congratulations();
    setTimeout(() => askPlayAgain(), 1000);
  };

  useEffect(() => {
    if (flipItems.length === cardCount) return handleFinishGame();
    if (currentFlip.length < 2) return;

    if (currentFlip[0].uuid === currentFlip[1].uuid)
      setFlipItems((prev) => [...prev, currentFlip[0].uuid]);

    setTimeout(() => setCurrentFlip([]), 500);
  }, [currentFlip]);

  useEffect(() => {
    setCurrentFlip([]);
    setFlipItems([]);
    setRandomImages(GENERATE_RANDOM_IMAGES(cardCount));
    setHighScore(localStorage.getItem('high-score') || 0);
  }, [isNewGame]);

  useEffect(() => {
    const count = CARD_COUNT_TEMPLATE[router.query?.level];
    setCardCount(count || 8);
    setRandomImages(GENERATE_RANDOM_IMAGES(count || 8));
  }, [router]);

  return (
    <>
      {popUpActive === 'new-game' && (
        <PopUpStartGame onCancel={onCancelNewGame} onStart={handleStartGame} />
      )}
      <StopWatch
        isStart={isStartGame}
        isFinished={isFinishGame}
        isReset={isNewGame}
        handleGameIsRunning={handleGameIsRunning}
        highScore={highScore}
      />
      <div className="flex justify-between items-center gap-4">
        <HighScore score={highScore} onReset={handleResetScore} isFinished={isFinishGame} />
        {!isStartGame && (
          <button
            onClick={askPlayAgain}
            className="bg-green-400 hover:bg-green-500/80 transition rounded-lg py-2 px-4 text-lg">
            New Game
          </button>
        )}
      </div>
      <div className="grid grid-cols-4 gap-4 min-w-[80vw] max-w-4xl mx-auto mt-4">
        {randomImages.map((item, index) => (
          <CardItem
            key={index}
            item={item}
            onClick={() => handleFlipCard({ id: item.id, uuid: item.uuid })}
            isFlip={!!checkIsItemFlip({ id: item.id, uuid: item.uuid })}
            isStart={isStartGame}
            level={router.query?.level || 'easy'}
          />
        ))}
      </div>
    </>
  );
}
