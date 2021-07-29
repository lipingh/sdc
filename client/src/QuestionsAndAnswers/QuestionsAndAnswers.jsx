import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QandA-list.css';
import options from '../config/config.js';
import QuestionsList from './QuestionsList.jsx';
import allInOrder from './Helpers.js';
import SearchQuestions from './SearchQuestions.jsx'
import QuestionForm from './QuestionForm.jsx'

const QuestionsAndAnswers = () => {
  const [questions, setQuestions] = useState([]);
  const [moreQuestions, showMoreQuestions] = useState(false);
  const [showQuestionsForm, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [originalQuestions, setOriginalQuestions] = useState([]);

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
        setOriginalQuestions(finalOrder);
      })
      .catch((res, err) => {
        res.end('could not get questions', err);
      });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (search.length + 1 > 2) {
      setQuestions(questions.filter((question) => (
        question.question_body.toLowerCase().includes(search.toLowerCase()) ? question : null
      )));
    } else {
      setQuestions(originalQuestions);
    }
  };

  const handleMoreQuestions = () => {
    showMoreQuestions((more) => !more);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      <h3>Questions and Answers</h3>
      <SearchQuestions search={search} handleSearch={handleSearch} />
      <QuestionForm showQuestionForm={showQuestionsForm} />
      <div className="q-a">
        <QuestionsList questions={questions} moreQuestions={moreQuestions} />
        <button
          className="more-questions-button"
          type="button"
          onClick={handleMoreQuestions}
        >
          {moreQuestions ? 'Hide Questions' : 'More Answered Questions'}
        </button>
      </div>
    </>
  );
};

export default QuestionsAndAnswers;
