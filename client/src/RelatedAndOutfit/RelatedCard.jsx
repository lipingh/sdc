import React, {
  useState, useEffect, useMemo, useContext,
} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import options from '../config/config.js';
import './card.css';
import emptyStar from './assets/star-icon-empty.png';
import fillStar from './assets/star-icon-fill.png';
import ComparisonModal from './ComparisonModal.jsx';
import StarRating from '../RatingsAndReviews/StarRating.jsx';
import calculateRating from '../../helper.js';
import { getReviewsMeta } from '../../apiRequests.js';
import { OutfitContext } from './RelatedAndOutfit.jsx';
import { handleOutfitAction } from './helpers.js';
import { globalContext } from '../index.jsx';

const RelatedCard = ({ product }) => {
  const [relatedImg, setRelatedImg] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [defaultPrice, setDefaultPrice] = useState('');
  const [inOutfit, setInOutfit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [ratings, setRatings] = useState({});
  const ratingsBreakDown = useMemo(() => calculateRating(ratings), [ratings]);
  const outfitsContext = useContext(OutfitContext);
  const globalData = useContext(globalContext);

  const setDefaultData = (stylesObj) => {
    let relatedStyleInd = 0;
    for (let i = 0; i < stylesObj.results.length; i += 1) {
      if (stylesObj.results[i]['default?']) {
        relatedStyleInd = i;
        break;
      }
    }
    setRelatedImg(stylesObj.results[relatedStyleInd].photos[0].thumbnail_url);
    setDefaultPrice(product.default_price);
    setSalePrice(stylesObj.results[relatedStyleInd].sale_price);
  };
  const getRelatedStylesFromIds = () => {
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

  const isInOutfit = () => {
    outfitsContext.outfits.forEach((outfitItem) => {
      if (outfitItem.id === product.id) {
        setInOutfit(true);
      }
    });
  };

  useEffect(() => {
    getRelatedStylesFromIds();
    getReviewsMeta(product.id)
      .then((res) => {
        setRatings(res.ratings);
      });
    isInOutfit();
  }, []);

  const handleStarClick = () => {
    const newInOutfit = !inOutfit;
    outfitsContext.setOutfitIds(handleOutfitAction(newInOutfit, product.id));
    setInOutfit(newInOutfit);
  };

  const handleCardClick = () => {
    globalData.dispatch({ type: 'changeProductId', data: product.id });
  };

  return (
    <div className="list-card">
      <div className="card-img-container" onClick={() => (handleCardClick())}>
        <img
          src={relatedImg}
          alt={product.name}
          width="200"
          height="200"
          className="card-img"
        />
      </div>
      <div className="card-add-star" onClick={() => (handleStarClick())}>
        {inOutfit ? <img src={fillStar} alt="star_icon_fill" />
          : <img src={emptyStar} alt="star_icon_empty" />}
      </div>
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
        {isNaN(ratingsBreakDown.averageRatings.toFixed(1))
          ? <div className="card-rating-none">No ratings</div>
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
};

RelatedCard.defaultProps = {
  product: {},
};

export default RelatedCard;
