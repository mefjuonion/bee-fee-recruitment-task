const UI = {
  score: () => document.getElementById('score') as HTMLSpanElement,
  lives: () => document.getElementById('lives') as HTMLSpanElement,
  level: () => document.getElementById('level') as HTMLSpanElement,
  levelTransition: () => document.getElementById('level-transition') as HTMLDivElement,
  levelTransitionMessage: () => document.getElementById('level-transition-message') as HTMLParagraphElement,
  levelTransitionContinue: () => document.getElementById('level-transition-continue') as HTMLButtonElement,
  gameOver: () => document.getElementById('game-over') as HTMLDivElement,
};

export default UI;