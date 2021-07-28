import React, { useState, useEffect, useMemo } from 'react';
import StarRating from './StarRating.jsx';
import RatingsBreakDown from './RatingsBreakDown.jsx';
import ProductBreakDown from './ProductBreakDown.jsx';
import ReviewList from './ReviewList.jsx';
import './ratings.css';
import calculateRating from '../../helper.js';
import { getReviewsMeta, getReviewsById } from '../../reviewRequest.js';

const RatingsAndReviews = () => {
  const productId = 13023;
  const [recommended, setRecommended] = useState(0);
  const [notRecommended, setNotRecommended] = useState(0);
  const [ratings, setRatings] = useState({});
  const [characteristics, setCharacteristics] = useState({});
  const ratingsBreakDown = useMemo(() => calculateRating(ratings), [ratings]);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const params = {
    product_id: productId,
    count: 5,
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
  }, [productId]);

  // input rating is a digit number
  const handleFilterByRating = (rating) => {
    const filteredDta = reviews.filter((review) => review.rating === rating);
    setFilteredReviews(filteredDta);
  };

  return (
    <div id="reviews-root">
      <h3>Ratings &amp; Reviews</h3>
      <div className="ratings-reviews">
        <div className="breakdown">
          <div className="overall-rating">
            <span>{ratingsBreakDown.averageRatings.toFixed(1)}</span>
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
          <ReviewList
            totalReviews={
              ratingsBreakDown.totalReviews
            }
            productId={productId}
            reviews={filteredReviews}
          />
        </div>
      </div>
    </div>
  );
};
export default RatingsAndReviews;
