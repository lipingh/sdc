import React from 'react';
import PropTypes from 'prop-types';
import EachQuestion from './EachQuestion.jsx';

const QuestionsList = ({ questions }) => (
  <ul className="q-list">
    {questions.map((question) => (
      <div key={question.question_id}>
        <EachQuestion key={question.question_id} question={question} />
      </div>
    ))}
  </ul>
);

QuestionsList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.object),
  })),
};

QuestionsList.defaultProps = {
  questions: {},
};

export default QuestionsList;
