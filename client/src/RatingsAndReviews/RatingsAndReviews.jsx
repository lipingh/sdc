import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import StarRating from './StarRating.jsx';
import options from '../config/config';
import RatingsBreakDown from './RatingsBreakDown.jsx';
import ProductBreakDown from './ProductBreakDown.jsx';
import ReviewList from './ReviewList.jsx';
import './ratings.css';
import calculateRating from "../../helper.js";

const RatingsAndReviews = () => {
  const productId = 13023;
  const [recommended, setRecommended] = useState(0);
  const [notRecommended, setNotRecommended] = useState(0);
  const [ratings, setRatings] = useState({});
  const [characteristics, setCharacteristics] = useState({});
  // const [ratingsBreakDown, setRatingsBreakDown] = useState({});
  const ratingsBreakDown = useMemo(() => calculateRating(ratings), [ratings]);
  // const oneStar = ratings['1'] ? parseInt(ratings['1'], 10) : 0;
  // const twoStar = ratings['2'] ? parseInt(ratings['2'], 10) : 0;
  // const threeStar = ratings['3'] ? parseInt(ratings['3'], 10) : 0;
  // const fourStar = ratings['4'] ? parseInt(ratings['4'], 10) : 0;
  // const fiveStar = ratings['5'] ? parseInt(ratings['5'], 10) : 0;
  // const totalReviews = oneStar + twoStar + threeStar + fourStar + fiveStar;
  // const totalScores = oneStar + twoStar * 2 + threeStar * 3 + fourStar * 4 + fiveStar * 5;
  // const averageRatings = (totalScores / totalReviews);

  // let ratingsBreakDown = {
  //   oneStar: 0,
  //   twoStar: 0,
  //   threeStar: 0,
  //   fourStar: 0,
  //   fiveStar: 0,
  //   averageRatings: 0,
  //   totalReviews: 0,
  // };

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
        // setRatingsBreakDown(calculateRating(ratings));
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
            <span>{ratingsBreakDown.averageRatings.toFixed(1)}</span>
            <StarRating rating={ratingsBreakDown.averageRatings} />
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
          <ReviewList totalReviews={ratingsBreakDown.totalReviews} productId={productId} />
        </div>
      </div>
    </div>
  );
};
export default RatingsAndReviews;
