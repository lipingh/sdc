import { useState, useEffect } from 'react';
import axios from 'axios';
import options from '../config/config';

const getAllReviews = (productId, page, sortOption) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const params = {
    product_id: productId,
    page,
    sort: sortOption,
  };
  // every time we change the sort or product_id, empty pervious reviews
  useEffect(() => {
    setReviews([]);
  }, [sortOption, productId]);
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: `${options.url}reviews/`,
      headers: options.headers,
      params,
      cancelToken: new axios.CancelToken((c) => cancel = c),
    }).then((res) => {
      setReviews((prev) => [...prev, ...res.data.results]);
      setHasMore(res.data.results.length > 0);
      setLoading(false);
    }).catch((e) => {
      if (axios.isCancel(e)) return;
      setError(true);
    });
    return () => cancel();
  }, [productId, page, sortOption]);

  return {
    loading, error, reviews, hasMore,
  };
};

export default getAllReviews;
