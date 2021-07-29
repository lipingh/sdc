import React, { useState, useEffect, useMemo } from 'react';
import StarRating from './StarRating.jsx';
import RatingsBreakDown from './RatingsBreakDown.jsx';
import ProductBreakDown from './ProductBreakDown.jsx';
import ReviewForm from './ReviewForm.jsx';
import ReviewList from './ReviewList.jsx';
import calculateRating from '../../helper.js';
import { getReviewsMeta, getReviewsById } from '../../reviewRequest.js';
import './ratings.css';

const RatingsAndReviews = () => {
  const productId = 13023;
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [recommended, setRecommended] = useState(0);
  const [notRecommended, setNotRecommended] = useState(0);
  const [ratings, setRatings] = useState({});
  const [characteristics, setCharacteristics] = useState({});
  const ratingsBreakDown = useMemo(() => calculateRating(ratings), [ratings]);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [sortOption, setSortOption] = useState('relevant');
  const [page, setPage] = useState(1);
  const params = {
    product_id: productId,
    page,
    sort: sortOption,
  };

  useEffect(() => {
    getReviewsMeta(productId).then((result) => {
      setRatings(result.ratings);
      setRecommended(parseInt(result.recommended.true, 10));
      setNotRecommended(parseInt(result.recommended.false, 10));
      setCharacteristics(result.characteristics);
    });
    getReviewsById(params).then((result) => {
      setReviews(result);
      setFilteredReviews(result);
    });
  }, [productId, sortOption]);

  // input rating is a digit number
  const handleFilterByRating = (rating) => {
    const filteredDta = reviews.filter((review) => review.rating === rating);
    setFilteredReviews(filteredDta);
  };

  const handleChangeSort = (option) => {
    setSortOption(option);
  };
  const handleAddReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <div id="review-form-modal" className="reviews-root">
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
          <ReviewList
            totalReviews={
              ratingsBreakDown.totalReviews
            }
            productId={productId}
            reviews={filteredReviews}
            characteristics={characteristics}
            handleAddReview={handleAddReview}
          />
          <button type="button">MORE REVIEWS</button>
          <button type="button" onClick={() => setShowReviewForm(true)}>ADD A REVIEW  + </button>
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
