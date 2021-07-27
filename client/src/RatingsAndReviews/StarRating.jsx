import React from 'react';
import PropTypes from 'prop-types';
// import './star.css';
// import QuarterStars from './QuarterStars.jsx';

const StarRating = () =>
// const oneStar = parseInt(ratings['1'], 10);
// const twoStar = parseInt(ratings['2'], 10);
// const threeStar = parseInt(ratings['3'], 10);
// const fourStar = parseInt(ratings['4'], 10);
// const fiveStar = parseInt(ratings['5'], 10);
// const totalReviews = oneStar + twoStar + threeStar + fourStar + fiveStar;
// const totalScores = oneStar + twoStar * 2 + threeStar * 3 + fourStar * 4 + fiveStar * 5;
// const averageRatings = (totalScores / totalReviews);

(
  <div className="star-rating">
    {/* <span>{averageRatings.toFixed(1)}</span> */}
    {[...Array(5)].map((star, index) => (
      <span className="star" key={index}>&#9733;</span>
    ))}
  </div>
);
// StarRating.propTypes = {
//   rating: PropTypes.number.isRequired,
// };
export default StarRating;
