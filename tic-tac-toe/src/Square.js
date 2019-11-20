// @ts-check
import React from 'react';
import SquareState from './SquareState';

/**
 * A square of a grid in a Tic Tac Toe board.
 */
class Square extends React.Component {

  /**
   * @returns {JSX.Element} the contents of the square to render.
   */
  render() {

    /**
     * Default button style.
     */
    const buttonStyleDefault = {
      width:'145px',
      height:'145px',
      backgroundColor:'cadetblue',
      color:'cadetblue',
      fontSize:'125px',
      padding:'1px !important'
    }

    /**
     * Button style for the 'O' player.
     */
    const buttonStylePlayerO = {
      width:'145px',
      height:'145px',
      backgroundColor:'darkblue',
      fontSize:'125px',
      padding:'1px !important'
    }

    /**
     * Button style for the 'X' player.
     */
    const buttonStylePlayerX = {
      width:'145px',
      height:'145px',
      backgroundColor:'darkgray',
      fontSize:'125px',
      padding:'1px !important'
    }

    return (
      <button
        style={
          this.props.value === SquareState.PLAYER_X ? buttonStylePlayerX :
          this.props.value === SquareState.PLAYER_O ? buttonStylePlayerO :
                                                buttonStyleDefault }
        onClick={() => this.props.onClick()}
        // disabled={(this.props.value === 'X'||this.props.value=== 'O')}
      >
        {this.props.value}

      </button>
    );
  }
}

export default Square;