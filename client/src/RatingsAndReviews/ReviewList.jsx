import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getReviewsById } from '../../reviewRequest.js';
import ReviewListItem from './ReviewListItem.jsx';
import ReviewForm from './ReviewForm.jsx';
// import Modal from './Modal.jsx';

const ReviewList = ({ totalReviews, productId }) => {
  // console.log('unsortedReviews', unsortedReviews);
  const [sortOption, setSortOption] = useState('relevant');
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  // let reviews = unsortedReviews;
  const params = {
    product_id: productId,
    sort: sortOption,
    count: 5,
  };

  // const reviews = useMemo(() => getReviewsById(params), [params]);
  // cosole.log(reviews);
  // const reviewFormModal = showReviewForm ? (
  //   <Modal>
  //     <div className="modal">
  //       <ReviewForm />
  //     </div>
  //   </Modal>
  // ) : null;

  useEffect(() => {
    getReviewsById(params).then((value) => setReviews(value));
  }, [sortOption]);

  return (
    <div>
      <div>
        {totalReviews}
        {' reviews, sorted by '}
        <select
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
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
  productId: PropTypes.number.isRequired,
};
export default ReviewList;
