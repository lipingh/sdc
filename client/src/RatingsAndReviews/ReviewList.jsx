import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReviewListItem from './ReviewListItem.jsx';
import ReviewForm from './ReviewForm.jsx';
// import Modal from './Modal.jsx';

const ReviewList = ({ totalReviews, reviews, handleChangeSort }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  // const reviews = useMemo(() => getReviewsById(params), [params]);
  // cosole.log(reviews);
  // const reviewFormModal = showReviewForm ? (
  //   <Modal>
  //     <div className="modal">
  //       <ReviewForm />
  //     </div>
  //   </Modal>
  // ) : null;
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
      <button type="button" onClick={() => setShowReviewForm(!showReviewForm)}>ADD A REVIEW  + </button>
      {/* {reviewFormModal} */}
      {showReviewForm ? <ReviewForm /> : null}
    </div>

  );
};
ReviewList.propTypes = {
  totalReviews: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object),
  handleChangeSort: PropTypes.func.isRequired,
};
ReviewList.defaultProps = {
  reviews: [],
};
export default ReviewList;
