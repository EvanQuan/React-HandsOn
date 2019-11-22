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
            boardState: BoardState.EMPTY,

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
        const status = getStatus(this.state.boardState, this.state.nextPlayer);

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

        debugger;
        // Do nothing if the game is already over or if a player has already filled
        // the square.
        if (
            boardState.at(row, column) !== SquareState.EMPTY
            || calculateWinner(boardState) !== SquareState.EMPTY
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
                this.state.nextPlayer === SquareState.PLAYER_X ? SquareState.PLAYER_O :
                    SquareState.PLAYER_X
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

/**
 * Get the winner of a row if it is entirely filled by a player.
 *
 * @param {string} winner if already found; otherwise {@link State.EMPTY}.
 * @param {BoardState} boardState game board grid.
 * @param {number[][]} line indices
 * @return {string} the winner if it exists; otherwise {@link State.EMPTY}.
 */
function getWinner(winner, boardState, line) {
    const [
        [row1, column1],
        [row2, column2],
        [row3, column3]
    ] = line;

    return (
        boardState.at(row1, column1) !== SquareState.EMPTY
        && boardState.at(row1, column1) === boardState.at(row2, column2)
        && boardState.at(row2, column2) === boardState.at(row3, column3)
    )
        ? boardState.at(row1, column1)
        : winner;
}

/**
 * Calculate the winner of the game given the specified game board grid.
 *
 * @param {BoardState} boardState game board grid.
 * @returns {string} The winner of the game; otherwise, {@link State.EMPTY};
 */
function calculateWinner(boardState) {
    /**
     * @type {number[][][]} Arrays of points that constitute a line in the grid.
     */
    const lines = [
        // Horizontal
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Vertical
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonal
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];

    /**
     * @param {string} winner if already found; otherwise {@link State.EMPTY}.
     * @param {number[][]} line indices
     */
    const getWinnerOfBoard = (winner, line) => getWinner(winner, boardState, line);

    return lines.reduce(getWinnerOfBoard, SquareState.EMPTY);
}

/**
 * Get the status of the game.
 *
 * @param {BoardState} boardState game board grid.
 * @param {string} nextPlayer next player to move.
 * @returns {string} the status of the game.
 */
function getStatus(boardState, nextPlayer) {
    /**
     * @type {string} calculated winner.
     */
    const winner = calculateWinner(boardState);
    return (
        winner === SquareState.EMPTY
            ? 'Next player: ' + nextPlayer
            : 'Winner: ' + winner
    );
}