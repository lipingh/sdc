import React, { useState, useEffect, useContext } from 'react';
import getReviewsMeta from '../../../reviewRequest.js';
import { ExpandContext } from '../Overview.jsx';
import calculateRating from '../../../helper.js';
import StarRating from '../../RatingsAndReviews/StarRating.jsx'

const ProductInfo = () => {
  const contextData = useContext(ExpandContext);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    getReviewsMeta(contextData.currState.productId)
      .then((res) => {
        setAverageRating(calculateRating(res.ratings).averageRatings);
      })
      .catch((err) => {
        console.log('review star data fetching error', err);
      });
  }, []);

  return (
    <div>
      heelo from info
      <StarRating rating={averageRating} />
    </div>
  );
};

export default ProductInfo;
