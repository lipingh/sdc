import React from 'react';
import PropTypes from 'prop-types';

const ReviewListItem = ({ review }) => (
  <div>
    <div>
      <span>{review.rating}</span>
      <span>{review.reviewer_name}</span>
      <span>
        ,
        {review.date}
      </span>
    </div>
    <div>{review.body}</div>
    <div>
      {review.recommend ? 'I recommend this product' : ''}
    </div>
    {/* {review.response ? <div>{review.response}</div> : ''} */}
    <div>
      <span>
        Helpful? Yes(
        {review.helpfulness}
        )
      </span>
      <span>
        | Report(0)
      </span>
    </div>
    <br />
  </div>
);
ReviewListItem.propTypes = {
  review: PropTypes.shape({
    rating: PropTypes.number,
    reviewer_name: PropTypes.string,
    date: PropTypes.string,
    body: PropTypes.string,
    recommend: PropTypes.bool,
    helpfulness: PropTypes.number,
  }),
};
ReviewListItem.defaultProps = {
  review: {},
};
export default ReviewListItem;
