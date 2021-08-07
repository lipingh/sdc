/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReviewListItem from '../client/src/RatingsAndReviews/ReviewListItem.jsx';

const review = {
  review_id: 288243,
  rating: 4,
  summary: 'I am testing something',
  recommend: true,
  response: null,
  body: "I'm uploading a picture to see if it loads after submitting",
  date: '2021-03-06T00:00:00.000Z',
  reviewer_name: 'I like pictures',
  helpfulness: 2,
  photos: [
    {
      id: 496578,
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
    },
  ],
};

describe('<ReviewListItem />', () => {
  beforeAll(() => {
    render(<ReviewListItem review={review} />);
  });

  // it('reviewer_name should appear', () => {
  //   const reviewerName = 'I like pictures\n,\n March 5, 2021';
  //   expect(screen.getByText(reviewerName)).toBeInTheDocument();
  // });
  // it('helpful number should appear', () => {
  //   const helpful = '2';
  //   expect(screen.getByText(helpful)).toBeInTheDocument();
  // });

  it('should display reviews', () => {
    const recommend = '✓ I recommend this product';
    // const helpful = '2';
    const report = 'Report';
    // expect(screen.getByText(helpful)).toBeInTheDocument();
    expect(screen.getByText(recommend)).toBeInTheDocument();
    expect(screen.getByText(report)).toBeInTheDocument();
  });

});
