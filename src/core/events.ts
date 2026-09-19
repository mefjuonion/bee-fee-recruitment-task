export interface GameEvents {
    scoreChanged: [score: number];
    livesChanged: [lives: number];
    levelChanged: [levelName: string];
    levelComplete: [levelName: string];
    continueLevel: [];
    gameOver: [];
    win: [score: number];
    windowFocusChanged: [isFocused: boolean];
}

export interface CollisionEvents {
    collision: [score: number];
    livesChanged: [lives: number];
    gameOver: [];
}
