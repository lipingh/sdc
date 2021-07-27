import React from 'react';
import PropTypes from 'prop-types';
import AnswerList from './AnswerList.jsx';

const EachQuestion = ({ question }) => (
  <>
    <span>{question.question_body}</span>
    <AnswerList answers={question.answers} />
  </>
);

EachQuestion.propTypes = {
  question: PropTypes.shape({
    question_body: PropTypes.string,
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
