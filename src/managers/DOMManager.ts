import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import { GameEvents, ScoreChange } from 'src/core/events';
import DOM from 'src/utils/DOM';

class DOMManager {
  constructor(private readonly events: PIXI.EventEmitter<GameEvents>) {
    autoBind(this);
    this.registerEventListeners();
    this.registerDomListeners();
  }

  private handleScoreChanged(change: ScoreChange): void {
    DOM.score().textContent = change.current.toString();
  }

  private handleLevelChanged(levelName: string): void {
    DOM.level().textContent = levelName;
  }

  private handleLevelComplete(levelName: string): void {
    DOM.levelTransitionMessage().textContent = `${levelName} zaliczony! Przejść dalej?`;
    DOM.levelTransition().style.visibility = 'visible';
  }

  private handleContinueClick(): void {
    DOM.levelTransition().style.visibility = 'hidden';
    this.events.emit('continueLevel');
  }

  private handleGameOver(): void {
    DOM.gameOverLevel().textContent = DOM.level().textContent;
    DOM.gameOver().style.visibility = 'visible';
  }

  private handleGameWon(score: number): void {
    DOM.gameWonScore().textContent = score.toString();
    DOM.gameWon().style.visibility = 'visible';
  }

  private handleRestartClick(): void {
    location.reload();
  }

  private registerEventListeners(): void {
    this.events.on('scoreChanged', this.handleScoreChanged);
    this.events.on('levelChanged', this.handleLevelChanged);
    this.events.on('levelComplete', this.handleLevelComplete);
    this.events.on('gameOver', this.handleGameOver);
    this.events.on('gameWon', this.handleGameWon);
  }

  private registerDomListeners(): void {
    DOM.levelTransitionContinue().addEventListener('click', this.handleContinueClick);
    DOM.gameOverRestart().addEventListener('click', this.handleRestartClick);
    DOM.gameWonRestart().addEventListener('click', this.handleRestartClick);
  }
}

export default DOMManager;
