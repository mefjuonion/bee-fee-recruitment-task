export interface ScoreChange {
    previous: number;
    current: number;
}

export interface GameEvents {
    scoreChanged: [change: ScoreChange];
    levelChanged: [levelName: string];
    levelComplete: [levelName: string];
    continueLevel: [];
    gameOver: [];
    windowFocusChanged: [isFocused: boolean];
}
