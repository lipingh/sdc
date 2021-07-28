import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './questions.css';
import options from '../config/config.js';
import QuestionsList from './QuestionsList.jsx';
import allInOrder from './Helpers.js';

const QuestionsAndAnswers = () => {
  const [questions, setQuestions] = useState([]);

  const getQuestions = () => {
    axios.get(`${options.url}qa/questions?product_id=13026`, {
      headers: options.headers,
    })
      .then((res) => {
        const notReported = res.data.results.filter((question) => {
          /*
          esLint wants this function to always return something. This is directly
          against the point of using filter.
          */
          if (!question.reported) {
            return question;
          }
        });
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
      <div className="q-a">
        <QuestionsList questions={questions} />
      </div>
    </>
  );
};

export default QuestionsAndAnswers;
