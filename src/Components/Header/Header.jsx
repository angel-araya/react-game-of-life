/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Grid, ButtonGroup,
} from '@material-ui/core';

import './Header.css';

function Header(props) {
  const {
    increaseRows, increaseCols, decreaseRows, decreaseCols, flipCells, generation,
  } = props;
  return (
    <div>
      <div className="container">
        <div>
          <Button variant="contained" color="primary" onClick={flipCells}>
            Next Gen
          </Button>
        </div>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Grid
                container
                spacing={1}
                direction="column"
                alignItems="center"
              >
                <Grid item>
                  <ButtonGroup variant="contained" size="large">
                    <Button onClick={decreaseRows}>-</Button>
                    <Button disabled>Rows</Button>
                    <Button onClick={increaseRows}>+</Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Grid
                container
                spacing={1}
                direction="column"
                alignItems="center"
              >
                <Grid item>
                  <ButtonGroup variant="contained" size="large">
                    <Button onClick={decreaseCols}>-</Button>
                    <Button disabled>Columns</Button>
                    <Button onClick={increaseCols}>+</Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="container">
        <div>
          <h3>
            Generation: {generation}
          </h3>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  increaseRows: PropTypes.func.isRequired,
  increaseCols: PropTypes.func.isRequired,
  decreaseRows: PropTypes.func.isRequired,
  decreaseCols: PropTypes.func.isRequired,
  generation: PropTypes.string,
  flipCells: PropTypes.func.isRequired,
};

Header.defaultProps = {
  generation: '0',
};
export default Header;
