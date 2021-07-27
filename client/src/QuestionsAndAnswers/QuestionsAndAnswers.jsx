import React, { useState, useEffect } from 'react';
import axios from 'axios';
import options from '../config/config.js';
import QuestionsList from './QuestionsList.jsx';

const QuestionsAndAnswers = () => {
  const [questions, setQuestions] = useState([]);

  const getQuestions = () => {
    axios.get(`${options.url}qa/questions?product_id=13026`, {
      headers: options.headers,
    })
      .then((res) => {
        const notReported = res.data.results.filter((question) => {
          if(!question.reported) {
            return question;
          }
        });
        const inHelpOrder = notReported.sort(
          (a, b) => { return b.question_helpfulness - a.question_helpfulness}
        );
        setQuestions(inHelpOrder);
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
      <h3>Questions and Answers</h3>
      <QuestionsList questions={questions} />
    </>
  );
};

export default QuestionsAndAnswers;
