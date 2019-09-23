import React from 'react';
import Player from './player';
import DispalyDices from './display-dices';

export default class PigGame extends React.Component {
    constructor(props){
        super(props);
        this.handleRandomNumber = this.handleRandomNumber.bind(this);
        this.startGame = this.startGame.bind(this);
        this.holdScore = this.holdScore.bind(this);
        this.getFinalScore = this.getFinalScore.bind(this);
        this.changePlaceholder = this.changePlaceholder.bind(this);
        this.state = {
            game: true,
            disabled: false,
            activePlayer: 0,
            score: [0, 0],
            roundScore: 0,
            dice1: 1,
            dice2: 1,
            finalScore: 100
        };
        
    }
   
    componentDidUpdate(prevProps, prevState){

        // CHECK IF WON
        if (this.state.score[0] >= this.state.finalScore || this.state.score[1] >= this.state.finalScore) {
            this.state.finalScore = 30;
            this.state.game = false;
        }   

        if (this.state.score[0] !== prevState.score[0] || this.state.score[1] !== prevState.score[1]){
            this.state.activePlayer = this.changeActivePlayer();
            } else if (this.state.dice1 === 6 && this.state.dice2 === 6 || this.state.dice1 === 1 || this.state.dice2 === 1) {
                this.state.activePlayer = this.changeActivePlayer();
        }
    }

    changePlaceholder() {
        return this.state.finalScore === 100 ? 'Final Score' : this.state.finalScore;
    }

    changeActivePlayer() {
       return this.state.activePlayer === 0 ? 1 : 0;
    }

    getRandomNumber() {
        return Math.floor(Math.random() * 6) + 1
    }

    handleRandomNumber() {
        if(this.state.game) {
            //GET RANDOM NUMBER
            const dice1 = this.getRandomNumber();
            const dice2 = this.getRandomNumber();
            let roundScore;
    
            //ROLL DICES
            if (dice1 === 6 && dice2 === 6) {
                this.setState(() => ({ 
                    roundScore: 0,
                    score: this.state.activePlayer ? [this.state.score[0], 0] : [0, this.state.score[1]],
                    dice1,
                    dice2,
                    disabled: true
                }));
                alert('Ops! Double six!');
            } else if (dice1 !== 1 && dice2 !== 1) { 
                roundScore = this.state.roundScore + dice1 + dice2;
                this.setState(() => ({ roundScore, dice1, dice2, disabled: true })); 
            } else {
                this.setState(() => ({ 
                    roundScore: 0,
                    dice1,
                    dice2,
                    disabled: true
                }));
            }
        }
    }

    // START GAME
    startGame() {
       this.setState(() => ({
            game: true,
            disabled: false,
            activePlayer: 0,
            score: [0 ,0],
            roundScore: 0,
            dice1: 1,
            dice2: 1,
            finalScore: 100
       }));
    }

    getFinalScore(e) {

        let finalScore = parseInt(e.target.value);

        if (finalScore || finalScore === 0){
            e.preventDefault();

            //GET WINNING SCORE
            this.setState(() => ({ finalScore }));
        } else {
            this.setState(() => ({ finalScore: 100 }));
        }
    }
    
    holdScore() {
        if(this.state.game) {
            // HOLD SCORE
            this.setState(() => ({
                score: this.state.activePlayer ? [this.state.score[0], this.state.score[1] + this.state.roundScore] : [this.state.score[0] + this.state.roundScore, this.state.score[1]],
                roundScore: 0, 
            })); 
        }
    }

    render() {
        const namePlayer1 = 'Player 1';
        const namePlayer2 = 'Player 2';
        const nameWinner = 'Winner!';

        return (
            <div className="wrapper clearfix">
                <div className={`player-0-panel ${this.state.activePlayer === 0 ? 'active' : ''}`}>
                    <Player
                        activePlayer={this.state.activePlayer}
                        namePlayer={this.state.score[0] >= this.state.finalScore ? nameWinner : namePlayer1}
                        playerScore={this.state.score[0]}
                        currentScore={this.state.activePlayer === 0 ? this.state.roundScore : 0}
                    />
                </div>
            
                <div className={`player-1-panel ${this.state.activePlayer === 1 ? 'active' : ''}`}>
                    <Player
                        activePlayer={this.state.activePlayer}
                        namePlayer={this.state.score[1] >= this.state.finalScore ? nameWinner : namePlayer2}
                        playerScore={this.state.score[1]}
                        currentScore={this.state.activePlayer === 1 ? this.state.roundScore : 0}
                    />
                </div>
               
            
                <button 
                    className="btn-new"
                    onClick={this.startGame}
                >
                    <i className="icon ion-md-power"/>New game
                </button>

                <button 
                    className="btn-roll"
                    onClick={this.handleRandomNumber}
                >
                    <i className="icon ion-md-refresh" />Roll dice
                </button>

                <button 
                    className="btn-hold"
                    onClick={this.holdScore}
                >
                    <i className="icon ion-md-checkmark-circle-outline"/>Hold
                </button>

                <input
                    onChange ={this.getFinalScore}
                    name="score"
                    type="number" 
                    placeholder={this.changePlaceholder()} 
                    className="final-score" 
                    disabled={this.state.disabled}
                    value=''
                />
        
                <DispalyDices
                    dice1={this.state.dice1}
                    dice2={this.state.dice2}
                />
            </div>
        );
    }
}