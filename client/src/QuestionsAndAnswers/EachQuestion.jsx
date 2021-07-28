import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import options from '../config/config';
import AnswerList from './AnswerList.jsx';

const EachQuestion = ({ question }) => {
  const [helpfull, setHelpfull] = useState(question.question_helpfulness);
  const [voted, setVoted] = useState(false);

  const handleHelpClick = () => {
    if (!voted) {
      setVoted((vote) => !vote);
      setHelpfull((helped) => helped + 1);
      axios.put(
        `${options.url}qa/questions/${question.question_id}/helpful`,
        {
          question_helpfulness: helpfull,
        },
        {
          headers: options.headers,
        },
      )
        .then(() => {

        })
        .catch((res, err) => {
          res.end('could not make question more helpfull', err);
        });
    }
  };

  return (
    <>
      <div className="q-entry">
        <span className="q-body">{`Q: ${question.question_body}`}</span>
        <div className="Qhelp-report">
          <span onClick={handleHelpClick}>
            {voted ? 'You thought this was helpfull | ' : ` Helpfull? Yes: ${helpfull} | `}
          </span>
          <span> Report</span>
        </div>
      </div>
      <AnswerList answers={question.answers} />
    </>
  );
};

EachQuestion.propTypes = {
  question: PropTypes.shape({
    question_body: PropTypes.string,
    question_id: PropTypes.number,
    question_helpfulness: PropTypes.number,
    answers: PropTypes.arrayOf(PropTypes.object),
  }),
};

EachQuestion.defaultProps = {
  question: {},
};

export default EachQuestion;
