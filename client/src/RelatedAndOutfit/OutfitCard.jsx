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
import { getReviewsMeta } from '../../reviewRequest.js';
import { OutfitContext } from './RelatedAndOutfit.jsx';

const OutfitCard = ({ product, currProduct }) => {
  const [outfitImg, setOutfitImg] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [defaultPrice, setDefaultPrice] = useState('');
  const [inOutfit, setInOutfit] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [ratings, setRatings] = useState({});
  const ratingsBreakDown = useMemo(() => calculateRating(ratings), [ratings]);
  const outfitsContext = useContext(OutfitContext);

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
      .catch((res, err) => {
        res.end('Could not get outfit styles: ', err);
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
    outfitsContext.handleOutfitAction(false, product.id);
  };

  return (
    <div className="list-card">
      <img
        src={outfitImg}
        alt={product.name}
        width="200"
        height="200"
        className="card-img"
      />
      <button type="button" className="btn-outfit-remove" onClick={() => (handleRemove())}>X</button>
      <div className="card-category">
        {product.category.toUpperCase()}
      </div>
      <div className="card-name">
        {product.name}
      </div>
      <div className="card-price">
        <div className="card-default-price">
          $
          {defaultPrice}
        </div>
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

OutfitCard.propTypes = {
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

OutfitCard.defaultProps = {
  product: {},
  currProduct: {},
};

export default OutfitCard;
