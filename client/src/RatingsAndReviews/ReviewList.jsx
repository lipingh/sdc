import React from 'react';
import PropTypes from 'prop-types';
import ReviewListItem from './ReviewListItem.jsx';

const ReviewList = ({ ratings, reviews }) => {
  const oneStar = parseInt(ratings['1'], 10);
  const twoStar = parseInt(ratings['2'], 10);
  const threeStar = parseInt(ratings['3'], 10);
  const fourStar = parseInt(ratings['4'], 10);
  const fiveStar = parseInt(ratings['5'], 10);
  const totalReviews = oneStar + twoStar + threeStar + fourStar + fiveStar;
  return (
    <div>
      <div>
        {totalReviews}
        {' '}
        reviews
      </div>
      <div>
        {
          reviews.map((review) => <ReviewListItem key={review.review_id} review={review} />)
        }
      </div>
      <button type="button">MORE REVIEWS</button>
      <button type="button">ADD A REVIEW  + </button>
    </div>

  );
};
ReviewList.propTypes = {
  ratings: PropTypes.shape({
    1: PropTypes.string,
    2: PropTypes.string,
    3: PropTypes.string,
    4: PropTypes.string,
    5: PropTypes.string,
  }),
  reviews: PropTypes.shape([]),
};
ReviewList.defaultProps = {
  ratings: {},
  reviews: [],
};
export default ReviewList;
