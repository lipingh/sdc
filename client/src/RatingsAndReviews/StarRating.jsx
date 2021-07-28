import React from 'react';
import PropTypes from 'prop-types';
import './star.css';

const StarRating = ({ rating }) => {
  const ratingPercentage = (rating * 100) / 5;
  return (
    <div className="star-ratings">
      <div className="star-ratings-top" style={{ width: `${ratingPercentage}%` }}>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
      <div className="star-ratings-bottom">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
    </div>
  );
};
StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};
export default StarRating;
