import React from 'react';

const CurrentScore = (props) => (
    <div className="player-current-box">
        <div className="player-current-label">Current</div>
        <div className="player-current-score">{props.currentScore}</div>
    </div>
);

export default CurrentScore;