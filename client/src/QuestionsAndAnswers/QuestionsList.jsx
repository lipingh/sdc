import React from 'react';
import PropTypes from 'prop-types';
import EachQuestion from './EachQuestion.jsx';

const QuestionsList = ({
  loading, error, questions, questionsInfinate, moreQuestions, lastQuestionRef,
}) => {
  if (moreQuestions) {
    return (
      <>
        <ul className="questions-list">
          {questionsInfinate.length === 0
            ? (
              <span ref={lastQuestionRef}>
                No More Questions
              </span>
            )
            : questionsInfinate.map((question, i) => {
              if (questionsInfinate.length === i + 1) {
                return (
                <div ref={lastQuestionRef} key={question.question_id}>
                <EachQuestion key={question.question_id} question={question} />
                </div>
                );
              }
              return <EachQuestion key={question.question_id} question={question} />
          })}
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
  questionsInfinate: PropTypes.arrayOf(PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.object),
  })),
  questions: PropTypes.arrayOf(PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.object),
  })),
  moreQuestions: PropTypes.bool,
};

QuestionsList.defaultProps = {
  questions: [],
  moreQuestions: false,
  questionsInfinate: [],
};

export default QuestionsList;
