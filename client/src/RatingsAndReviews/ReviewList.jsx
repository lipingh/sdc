import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import options from '../config/config.js';
import ReviewListItem from './ReviewListItem.jsx';
import ReviewForm from './ReviewForm.jsx';

const ReviewList = ({ ratings, productId }) => {
  const [sortOption, setSortOption] = useState('relevant');
  const [reviews, setReviews] = useState([]);
  const oneStar = parseInt(ratings['1'], 10);
  const twoStar = parseInt(ratings['2'], 10);
  const threeStar = parseInt(ratings['3'], 10);
  const fourStar = parseInt(ratings['4'], 10);
  const fiveStar = parseInt(ratings['5'], 10);
  const totalReviews = oneStar + twoStar + threeStar + fourStar + fiveStar;
  const getReviewsById = () => {
    // console.log('sort by', sortOption);
    axios({
      url: `${options.url}reviews/`,
      method: 'get',
      headers: options.headers,
      params: {
        product_id: productId,
        sort: sortOption,
        count: 20,
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
      <button type="button" onClick={ReviewForm}>ADD A REVIEW  + </button>
    </div>

  );
};
ReviewList.propTypes = {
  ratings: PropTypes.shape({
    1: PropTypes.string,
    2: PropTypes.string,
    3: PropTypes.string,
    4: PropTypes.string,
    5: PropTypes.string,
  }),
  productId: PropTypes.number.isRequired,
};
ReviewList.defaultProps = {
  ratings: {},
};
export default ReviewList;
