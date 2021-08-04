import React, {
  useState, useEffect, useMemo, useContext,
} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import options from '../config/config.js';
import './card.css';
import ComparisonModal from './ComparisonModal.jsx';
import StarRating from '../RatingsAndReviews/StarRating.jsx';
import calculateRating from '../../helper.js';
import { getReviewsMeta } from '../../apiRequests.js';
import { handleOutfitAction } from './helpers.js';
import { globalContext } from '../index.jsx';

const OutfitCard = ({ product }) => {
  const [outfitImg, setOutfitImg] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [defaultPrice, setDefaultPrice] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [ratings, setRatings] = useState({});
  const ratingsBreakDown = useMemo(() => calculateRating(ratings), [ratings]);
  const globalData = useContext(globalContext);

  const setDefaultData = (stylesObj) => {
    let outfitStyleInd = 0;
    for (let i = 0; i < stylesObj.results.length; i += 1) {
      if (stylesObj.results[i]['default?']) {
        outfitStyleInd = i;
        break;
      }
    }
    setOutfitImg(stylesObj.results[outfitStyleInd].photos[0].thumbnail_url);
    setDefaultPrice(product.default_price);
    setSalePrice(stylesObj.results[outfitStyleInd].sale_price);
  };
  const getOutfitStylesFromIds = () => {
    axios.get(`${options.url}products/${product.id}/styles`, {
      headers: options.headers,
    })
      .then((res) => {
        setDefaultData(res.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getOutfitStylesFromIds();
    getReviewsMeta(product.id)
      .then((res) => {
        setRatings(res.ratings);
      });
  }, []);

  const handleRemove = () => {
    globalData.dispatch({ type: 'updateOutfitIds', data: handleOutfitAction(false, product.id) });
  };

  const handleCardClick = () => {
    globalData.dispatch({ type: 'changeProductId', data: product.id });
  };

  return (
    <div className="list-card">
      <div className="card-img-container" onClick={() => (handleCardClick())}>
        <img
          src={outfitImg}
          alt={product.name}
          width="200"
          height="200"
          className="card-img"
        />
      </div>
      <button type="button" className="btn-outfit-remove" onClick={() => (handleRemove())}>X</button>
      <div className="card-category">
        {product.category.toUpperCase()}
      </div>
      <div className="card-name" onClick={() => (handleCardClick())}>
        {product.name}
      </div>
      <div className="card-price">
        {salePrice ? (
          <>
            <span className="sale-price" style={{ color: 'red' }}>
              $
              {salePrice}
            </span>
            <span className="old-price">
              $
              {defaultPrice}
            </span>
          </>
        )
          : (
            <span>
              $
              {defaultPrice}
            </span>
          )}
      </div>
      <div className="card-rating">
        {Number.isNaN(ratingsBreakDown.averageRatings)
          ? <div className="card-rating-none">No ratings</div>
          : (
            <>
              <div className="card-rating-num">{ratingsBreakDown.averageRatings.toFixed(1)}  </div>
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
          onClose={() => (setIsOpen(false))}
        />
      </div>
    </div>
  );
};

OutfitCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.string,
    default_price: PropTypes.string,
    name: PropTypes.string,
    features: PropTypes.instanceOf(Array),
  }),
};

OutfitCard.defaultProps = {
  product: {},
};

export default OutfitCard;
