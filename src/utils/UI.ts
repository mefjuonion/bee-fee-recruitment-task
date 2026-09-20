const UI = {
  welcomePage: () => document.getElementById('welcome-page') as HTMLDivElement,
  welcomeStartButton: () => document.getElementById('welcome-start-button') as HTMLButtonElement,
  score: () => document.getElementById('score') as HTMLSpanElement,
  level: () => document.getElementById('level') as HTMLSpanElement,
  levelTransition: () => document.getElementById('level-transition') as HTMLDivElement,
  levelTransitionMessage: () => document.getElementById('level-transition-message') as HTMLParagraphElement,
  levelTransitionContinue: () => document.getElementById('level-transition-continue') as HTMLButtonElement,
  gameOver: () => document.getElementById('game-over') as HTMLDivElement,
  gameOverLevel: () => document.getElementById('game-over-level') as HTMLElement,
  gameOverRestart: () => document.getElementById('game-over-restart') as HTMLButtonElement,
};

export default UI;