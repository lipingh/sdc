import React from 'react';

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

// RatingsBreakDown.propTypes = {
//   ratings: PropTypes.object.isRequired,
//   ratings['5']: PropTypes.string.isRequired,
//   ratings['4']: PropTypes.string.isRequired,
//   ratings['3']: PropTypes.string.isRequired,
//   ratings['2']: PropTypes.string.isRequired,
//   ratings['1']: PropTypes.string.isRequired
// }
export default RatingsBreakDown;
