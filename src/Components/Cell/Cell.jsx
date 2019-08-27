/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import './Cell.css';

export const CELL_STATE = Object.freeze({
  ALIVE: true,
  DEAD: false,
});

function Cell({ state, id, handleClick }) {
  return (
    <td
      className={state ? 'alive' : 'dead'}
      onClick={() => { handleClick(id); }}
      key={id}
      id={id}
    />
  );
}


Cell.propTypes = {
  id: PropTypes.number.isRequired,
  state: PropTypes.oneOf([CELL_STATE.ALIVE, CELL_STATE.DEAD]).isRequired,
  handleClick: PropTypes.func,
};

Cell.defaultProps = {
  // eslint-disable-next-line no-console
  handleClick: () => { console.info('Cell click handler is not set'); },
};

export default Cell;
