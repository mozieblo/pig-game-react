import React from 'react';

const DispalyDices = (props) => (
    <div style={props.dice1 === 1 || props.dice2 ===1 ? {display: 'none'} : {display: 'block'}}>
        <img src={`dist/images/dice-${props.dice1}.png`} alt="Dice" className="dice" id="dice-1" />
        <img src={`dist/images/dice-${props.dice2}.png`} alt="Dice" className="dice" id="dice-2" />
    </div>
);

export default DispalyDices;