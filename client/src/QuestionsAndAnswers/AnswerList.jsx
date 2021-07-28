import React from 'react';
import PropTypes from 'prop-types';
import EachAnswer from './EachAnswer.jsx'
const AnswerList = ({ answers }) => (
  <ul>
  {Object.keys(answers).map((answer, id) => (
      <div key={id}>
      <EachAnswer key={answer} answer={answers[answer]}/>
      </div>
    ))}
  </ul>
);
// for some reason .map will not work with answers.map now that answers is an array
// this way still works though

export default AnswerList;