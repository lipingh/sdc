import React from 'react';
import PropTypes from 'prop-types';

const RatingsBreakDown = ({ ratings }) => (
  <div>
    <div>
      5 stars:
      {ratings['5']}
    </div>
    <br />
    <div>
      4 stars:
      {ratings['4']}
    </div>
    <br />
    <div>
      3 stars:
      {ratings['3']}
    </div>
    <br />
    <div>
      2 stars:
      {ratings['2']}
    </div>
    <br />
    <div>
      1 stars:
      {ratings['1']}
    </div>
  </div>
);

RatingsBreakDown.propTypes = {
  ratings: PropTypes.shape({
    1: PropTypes.string,
    2: PropTypes.string,
    3: PropTypes.string,
    4: PropTypes.string,
    5: PropTypes.string,
  }),
};
RatingsBreakDown.defaultProps = {
  ratings: {},
};
export default RatingsBreakDown;
