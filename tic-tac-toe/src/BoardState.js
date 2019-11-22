// @ts-check
import SquareState from './SquareState';

/**
 * A board state.
 */
class BoardState {

    /**
     * @type {string[][]} 9x9 grid.
     */
    squares;

    /**
     * Creates a new board state with the given square values.
     *
     * @param {string[][]} squares
     */
    constructor(squares = null) {
        this.squares = squares === null
            ? [
                [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
                [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
                [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
            ]
            : squares;
    }

    /**
     * Get the square state at a given position.
     *
     * @param {number} row in the grid.
     * @param {number} column in the grid.
     * @returns {string} the square state at the given position.
     */
    at(row, column) {
        return this.squares[row][column];
    }

    /**
     * Calculate the winner of the game given the specified game board grid.
     *
     * @returns {string} The winner of the game; otherwise, {@link State.EMPTY};
     */
    getWinner() {
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
         * @param {string} winner
         * @param {number[][]} line
         */
        const lineWinnerReducer = (winner, line) =>
            this.getLineWinner(winner, line);

        return lines.reduce(
            lineWinnerReducer,
            SquareState.EMPTY);
    }

    /**
     * Get the status of the game.
     *
     * @param {string} nextPlayer next player to move.
     * @returns {string} the status of the game.
     */
    getStatus(nextPlayer) {
        /**
         * @type {string} calculated winner.
         */
        const winner = this.getWinner();
        return (
            winner === SquareState.EMPTY
                ? 'Next player: ' + nextPlayer
                : 'Winner: ' + winner
        );
    }

    /**
     * Return a copy of a new board state with the updated value.
     *
     * @param {number} row in the grid.
     * @param {number} column in the grid.
     * @param {string} value Updated value at the given position.
     * @returns {BoardState} a new copy of the board state with the updated
     *                       value.
     */
    update(row, column, value) {
        const squaresCopy = this.squares.slice();
        squaresCopy[row][column] = value;
        return new BoardState(squaresCopy);
    }

    /**
     * Map {@link callbackfn} over each square in this board state.
     *
     * @param {(value: string[], index: number, array: string[][]) => any} callbackfn
     *        Function to apply to each square in the board state.
     * @returns {any} The board with values retrieved from {@link callbackfn}
     */
    map(callbackfn) {
        return this.squares.map(callbackfn)
    }

    /**
     * Get the winner of a row if it is entirely filled by a player.
     *
     * @param {string} winner if already found; otherwise {@link State.EMPTY}.
     * @param {number[][]} line indices
     * @return {string} the winner if it exists; otherwise {@link State.EMPTY}.
     */
    getLineWinner(winner, line) {
        const [
            [row1, column1],
            [row2, column2],
            [row3, column3]
        ] = line;

        return (
            this.at(row1, column1) !== SquareState.EMPTY
            && this.at(row1, column1) === this.at(row2, column2)
            && this.at(row2, column2) === this.at(row3, column3)
        )
            ? this.at(row1, column1)
            : winner;
    }
}

export default BoardState;