import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import options from '../config/config.js';
import Star from './Star.jsx';

// const reviewFormModalRoot = document.getElementById('review-form');
const ReviewForm = ({
  showModal, onClose, productId, characteristics,
}) => {
  if (!showModal) return null;

  const [recommend, setRecommended] = useState('');
  const [rating, setRating] = useState('');
  const [size, setSize] = useState('');
  const [width, setWidth] = useState('');
  const [comfort, setComfort] = useState('');
  const [quality, setQuality] = useState('');
  const [length, setLength] = useState('');
  const [fit, setFit] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [name, setReviewName] = useState('');
  const [email, setEmail] = useState('');
  const [selection, setSelection] = useState(0);
  const [ratingError, setRatingError] = useState(true);
  const hoverOver = (event) => {
    let val = 0;
    if (event && event.target && event.target.getAttribute('data-star-id')) val = event.target.getAttribute('data-star-id');
    setSelection(val);
  };
  useEffect(() => {
  }, [ratingError]);

  const addReviews = (e) => {
    e.preventDefault();
    if (ratingError) {
      return;
    }

    const characteristicsInfo = {};
    Object.keys(characteristics).forEach((key) => {
      if (key === 'Fit') {
        characteristicsInfo[characteristics[key].id] = parseInt(fit, 10);
      } else if (key === 'Length') {
        characteristicsInfo[characteristics[key].id] = parseInt(length, 10);
      } else if (key === 'Comfort') {
        characteristicsInfo[characteristics[key].id] = parseInt(comfort, 10);
      } else if (key === 'Size') {
        characteristicsInfo[characteristics[key].id] = parseInt(size, 10);
      } else if (key === 'Width') {
        characteristicsInfo[characteristics[key].id] = parseInt(width, 10);
      } else if (key === 'Quality') {
        characteristicsInfo[characteristics[key].id] = parseInt(quality, 10);
      }
    });

    const data = {
      product_id: productId,
      rating: parseInt(rating, 10),
      summary,
      body,
      recommend: recommend === 'true',
      name,
      email,
      characteristics: characteristicsInfo,
    };
    axios.post(`${options.url}reviews`, data, { headers: options.headers })
      .then()
      .catch((err) => { throw err; });
  };
  return ReactDOM.createPortal(
    <div className="review-form-modal">
      <form className="review-form" onSubmit={addReviews}>
        <button className="close-button" type="button" onClick={onClose}>X</button>
        <div className="review-form-row">
          {ratingError
            ? <span style={{ color: 'red' }}>&#9888; Please select overall rating</span> : null}
          <div
            onMouseOut={() => hoverOver(null)}
            onBlur={() => { }}
            onClick={(e) => {
              setRating(e.target.getAttribute('data-star-id') || rating);
              setRatingError(false);
            }}
            onKeyUp={() => { }}
            onMouseOver={hoverOver}
            onFocus={() => { }}
            role="button"
            tabIndex={0}
          >
            <span>Overall Ratings</span>
            {Array.from({ length: 5 }, (v, i) => (
              <Star
                starId={i + 1}
                key={`star_${i + 1}`}
                marked={selection ? selection >= i + 1 : rating >= i + 1}
              />
            ))}
          </div>
        </div>

        <div className="recommend" onChange={(e) => setRecommended(e.target.value)}>
          Do you recommend this product?
          <input type="radio" name="recommend" value="true" required />
          Yes
          <input type="radio" name="recommend" value="false" />
          No
        </div>
        <div className="factor-size" onChange={(e) => setSize(e.target.value)}>
          Size:
          <input type="radio" name="size" value="1" required />
          A size too small
          <input type="radio" name="size" value="2" />
          Half a size too small
          <input type="radio" name="size" value="3" />
          Perfect
          <input type="radio" name="size" value="4" />
          Half a size too big
          <input type="radio" name="size" value="5" />
          A size too wide
        </div>
        <div className="factor-width" onChange={(e) => setWidth(e.target.value)}>
          Width:
          <input type="radio" name="width" value="1" required />
          Too narrow
          <input type="radio" name="width" value="2" />
          Slightly narrow
          <input type="radio" name="width" value="3" />
          Perfect
          <input type="radio" name="width" value="4" />
          Slightly wide
          <input type="radio" name="width" value="5" />
          Too wide
        </div>
        <div className="factor-comfort" onChange={(e) => setComfort(e.target.value)}>
          Comfort:
          <input type="radio" name="comfort" value="1" required />
          Uncomfortable
          <input type="radio" name="comfort" value="2" />
          Slightly uncomfortable
          <input type="radio" name="comfort" value="3" />
          Ok
          <input type="radio" name="comfort" value="4" />
          Comfortable
          <input type="radio" name="comfort" value="5" />
          Perfect
        </div>
        <div className="factor-quality" onChange={(e) => setQuality(e.target.value)}>
          Quality:
          <input type="radio" name="quality" value="1" required />
          Poor
          <input type="radio" name="quality" value="2" />
          Below Average
          <input type="radio" name="quality" value="3" />
          What I expected
          <input type="radio" name="quality" value="4" />
          Pretty great
          <input type="radio" name="quality" value="5" />
          Perfect
        </div>
        <div className="factor-length" onChange={(e) => setLength(e.target.value)}>
          Length:
          <input type="radio" name="length" value="1" required />
          Runs short
          <input type="radio" name="length" value="2" />
          Runs slightly short
          <input type="radio" name="length" value="3" />
          Perfect
          <input type="radio" name="length" value="4" />
          Runs slightly long
          <input type="radio" name="length" value="5" />
          Runs long
        </div>
        <div className="factor-fit" onChange={(e) => setFit(e.target.value)}>
          Fit:
          <input type="radio" name="fit" value="1" required />
          Runs tight
          <input type="radio" name="fit" value="2" />
          Runs slightly tight
          <input type="radio" name="fit" value="3" />
          Perfect
          <input type="radio" name="fit" value="4" />
          Runs slightly long
          <input type="radio" name="fit" value="5" />
          Runs long
        </div>
        <div className="review-form-summary" onChange={(e) => setSummary(e.target.value)}>
          Review Summary
          <input type="text" maxLength="60" placeholder="Example: purchase ever!" required />
        </div>
        <div className="review-body" onChange={(e) => setBody(e.target.value)}>
          Add a written review
          <textarea id="review" type="text" maxLength="1000" placeholder="Example: Why did you like the product or not?" required />
        </div>
        <div>
          Choose photos:
          <input type="file" id="upload-photo" accept="image/*" multiple />
        </div>
        <div className="review-name" onChange={(e) => setReviewName(e.target.value)}>
          Nickname
          <input type="text" placeholder="Example: jackson11!" required />
        </div>
        <div className="email" onChange={(e) => setEmail(e.target.value)}>
          Email
          <input type="email" maxLength="60" required />
        </div>
        <button type="submit" className="review-form-submit-button">Submit</button>
      </form>
    </div>,
    document.getElementById('review-form-modal'),
  );
};

ReviewForm.propTypes = {
  productId: PropTypes.number.isRequired,
  characteristics: PropTypes.shape({
    Fit: PropTypes.shape({ id: PropTypes.number }),
  }),
};
ReviewForm.defaultProps = {
  characteristics: {},
};

export default ReviewForm;
