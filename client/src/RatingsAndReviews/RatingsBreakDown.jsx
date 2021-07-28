import React from 'react';
import PropTypes from 'prop-types';
// import './ratings.css';

const RatingsBreakDown = ({ ratings }) => (
  <div className="ratings-breakdown">
    <div className="sidebar star5">
      5 stars:
      {ratings.fiveStar}
    </div>
    <div className="sidebar star4">
      4 stars:
      {ratings.fourStar}
    </div>

    <div className="sidebar star3">
      3 stars:
      {ratings.threeStar}
    </div>

    <div className="sidebar star2">
      2 stars:
      {ratings.twoStar}
    </div>

    <div className="sidebar star1">
      1 stars:
      {ratings.oneStar}
    </div>
  </div>

);

RatingsBreakDown.propTypes = {
  ratings: PropTypes.shape({
    oneStar: PropTypes.number,
    twoStar: PropTypes.number,
    threeStar: PropTypes.number,
    fourStar: PropTypes.number,
    fiveStar: PropTypes.number,
  }),
};
RatingsBreakDown.defaultProps = {
  ratings: {},
};
export default RatingsBreakDown;
