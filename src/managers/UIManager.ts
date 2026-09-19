import autoBind from 'auto-bind';
import * as PIXI from 'pixi.js';
import { GameEvents } from 'src/core/events';
import UI from 'src/utils/UI';

class UIManager {
  constructor(private readonly events: PIXI.EventEmitter<GameEvents>) {
    autoBind(this);
    this.registerEventListeners();
    this.registerDomListeners();
  }

  handleScoreChanged(score: number): void {
    UI.score().textContent = score.toString();
  }

  handleLivesChanged(lives: number): void {
    UI.lives().textContent = lives.toString();
  }

  handleLevelChanged(levelName: string): void {
    UI.level().textContent = levelName;
  }

  handleLevelComplete(levelName: string): void {
    UI.levelTransitionMessage().textContent = `${levelName} zaliczony! Przejść dalej?`;
    UI.levelTransition().style.display = 'flex';
  }

  handleContinueClick(): void {
    UI.levelTransition().style.display = 'none';
    this.events.emit('continueLevel');
  }

  handleGameOver(): void {
    UI.gameOver().style.display = 'flex';
  }

  registerEventListeners(): void {
    this.events.on('scoreChanged', this.handleScoreChanged);
    this.events.on('livesChanged', this.handleLivesChanged);
    this.events.on('levelChanged', this.handleLevelChanged);
    this.events.on('levelComplete', this.handleLevelComplete);
    this.events.on('gameOver', this.handleGameOver);
  }

  registerDomListeners(): void {
    UI.levelTransitionContinue().addEventListener('click', this.handleContinueClick);
  }
}

export default UIManager;