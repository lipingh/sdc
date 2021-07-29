import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EachQuestion from './EachQuestion.jsx';

const QuestionsList = ({ questions }) => {
  const [moreQuestions, showMoreQuestions] = useState(false);

  const handleMoreQuestions = () => {
    showMoreQuestions((more) => !more);
  };

  if (moreQuestions) {
    return (
      <>
        <ul className="questions-list">
          {questions.map((question) => (
            <div key={question.question_id}>
              <EachQuestion key={question.question_id} question={question} />
            </div>
          ))}
        </ul>
        <button
          className="more-questions-button"
          type="button"
          onClick={handleMoreQuestions}
        >
          Hide Questions
        </button>
      </>
    );
  }
  return (
    <>
      <ul className="four-questions">
        {questions.filter((question, index) => (
          index < 4
        )).map((question) => (
          <div key={question.question_id}>
            <EachQuestion key={question.question_id} question={question} />
          </div>
        ))}
      </ul>
      <button
        className="more-questions-button"
        type="button"
        onClick={handleMoreQuestions}
      >
        More Answered Questions
      </button>
    </>
  );
};

QuestionsList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.object),
  })),
};

QuestionsList.defaultProps = {
  questions: {},
};

export default QuestionsList;
