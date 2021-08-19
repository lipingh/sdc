import React, {
  useState, useEffect, useRef, useCallback, useContext,
} from 'react';
import StarRating from './StarRating.jsx';
import RatingsBreakDown from './RatingsBreakDown.jsx';
import ProductBreakDown from './ProductBreakDown.jsx';
import ReviewForm from './ReviewForm.jsx';
import ReviewListItem from './ReviewListItem.jsx';
import useAllReviews from './useAllReviews';
import './ratings.css';
import { globalContext } from '../index.jsx';

const RatingsAndReviews = () => {
  const globalData = useContext(globalContext);
  const { productId } = globalData.state;
  const { ratingsBreakDown } = globalData.state;
  const [showReviewForm, setShowReviewForm] = useState(false);
  const recommended = globalData.state.recommended.true ? globalData.state.recommended.true : 0;
  const notRecommended = globalData.state.recommended.false
    ? globalData.state.recommended.false : 0;
  // const recommended = parseInt(globalData.state.recommended.true, 10);
  // const notRecommended = parseInt(globalData.state.recommended.false, 10);
  const { characteristics } = globalData.state;
  const [sortOption, setSortOption] = useState('relevant');
  const [page, setPage] = useState(1);
  const [ratingFilter, setRatingFilter] = useState(null);
  const {
    reviews, hasMore, loading, error,
  } = useAllReviews(productId, page, sortOption, ratingFilter);

  const observer = useRef(null);
  const lastReviewRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // input rating is a digit number
  const handleFilterByRating = (rating) => {
    setRatingFilter(rating);
    setPage(1);
  };

  const handleChangeSort = (option) => {
    setSortOption(option);
    setRatingFilter(null);
    setPage(1);
  };

  useEffect(() => {
    setPage(1);
    setSortOption('relevant');
    setRatingFilter(null);
  }, [productId]);

  return (
    <>
      <h3 id="customerReviews">Ratings and Reviews</h3>
      <div className="ratings-reviews" id="review-form-modal">
        <div className="breakdown">
          <div className="overall-rating">
            <div>{Number.isNaN(ratingsBreakDown.averageRatings) ? 'No reviews' : ratingsBreakDown.averageRatings.toFixed(1)}</div>
            <StarRating rating={
              Number.isNaN(ratingsBreakDown.averageRatings) ? 0
                : ratingsBreakDown.averageRatings
            }
            />
          </div>
          <br />
          <div>
            {ratingsBreakDown.totalReviews !== 0
              ? ((recommended * 100) / (recommended + notRecommended)).toFixed(0) : 0}
            % of reviews recommend this product
          </div>
          <br />
          <RatingsBreakDown
            ratings={ratingsBreakDown}
            handleFilterByRating={handleFilterByRating}
          />
          <br />
          <ProductBreakDown characteristics={characteristics} />
        </div>

        <div className="review-list">
          <div>
            {ratingsBreakDown.totalReviews}
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
          <div className="review-list-container">
            {
              reviews.length === 0
                ? (
                  <span ref={lastReviewRef}>
                    No More Reviews Found
                  </span>
                )
                : reviews.map((review, i) => {
                  if (reviews.length === i + 1) {
                    return (
                      <div ref={lastReviewRef} key={review.review_id.toString()}>
                        <ReviewListItem review={review} />
                      </div>
                    );
                  }
                  return <ReviewListItem key={review.review_id} review={review} />;
                })
            }
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'Error...'}</div>
          </div>
          <button className="buttons add-review-button " type="button" onClick={() => setShowReviewForm(true)}>ADD A REVIEW  + </button>
        </div>

      </div>
      <ReviewForm
        showModal={showReviewForm}
        productId={productId}
        characteristics={characteristics}
        onClose={() => setShowReviewForm(false)}
      />
    </>
  );
};
export default RatingsAndReviews;
