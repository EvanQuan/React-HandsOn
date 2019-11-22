// @ts-check
import SquareState from './SquareState';

/**
 * A board state.
 */
class BoardState {

    /**
     * @returns {BoardState} An empty board state.
     */
    static EMPTY = new BoardState();

    /**
     * Creates a new board state with the given square values.
     *
     * @param {string[][]} squares
     */
    constructor(squares = null) {
        /**
         * @type {string[][]} 9x9 grid.
         */
        this.squares = squares === null ?
            [
                [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
                [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
                [SquareState.EMPTY, SquareState.EMPTY, SquareState.EMPTY],
            ] :
            squares;
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
        var squaresCopy = this.squares.slice();
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
}

export default BoardState;