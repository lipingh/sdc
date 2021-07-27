import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import options from '../config/config.js';

const EachAnswer = ({ answer }) => {
  const [helpfull, setHelpfull] = useState(answer.helpfulness);

  const handleHelpClick = () => {
    setHelpfull(helpfull + 1);
    axios.put(
      `${options.url}qa/answers/${answer.id}/helpful`,
      {
        helpfulness: helpfull,
      },
      {
        headers: options.headers,
      }
    )
    .then((res) => {

    })
    .catch((err) => {
      res.end('could not make answer more helpfull', err);
    })
  }

  return (
  <>
    <span>{answer.body}</span>
    <span>
        Helpful?
        <button onClick={handleHelpClick} type='button'>Yes:
        {helpfull}
        </button>
      </span>
      <span>
        Report
      </span>
  </>
  )
};

EachAnswer.propTypes = {
  answer: PropTypes.shape({
    body: PropTypes.string,
  }),
};

EachAnswer.defaultProps = {
  answer: {},
};

export default EachAnswer;
