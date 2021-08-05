import React, { useState, useEffect, useContext } from 'react';
import { ExpandContext } from '../Overview.jsx';
import { globalContext } from '../../index.jsx';
import StarRating from '../../RatingsAndReviews/StarRating.jsx'
import style from './ProductInfo.module.css';

const ProductInfo = () => {
  const contextData = useContext(ExpandContext);
  const globalData = useContext(globalContext);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReview, setTotalReview] = useState(0);
  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');

  useEffect(() => {
    setAverageRating(globalData.state.ratingsBreakDown.averageRatings);
    setTotalReview(globalData.state.ratingsBreakDown.totalReviews);

    setCategory(globalData.state.category);
    setProductName(globalData.state.name);
  }, [globalData.state.ratingsBreakDown, globalData.state.name, globalData.state.category]);

  return (
    <div>
      <div style={{ display: 'inline-block' }}>
        <StarRating rating={averageRating} />
      </div>
      <a href="#customerReviews" className={style.linkToReviewComponent}>{totalReview}</a>
      <h4 className={style.category}>{category}</h4>
      <h1 className={style.title}>{productName}</h1>
      {contextData.currState.onSale
        ? (
          <>
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              $
              {contextData.currState.salePrice}
            </span>
            <span className={style.oldPrice} style={{ fontWeight: 'bold' }}>
              $
              {contextData.currState.originalPrice}
            </span>
          </>
        )
        : (
          <span style={{ fontWeight: 'bold' }}>
            $
            {contextData.currState.originalPrice}
          </span>
        )}
    </div>
  );
};

export default ProductInfo;
