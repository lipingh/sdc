import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import options from '../config/config.js';

const QuestionForm = ({ showQuestionForm, handleQuestionForm }) => {
  if (!showQuestionForm) return null;
  return ReactDOM.createPortal(
    <>
      <form>
        <button type="button" onClick={handleQuestionForm}>X</button>
        <h3>Ask Your Question</h3>
        <h4>About the product name</h4>
        <textarea type="text" maxLength="1000" placeholder="Your Question" required />
        <span>What is your nickname?</span>
        <input type="text" maxLength="1000" placeholder="Example: jackson11!" required />
        <span>For privacy reasons, do not use your full name or email address.</span>
        <input type="email" required />
        <span>For authentication reasons, you will not be emailed.</span>
        <button type="submit">Submit Question</button>
      </form>
    </>,
    document.getElementById('questions'),
  );
};

export default QuestionForm;
