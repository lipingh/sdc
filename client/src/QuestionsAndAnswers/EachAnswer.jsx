import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import options from '../config/config';

const EachAnswer = ({ answer }) => {
  const [helpful, setHelpful] = useState(answer.helpfulness);
  const [voted, setVoted] = useState(false);
  const [reported, setReported] = useState(false);
  const handleHelpClick = () => {
    if (!voted) {
      setVoted((vote) => !vote);
      setHelpful((helped) => helped + 1);
      axios.put(
        `${options.url}qa/answers/${answer.id}/helpful`,
        {
          helpfulness: helpful,
        },
        {
          headers: options.headers,
        },
      )
        .then(() => {

        })
        .catch((res, err) => {
          res.end('could not make answer more helpful', err);
        });
    }
  };

  const handleReport = () => {
    setReported(true);
    axios.put(
      `${options.url}qa/answers/${answer.id}/report`,
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
    <div className="a-entry">
      <div>
        <span className="a-bullet">A: </span>
        {answer.body}
      </div>
      <div className="Ahelp-report">
        <span>
          <span className="seller">
            {answer.answerer_name === 'Seller' ? `by: ${answer.answerer_name}, ` : null}
          </span>
          <span className="notSeller">
            {answer.answerer_name !== 'Seller' ? `by: ${answer.answerer_name}, ` : null}
          </span>
          {new Date(answer.date).toLocaleDateString(
            undefined, { year: 'numeric', month: 'long', day: 'numeric' },
          )}
        </span>
        <span
          onClick={handleHelpClick}
          onKeyPress={() => {}}
          role="button"
          tabIndex="0"
        >
          {voted ? `You and ${helpful} others thought this was helpful | ` : ` Helpful? Yes: ${helpful} | `}
        </span>
        <span
          onClick={handleReport}
          onKeyPress={() => {}}
          role="button"
          tabIndex="0"
        >
          {reported ? ' | Answer was Reported' : ' | Report'}
        </span>
      </div>
    </div>
  );
};

EachAnswer.propTypes = {
  answer: PropTypes.shape({
    answerer_name: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.string,
    helpfulness: PropTypes.number,
    id: PropTypes.number,
  }),
};

EachAnswer.defaultProps = {
  answer: {},
};

export default EachAnswer;
