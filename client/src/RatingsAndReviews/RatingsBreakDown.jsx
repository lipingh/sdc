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
      <span className="star-label">5 stars:</span>
      <span>{ratings.fiveStar}</span>
    </div>
    <div
      className="sidebar star4"
      role="link"
      onClick={() => handleFilterByRating(4)}
      onKeyPress={() => { }}
      tabIndex={0}
    >
      <span className="star-label">4 stars:</span>
      <span>{ratings.fourStar}</span>
    </div>

    <div
      className="sidebar star3"
      role="link"
      onClick={() => handleFilterByRating(3)}
      onKeyPress={() => { }}
      tabIndex={0}
    >
      <span className="star-label">3 stars:</span>
      <span>{ratings.threeStar}</span>
    </div>

    <div
      className="sidebar star2"
      role="link"
      onClick={() => handleFilterByRating(2)}
      onKeyPress={() => { }}
      tabIndex={0}
    >
      <span className="star-label">2 stars:</span>
      <span>{ratings.twoStar}</span>
    </div>

    <div
      className="sidebar star1"
      role="link"
      onClick={() => handleFilterByRating(1)}
      onKeyPress={() => { }}
      tabIndex={0}
    >
      <span className="star-label">1 stars:</span>
      <span>{ratings.oneStar}</span>
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
