import React, { Component } from 'react';
/**
 * A square of a grid in a Tic Tac Toe board.
 */
class Square extends Component {

  /**
   * @returns the contents of the square to render.
   */
  render() {
    return (
      <button>
        {this.props.value}
      </button>
    );
  }
}

export default Square;