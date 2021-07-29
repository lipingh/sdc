import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import options from '../config/config';

function retriveAllReviewsByPage(productId, page) {
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const params = {
    product_id: productId,
    page,
  };
  const sendQuery = useCallback(async () => {
    try {
      // await setLoading(true);
      await setError(false);
      const res = await axios({
        url: `${options.url}reviews/`,
        method: 'get',
        headers: options.headers,
        params,
      });
      await setList((prev) => [...prev, ...res.data.results]);
      // setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [productId, page]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { error, list };
}

export default retriveAllReviewsByPage;
