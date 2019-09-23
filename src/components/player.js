import React from 'react';
import CurrentScore from './current-score';

const Player = (props) => (
    <div>
        <div className="player-name">{props.namePlayer}</div>
        <div className="player-score">{props.playerScore}</div>
        <CurrentScore
            currentScore={props.currentScore}
        />
    </div>
);

export default Player;