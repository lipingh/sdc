import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './AForm.css';
import axios from 'axios';
import options from '../config/config.js';

const AnswerForm = ({ questionId, questionBody, showAnswerForm, handleAnswerForm }) => {
  if (!showAnswerForm) return null;

  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showSubmitM, showM] = useState(false);
  const [showErr, showErrM] = useState(false);

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    const notAllowed = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!body.endsWith('?') && name.search(notAllowed) === -1 && name.match('.*\\s.*') === null) {
      showErrM(false);

      const data = {
        body, name, email, photos: [],
      };
      axios.post(`${options.url}qa/questions/${questionId}/answers`, data, { headers: options.headers })
        .then(() => {
          showM(true);
          setBody('');
          setName('');
          setEmail('');
        })
        .catch((err) => {
          Promise.reject(err);
        });
    } else {
      showErrM(true);
    }
  };

  return ReactDOM.createPortal(
    <div className="answer-overlay">
      <form className="answer-form">
        <button className="XButton" type="button" onClick={handleAnswerForm}>X</button>
        <h3 className="ATitle">Submit your Answer</h3>
        <h4 className="ASubTitle">{`product name: ${questionBody}`}</h4>
        <span style={{ color: 'green' }}>{showSubmitM ? 'Answer submitted!' : null}</span>
        <span style={{ color: 'red' }}>{showErr ? 'You must enter the following: answer, nickname, and email' : null}</span>
        <div>
          <span>Your Answer</span>
          <span className="asterisk" style={{ color: 'red' }}>*</span>
        </div>
        <textarea
          className="ABody"
          type="text"
          maxLength="1000"
          placeholder="Your Answer"
          onChange={(e) => { setBody(e.target.value); }}
          required
        />
        <div>
          <span>What is your nickname?</span>
          <span className="asterisk" style={{ color: 'red' }}>*</span>
        </div>
        <input className="AName" type="text" maxLength="1000" placeholder="Example: jackson11!" onChange={(e) => { setName(e.target.value); }} required />
        <span>For privacy reasons, do not use your full name or email address.</span>
        <div>
          <span>Your email</span>
          <span className="asterisk" style={{ color: 'red' }}>*</span>
        </div>
        <input className="AEmail" type="email" placeholder="Example: abcde@abc.com" onChange={(e) => { setEmail(e.target.value); }} required />
        <span>For authentication reasons, you will not be emailed.</span>
        <button className="ASubmit" type="submit" onClick={handleSubmitQuestion}>Submit Answer</button>
      </form>
    </div>,
    document.getElementById('questions'),
  );
};

export default AnswerForm;
