import http from 'k6/http';
import { check, group, sleep } from 'k6';
// const baseUrl = 'http://13.59.152.171:3000';
const baseUrl = 'http://localhost:3000';
export const options = {
  stages: [
    { duration: '30s', target: 2000 },
    { duration: '1m30s', target: 1000 },
    { duration: '20s', target: 200 },
  ],
};

const SLEEP_DURATION = 0.1;
export default function getReviewsAndRatingsByProductId() {
  const productId = 13025;
  const pageSize = 5;
  const pageNumber = 5;
  group('loading the ratings and reviews for a single product', () => {
    // get review meta data request
    const review_meta_res = http.get(`${baseUrl}/reviews/meta?product_id=${productId}`);
    check(review_meta_res, { 'review meta data status was 200': (r) => r.status === 200 });
    sleep(SLEEP_DURATION);

    // get reviews by product id
    const reviews_res = http.get(`${baseUrl}/?product_id=${productId}&count=${pageSize}&page=${pageNumber}`);
    check(reviews_res, { 'reviews status was 200': (r) => r.status === 200 });
    sleep(SLEEP_DURATION);
  });
}
