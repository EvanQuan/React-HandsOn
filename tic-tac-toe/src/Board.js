// @ts-check
import React from 'react';
import Square from './Square';
import SquareState from './SquareState';
import BoardState from './BoardState';

/**
 * A Tic-Tac-Toe board. Contains a {@link BoardState}
 */
class Board extends React.Component {

    /**
     * Default constructor.
     * @param {any} props immutable data to render
     */
    constructor(props) {
        super(props);

        this.state = {
            /**
             * @type {BoardState} squares 9x9 grid of {@link Square} values.
             */
            boardState: new BoardState(),

            /**
             * @type {string} The next player to move.
             */
            nextPlayer: SquareState.PLAYER_X
        }
    }

    /**
     * @returns {JSX.Element} the contents of the board to render.
     */
    render() {
        /**
         * @type {string} Title displaying the next player to go, or if the game
         *                has already been won.
         */
        const status = this.state.boardState
            .getStatus(this.state.nextPlayer);

        return (
            <div style={{ textAlign: 'center' }}>
                {status}
                {this.state.boardState.map((row, rowIndex) =>
                    <div key={rowIndex}>
                        {row.map((square, columnIndex) => this.renderSquare(square, rowIndex, columnIndex))}
                    </div>
                )}
            </div>
        );
    }

    /**
     * Handle clicking a square in the board grid.
     * @param {number} row index of the board grid that was clicked.
     * @param {number} column index of the board grid that was clicked.
     */
    handleClick(row, column) {
        /**
         * @type {BoardState} Shallow copy of squares.
         */
        const boardState = this.state.boardState;

        // Do nothing if the game is already over or if a player has already
        // filled the square.
        if (
            boardState.at(row, column) !== SquareState.EMPTY
            || boardState.getWinner() !== SquareState.EMPTY
        ) {
            return;
        }

        const updatedBoardState = boardState
            .update(row, column, this.state.nextPlayer);

        // Update the board.
        this.setState({ squares: updatedBoardState });

        // Update the next next player.
        this.toggleNextPlayer();
    }

    /**
     * Toggle the next player to move.
     */
    toggleNextPlayer() {
        this.setState({
            nextPlayer:
                this.state.nextPlayer === SquareState.PLAYER_X
                    ? SquareState.PLAYER_O
                    : SquareState.PLAYER_X
        });
    }

    /**
     * @param {string} value of the square on the board.
     * @param {number} row of the square on the board.
     * @param {number} column of the square on the board.
     * @returns {JSX.Element} The square to render.
     */
    renderSquare(value, row, column) {
        return (
            <Square
                key={row + column}
                value={value}
                onClick={() => this.handleClick(row, column)}
            />
        );
    }

}

export default Board;