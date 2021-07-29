import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QandA-list.css';
import options from '../config/config.js';
import QuestionsList from './QuestionsList.jsx';
import allInOrder from './Helpers.js';
import SearchQuestions from './SearchQuestions.jsx'

const QuestionsAndAnswers = () => {
  const [questions, setQuestions] = useState([]);

  const getQuestions = () => {
    axios.get(`${options.url}qa/questions?product_id=13027`, {
      headers: options.headers,
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
        setQuestions(finalOrder);
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
      <SearchQuestions />
      <div className="q-a">
        <QuestionsList questions={questions} />
      </div>
    </>
  );
};

export default QuestionsAndAnswers;
