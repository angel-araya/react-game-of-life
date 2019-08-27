import React from 'react';
import PropTypes from 'prop-types';

import Cell from '../Cell/Cell';

import './GameBoard.css';

function GameBoard(props) {
  const { values, handleClick } = props;

  return (
    <div className="container">
      <table>
        <tbody>
          {values.map((row, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={index}>
              {row.map((cell) => {
                console.log(/* 'adding cell with id', cell.id */);
                return (
                  <Cell
                    key={cell.id}
                    id={cell.id}
                    state={cell.state}
                    handleClick={handleClick}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

GameBoard.propTypes = {
  values: PropTypes.arrayOf(PropTypes.array),
  handleClick: PropTypes.func.isRequired,
};

GameBoard.defaultProps = {
  values: [[]],
};

export default GameBoard;
