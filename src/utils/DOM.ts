class DOM {
  public static welcomePage(): HTMLDivElement {
    return document.getElementById('welcome-page') as HTMLDivElement;
  }

  public static welcomeStartButton(): HTMLButtonElement {
    return document.getElementById('welcome-start-button') as HTMLButtonElement;
  }

  public static score(): HTMLSpanElement {
    return document.getElementById('score') as HTMLSpanElement;
  }

  public static level(): HTMLSpanElement {
    return document.getElementById('level') as HTMLSpanElement;
  }

  public static levelTransition(): HTMLDivElement {
    return document.getElementById('level-transition') as HTMLDivElement;
  }

  public static levelTransitionMessage(): HTMLParagraphElement {
    return document.getElementById('level-transition-message') as HTMLParagraphElement;
  }

  public static levelTransitionContinue(): HTMLButtonElement {
    return document.getElementById('level-transition-continue') as HTMLButtonElement;
  }

  public static gameOver(): HTMLDivElement {
    return document.getElementById('game-over') as HTMLDivElement;
  }

  public static gameOverLevel(): HTMLElement {
    return document.getElementById('game-over-level') as HTMLElement;
  }

  public static gameOverRestart(): HTMLButtonElement {
    return document.getElementById('game-over-restart') as HTMLButtonElement;
  }

  public static gameWon(): HTMLDivElement {
    return document.getElementById('game-won') as HTMLDivElement;
  }

  public static gameWonScore(): HTMLElement {
    return document.getElementById('game-won-score') as HTMLElement;
  }

  public static gameWonRestart(): HTMLButtonElement {
    return document.getElementById('game-won-restart') as HTMLButtonElement;
  }
}

export default DOM;
