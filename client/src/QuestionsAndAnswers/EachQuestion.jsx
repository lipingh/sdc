import React, { useState } from 'react';
import axios from 'axios';
import options from '../config/config.js';
import PropTypes from 'prop-types';
import AnswerList from './AnswerList.jsx';

const EachQuestion = ({ question }) => {
  const [helpfull, setHelpfull] = useState(question.question_helpfulness);

   const handleHelpClick = () => {
    setHelpfull(helpfull + 1);
    axios.put(
      `${options.url}qa/questions/${question.question_id}/helpful`,
      {
        question_helpfulness: helpfull,
      },
      {
        headers: options.headers,
      }
    )
    .then((res) => {

    })
    .catch((err) => {
      res.end('could not make question more helpfull', err);
    })
  }

  return (
    <>
      <span>{question.question_body}</span>
      <span>Helpful? </span>
        <span onClick={handleHelpClick}> Yes:
        ({helpfull}) |
        </span >
      <span> Report</span>
      <AnswerList answers={question.answers} />
    </>
  );
};

EachQuestion.propTypes = {
  question: PropTypes.shape({
    question_body: PropTypes.string,
    question_helpfulness: PropTypes.number,
    answers: PropTypes.shape({
      answerer_name: PropTypes.string,
      body: PropTypes.string,
    }),
  }),
};

EachQuestion.defaultProps = {
  question: {},
};

export default EachQuestion;
