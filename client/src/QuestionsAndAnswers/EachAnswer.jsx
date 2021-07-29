import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import options from '../config/config';

const EachAnswer = ({ answer }) => {
  const [helpful, setHelpful] = useState(answer.helpfulness);
  const [voted, setVoted] = useState(false);
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

  return (
    <div className="a-entry">
      <div>
        <span className="a-bullet">A: </span>
        {answer.body}
      </div>
      <div className="Ahelp-report">
        <span>
          by:
          {answer.answerer_name}
          ,
          {' '}
          {new Date(answer.date).toLocaleDateString(
            undefined, { year: 'numeric', month: 'long', day: 'numeric' },
          )}
          {' '}
          |
          {' '}
        </span>
        <span
          onClick={handleHelpClick}
          onKeyPress={() => {}}
          role="button"
          tabIndex="0"
        >
          {voted ? 'You thought this was helpful | ' : ` Helpful? Yes: ${helpful} | `}
        </span>
        <span> Report</span>
      </div>
    </div>
  );
};
// regarding the on click issue above, it leads into a rabbit hole of accessability functionality.

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
