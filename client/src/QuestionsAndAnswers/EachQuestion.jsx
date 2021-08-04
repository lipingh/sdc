import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import options from '../config/config';
import AnswerList from './AnswerList.jsx';
import AnswerForm from './AnswerForm.jsx';

const EachQuestion = ({ question }) => {
  const [helpful, setHelpful] = useState(question.question_helpfulness);
  const [voted, setVoted] = useState(false);
  const [reported, setReported] = useState(false);
  const [showAnswerForm, setShow] = useState(false);
  const handleHelpClick = () => {
    if (!voted) {
      setVoted((vote) => !vote);
      setHelpful((helped) => helped + 1);
      axios.put(
        `${options.url}qa/questions/${question.question_id}/helpful`,
        {
          question_helpfulness: helpful,
        },
        {
          headers: options.headers,
        },
      )
        .then(() => {

        })
        .catch((err) => {
          Promise.reject(err);
        });
    }
  };

  const handleReport = () => {
    setReported(true);
    axios.put(
      `${options.url}qa/questions/${question.question_id}/report`,
      {
        reported: true,
      },
      {
        headers: options.headers,
      },
    )
      .then(() => {

      })
      .catch((err) => {
        Promise.reject(err);
      });
  };

  return (
    <>
      <div className="q-entry">
        <span className="q-body">{`Q: ${question.question_body}`}</span>
        <div className="Qhelp-report">
          <span
            className="helpful"
            onClick={handleHelpClick}
            onKeyPress={() => {}}
            role="button"
            tabIndex="0"
          >
            {voted ? `You and ${helpful} others thought this was helpful` : ` Helpful? Yes: ${helpful}`}
          </span>
          <span>{'  |  '}</span>
          <span
            className="reported"
            onClick={handleReport}
            onKeyPress={() => {}}
            role="button"
            tabIndex="0"
          >
            {reported ? 'Question was Reported ' : ' Report'}
          </span>
          <span>{'  |  '}</span>
          <span
            className="add-answer"
            onKeyPress={() => {}}
            role="button"
            tabIndex="0"
            onClick={() => { setShow(true); }}
          >
            Add Answer
          </span>
        </div>
      </div>
      <AnswerList answers={question.answers} />
      <AnswerForm
        questionId={question.question_id}
        questionBody={question.question_body}
        showAnswerForm={showAnswerForm}
        handleAnswerForm={() => { setShow(false); }}
      />
    </>
  );
};

EachQuestion.propTypes = {
  question: PropTypes.shape({
    question_body: PropTypes.string,
    question_id: PropTypes.number,
    question_helpfulness: PropTypes.number,
    answers: PropTypes.arrayOf(PropTypes.object),
    reported: PropTypes.bool,
  }),
};

EachQuestion.defaultProps = {
  question: {},
};

export default EachQuestion;
