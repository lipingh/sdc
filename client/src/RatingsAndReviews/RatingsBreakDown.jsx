import React from 'react';
import PropTypes from 'prop-types';
// import './ratings.css';

const RatingsBreakDown = ({ ratings }) => {
  const oneStar = parseInt(ratings['1'], 10);
  const twoStar = parseInt(ratings['2'], 10);
  const threeStar = parseInt(ratings['3'], 10);
  const fourStar = parseInt(ratings['4'], 10);
  const fiveStar = parseInt(ratings['5'], 10);
  const totalReviews = oneStar + twoStar + threeStar + fourStar + fiveStar;

  return (
    <div className="ratings-breakdown">
      <div className="sidebar star5" style={{ width: `${fiveStar / totalReviews} * 100%` }}>
        5 stars:
        {ratings['5']}
      </div>
      <div className="sidebar star4">
        4 stars:
        {ratings['4']}
      </div>

      <div className="sidebar star3">
        3 stars:
        {ratings['3']}
      </div>

      <div className="sidebar star2">
        2 stars:
        {ratings['2']}
      </div>

      <div className="sidebar star1">
        1 stars:
        {ratings['1']}
      </div>
    </div>

  );
};

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
