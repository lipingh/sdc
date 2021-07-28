import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';
import options from '../config/config.js';

// const reviewFormModalRoot = document.getElementById('review-form');
const ReviewForm = ({ productId }) => {
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

  const addReviews = (e) => {
    e.preventDefault();
    // TODO: need to get each factor id
    // TODO: validate fileds before submit
    const params = {
      product_id: productId,
      rating,
      summary,
      body,
      recommend,
      name,
      email,
      characteristics: {
        Fit: {
          id: 43617,
          value: fit,
        },
        Length: {
          id: 43618,
          value: length,
        },
        Comfort: {
          id: 43619,
          value: comfort,
        },
        Quality: {
          id: 43620,
          value: quality,
        },

      },
    };
    // TODO: post data to reviews, currently unathorized 401
    axios.post(`${options.url}reviews`, params, options.headers)
      .then()
      .catch((err) => { throw err; });
  };

  return (
    <div className="review-form-modal">
      <form>
        <div>
          Overall Ratings
          <Rating onClick={(rate) => setRating(rate)} ratingValue={rating} fillColor="black" />
        </div>
        <div>
          <div className="recommend" onChange={(e) => setRecommended(e.target.value)}>
            Do you recommend this product?
            <input type="radio" name="recommend" value="true" />
            Yes
            <input type="radio" name="recommend" value="false" />
            No
          </div>
          <div className="factor-size" onChange={(e) => setSize(e.target.value)}>
            Size:
            <input type="radio" name="size" value="1" />
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
            <input type="radio" name="width" value="1" />
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
            <input type="radio" name="comfort" value="1" />
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
            <input type="radio" name="quality" value="1" />
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
            <input type="radio" name="length" value="1" />
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
            <input type="radio" name="fit" value="1" />
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
          <div className="review-summary" onChange={(e) => setSummary(e.target.value)}>
            Review Summary
            <input type="text" maxLength="60" placeholder="Example: purchase ever!" required />
          </div>
          <div className="review-body" onChange={(e) => setBody(e.target.value)}>
            Add a written review
            <input type="text" maxLength="1000" placeholder="Example: Why did you like the product or not?" required />
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
            <input type="text" maxLength="60" required />
          </div>
          <button type="button" onClick={addReviews}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
