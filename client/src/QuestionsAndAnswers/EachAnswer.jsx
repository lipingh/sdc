import React from 'react';
import PropTypes from 'prop-types';

const EachAnswer = ({ answer }) => (
  <>
    <span>{answer.body}</span>
  </>
);

EachAnswer.propTypes = {
  answer: PropTypes.shape({
    body: PropTypes.string,
  }),
};

EachAnswer.defaultProps = {
  answer: {},
};

export default EachAnswer;
