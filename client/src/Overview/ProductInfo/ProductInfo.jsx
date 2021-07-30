import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import options from '../../config/config.js';
import helperMethods from '../../../reviewRequest.js';
import { ExpandContext } from '../Overview.jsx';
import calculateRating from '../../../helper.js';
import StarRating from '../../RatingsAndReviews/StarRating.jsx'
import style from './ProductInfo.module.css';

const ProductInfo = () => {
  const contextData = useContext(ExpandContext);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReview, setTotalReview] = useState(0);
  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [onSale, setOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState('');

  useEffect(() => {
    helperMethods.getReviewsMeta(contextData.currState.productId)
      .then((res) => {
        setAverageRating(calculateRating(res.ratings).averageRatings);
        setTotalReview(calculateRating(res.ratings).totalReviews);
      })
      .catch((err) => {
        console.log('review star data fetching error', err);
      });
    axios.get(`${options.url}products/${contextData.currState.productId}`, { headers: options.headers })
      .then((response) => {
        setCategory(response.data.category);
        setProductName(response.data.name);
      })
      .catch((err) => {
        console.log('product data fetching err', err);
      });
    axios.get(`${options.url}products/${contextData.currState.productId}/styles`, { headers: options.headers })
      .then((response) => {
        setPrice(response.data.results[contextData.currState.styleIndex].original_price);
        if (response.data.results[contextData.currState.styleIndex].sale_price !== null) {
          setOnSale(true);
          setSalePrice(response.data.results[contextData.currState.styleIndex].sale_price);
        }
      })
      .catch((err) => {
        console.log('styles data fetching err', err);
      });
  }, [contextData.currState.styleIndex, contextData.currState.productId]);

  return (
    <div>
      <div style={{ display: 'inline-block' }}>
        <StarRating rating={averageRating} />
      </div>
      <a href="#" className={style.linkToReviewComponent}>{totalReview}</a>
      <h4 className={style.category}>{category}</h4>
      <h1 className={style.title}>{productName}</h1>
      {onSale ? <><span style={{color: 'red'}}>${salePrice}</span><span className={style.oldPrice}>${price}</span></>
        : <span>${price}</span>}
    </div>
  );
};

export default ProductInfo;
