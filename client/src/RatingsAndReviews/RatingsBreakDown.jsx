import React from 'react';
import PropTypes from 'prop-types';

const RatingsBreakDown = ({ ratings, handleFilterByRating }) => (
  <div className="ratings-breakdown">
    <div
      className="sidebar star5"
      role="link"
      onClick={() => handleFilterByRating(5)}
      onKeyPress={() => { }}
      tabIndex={0}
    >
      5 stars:
      {ratings.fiveStar}
    </div>
    <div
      className="sidebar star4"
      role="link"
      onClick={() => handleFilterByRating(4)}
      onKeyPress={() => { }}
      tabIndex={0}
    >
      4 stars:
      {ratings.fourStar}
    </div>

    <div
      className="sidebar star3"
      role="link"
      onClick={() => handleFilterByRating(3)}
      onKeyPress={() => { }}
      tabIndex={0}
    >
      3 stars:
      {ratings.threeStar}
    </div>

    <div
      className="sidebar star2"
      role="link"
      onClick={() => handleFilterByRating(2)}
      onKeyPress={() => { }}
      tabIndex={0}
    >
      2 stars:
      {ratings.twoStar}
    </div>

    <div
      className="sidebar star1"
      role="link"
      onClick={() => handleFilterByRating(1)}
      onKeyPress={() => { }}
      tabIndex={0}
    >
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
  handleFilterByRating: PropTypes.func.isRequired,
};
RatingsBreakDown.defaultProps = {
  ratings: {},
};
export default RatingsBreakDown;
