import React, { useState, useEffect } from 'react';
import './ratings.css';

import axios from 'axios';
// import { RatingView } from 'react-simple-star-rating';
// import StarRatings from 'react-star-ratings';
import StarRating from './StarRating.jsx';
import options from '../config/config';
import RatingsBreakDown from './RatingsBreakDown.jsx';
import ProductBreakDown from './ProductBreakDown.jsx';
import ReviewList from './ReviewList.jsx';

const RatingsAndReviews = () => {
  const [recommended, setRecommended] = useState(0);
  const [notRecommended, setNotRecommended] = useState(0);
  const [ratings, setRatings] = useState({});
  const [characteristics, setCharacteristics] = useState({});
  const oneStar = ratings['1'] ? parseInt(ratings['1'], 10) : 0;
  const twoStar = ratings['2'] ? parseInt(ratings['2'], 10) : 0;
  const threeStar = ratings['3'] ? parseInt(ratings['3'], 10) : 0;
  const fourStar = ratings['4'] ? parseInt(ratings['4'], 10) : 0;
  const fiveStar = ratings['5'] ? parseInt(ratings['5'], 10) : 0;
  const totalReviews = oneStar + twoStar + threeStar + fourStar + fiveStar;
  const totalScores = oneStar + twoStar * 2 + threeStar * 3 + fourStar * 4 + fiveStar * 5;
  const averageRatings = (totalScores / totalReviews);
  const productId = 13023;
  const ratingsBreakDown = {
    oneStar,
    twoStar,
    threeStar,
    fourStar,
    fiveStar,
    totalReviews,
  };

  const getReviewsMeta = () => {
    axios({
      url: `${options.url}reviews/meta?product_id=${productId}`,
      method: 'get',
      headers: options.headers,
    })
      .then((res) => {
        setRatings(res.data.ratings);
        setRecommended(parseInt(res.data.recommended.true, 10));
        setNotRecommended(parseInt(res.data.recommended.false, 10));
        setCharacteristics(res.data.characteristics);
      })
      .catch((err) => { throw err; });
  };

  useEffect(() => {
    getReviewsMeta();
  }, [productId]);

  return (
    <div id="reviews-root">
      <h3>Ratings &amp; Reviews</h3>
      <div className="ratings-reviews">
        <div className="breakdown">
          <div className="overall-rating">
            <span>{averageRatings.toFixed(1)}</span>
            <StarRating rating={averageRatings} />
          </div>
          <br />
          <RatingsBreakDown ratings={ratingsBreakDown} />
          <br />
          <div>
            {((recommended * 100) / (recommended + notRecommended)).toFixed(0)}
            % of reviews recommend this product
          </div>

          <ProductBreakDown characteristics={characteristics} />
        </div>
        <div className="review-list">
          <ReviewList totalReviews={totalReviews} productId={productId} />
        </div>
      </div>
    </div>
  );
};
export default RatingsAndReviews;
