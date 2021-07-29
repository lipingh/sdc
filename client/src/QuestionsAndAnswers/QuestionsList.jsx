import React from 'react';
import PropTypes from 'prop-types';
import EachQuestion from './EachQuestion.jsx';

const QuestionsList = ({ questions, moreQuestions }) => {
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
    </>
  );
};

QuestionsList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.object),
  })),
  moreQuestions: PropTypes.bool,
};

QuestionsList.defaultProps = {
  questions: {},
  moreQuestions: false,
};

export default QuestionsList;
