export type ScoreChangeReason = 'gameplay' | 'levelReset';

export interface ScoreChange {
    previous: number;
    current: number;
    reason: ScoreChangeReason;
}

export interface GameEvents {
    scoreChanged: [change: ScoreChange];
    playerDamaged: [];
    levelChanged: [levelName: string];
    levelComplete: [levelName: string];
    continueLevel: [];
    gameOver: [];
    gameWon: [score: number];
    windowFocusChanged: [isFocused: boolean];
}
