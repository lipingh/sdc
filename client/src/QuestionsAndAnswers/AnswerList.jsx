import React from 'react';
import PropTypes from 'prop-types';
import EachAnswer from './EachAnswer.jsx'
const AnswerList = ({ answers }) => (
  <>
  <ul>
  {Object.keys(answers).map((answer) => (
      <li key={answer}>
      <EachAnswer key={answer} answer={answers[answer]}/>
      </li>
    ))}
  </ul>
  </>
);

export default AnswerList;