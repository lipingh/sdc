import React, {
  useState, useEffect, useMemo, useRef, useCallback, useContext,
} from 'react';
import StarRating from './StarRating.jsx';
import RatingsBreakDown from './RatingsBreakDown.jsx';
import ProductBreakDown from './ProductBreakDown.jsx';
import ReviewForm from './ReviewForm.jsx';
import ReviewListItem from './ReviewListItem.jsx';
import calculateRating from '../../helper.js';
import { getReviewsMeta, getReviewsById } from '../../apiRequests.js';
import useAllReviews from './useAllReviews.js';
import './ratings.css';
import { globalContext } from '../index.jsx';

const RatingsAndReviews = () => {
  const globalData = useContext(globalContext);
  const { productId } = globalData.state;
  const { ratingsBreakDown } = globalData.state;
  const [showReviewForm, setShowReviewForm] = useState(false);
  const recommended = parseInt(globalData.state.recommended.true, 10);
  const notRecommended = parseInt(globalData.state.recommended.false, 10);
  const { characteristics } = globalData.state;
  // const [totalReviews, setTotalReviews] = useState(0);
  const [sortOption, setSortOption] = useState('relevant');
  // const [productId, setProductId] = useState(13023);
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

  // useEffect(() => {
  //   getReviewsMeta(productId).then((result) => {
  //     setRatings(result.ratings);
  //     setRecommended(parseInt(result.recommended.true, 10));
  //     setNotRecommended(parseInt(result.recommended.false, 10));
  //     setCharacteristics(result.characteristics);
  //   });
  // }, [productId]);

  // input rating is a digit number
  const handleFilterByRating = (rating) => {
    // const filteredData = reviews.filter((review) => review.rating === rating);
    // setFilteredReviews(filteredData);
    setRatingFilter(rating);
    setPage(1);
  };

  const handleChangeSort = (option) => {
    setSortOption(option);
    setRatingFilter(null);
    setPage(1);
  };
  const handleAddReview = () => {
    setTotalReviews((prev) => prev + 1);
    // setReviews([...reviews, newReview]);
  };

  return (
    <div className="reviews-root">
      <h3>Ratings &amp; Reviews</h3>
      <div className="ratings-reviews">
        <div className="breakdown">
          <div className="overall-rating">
            <div>{ratingsBreakDown.averageRatings.toFixed(1)}</div>
            <StarRating rating={ratingsBreakDown.averageRatings} />
          </div>
          <br />
          <div>
            {((recommended * 100) / (recommended + notRecommended)).toFixed(0)}
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
          {/* <button type="button">MORE REVIEWS</button> */}
          <button className="add-review-button" type="button" onClick={() => setShowReviewForm(true)}>ADD A REVIEW  + </button>
        </div>

      </div>
      <ReviewForm
        showModal={showReviewForm}
        productId={productId}
        characteristics={characteristics}
        onClose={() => setShowReviewForm(false)}
        handleAddReview={handleAddReview}
      />
    </div>
  );
};
export default RatingsAndReviews;
