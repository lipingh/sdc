import React, { useState } from 'react';
import axios from 'axios';
import options from '../config/config.js';
import PropTypes from 'prop-types';
import AnswerList from './AnswerList.jsx';

const EachQuestion = ({ question }) => {
  const [helpfull, setHelpfull] = useState(question.question_helpfulness);
  const [voted, setVoted] = useState(false);

  const handleHelpClick = () => {
    if(!voted) {
      setVoted((voted) => voted = true);
      setHelpfull((helpfull) => helpfull + 1);
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
  }

  return (
    <>
      <div className='q-entry'>
        <div className='q-body'>
        {'Q: '}
        <span>{question.question_body}</span>
        </div>
        <div className='Qhelp-report'>
          <span onClick={handleHelpClick}> {voted ? 'You thought this was helpfull | ': ` Helpfull? Yes: ${helpfull} | `}
          </span >
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
    question_helpfulness: PropTypes.number,
  }),
};

EachQuestion.defaultProps = {
  question: {},
};

export default EachQuestion;
