import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './reviews.css';
import StarRating from './StarRating.jsx';
import ImageModal from './ImageModal.jsx';
import { updateReviewHelpful, reportReview } from '../../apiRequests';

const ReviewListItem = ({ review }) => {
  const [helpful, sethelpful] = useState(review.helpfulness);
  const [reported, setReported] = useState(false);
  const [disableHelpful, setDisableHelpful] = useState(false);
  const [showFullImage, setShowFullImage] = useState({});
  const handleClickPhoto = (photoId) => {
    const showFullImageCopy = { ...showFullImage };
    showFullImageCopy[photoId] = !showFullImageCopy[photoId];
    setShowFullImage(showFullImageCopy);
  };
  const handleAddHelpful = () => {
    setDisableHelpful(!disableHelpful);
    sethelpful(() => (disableHelpful ? helpful - 1 : helpful + 1));
    updateReviewHelpful(review.review_id, helpful);
  };

  // TODO: which value should we update by click "report"? can't find in the reviews
  const handleReport = () => {
    setReported(!reported);
    reportReview(review.review_id);
  };
  // const email = 'lisa@gamil.com';
  // TODO: review.email should also match the sale system as the verified purchaser
  // TODO: repsonse from seller section
  return (
    <div>
      <div className="review-list-overall">
        <StarRating rating={review.rating} />
        <span>
          {review.reviewer_name}
          {review.email ? <span>(Verified Purchaser)</span> : null}
          {', '}
          {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>
      <div className="review-summary">{review.summary}</div>
      <div>{review.body}</div>
      <div className="photos-container">
        {review.photos.map((photo) => (
          <div key={photo.id}>
            <img
              src={photo.url}
              aria-label="save"
              alt=""
              width="50"
              height="60"
              onClick={() => handleClickPhoto(photo.id)}
              onKeyPress={() => { }}
              role="presentation"
            />
            <ImageModal
              showFullImage={showFullImage[photo.id]}
              url={photo.url}
              id={photo.id}
              handleClickPhoto={() => handleClickPhoto(photo.id)}
            />
          </div>

        ))}
        ;
      </div>

      <div>
        {review.recommend ? <span>&#10003; I recommend this product</span> : null}
      </div>
      {review.response ? (
        <div className="review-response">
          <strong>
            Response:
          </strong>
          <div>{review.response}</div>
        </div>
      ) : null}
      <div>
        <span>Helpful?</span>
        <span onClick={handleAddHelpful} onKeyDown={() => { }} role="link" tabIndex={0}>
          Yes(
          {helpful}
          )
        </span>
        <span>{' | '}</span>
        <span onClick={handleReport} onKeyDown={() => { }} role="link" tabIndex={0}>
          {reported ? 'Reported' : 'Report'}
        </span>
      </div>
      <br />
    </div>
  );
};
ReviewListItem.propTypes = {
  review: PropTypes.shape({
    review_id: PropTypes.number,
    rating: PropTypes.number,
    summary: PropTypes.string,
    reviewer_name: PropTypes.string,
    date: PropTypes.string,
    body: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.object),
    recommend: PropTypes.bool,
    helpfulness: PropTypes.number,
    email: PropTypes.string,
    response: PropTypes.string,
  }),
};
ReviewListItem.defaultProps = {
  review: {},
};
export default ReviewListItem;
