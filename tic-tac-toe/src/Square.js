// @ts-check
import React from 'react';
import SquareState from './SquareState';
import SquareStyle from './SquareStyle';

/**
 * A square of a grid in a Tic Tac Toe board.
 */
class Square extends React.Component {

    /**
     * @returns {JSX.Element} the contents of the square to render.
     */
    render() {
        return (
            <button
                style={
                    this.props.value === SquareState.PLAYER_X
                        ? SquareStyle.PLAYER_X
                        : this.props.value === SquareState.PLAYER_O
                            ? SquareStyle.PLAYER_O
                            : SquareStyle.DEFAULT}
                onClick={this.props.onClick}
            >
                {this.props.value}

            </button>
        );
    }
}

export default Square;