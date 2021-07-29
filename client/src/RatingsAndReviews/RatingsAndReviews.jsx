import React, { useState, useEffect, useMemo } from 'react';
import StarRating from './StarRating.jsx';
import RatingsBreakDown from './RatingsBreakDown.jsx';
import ProductBreakDown from './ProductBreakDown.jsx';
import ReviewList from './ReviewList.jsx';
import calculateRating from '../../helper.js';
import { getReviewsMeta, getReviewsById } from '../../reviewRequest.js';
import './ratings.css';

const RatingsAndReviews = () => {
  const productId = 13023;
  const [recommended, setRecommended] = useState(0);
  const [notRecommended, setNotRecommended] = useState(0);
  const [ratings, setRatings] = useState({});
  const [characteristics, setCharacteristics] = useState({});
  const ratingsBreakDown = useMemo(() => calculateRating(ratings), [ratings]);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [sortOption, setSortOption] = useState('relevant');
  const params = {
    product_id: productId,
    count: 5,
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

  return (
    <div id="reviews-root">
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
          <ReviewList
            totalReviews={
              ratingsBreakDown.totalReviews
            }
            productId={productId}
            reviews={filteredReviews}
            handleChangeSort={handleChangeSort}
            characteristics={characteristics}
          />
        </div>
      </div>
    </div>
  );
};
export default RatingsAndReviews;
