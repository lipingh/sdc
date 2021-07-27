import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import options from '../config/config.js';
import ReviewListItem from './ReviewListItem.jsx';
import ReviewForm from './ReviewForm.jsx';

const ReviewList = ({ totalReviews, productId }) => {
  const [sortOption, setSortOption] = useState('relevant');
  const [reviews, setReviews] = useState([]);
  const getReviewsById = () => {
    // console.log('sort by', sortOption);
    axios({
      url: `${options.url}reviews/`,
      method: 'get',
      headers: options.headers,
      params: {
        product_id: productId,
        sort: sortOption,
        count: 5,
      },
    })
      .then((res) => {
        setReviews(res.data.results);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getReviewsById();
  }, []);

  return (
    <div>
      <div>
        {totalReviews}
        {' reviews, sorted by '}
        <select
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            getReviewsById();
          }}
        >
          <option value="relevant">Relevant</option>
          <option value="helpful">Helpful</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      <div>
        {
          reviews.map((review) => <ReviewListItem key={review.review_id} review={review} />)
        }
      </div>
      <button type="button">MORE REVIEWS</button>
      <button type="button">ADD A REVIEW  + </button>
      <ReviewForm />
    </div>

  );
};
ReviewList.propTypes = {
  totalReviews: PropTypes.number.isRequired,
  productId: PropTypes.number.isRequired,
};
export default ReviewList;
