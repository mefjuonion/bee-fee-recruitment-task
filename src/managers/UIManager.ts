import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import { GameEvents, ScoreChange } from 'src/core/events';
import UI from 'src/utils/UI';

class UIManager {
  constructor(private readonly events: PIXI.EventEmitter<GameEvents>) {
    autoBind(this);
    this.registerEventListeners();
    this.registerDomListeners();
  }

  private handleScoreChanged(change: ScoreChange): void {
    UI.score().textContent = change.current.toString();
  }

  private handleLevelChanged(levelName: string): void {
    UI.level().textContent = levelName;
  }

  private handleLevelComplete(levelName: string): void {
    UI.levelTransitionMessage().textContent = `${levelName} zaliczony! Przejść dalej?`;
    UI.levelTransition().style.visibility = 'visible';
  }

  private handleContinueClick(): void {
    UI.levelTransition().style.visibility = 'hidden';
    this.events.emit('continueLevel');
  }

  private handleGameOver(): void {
    UI.gameOverLevel().textContent = UI.level().textContent;
    UI.gameOver().style.visibility = 'visible';
  }

  private handleGameWon(score: number): void {
    UI.gameWonScore().textContent = score.toString();
    UI.gameWon().style.visibility = 'visible';
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
    UI.levelTransitionContinue().addEventListener('click', this.handleContinueClick);
    UI.gameOverRestart().addEventListener('click', this.handleRestartClick);
    UI.gameWonRestart().addEventListener('click', this.handleRestartClick);
  }
}

export default UIManager;