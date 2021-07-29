import React from 'react';
import PropTypes from 'prop-types';

const RatingsBreakDown = ({ ratings, handleFilterByRating }) => (
  <div className="ratings-breakdown">
    <div className="row">
      <div className="side">
        <div
          className="star-label"
          role="link"
          onClick={() => handleFilterByRating(5)}
          onKeyPress={() => { }}
          tabIndex={0}
        >
          5 star
        </div>
      </div>
      <div className="middle">
        <div className="bar-container">
          <div className="bar-5" />
        </div>
      </div>
      <div className="side right">
        <div>{ratings.fiveStar}</div>
      </div>
      <div className="side">
        <div
          className="star-label"
          role="link"
          onClick={() => handleFilterByRating(4)}
          onKeyPress={() => { }}
          tabIndex={0}
        >
          4 star
        </div>
      </div>
      <div className="middle">
        <div className="bar-container">
          <div className="bar-4" />
        </div>
      </div>
      <div className="side right">
        <div>{ratings.fourStar}</div>
      </div>
      <div className="side">
        <div
          className="star-label"
          role="link"
          onClick={() => handleFilterByRating(3)}
          onKeyPress={() => { }}
          tabIndex={0}
        >
          3 star
        </div>
      </div>
      <div className="middle">
        <div className="bar-container">
          <div className="bar-3" />
        </div>
      </div>
      <div className="side right">
        <div>{ratings.threeStar}</div>
      </div>
      <div className="side">
        <div
          className="star-label"
          role="link"
          onClick={() => handleFilterByRating(2)}
          onKeyPress={() => { }}
          tabIndex={0}
        >
          2 star
        </div>
      </div>
      <div className="middle">
        <div className="bar-container">
          <div className="bar-2" />
        </div>
      </div>
      <div className="side right">
        <div>{ratings.twoStar}</div>
      </div>
      <div className="side">
        <div
          className="star-label"
          role="link"
          onClick={() => handleFilterByRating(1)}
          onKeyPress={() => { }}
          tabIndex={0}
        >
          1 star
        </div>
      </div>
      <div className="middle">
        <div className="bar-container">
          <div className="bar-1" />
        </div>
      </div>
      <div className="side right">
        <div>{ratings.oneStar}</div>
      </div>
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
