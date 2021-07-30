import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import options from '../config/config.js';
import './related.css';
import emptyStar from './assets/star-icon-empty.png';
import fillStar from './assets/star-icon-fill.png';
import ComparisonModal from './ComparisonModal.jsx';
import StarRating from '../RatingsAndReviews/StarRating.jsx';
import calculateRating from '../../helper.js';
import { getReviewsMeta } from '../../reviewRequest.js';

const RelatedCard = ({ product, currProduct }) => {
  const [relatedImg, setRelatedImg] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [defaultPrice, setDefaultPrice] = useState('');
  const [inOutfit, setInOutfit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [ratings, setRatings] = useState({});
  const ratingsBreakDown = useMemo(() => calculateRating(ratings), [ratings]);

  const getRelatedStylesFromIds = () => {
    axios.get(`${options.url}products/${product.id}/styles`, {
      headers: options.headers,
    })
      .then((res) => {
        setDefaultData(res.data);
      })
      .catch((res, err) => {
        res.end('Could not get related styles: ', err);
      });
  };

  const setDefaultData = (stylesObj) => {
    let relatedStyleInd = 0;
    for (let i = 0; i < stylesObj.results.length; i++) {
      if (stylesObj.results[i]['default?']) {
        relatedStyleInd = i;
        break;
      }
    }
    setRelatedImg(stylesObj.results[relatedStyleInd].photos[0].thumbnail_url);
    setDefaultPrice(product.default_price);
    setSalePrice(stylesObj.results[relatedStyleInd].sale_price);
  };

  useEffect(() => {
    getRelatedStylesFromIds();
    getReviewsMeta(product.id)
      .then((res) => {
        setRatings(res.ratings);
      });
  }, []);

  const handleStarClick = () => {
    let newInOutfit = !inOutfit;
    setInOutfit(newInOutfit);
  };

  return (
    <div className="list-card">
      <img
        src={relatedImg}
        alt={product.name}
        width="200"
        height="200"
        className="card-img"
      />
      <div className="card-add-star" onClick={() => (handleStarClick())}>
        {inOutfit ? <img src={fillStar} alt="star_icon_fill" />
          : <img src={emptyStar} alt="star_icon_empty" />}
      </div>
      <div className="card-category">
        {product.category.toUpperCase()}
      </div>
      <div className="card-name">
        {product.name}
      </div>
      <div className="card-price">
        <div className="card-default-price">${defaultPrice}</div>
        <div className="card-sale-price">{salePrice || ''}</div>
      </div>
      <div className="card-rating">
        {isNaN(ratingsBreakDown.averageRatings.toFixed(1))
          ? <div className="card-rating-num">No ratings</div>
          : (
            <>
              <div className="card-rating-num">{ratingsBreakDown.averageRatings.toFixed(1)}</div>
              <StarRating rating={ratingsBreakDown.averageRatings} />
            </>
          )}
      </div>
      <div className="modal-comparison">
        <button type="button" className="btn-modal-comparison" onClick={() => (setIsOpen(true))}>Compare</button>
        <ComparisonModal
          key={`comp${product.id}`}
          open={isOpen}
          product={product}
          currProduct={currProduct}
          onClose={() => (setIsOpen(false))}
        />
      </div>
    </div>
  );
};

RelatedCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.string,
    default_price: PropTypes.string,
    name: PropTypes.string,
    features: PropTypes.instanceOf(Array),
  }),
  currProduct: PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.string,
    default_price: PropTypes.string,
    name: PropTypes.string,
    features: PropTypes.instanceOf(Array),

  }),
};

RelatedCard.defaultProps = {
  product: {},
  currProduct: {},
};

export default RelatedCard;
