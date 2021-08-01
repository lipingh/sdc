import { useState, useEffect } from 'react';
import axios from 'axios';
import options from '../config/config';

const useAllQuestions = (productId, page, sortOption) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setQuestions([]);
  }, [sortOption, productId]);

  useEffect(() => {
    const { CancelToken } = axios;
    let cancel;
    setLoading(true);
    setError(false);

    axios.get(`${options.url}questions/`, {
      headers: options.headers,
      params: {
        product_id: productId,
        page,
        count: 4,
      },
    });
  });
};

export default useAllQuestions;
