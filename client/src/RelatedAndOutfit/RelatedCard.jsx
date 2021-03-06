import React, {
  useState, useEffect, useMemo, useContext,
} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import options from '../config/config.js';
import './card.css';
import emptyStar from './assets/star-icon-empty.png';
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

  useEffect(() => {
    isInOutfit();
  }, [globalData.state.outfits]);

  const handleCardClick = () => {
    globalData.dispatch({ type: 'changeProductId', data: product.id });
  };

  const handleStarClick = () => {
    setIsOpen(!isOpen);
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
      <div role="button" className="card-add-star">
        <img src={emptyStar} alt="star_icon_empty" onClick={() => (handleStarClick())} />
        <div className="modal-comparison">
          <ComparisonModal
            key={`comp${product.id}`}
            open={isOpen}
            product={product}
            onClose={handleStarClick}
          />
        </div>
      </div>
      <div className="card-category">
        {product.category.toUpperCase()}
      </div>
      <div className="container-card">
        <span className="card-name" onClick={() => (handleCardClick())}>
          {product.name}
        </span>
      </div>
      <div className="container-card">
        <span className="card-price" onClick={() => (handleCardClick())}>
          {salePrice ? (
            <>
              <span className="sale-price" style={{ color: 'red' }}>
                <strong>
                  $
                  {salePrice}
                </strong>
              </span>
              <span className="old-price">
                $
                {defaultPrice}
              </span>
            </>
          )
            : (
              <span>
                <strong>
                  $
                  {defaultPrice}
                </strong>
              </span>
            )}
        </span>
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
