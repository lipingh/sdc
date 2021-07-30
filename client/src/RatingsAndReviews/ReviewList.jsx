import React from 'react';
import PropTypes from 'prop-types';
import ReviewListItem from './ReviewListItem.jsx';

const ReviewList = ({ reviews }) => (
  <>
    {reviews.map((review) => <ReviewListItem key={review.review_id} review={review} />)}
  </>
);
ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object),
};
ReviewList.defaultProps = {
  reviews: [],
};
export default ReviewList;
