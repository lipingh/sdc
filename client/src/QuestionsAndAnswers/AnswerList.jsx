import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import EachAnswer from './EachAnswer.jsx';

const AnswerList = ({ answers }) => (
  <ul>
    <Collapsible trigger="show Answers" overflowWhenOpen="scroll" transitionTime="200">
      {Object.keys(answers).map((answer) => (
        <div key={answer}>
          <EachAnswer key={answer} answer={answers[answer]} />
        </div>
      ))}
    </Collapsible>
  </ul>
);
// for some reason .map will not work with answers.map now that answers is an array
// this way still works though
AnswerList.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object),
};

AnswerList.defaultProps = {
  answers: [],
};

export default AnswerList;
