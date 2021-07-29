import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReviewListItem from './ReviewListItem.jsx';
import ReviewForm from './ReviewForm.jsx';
// import Modal from './Modal.jsx';

const ReviewList = ({
  productId, totalReviews, reviews, handleChangeSort, characteristics,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  return (
    <div>
      <div>
        {totalReviews}
        {' reviews, sorted by '}
        <select
          onChange={(e) => {
            handleChangeSort(e.target.value);
          }}
        >
          <option value="relevant">Relevant</option>
          <option value="helpful">Helpful</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      <div>
        {
          reviews.map((review) => <ReviewListItem key={review.review_id} review={review} />)
        }
      </div>
      <button type="button">MORE REVIEWS</button>
      <button type="button" onClick={() => setShowReviewForm(true)}>ADD A REVIEW  + </button>
      <ReviewForm
        showModal={showReviewForm}
        productId={productId}
        characteristics={characteristics}
        onClose={() => setShowReviewForm(false)}
      />
    </div>

  );
};
ReviewList.propTypes = {
  productId: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object),
  handleChangeSort: PropTypes.func.isRequired,
  characteristics: PropTypes.shape({
    Fit: PropTypes.shape({ id: PropTypes.number }),
  }),
};
ReviewList.defaultProps = {
  reviews: [],
  characteristics: {},
};
export default ReviewList;
