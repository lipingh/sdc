import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import options from '../config/config.js';

const EachAnswer = ({ answer }) => {
  const [helpfull, setHelpfull] = useState(answer.helpfulness);
  const [voted, setVoted] = useState(false);
  const handleHelpClick = () => {
    if(!voted) {
      setVoted((voted) => voted = true);
      setHelpfull((helpfull) => helpfull + 1);
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
  }

  return (
  <div className='a-entry'>
    <div>
    <span className='a-bullet'>A: </span>
    {answer.body}
    </div>
    <div className='Ahelp-report'>
      <span>by: {answer.answerer_name}, {new Date(answer.date).toLocaleDateString(
        undefined, { year: 'numeric', month: 'long', day: 'numeric' }
        )} | </span>
        <span onClick={handleHelpClick}> {voted ? 'You thought this was helpfull | ': ` Helpfull? Yes: ${helpfull} | `}
        </span >
      <span> Report</span>
    </div>
  </div>
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
