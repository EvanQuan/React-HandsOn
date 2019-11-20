// @ts-check
import React from 'react';
import BoardState from './BoardState';
import SquareState from './SquareState';
import Square from './Square';

/**
 * A game of Tic-Tac-Toe.
 * Tracks game state.
 */
class Game extends React.Component {

    /**
     * @param {any} props immutable data to render.
     */
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: new BoardState()
            }],

            nextPlayer: SquareState.PLAYER_X,
        }
    }


}