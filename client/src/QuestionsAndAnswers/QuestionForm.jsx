import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './QForm.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import options from '../config/config.js';

const QuestionForm = ({ showQuestionForm, handleQuestionForm }) => {
  if (!showQuestionForm) return null;

  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmitQuestion = () => {
    
    axios.post(`${options.url}qa/questions`,
      {
        body, name, email, product_id: 13027,
      }, { headers: options.headers })
      .then()
      .catch((err) => {
        Promise.reject(err);
      });
  };

  return ReactDOM.createPortal(
    <div className="question-overlay">
      <form className="question-form">
        <button className="XButton" type="button" onClick={handleQuestionForm}>X</button>
        <h3 className="QTitle">Ask Your Question</h3>
        <h4 className="QSubTitle">About the product name</h4>
        <textarea className="QBody" type="text" maxLength="1000" placeholder="Your Question" onChange={(e) => { setBody(e.target.value); }} required />
        <span>What is your nickname?</span>
        <input className="QName" type="text" maxLength="1000" placeholder="Example: jackson11!" onChange={(e) => { setName(e.target.value); }} required />
        <span>For privacy reasons, do not use your full name or email address.</span>
        <input className="QEmail" type="email" onChange={(e) => { setEmail(e.target.value); }} required />
        <span>For authentication reasons, you will not be emailed.</span>
        <button className="QSubmit" type="submit">Submit Question</button>
      </form>
    </div>,
    document.getElementById('questions'),
  );
};

export default QuestionForm;
