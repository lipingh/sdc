import React, { useState, useEffect } from 'react';
import axios from 'axios';
import options from '../config/config.js';
import QuestionsList from './QuestionsList.jsx';

const QuestionsAndAnswers = () => {
  const [questions, setQuestions] = useState([]);

  const getQuestions = () => {
    axios(`${options.url}qa/questions?product_id=13026`, {
      headers: options.headers,
    })
      .then((res) => {
        setQuestions(res.data.results);
      })
      .catch((res, err) => {
        res.end('could not get questions', err);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      <QuestionsList questions={questions} />
    </>
  );
};

export default QuestionsAndAnswers;
