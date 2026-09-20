export interface GameEvents {
    scoreChanged: [score: number];
    livesChanged: [lives: number];
    levelChanged: [levelName: string];
    levelComplete: [levelName: string];
    continueLevel: [];
    gameOver: [score: number];
    windowFocusChanged: [isFocused: boolean];
}
