import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 2000 },
    { duration: '1m30s', target: 1000 },
    { duration: '20s', target: 200 },
  ],
};

const SLEEP_DURATION = 0.1;
export default function getReviewsAndRatingsByProductId() {
  const productId = 13027;
  const pageSize = 5;
  const pageNumber = 5;
  group('loading the ratings and reviews', () => {
    // get review meta data request
    const review_meta_res = http.get(`http://localhost:3000/reviews/meta?product_id=${productId}`);
    check(review_meta_res, { 'review meta data status was 200': (r) => r.status === 200 });
    sleep(SLEEP_DURATION);

    // get reviews by product id
    const reviews_res = http.get(`http://localhost:3000/reviews/?product_id=${productId}&count=${pageSize}&page=${pageNumber}`);
    check(reviews_res, { 'reviews status was 200': (r) => r.status === 200 });
    sleep(SLEEP_DURATION);
  });
}
