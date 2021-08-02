import { useState, useEffect } from 'react';
import axios from 'axios';
import allInOrder from './Helpers.js';
import options from '../config/config';

const useAllQuestions = (productId, page, searched) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questionsInfinate, setQuestionsI] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setQuestionsI([]);
  }, [productId]);

  useEffect(() => {
    const { CancelToken } = axios;
    let cancel;
    setLoading(true);
    setError(false);

    axios({
      method: 'GET',
      url: `${options.url}qa/questions/`,
      headers: options.headers,
      params: {
        product_id: productId,
        page,
        count: 4,
      },
      cancelToken: new CancelToken((c) => { cancel = c; }),
    })
      .then((res) => {
        const notReported = res.data.results.filter((question) => (
          !question.reported
        // !question.reported ? question : null
        ));
        const inQHelpOrder = notReported.sort(
          (a, b) => b.question_helpfulness - a.question_helpfulness,
        );
        const finalOrder = allInOrder(inQHelpOrder);
        setQuestionsI((prev) => [...prev, ...finalOrder]);
        setHasMore(res.data.results.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [productId]);
  return {
    loading, error, questionsInfinate, hasMore,
  };
};

export default useAllQuestions;
