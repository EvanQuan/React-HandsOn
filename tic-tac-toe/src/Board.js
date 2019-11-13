import React, { Component } from 'react';
import Square from './Square';

/**
 * A Tic-Tac-Toe board. Contains a grid of squares.
 */
class Board extends Component {

  /**
   * Default constructor.
   * @param {Object} props immutable data to render
   */
  constructor(props) {
    super(props);

    /**
     * @type {Square[][]} squares 9x9 grid of {@link Square} values.
     */
    this.squares = [
      [ null, null, null ],
      [ null, null, null ],
      [ null, null, null ]
    ];
  }

  /**
   * @returns the contents of the board to render 
   */
  render() {
    return (
      <div>
        {this.squares.map(row =>
          <div>
            {row.map(col => <Square value={0}></Square>)}
          </div>
        )}
      </div>
    );
  }
}

export default Board;