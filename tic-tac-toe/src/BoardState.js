// @ts-check
import SquareState from './SquareState';

/**
 * A board state.
 */
class BoardState {

    constructor(squares = null) {
        if (squares === null) {
            /**
             * @type {string[][]} 9x9 grid.
             */
            this.squares = [
                [ SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY ],
                [ SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY ],
                [ SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY ],
            ]
        } else {
            this.squares = squares;
        }
    }

    /**
     * Return a copy of a new board state with the updated value.
     *
     * @param {number} row in the grid.
     * @param {number} column in the grid.
     * @param {string} value Updated value at the given position.
     * @returns {BoardState} a new copy of the board state with the updated value.
     */
    update(row, column, value) {
        var squaresCopy = this.#squares.slice();
        squaresCopy[row][column] = value;
        return new BoardState(squaresCopy);
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

}

export default BoardState;