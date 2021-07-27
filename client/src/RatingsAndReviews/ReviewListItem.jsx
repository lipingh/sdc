import React from 'react';
import PropTypes from 'prop-types';

const ReviewListItem = ({ review }) => {
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const month = monthNames[d.getMonth()];
    const day = d.getDate() + 1;
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <div>
      <div>
        <span>{review.rating}</span>
        <span>{review.reviewer_name}</span>
        <span>
          ,
          {formatDate(review.date)}
        </span>
      </div>

      <h3>{review.summary}</h3>

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
};
ReviewListItem.propTypes = {
  review: PropTypes.shape({
    rating: PropTypes.number,
    summary: PropTypes.string,
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
