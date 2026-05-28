import confetti from 'canvas-confetti';

export function useConfetti() {
  const burst = (opts?: { colors?: string[]; origin?: { x: number; y: number } }) => {
    confetti({
      particleCount: 120,
      spread: 80,
      startVelocity: 45,
      origin: opts?.origin ?? { x: 0.5, y: 0.6 },
      colors: opts?.colors ?? ['#F24E6F', '#29B6C5', '#2196F3', '#f59e0b', '#ffffff'],
      ticks: 200,
    });
  };

  const levelUp = () => {
    // Two side cannons
    confetti({ particleCount: 80, angle: 60,  spread: 55, origin: { x: 0, y: 0.65 }, colors: ['#F24E6F', '#f59e0b', '#ffffff'] });
    confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.65 }, colors: ['#29B6C5', '#2196F3', '#ffffff'] });
  };

  const achievement = () => {
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#f59e0b', '#fbbf24', '#ffffff', '#F24E6F'],
      shapes: ['star'],
      scalar: 1.4,
    });
  };

  const streak = (days: number) => {
    const count = Math.min(200, days * 25);
    confetti({ particleCount: count, spread: 100, origin: { x: 0.5, y: 0.55 }, colors: ['#F24E6F', '#ff7a00', '#f59e0b'] });
  };

  return { burst, levelUp, achievement, streak };
}
