import confetti from 'canvas-confetti';

const COUNT = 300;
const DEFAULTS = {
  origin: { y: 0.7 }
};

const fire = async (particleRatio, opts) => {
  await confetti(
    Object.assign({}, DEFAULTS, opts, {
      particleCount: Math.floor(COUNT * particleRatio)
    })
  );
};

export const congratulations = () => {
  fire(0.25, {
    spread: 32,
    startVelocity: 55
  });

  fire(0.2, {
    spread: 60
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45
  });
};
