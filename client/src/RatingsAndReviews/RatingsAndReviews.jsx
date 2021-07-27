import React, { useState, useEffect } from 'react';
import './ratings.css';

import axios from 'axios';
import options from '../config/config.js';
import StarRating from './StarRating.jsx';
import RatingsBreakDown from './RatingsBreakDown.jsx';
import ProductBreakDown from './ProductBreakDown.jsx';
import ReviewList from './ReviewList.jsx';

const RatingsAndReviews = () => {
  const [recommended, setRecommended] = useState(0);
  const [notRecommended, setNotRecommended] = useState(0);
  const [ratings, setRatings] = useState({});
  const [characteristics, setCharacteristics] = useState({});
  const oneStar = parseInt(ratings['1'], 10);
  const twoStar = parseInt(ratings['2'], 10);
  const threeStar = parseInt(ratings['3'], 10);
  const fourStar = parseInt(ratings['4'], 10);
  const fiveStar = parseInt(ratings['5'], 10);
  const totalReviews = oneStar + twoStar + threeStar + fourStar + fiveStar;
  const totalScores = oneStar + twoStar * 2 + threeStar * 3 + fourStar * 4 + fiveStar * 5;
  const averageRatings = (totalScores / totalReviews);
  const productId = 13023;

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
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getReviewsMeta();
  }, []);

  return (
    <>
      <h3>Ratings &amp; Reviews</h3>
      <div className="ratings-reviews">
        <div className="breakdown">
          <div className="overall-rating">
            <span>{averageRatings.toFixed(1)}</span>
            <StarRating ratings={averageRatings || 5} />
          </div>
          <br />
          <RatingsBreakDown ratings={ratings} />
          <br />
          <div>
            {(recommended * 100) / (recommended + notRecommended)}
            % of reviews recommend this product
          </div>

          <ProductBreakDown characteristics={characteristics} />
        </div>
        <div className="review-list">
          <ReviewList totalReviews={totalReviews} productId={productId} />
        </div>
      </div>
    </>
  );
};
export default RatingsAndReviews;
