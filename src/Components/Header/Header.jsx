/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Grid, ButtonGroup, Slider,
} from '@material-ui/core';

import './Header.css';

const sliderMarks = [
  { value: 100, label: '100ms' },
  { value: 500, label: '0.5s' },
  { value: 1000, label: '1s' },
  { value: 1500, label: '1.5s' },
  { value: 2000, label: '2s' },
  { value: 2500, label: '2.5s' },

];

function Header(props) {
  const {
    increaseRows,
    increaseCols,
    decreaseRows,
    decreaseCols,
    calcNextGen,
    generation,
    play,
    pause,
    waitTime,
    updateWaitTime,
    randomize,
  } = props;
  return (
    <div>
      <div className="container">
        <div>
          <Button variant="contained" color="primary" onClick={calcNextGen}>
            Next Gen
          </Button>
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={randomize}>
            Randomize
          </Button>
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={play}>
            Play
          </Button>
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={pause}>
            Pause
          </Button>
        </div>
        <div style={{ display: 'none' }}>
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
        <div style={{ display: 'none' }}>
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
        <Slider
          defaultValue={waitTime}
          step={100}
          marks={sliderMarks}
          min={100}
          max={2500}
          getAriaValueText={(value) => value}
          onChange={(e, value) => updateWaitTime(value)}
        />
      </div>
      <div className="container" style={{ display: 'none' }}>
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
  generation: PropTypes.number,
  calcNextGen: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  waitTime: PropTypes.number.isRequired,
  updateWaitTime: PropTypes.func.isRequired,
  randomize: PropTypes.func.isRequired,
};

Header.defaultProps = {
  generation: 0,
};
export default Header;
