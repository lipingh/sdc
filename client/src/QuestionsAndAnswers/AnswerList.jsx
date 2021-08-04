import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EachAnswer from './EachAnswer.jsx';

const AnswerList = ({ answers }) => {
  const [moreAnswers, showMoreAnswers] = useState(false);

  const handleMoreAnswers = () => {
    showMoreAnswers((more) => !more);
  };

  if (moreAnswers) {
    return (
      <>
        <ul className="answer-list">
          {Object.keys(answers).map((answer) => (
            <div key={answer}>
              <EachAnswer key={answer} answer={answers[answer]} />
            </div>
          ))}
        </ul>
        <button
          className="more-answers-button"
          type="button"
          onClick={handleMoreAnswers}
        >
          HIDE ANSWERS
        </button>
      </>
    );
  }
  return (
    <>
      <ul className="two-answers">
        {answers.filter((answer, index) => (
          index < 2
        )).map((answer) => (
          <div key={answer.id}>
            <EachAnswer key={answer.id} answer={answer} />
          </div>
        ))}
      </ul>
      <button
        className="more-answers-button"
        type="button"
        onClick={handleMoreAnswers}
      >
        LOAD MORE ANSWERS
      </button>
    </>
  );
};

AnswerList.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object),
};

AnswerList.defaultProps = {
  answers: [],
};

export default AnswerList;
